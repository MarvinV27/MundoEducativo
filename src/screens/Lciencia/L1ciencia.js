import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity, Dimensions, Alert } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

// Asegúrate de importar las imágenes correctamente desde tu carpeta de assets
const image1 = require('../../../assets/img/Vista.png');
const image2 = require('../../../assets/img/Oido.png');
const image3 = require('../../../assets/img/Gusto.png');
const image4 = require('../../../assets/img/Olfato.png');
const image5 = require('../../../assets/img/Tacto.png');
const infographic5sentidos = require('../../../assets/img/5_sentidos.png');

const videos = [
  { id: "QbVNb2X5Ro4", title: "Video Educativo sobre los 5 Sentidos" },
  // Agrega más videos con sus títulos aquí
];

const L1ciencia = () => {
  const [sentidosModalVisible, setsentidosModalVisible] = useState(false);
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
          if (userData.progreso && userData.progreso.ciencia && userData.progreso.ciencia.leccionesCompletadasL1) {
            Alert.alert('Información', 'Esta lección ya ha sido completada.');
            
          } else {
            await userDoc.update({
              'progreso.ciencia.leccionesCompletadas': firestore.FieldValue.increment(1),
              'progreso.ciencia.leccionesCompletadasL1': true // Marcar la lección como completada
            });
            Alert.alert(
              'Éxito',
              'Lección 1 completada exitosamente.',
              [
                { text: 'OK' },
                { text: 'Siguiente Lección 2', onPress: () => navigation.navigate('L2ciencia') }
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
      <Text style={styles.title}>Los 5 sentidos</Text>
      <View style={styles.textBox}>
        <Text style={styles.text}>Vista</Text>
        <Text style={styles.text1}>
          Este sentido nos permite ver el mundo a nuestro alrededor. Los ojos capturan la luz y envían señales al cerebro, donde se interpretan como imágenes. Nos ayuda a percibir formas, colores, distancia, movimiento y otros aspectos visuales.
        </Text>
        <Image source={image1} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Oído</Text>
        <Text style={styles.text1}>
          A través de los oídos, percibimos los sonidos. El oído capta las ondas sonoras y las convierte en señales eléctricas que el cerebro interpreta como sonidos, desde el ruido ambiental hasta la música y el habla.
        </Text>
        <Image source={image2} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Olfato</Text>
        <Text style={styles.text1}>
          Este sentido nos permite detectar olores. Los receptores olfativos en la nariz capturan partículas químicas en el aire y envían señales al cerebro, que identifica los diferentes olores.
        </Text>
        <Image source={image4} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Gusto</Text>
        <Text style={styles.text1}>
          Este sentido nos permite saborear los alimentos y las bebidas. Las papilas gustativas en la lengua detectan sustancias químicas presentes en lo que consumimos, permitiéndonos experimentar sabores como dulce, salado, ácido, amargo y umami.
        </Text>
        <Image source={image3} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Tacto</Text>
        <Text style={styles.text1}>
          Este sentido nos permite sentir y percibir la textura, la temperatura, la presión y el dolor. Los receptores sensoriales en la piel envían señales al cerebro cuando tocamos algo, permitiéndonos sentir su superficie y otras características.
        </Text>
        <Image source={image5} style={styles.image} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setsentidosModalVisible(true)}>
        <Text style={styles.buttonText}>Ver Infografía</Text>
      </TouchableOpacity>

      {/* Modal para los 5 sentidos */}
      <Modal
        visible={sentidosModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setsentidosModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Image source={infographic5sentidos} style={styles.infographic} resizeMode="contain" />
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => setsentidosModalVisible(false)}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

export default L1ciencia;