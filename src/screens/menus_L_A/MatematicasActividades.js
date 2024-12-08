import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';

// Configurar la ruta de los archivos de audio
const audioFiles = {
  seleccionaActividad: new Sound('seleccionaactividad.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
};

const playAudio = (audio) => {
  audio.play((success) => {
    if (!success) {
      console.log('Sound playback failed');
    }
  });
};

const MatematicasActividades = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ActividadArrastrarSoltarM')}>
          <ImageBackground source={require('../../../assets/img/arrastrar.png')} style={styles.imageBackground} imageStyle={styles.image}>
            {/* Aquí puedes agregar más contenido dentro del ImageBackground si es necesario */}
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JuegoMemoriaM')}>
          <ImageBackground source={require('../../../assets/img/memoria.png')} style={styles.imageBackground} imageStyle={styles.image}>
            {/* Aquí puedes agregar más contenido dentro del ImageBackground si es necesario */}
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClasificacionPalabrasM')}>
          <ImageBackground source={require('../../../assets/img/palabras.png')} style={styles.imageBackground} imageStyle={styles.image}>
            {/* Aquí puedes agregar más contenido dentro del ImageBackground si es necesario */}
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={styles.audioButtonContainer}>
        <TouchableOpacity style={styles.audioButton} onPress={() => playAudio(audioFiles.seleccionaActividad)}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // Mueve los botones más a la derecha
    backgroundColor: '#BFE0F3',
    paddingLeft: 40, // Ajusta este valor para mover más a la derecha
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Reduce el espacio entre los botones
    paddingHorizontal: 20, // Ajusta el espacio horizontal entre los botones
  },
  button: {
    width: 350, // Aumenta el ancho del botón
    height: 200, // Aumenta la altura del botón
    marginVertical: -30, // Reduce el espacio vertical entre los botones
    borderRadius: 15,
    overflow: 'hidden', // Ensure rounded corners are applied to ImageBackground
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -25, // Aumenta el espacio entre los botones
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain', // Asegura que la imagen se ajuste dentro del botón sin recortarse
  },
  audioButtonContainer: {
    position: 'absolute',
    top: 110, // Ajusta esta distancia según sea necesario
    left: '53.9%',
    transform: [{ translateX: -25 }], // Ajusta el valor para centrar horizontalmente
  },
  audioButton: {
    marginLeft: 10, // Aumenta el espacio entre el botón y el botón de audio
    padding: 15, // Aumenta el tamaño del botón de audio
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
  },
  audioButtonText: {
    fontSize: 20, // Aumenta el tamaño del texto del botón de audio
    color: '#000',
  },
});

export default MatematicasActividades;