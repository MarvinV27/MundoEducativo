import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, PanResponder, Animated, Alert, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import LinearGradient from 'react-native-linear-gradient';

const imagesData = [
  { id: 1, name: 'manzana_roja', source: require('./img/red.png'), correctContainer: 'rojo' },
  { id: 2, name: 'uva_morada', source: require('./img/green.jpg'), correctContainer: 'morado' },
  { id: 3, name: 'platano_amarillo', source: require('./img/blue.jpg'), correctContainer: 'amarillo' },
];

const DragAndDropActivity = () => {
  const [placedImages, setPlacedImages] = useState([]);
  const [draggingImage, setDraggingImage] = useState(null);
  const [pan, setPan] = useState(imagesData.reduce((acc, image) => {
    acc[image.name] = new Animated.ValueXY();
    return acc;
  }, {}));

  const audioFile = new Sound('recuerdaarrastrar.mp3', Sound.MAIN_BUNDLE, (error) => {
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

  const checkDropZone = (gesture, currentImage) => {
    const { moveX, moveY } = gesture;

    const dropZones = {
      rojo: { xMin: 50, xMax: 150, yMin: 300, yMax: 400 },
      morado: { xMin: 170, xMax: 270, yMin: 300, yMax: 400 },
      amarillo: { xMin: 290, xMax: 390, yMin: 300, yMax: 400 },
    };

    const { correctContainer } = currentImage;
    const { xMin, xMax, yMin, yMax } = dropZones[correctContainer];

    return moveX > xMin && moveX < xMax && moveY > yMin && moveY < yMax;
  };

  const createPanResponder = (image) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => {
        if (draggingImage === null) {
          setDraggingImage(image.name);
          return true;
        }
        return false;
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: pan[image.name].x, dy: pan[image.name].y }
      ], { useNativeDriver: false }),
      onPanResponderRelease: (event, gesture) => {
        if (checkDropZone(gesture, image)) {
          const updatedPlacedImages = [...placedImages];
          updatedPlacedImages.push(image.name);
          setPlacedImages(updatedPlacedImages);
          pan[image.name].setValue({ x: 0, y: 0 });

          if (updatedPlacedImages.length === imagesData.length) {
            Alert.alert(
              "¡Felicidades!",
              "Has completado todas las imágenes.",
              [
                { text: "Volver a empezar", onPress: resetGame },
                { text: "Cerrar", onPress: () => {} }
              ]
            );
          }
        } else {
          Animated.spring(pan[image.name], {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false
          }).start();
        }
        setDraggingImage(null);
      }
    });
  };

  const resetGame = () => {
    setPlacedImages([]);
    imagesData.forEach(image => pan[image.name].setValue({ x: 0, y: 0 }));
    setDraggingImage(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.audioButtonContainer}>
        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
      <LinearGradient colors={['#89A3FF', '#253367']} style={styles.mainContainer}>
        <Text style={styles.title}>Arrastra las imágenes a su lugar correcto</Text>
        <View style={styles.dropZoneWrapper}>
          <View style={[styles.dropZone, { backgroundColor: 'red' }]}>
            
            {placedImages.includes('manzana_roja') && (
              <Image source={require('./img/red.png')} style={styles.placedImage} />
            )}
          </View>
          <View style={[styles.dropZone, { backgroundColor: 'green' }]}>
            
            {placedImages.includes('uva_morada') && (
              <Image source={require('./img/green.jpg')} style={styles.placedImage} />
            )}
          </View>
          <View style={[styles.dropZone, { backgroundColor: 'blue' }]}>
            
            {placedImages.includes('platano_amarillo') && (
              <Image source={require('./img/blue.jpg')} style={styles.placedImage} />
            )}
          </View>
        </View>

        <View style={styles.imageContainer}>
          {imagesData.map((image) => (
            !placedImages.includes(image.name) && (
              <Animated.View
                key={image.id}
                {...createPanResponder(image).panHandlers}
                style={[pan[image.name].getLayout(), styles.draggableImageWrapper]}
              >
                <Image source={image.source} style={styles.draggableImage} />
              </Animated.View>
            )
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BFE0F3',
  },
  mainContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 500,
    width: 350,
    borderRadius: 15,
    marginTop: 90,
  },
  dropZoneWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropZone: {
    width: 100,
    height: 100,
    borderWidth: 1,
    marginHorizontal: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  placedImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  draggableImageWrapper: {
    width: 100,
    height: 100,
  },
  draggableImage: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 14,
    color: "#000",
    marginBottom: 20,
    fontFamily: 'Poppinss-Bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropZoneText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    color: 'white',
  },
  audioButtonContainer: {
    position: 'absolute',
    top: 110,
    left: '50%',
    transform: [{ translateX: -25 }],
  },
  audioButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
  },
  audioButtonText: {
    fontSize: 30,
    color: '#000',
  },
});

export default DragAndDropActivity;