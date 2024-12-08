import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Sound from 'react-native-sound';

const Lsociales = () => {
  const navigation = useNavigation();

  const buttonImages = [
    require('../../../assets/img/L1.png'),
    require('../../../assets/img/L2.png'),
    require('../../../assets/img/L3.png'),
    require('../../../assets/img/L4.png'),
  ];

  // Configurar el archivo de audio
  const audioFile = new Sound('seleccionaleccion.mp3', Sound.MAIN_BUNDLE, (error) => {
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

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../../assets/img/btnatras.png')} style={styles.backButtonImage} />
      </TouchableOpacity>

      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Lecciones</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("L1sociales")}>
          <Image source={buttonImages[0]} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("L2sociales")}>
          <Image source={buttonImages[1]} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("L3sociales")}>
          <Image source={buttonImages[2]} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("L4sociales")}>
          <Image source={buttonImages[3]} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.audioButtonContainer}>
        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#BFE0F3',
    justifyContent: 'flex-start', // Alinea los elementos desde la parte superior
    alignItems: 'center', // Centra los elementos horizontalmente
    paddingTop: 10, // Agrega un pequeño espacio superior para no estar pegado al borde
  },
  buttonContainer: {
    marginTop: 20, 
    top: 30,
  },
  button: {
    width: 270, // Tamaño más grande del botón
    height: 100, // Tamaño más grande del botón
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 20,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
  audioButtonContainer: {
    position: 'absolute',
    bottom: 20, // Ajusta la distancia desde el fondo de la pantalla
    left: '50%',
    transform: [{ translateX: -25 }], // Centrado horizontal
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
  titleContainer: {
    top: 4,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 30,
    color: '#0006A6', // Color morado
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 15,
    zIndex: 1,
  },
  backButtonImage: {

    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default Lsociales;
