import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

// Asegúrate de importar las imágenes correctamente desde tu carpeta de assets
const image1 = require('../../../assets/img/Cuento.png');
const image2 = require('../../../assets/img/Fabula.png');

const videos = [
  { id: "AtWTCY2e1WE", title: "Video Educativo Cuentos y Fábulas" },
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
          if (userData.progreso && userData.progreso.lenguaje && userData.progreso.lenguaje.leccionesCompletadasL4) {
            Alert.alert('Información', 'Esta lección ya ha sido completada.');
            
          } else {
            await userDoc.update({
              'progreso.lenguaje.leccionesCompletadas': firestore.FieldValue.increment(1),
              'progreso.lenguaje.leccionesCompletadasL4': true // Marcar la lección como completada
            });
            Alert.alert(
              'Éxito',
              'Lección 4 completada exitosamente.',
              [
                { text: 'OK' },
                { text: 'Volver a Materias', onPress: () => navigation.navigate('HomeScreen') }
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

      <Text style={styles.title}>Cuentos y Fabulas</Text>
      
      <View style={styles.imageContainer}>
        {/* Puedes agregar imágenes aquí si es necesario */}
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>¿Qué es un cuento?</Text>
        <Text style={styles.text1}>Un cuento es una narración breve, escrita o hablada, que cuenta una historia con personajes y eventos, generalmente con una estructura simple y un enfoque en un solo tema o conflicto. Los cuentos pueden variar en longitud, pero suelen ser más cortos que las novelas. Están diseñados para entretener, educar o transmitir un mensaje moral.</Text>
        <Text style={styles.text}>Ejemplo de un cuento</Text>
        <Text style={styles.text1}>El Ratón y el León:

Había una vez un pequeño ratón que vivía en un agujero en el suelo de un gran bosque. Un día, mientras corría por el campo, se encontró con un enorme león dormido bajo un árbol. El ratón, curioso, se acercó para mirarlo de cerca.

De repente, el león se despertó y, al ver al ratón cerca, se enfureció. Con un rugido poderoso, el león atrapó al ratón con su gran pata y dijo:

— ¿Qué haces aquí, diminuto ratón? ¿Acaso no sabes que este es mi territorio?

El ratón, temblando de miedo, respondió:

— Lo siento mucho, señor León. No quise molestar. Por favor, déjame ir y te prometo que no volveré a molestarte.

El león, sorprendido por la valentía y humildad del ratón, decidió soltarlo. Dijo:

— Está bien, te dejaré ir esta vez. Pero si alguna vez vuelves a molestarme, no seré tan amable.

El ratón agradeció y se alejó rápidamente.

Pocos días después, el león quedó atrapado en una red de cazadores. Intentó liberarse, pero la red estaba muy fuerte. El león rugía desesperado, pero nadie venía en su ayuda. 

De repente, el pequeño ratón apareció. Recordando la bondad del león, decidió ayudar. Se acercó a la red y comenzó a roer las cuerdas con sus pequeños dientes afilados. Trabajó con rapidez y determinación hasta que, finalmente, logró romper la red y liberar al león.

El león, ahora libre, se volvió hacia el ratón y dijo:

— ¡Nunca pensé que alguien tan pequeño como tú podría ayudarme tanto! Gracias, pequeño amigo. 

Desde aquel día, el león y el ratón se convirtieron en grandes amigos. El león aprendió que incluso los más pequeños pueden ser de gran ayuda, y el ratón aprendió que la bondad siempre regresa.

Moral:
La bondad nunca es en vano y todos, sin importar su tamaño, tienen algo que ofrecer.</Text>
        <Image source={image1} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>¿Qué es una Fabula?</Text>
        <Text style={styles.text1}>Una fábula es un tipo de relato breve que tiene una enseñanza o moraleja al final. Las fábulas suelen ser historias protagonizadas por animales que hablan y actúan como seres humanos. A través de estas historias, se transmiten lecciones sobre comportamientos, valores y sabiduría moral.</Text>
        <Text style={styles.text}>Ejemplo de Fabula</Text>
        <Text style={styles.text1}>La Cigarra y la Hormiga
Historia: Durante el verano, una cigarra canta alegremente y disfruta del sol. Mientras tanto, una hormiga trabaja arduamente, recogiendo comida y almacenándola para el invierno. La cigarra se burla de la hormiga, diciendo que debería disfrutar del verano en lugar de trabajar tanto.

Cuando llega el invierno, la cigarra está hambrienta y sin refugio. Va a la casa de la hormiga y le pide comida. La hormiga le responde:

— ¿Por qué no trabajaste y te preparaste para el invierno como yo te sugerí?

La cigarra, arrepentida, le dice:

— Yo disfruté del verano y no pensé en el futuro. Ahora entiendo la importancia de prepararse.

Moraleja: Es importante trabajar y prepararse para el futuro en lugar de solo disfrutar del presente.</Text>
        <Image source={image2} style={styles.image} />
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