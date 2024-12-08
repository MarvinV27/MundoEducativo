import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity, Dimensions, Alert } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
// Asegúrate de importar las imágenes correctamente desde tu carpeta de assets
const image1 = require('../../../assets/img/Comunidad.png');

const infographicProfessions = require('../../../assets/img/profesiones.png');
const infographicTrades = require('../../../assets/img/oficios.png');

const videos = [
  { id: "PjZqwlHg3Is", title: "Comunidades" },
  // Agrega más videos con sus títulos aquí
];

const L3sociales = () => {
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
          if (userData.progreso && userData.progreso.sociales && userData.progreso.sociales.leccionesCompletadasL3) {
            Alert.alert('Información', 'Esta lección ya ha sido completada.');
            
          } else {
            await userDoc.update({
              'progreso.sociales.leccionesCompletadas': firestore.FieldValue.increment(1),
              'progreso.sociales.leccionesCompletadasL3': true // Marcar la lección como completada
            });
            Alert.alert(
              'Éxito',
              'Lección 3 completada exitosamente.',
              [
                { text: 'OK' },
                { text: 'Siguiente Lección', onPress: () => navigation.navigate('L4sociales') }
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
      <Text style={styles.title}>La Comunidad</Text>
      
      <View style={styles.imageContainer}>
        <Image source={image1} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>¿Qué es una comunidad?</Text>
        <Text style={styles.text1}>
        Una comunidad es un grupo de personas que viven en el mismo lugar o comparten intereses comunes. Las personas en una comunidad se ayudan entre sí y trabajan juntas para hacer que su entorno sea mejor.
        </Text>
        <Text style={styles.text1}>
        La comunidad puede estar formada por todos los habitantes de un vecindario, una ciudad o incluso un grupo de personas que se reúnen en la iglesia o en una actividad común.
        </Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Tipos de comunidad</Text>
    </View>

    <View style={styles.textBox}>
        <Text style={styles.text}>Comunidad vecinal</Text>
        <Text style={styles.text1}>
        Es la comunidad formada por las personas que viven en una misma zona o barrio. Todos comparten el espacio donde viven (calles, parques, supermercados) y pueden ayudarse unos a otros (por ejemplo, los vecinos se cuidan, se saludan, se prestan ayuda).
        </Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Comunidad escolar</Text>
        <Text style={styles.text1}>
        Es la comunidad dentro de la escuela. Está formada por los estudiantes, maestros, directores, personal administrativo y familias. Todos trabajan juntos para que el ambiente escolar sea seguro, agradable y de aprendizaje.
        </Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Comunidad religiosa</Text>
        <Text style={styles.text1}>
        Es un grupo de personas que se reúnen por sus creencias religiosas. Se ayudan a mantener su fe y a practicar sus costumbres y tradiciones. Pueden compartir oraciones, actividades y festividades.
        </Text>
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


export default L3sociales;