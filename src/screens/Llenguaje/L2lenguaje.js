import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

// Asegúrate de importar las imágenes correctamente desde tu carpeta de assets
const image1 = require('../../../assets/img/A.png');
const image2 = require('../../../assets/img/B.png');
const image3 = require('../../../assets/img/C.png');
const image4 = require('../../../assets/img/D.png');
const image5 = require('../../../assets/img/E.png');
const image6 = require('../../../assets/img/F.png');

const image7 = require('../../../assets/img/G.png');
const image8 = require('../../../assets/img/H.png');
const image9 = require('../../../assets/img/I.png');
const image10 = require('../../../assets/img/J.png');
const image11 = require('../../../assets/img/K.png');
const image12 = require('../../../assets/img/L.png');

const image13 = require('../../../assets/img/M.png');
const image14 = require('../../../assets/img/N.png');
const image15 = require('../../../assets/img/Ñ.png');
const image16 = require('../../../assets/img/O.png');
const image17 = require('../../../assets/img/P.png');
const image18 = require('../../../assets/img/Q.png');
const image19 = require('../../../assets/img/R.png');

const image20 = require('../../../assets/img/S.png');
const image21 = require('../../../assets/img/T.png');
const image22 = require('../../../assets/img/U.png');
const image23 = require('../../../assets/img/V.png');
const image24 = require('../../../assets/img/W.png');
const image25 = require('../../../assets/img/X.png');

const image26 = require('../../../assets/img/Y.png');
const image27 = require('../../../assets/img/Z.png');

const videos = [
  { id: "czMmVllGDZ4", title: "Las letras del abecedario" },
  // Agrega más videos con sus títulos aquí
];

const L1lenguaje = () => {
  const [playing, setPlaying] = useState({});
  const navigation = useNavigation();

  const onStateChange = useCallback((state, videoId) => {
    if (state === 'ended') {
      setPlaying(prev => ({ ...prev, [videoId]: false }));
    }
  }, []);

  const handleCompleteLesson = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        const userQuerySnapshot = await firestore().collection('Usuario').where('email', '==', user.email).get();
        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0].ref;
          const userData = userQuerySnapshot.docs[0].data();

          // Verificar si la lección ya ha sido completada
          if (userData.progreso && userData.progreso.lenguaje && userData.progreso.lenguaje.leccionesCompletadasL2) {
            Alert.alert('Información', 'Esta lección ya ha sido completada.');
            
          } else {
            await userDoc.update({
              'progreso.lenguaje.leccionesCompletadas': firestore.FieldValue.increment(1),
              'progreso.lenguaje.leccionesCompletadasL2': true // Marcar la lección como completada
            });
            Alert.alert(
              'Éxito',
              'Lección 2 completada exitosamente.',
              [
                { text: 'OK' },
                { text: 'Siguiente Lección 3', onPress: () => navigation.navigate('L3lenguaje') }
              ]
            );
          }
        } else {
          Alert.alert('Error', 'No se encontró el documento del usuario.');
        }
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al actualizar la lección: ' + error.message);
      }
    } else {
      Alert.alert('Error', 'No se encontró el usuario.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../../assets/img/btnatras.png')} style={styles.backButtonImage} />
      </TouchableOpacity>

      <Text style={styles.title}>Las vocales</Text>
      
      <View style={styles.imageContainer}>
        {/* Puedes agregar imágenes aquí si es necesario */}
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>¿Qué es el abecedario?</Text>
        <Text style={styles.text1}>
      
El abecedario es el conjunto de letras que componen el alfabeto de un idioma. En el caso del idioma español, el abecedario consta de 27 letras, que se utilizan para formar todas las palabras. </Text>
        </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Las letras del abecedario son</Text>
      </View> 

      <View style={styles.textBox}>
        <Image source={image1} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image2} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image3} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image4} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image5} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image6} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image7} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image8} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image9} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image10} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image11} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image12} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image13} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image14} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image15} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image16} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image17} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image18} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image19} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image20} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image21} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image22} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image23} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image24} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image25} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image26} style={styles.image} />
      </View> 
      <View style={styles.textBox}>
        <Image source={image27} style={styles.image} />
      </View> 

      {/* Video de YouTube */}
      <View style={styles.videoSection}>
        {videos.map((video, index) => (
          <View key={index} style={styles.videoContainer}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <YoutubeIframe
              height={Dimensions.get('window').height * 0.5} // 50% del alto de la pantalla
              width={Dimensions.get('window').width * 0.9} // 90% del ancho de la pantalla
              videoId={video.id}
              play={playing[video.id] || false}
              onChangeState={(state) => onStateChange(state, video.id)}
              webViewProps={{
                allowsFullscreenVideo: true,
              }}
            />
          </View>
        ))}
      </View>
      {/* Botón Finalizar Lección */}
      <TouchableOpacity style={styles.completeButton} onPress={handleCompleteLesson}>
        <Text style={styles.completeButtonText}>Finalizar Lección</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e6dcf8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  title: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    backgroundColor: '#ffffff',
    borderRadius: 33,
    padding: 10,  
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  textBox: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  text1: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  infographic: {
    width: '100%',
    height: 700,
  },
  button: {
    backgroundColor: '#908cd6', // Color de fondo de los botones
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // Espacio entre botones
    marginBottom: 10, // Espacio inferior para evitar que toquen otros elementos
  },
  buttonText: {
    color: '#ffffff', // Color del texto del botón
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  videoSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  videoContainer: {
    marginBottom: -200, // Espacio entre videos
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 16,
    marginBottom: 5, // Espacio pequeño entre el título y el video
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  completeButton: {
    backgroundColor: '#4CAF50', // Color de fondo del botón de finalizar lección
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  completeButtonText: {
    color: '#ffffff', // Color del texto del botón de finalizar lección
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default L1lenguaje;