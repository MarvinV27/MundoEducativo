import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';

// Configurar la ruta de los archivos de audio
const audioFiles = {
  lecciones: new Sound('leccionesdisponibles.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  actividades: new Sound('actividadesdispo.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  dibujos: new Sound('dibujosdisponibles.mp3', Sound.MAIN_BUNDLE, (error) => {
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

const Ciencias = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../../assets/img/btnatras.png')} style={styles.backButtonImage} />
      </TouchableOpacity>

      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Ciencias</Text>
      </View>

      {/* Botón Lecciones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CienciasLecciones')}>
          <ImageBackground source={require('../../../assets/img/Lecciones.png')} style={styles.image}>
            {/* Aquí puedes agregar más contenido dentro del ImageBackground si es necesario */}
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.audioButton} onPress={() => playAudio(audioFiles.lecciones)}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>

      {/* Botón Actividades */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CienciasActividades')}>
          <ImageBackground source={require('../../../assets/img/Jugar.png')} style={styles.image}>
            {/* Aquí puedes agregar más contenido dentro del ImageBackground si es necesario */}
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.audioButton} onPress={() => playAudio(audioFiles.actividades)}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>

      {/* Botón Dibujos */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DibujosC')}>
          <ImageBackground source={require('../../../assets/img/Colorear.png')} style={styles.image}>
            {/* Aquí puedes agregar más contenido dentro del ImageBackground si es necesario */}
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.audioButton} onPress={() => playAudio(audioFiles.dibujos)}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Asegura que el contenido comienza desde arriba
    alignItems: 'center', // Centra los botones horizontalmente
    backgroundColor: '#BFE0F3',
    paddingLeft: 40, // Ajusta este valor para mover más a la derecha
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backButtonImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  titleContainer: {

    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 30,
    color: '#0006A6', 
    fontWeight: 'bold',
  },
  buttonContainer: {
    top: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30, // Aumenta el espacio vertical entre los botones
  },
  button: {
    width: 300, // Aumenta el ancho del botón
    height: 150, // Aumenta la altura del botón
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});

export default Ciencias;