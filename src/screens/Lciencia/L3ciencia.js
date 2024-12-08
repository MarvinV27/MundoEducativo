import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity, Dimensions,Alert } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


// Asegúrate de importar las imágenes correctamente desde tu carpeta de assets
const image1 = require('../../../assets/img/Animales.png');
const image2 = require('../../../assets/img/mamiferos.png');
const image3 = require('../../../assets/img/aves.png');
const image4 = require('../../../assets/img/reptiles.png');
const image5 = require('../../../assets/img/peces.png');
const image6 = require('../../../assets/img/anfibios.png');


const videos = [
  { id: "JOipLXnlZZ8", title: "Clasificación de los animales" },
  // Agrega más videos con sus títulos aquí
];

const L1ciencia = () => {
  
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
          if (userData.progreso && userData.progreso.ciencia && userData.progreso.ciencia.leccionesCompletadasL3) {
            Alert.alert('Información', 'Esta lección ya ha sido completada.');
            
          } else {
            await userDoc.update({
              'progreso.ciencia.leccionesCompletadas': firestore.FieldValue.increment(1),
              'progreso.ciencia.leccionesCompletadasL3': true // Marcar la lección como completada
            });
            Alert.alert(
              'Éxito',
              'Lección 3 completada exitosamente.',
              [
                { text: 'OK' },
                { text: 'Siguiente Lección 4', onPress: () => navigation.navigate('L4ciencia') }
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
      <Text style={styles.title}> Los Animales</Text>
      <Image source={image1} style={styles.image} />
      
        <View style={styles.textBox}>
        <Text style={styles.text}>¿Qué ¿Qué son los animales?</Text>
        <Text style={styles.text1}>
        Los animales son seres vivos que se mueven, se alimentan, y se reproducen.
        </Text>
        <Text style={styles.text1}>
        Los animales pueden ser domésticos (como perros y gatos) o salvajes (como leones y elefantes).
        </Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Clasificación de los animales</Text>
        </View>

        <View style={styles.textBox}>
        <Text style={styles.text}>Mamíferos</Text>
        <Text style={styles.text1}>
        Tienen pelo y nacen de la madre (ejemplo: perros, gatos).
        </Text>
        <Image source={image2} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Aves</Text>
        <Text style={styles.text1}>
        Tienen plumas y ponen huevos (ejemplo: pájaros, gallinas).
        </Text>
        <Image source={image3} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Reptiles</Text>
        <Text style={styles.text1}>
        Tienen piel escamosa y la mayoría pone huevos (ejemplo: serpientes, tortugas).
        </Text>
        <Image source={image4} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Peces</Text>
        <Text style={styles.text1}>
        Viven en el agua y tienen aletas (ejemplo: peces, tiburones).
        </Text>
        <Image source={image5} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Anfibios</Text>
        <Text style={styles.text1}>
        Pueden vivir tanto en agua como en tierra (ejemplo: ranas, salamandras).
        </Text>
        <Image source={image6} style={styles.image} />
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
    width: 200,
    height: 200,
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

export default L1ciencia;