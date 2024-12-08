import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity, Dimensions, Alert } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
// Asegúrate de importar las imágenes correctamente desde tu carpeta de assets
const image1 = require('../../../assets/img/Ambiente.png');
const image2 = require('../../../assets/img/Reciclar.png');
const image3 = require('../../../assets/img/Basura.png');
const image4 = require('../../../assets/img/Ahorrar.png');



const videos = [
  { id: "nvUqnpicSd0", title: "Cuidar el medio ambiente" },
  // Agrega más videos con sus títulos aquí
];

const L4sociales = () => {
  const [professionsModalVisible, setProfessionsModalVisible] = useState(false);
  const [tradesModalVisible, setTradesModalVisible] = useState(false);
  const [playing, setPlaying] = useState({});
  const navigation = useNavigation();

  const onStateChange = useCallback((state, videoId) => {
    if (state === 'ended') {
      setPlaying(prev => ({ ...prev, [videoId]: false }));
    }
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <Text style={styles.videoTitle}>{item.title}</Text>
      <YoutubeIframe
        height={Dimensions.get('window').height * 0.5} // 50% del alto de la pantalla
        width={Dimensions.get('window').width * 0.9} // 90% del ancho de la pantalla
        videoId={item.id}
        play={playing[item.id] || false}
        onChangeState={(state) => onStateChange(state, item.id)}
        webViewProps={{
          allowsFullscreenVideo: true,
        }}
      />
    </View>
  );
  const handleCompleteLesson = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        const userQuerySnapshot = await firestore().collection('Usuario').where('email', '==', user.email).get();
        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0].ref;
          const userData = userQuerySnapshot.docs[0].data();

          // Verificar si la lección ya ha sido completada
          if (userData.progreso && userData.progreso.sociales && userData.progreso.sociales.leccionesCompletadasL4) {
            Alert.alert('Información', 'Esta lección ya ha sido completada.');
            
          } else {
            await userDoc.update({
              'progreso.sociales.leccionesCompletadas': firestore.FieldValue.increment(1),
              'progreso.sociales.leccionesCompletadasL4': true // Marcar la lección como completada
            });
            Alert.alert(
              'Éxito',
              'Lección 4 completada exitosamente.',
              [
                { text: 'OK' },
                { text: 'Menu de Materias', onPress: () => navigation.navigate('HomeScreen') }
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
      <Text style={styles.title}>El Medio Ambiente</Text>
      
      <View style={styles.imageContainer}>
        <Image source={image1} style={styles.image} />

      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>¿Qué es el medio ambiente?</Text>
        <Text style={styles.text1}>
        El medio ambiente es todo lo que nos rodea: los árboles, el aire, el agua, los animales, las plantas, el sol, y el cielo. 
        </Text>
        <Text style={styles.text1}>Ejemplos: El parque, el jardín, el mar, los bosques.</Text>
      </View>


    <View style={styles.textBox}>
        <Text style={styles.text}>La importancia de cuidar el medio ambiente</Text>
        <Text style={styles.text1}>
        Los seres humanos necesitamos el medio ambiente para vivir, por eso es importante cuidarlo.
        </Text>
        <Text style={styles.text1}>
        Cuando cuidamos el medio ambiente, estamos protegiendo a los animales, las plantas, y asegurándonos de que el aire y el agua estén limpios.
        </Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Acciones para cuidar el medio ambiente</Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Reciclar</Text>
        <Text style={styles.text1}>
        Usar de nuevo los objetos como papel, plástico y vidrio para hacer otros productos.
        </Text>
        <Image source={image2} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>No tirar basura</Text>
        <Text style={styles.text1}>
        Tirar la basura en su lugar para que las calles y parques se mantengan limpios.
        </Text>
        <Image source={image3} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Ahorrar agua y energía:</Text>
        <Text style={styles.text1}>
        Cerrar el grifo cuando no lo usamos, apagar las luces cuando no las necesitamos.
        </Text>
        <Image source={image4} style={styles.image} />
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


export default L4sociales;