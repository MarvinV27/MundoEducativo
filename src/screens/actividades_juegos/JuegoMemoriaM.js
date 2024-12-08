import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import Sound from 'react-native-sound';
import { useNavigation } from '@react-navigation/native';


const JuegoMemoriaM = () => {
  const navigation = useNavigation();
  const webviewRef = useRef(null);

  const reloadWebView = () => {
    if (webviewRef.current) {
      webviewRef.current.reload();
    }
  };

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../../assets/img/btnatras.png')} style={styles.backButtonImage} />
      </TouchableOpacity>

      <View style={styles.webviewContainer}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ uri: 'file:///android_asset/htmlfiles/JuegoMemoriaM.html' }}
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles.audioButtonContainer}>
        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const audioFile = new Sound('clicktarjetas.mp3', Sound.MAIN_BUNDLE, (error) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#A3E1EF',
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
  webviewContainer: {
    flex: 1,
    width: '100%',
  },
  audioButtonContainer: {
    position: 'absolute',
    top: 750, 
    right: 10, 
    flexDirection: 'row',
  },
  audioButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
    marginRight: 10,
  },
  audioButtonText: {
    fontSize: 30,
    color: '#000',
  },
});

export default JuegoMemoriaM;