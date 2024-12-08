import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';

const DibujosC = () => {
  const navigation = useNavigation();

  // Configurar el archivo de audio
  const audioFile = new Sound('eligedibujar.mp3', Sound.MAIN_BUNDLE, (error) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.audioButtonContainer}>
        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontFamily: 'Poppins-Regular' }} >¡Hola! Elige si quieres dibujar o colorear</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DrawingScreen')}>
          <Text style={styles.buttonText}>Dibujar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ColorearScreen')}>
          <Text style={styles.buttonText}>Colorear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#BFE0F3',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: '#000',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#57C1E6',
    width: 150,
    height: 150,
    marginVertical: 20, // Cambiado de 15 a 10
    marginHorizontal: 10, // Añadido
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  audioButtonContainer: {
    position: 'absolute',
    top: 160, // Ajusta esta distancia según sea necesario
    left: '49%',
    transform: [{ translateX: -25 }], // Ajusta el valor para centrar horizontalmente
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

export default DibujosC;