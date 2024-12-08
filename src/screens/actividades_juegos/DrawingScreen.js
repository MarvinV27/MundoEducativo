import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Modal } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ColorPicker } from 'react-native-color-picker';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';

// Importar imágenes
import pencilIcon from '../../../assets/img/Lapiz.png';
import eraserIcon from '../../../assets/img/Borrador.png';
import bucketIcon from '../../../assets/img/Cubeta.png';
import rulerIcon from '../../../assets/img/Regla.png';
import colorIcon from '../../../assets/img/color-wheel.png'; // Asegúrate de tener una imagen para la rueda de colores

const Aquidibuja = () => {
  const [tool, setTool] = useState('pencil');
  const [drawing, setDrawing] = useState(false);
  const [segments, setSegments] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [prevPoint, setPrevPoint] = useState(null);
  const [color, setColor] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [eraserMode, setEraserMode] = useState(false);
  const [eraserWidth, setEraserWidth] = useState(10);
  const svgRef = useRef();

  // Configurar el archivo de audio
  const audioFile = new Sound('aquidibuja.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  });

  const playAudio = () => {
    audioFile.play((success) => {
      if (!success) {
        console.log('Sound playback failed');
      }
    });
  };

  const isPathClosed = (path) => {
    const points = path.match(/[ML]([\d.]+),([\d.]+)/g);
    if (points.length < 2) return false;

    const firstPoint = points[0].match(/[\d.]+/g).map(Number);
    const lastPoint = points[points.length - 1].match(/[\d.]+/g).map(Number);

    const distanceThreshold = 10;
    const distance = Math.sqrt((firstPoint[0] - lastPoint[0]) ** 2 + (firstPoint[1] - lastPoint[1]) ** 2);

    return distance < distanceThreshold;
  };

  const handleTouchStart = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setPrevPoint({ x: locationX, y: locationY });
    setCurrentPath(`M${locationX},${locationY}`);
    setDrawing(true);
  };

  const handleTouchMove = (event) => {
    if (!drawing) return;
    const { locationX, locationY } = event.nativeEvent;
    const newPath = `${currentPath} L${locationX},${locationY}`;
    setCurrentPath(newPath);
    setPrevPoint({ x: locationX, y: locationY });
  };

  const handleTouchEnd = () => {
    setDrawing(false);
    if (currentPath) {
      const isClosed = isPathClosed(currentPath);
      setSegments([...segments, {
        path: currentPath,
        color: eraserMode ? '#FFF' : color,
        strokeWidth: eraserMode ? eraserWidth : strokeWidth,
        fill: isClosed ? color : 'none' // Si es un área cerrada, permite el relleno
      }]);
      setCurrentPath('');
    }
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setColorPickerVisible(false);
  };

  const handleStrokeWidthChange = (newWidth) => {
    setStrokeWidth(newWidth);
  };

  const handleEraserWidthChange = (newWidth) => {
    setEraserWidth(newWidth);
  };

  const handleClearDrawing = () => {
    setSegments([]);
  };

  const handleToolSelect = (selectedTool) => {
    setTool(selectedTool);
    setEraserMode(selectedTool === 'eraser');
  };

  const handleBucketClick = (x, y) => {
    const closedSegment = segments.find(segment => {
      return isPathClosed(segment.path); // Verifica si el segmento está cerrado
    });

    if (closedSegment) {
      setSegments(segments.map(segment => {
        if (segment === closedSegment) {
          return { ...segment, fill: color }; // Rellena con el color seleccionado
        }
        return segment;
      }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.audioButtonContainer}>
        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>

      <Svg
        width="100%"
        height="80%"
        onTouchStart={tool === 'pencil' ? handleTouchStart : undefined}
        onTouchMove={tool === 'pencil' ? handleTouchMove : undefined}
        onTouchEnd={tool === 'pencil' ? handleTouchEnd : undefined}
        ref={svgRef}
        onPress={(event) => {
          if (tool === 'bucket') {
            const { locationX, locationY } = event.nativeEvent;
            handleBucketClick(locationX, locationY);
          }
        }}
      >
        {segments.map((segment, index) => (
          <Path key={index} d={segment.path} stroke={segment.color} strokeWidth={segment.strokeWidth} fill={segment.fill || 'none'} />
        ))}
        {currentPath && (
          <Path d={currentPath} stroke={eraserMode ? '#FFF' : color} strokeWidth={eraserMode ? eraserWidth : strokeWidth} fill="none" />
        )}
      </Svg>

      {/* Barra de herramientas */}
      <View style={styles.toolContainer}>
        <TouchableOpacity onPress={() => handleToolSelect('pencil')}>
          <Image source={pencilIcon} style={styles.toolIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleToolSelect('eraser')}>
          <Image source={eraserIcon} style={styles.toolIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleToolSelect('bucket')}>
          <Image source={bucketIcon} style={styles.toolIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleToolSelect('ruler')}>
          <Image source={rulerIcon} style={styles.toolIcon} />
        </TouchableOpacity>

        {/* Botón para abrir el selector de color */}
        <TouchableOpacity onPress={() => setColorPickerVisible(true)}>
          <Image source={colorIcon} style={styles.toolIcon} />
        </TouchableOpacity>
      </View>

      {/* Modal para el selector de colores */}
      <Modal visible={colorPickerVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <ColorPicker
            onColorSelected={handleColorChange}
            style={{ flex: 1, width: '100%' }}
            hideSliders={true}
          />
          <TouchableOpacity onPress={() => setColorPickerVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {eraserMode && (
        <View style={styles.eraserControls}>
          <Slider
            style={{ width: 200 }}
            minimumValue={1}
            maximumValue={50}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            step={1}
            value={eraserWidth}
            onValueChange={handleEraserWidthChange}
          />
          <Text>Tamaño del borrador: {eraserWidth}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  audioButtonContainer: {
    position: 'absolute',
    top: 2,
    left: '91%',
    transform: [{ translateX: -25 }],
  },
  audioButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
  },
  audioButtonText: {
    fontSize: 25,
    color: '#000',
  },
  toolContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20, // Incrementa el padding vertical para hacer la barra más alta
    backgroundColor: '#eaeaea',
    paddingBottom: 30, // Ajusta el padding inferior también
  },
  toolIcon: {
    width: 60, // Incrementa el tamaño del ancho del icono
    height: 60, // Incrementa el tamaño de la altura del icono
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#000',
  },
  eraserControls: {
    alignItems: 'center',
  },
});

export default Aquidibuja;
