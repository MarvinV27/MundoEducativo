import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity, Dimensions,Alert } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
// Asegúrate de importar las imágenes correctamente desde tu carpeta de assets
const image1 = require('../../../assets/img/Familia.png');
const image2 = require('../../../assets/img/Mamá.png');
const image3 = require('../../../assets/img/Papá.png');
const image4 = require('../../../assets/img/Abuelos.png');
const image5 = require('../../../assets/img/Hermanos.png');
const image6 = require('../../../assets/img/Tios.png');


const videos = [
  { id: "uTccLBK3RJ0", title: "Cada familia es maravillosa" },
  // Agrega más videos con sus títulos aquí
];

const L2sociales = () => {
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
          if (userData.progreso && userData.progreso.sociales && userData.progreso.sociales.leccionesCompletadasL2) {
            Alert.alert('Información', 'Esta lección ya ha sido completada.');
            
          } else {
            await userDoc.update({
              'progreso.sociales.leccionesCompletadas': firestore.FieldValue.increment(1),
              'progreso.sociales.leccionesCompletadasL2': true // Marcar la lección como completada
            });
            Alert.alert(
              'Éxito',
              'Lección 2 completada exitosamente.',
              [
                { text: 'OK' },
                { text: 'Siguiente Lección 3', onPress: () => navigation.navigate('L3sociales') }
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
      <Text style={styles.title}>La Familia y sus Miembros</Text>
      
      <View style={styles.imageContainer}>
        <Image source={image1} style={styles.image} />

      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>¿Qué es una familia?</Text>
        <Text style={styles.text1}>
        Una familia es un grupo de personas que se cuidan, se quieren y viven juntas. Una familia puede estar formada por diferentes personas que comparten un hogar y se apoyan mutuamente. 
        </Text>
        <Text style={styles.text1}>Ejemplos de cómo las familias pueden ser diferentes: Algunas familias tienen mamá y papá, otras pueden tener un solo papá o una sola mamá, y otras pueden ser formadas por abuelos, tíos, o incluso amigos cercanos.</Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Miembros de la familia</Text>
    </View>

    <View style={styles.textBox}>
        <Text style={styles.text}>Mamá</Text>
        <Text style={styles.text1}>
        Es la persona que generalmente cuida, alimenta, enseña y da amor a los hijos.
        </Text>
        <Text style={styles.text}>Rol de mamá en la familia</Text>
        <Text style={styles.text1}>
        Puede ser quien cocina, limpia la casa, cuida a los niños, les enseña cosas importantes, y los apoya emocionalmente.
        </Text>
        <Image source={image2} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Papá</Text>
        <Text style={styles.text1}>
        El papá también cuida, trabaja para proveer para la familia y da apoyo emocional.
        </Text>
        <Text style={styles.text}>Rol de papá en la familia</Text>
        <Text style={styles.text1}>
        Puede ir a trabajar, ayudar con las tareas de la casa, y también ser quien apoya en momentos difíciles.
        </Text>
        <Image source={image3} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Hermanos</Text>
        <Text style={styles.text1}>
        Los niños que comparten los mismos padres. Pueden ser mayores o menores.
        </Text>
        <Text style={styles.text}>Rol de los hermanos en la familia</Text>
        <Text style={styles.text1}>
        Los hermanos a menudo juegan, aprenden juntos, se ayudan mutuamente y también comparten responsabilidades.
        </Text>
        <Image source={image5} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Abuelos</Text>
        <Text style={styles.text1}>
        Son los padres de mamá o papá. Ellos pueden ser una gran fuente de sabiduría y amor.
        </Text>
        <Text style={styles.text}>Rol de los abuelos en la familia</Text>
        <Text style={styles.text1}>
        A menudo cuidan a los niños cuando los padres trabajan, dan consejos sabios y cuentan historias.
        </Text>
        <Image source={image4} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Tios</Text>
        <Text style={styles.text1}>
        Son los hermanos de mamá o papá. Pueden tener una relación especial con los sobrinos.
        </Text>
        <Text style={styles.text}>Rol de los tios en la familia</Text>
        <Text style={styles.text1}>
        A veces los tíos visitan, organizan celebraciones, ayudan a cuidar a los niños y brindan apoyo adicional.
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


export default L2sociales;