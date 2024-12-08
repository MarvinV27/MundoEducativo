import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Sound from "react-native-sound";
import FastImage from 'react-native-fast-image';
import ImageViewing from 'react-native-image-viewing';
import homeIcon from '../../assets/img/home.png';
import progresoIcon from '../../assets/img/progreso.png';
import userIcon from '../../assets/img/user.png';


// Configurar la ruta de los archivos de audio

const voiceGuide = {
  mainScreen: new Sound('vozmenu.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  admincuenta: new Sound('admincuenta.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  notificaciones: new Sound('notificaciones.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  cuentasconectadas: new Sound('cuentasconectadas.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  nuevacuenta: new Sound('nuevacuenta.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  cerrarsesion: new Sound('cerrarsesion.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
};

const playVoiceGuide = (audio) => {
  audio.play((success) => {
    if (!success) {
      console.log('Sound playback failed');
    }
  });
};

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const [faqsModalVisible, setFaqsModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const [activeTab, setActiveTab] = useState("home");
  // Tab activo
  const navbarTranslateY = useRef(new Animated.Value(0)).current;


  const manualImages = [
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual1.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual2.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual3.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual4.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual5.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual6.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual7.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual8.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual9.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual10.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual11.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual12.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/Manual13.png')).uri },
    // Agrega más imágenes del manual según sea necesario
  ];

  const faqsImages = [
    { uri: Image.resolveAssetSource(require('../../assets/img/F1.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/F2.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/F3.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/F4.png')).uri },
    { uri: Image.resolveAssetSource(require('../../assets/img/F5.png')).uri },
    // Agrega más imágenes de FAQs según sea necesario
  ];

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth().currentUser;
      if (user) {
        const userQuerySnapshot = await firestore().collection('Usuario').where('email', '==', user.email).get();
        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0];
          setUserName(userDoc.data().name);
        }
      }
    };
    fetchUserName();
  }, []);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Buenos días 🌞';
    } else if (currentHour < 18) {
      return 'Buenas tardes 🌄';
    } else {
      return 'Buenas noches🌙';
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const buttonImages = [
    require('../../assets/img/1.png'),
    require('../../assets/img/2.png'),
    require('../../assets/img/3.png'),
    require('../../assets/img/4.png'),
    require('../../assets/img/arte.png'),
    require('../../assets/img/balle.gif'),
    require('../../assets/img/manual.png'),
    require('../../assets/img/configuracion.png'),
  ];

  const navigateToScreen = (screenName) => {
    closeModal(); // Cerrar el modal antes de navegar
    navigation.navigate(screenName);
  };

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    navigation.navigate(tabName);
  };

  React.useEffect(() => {
    Animated.timing(navbarTranslateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  

  const openModal = () => {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 100,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  const openImageModal = () => {
    setImageModalVisible(true);
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
  };

  const openManualModal = () => {
    setManualModalVisible(true);
  };

  const closeManualModal = () => {
    setManualModalVisible(false);
  };

  const openFaqsModal = () => {
    setFaqsModalVisible(true);
  };

  const closeFaqsModal = () => {
    setFaqsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslateY }] }]}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateToScreen("HomeScreen")}
        >
          <Image
            source={homeIcon}
            style={styles.navIcon}
          />
          <Text style={activeTab === "home" ? styles.activeTabText : styles.tabText}>
            Inicio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateToScreen("ProgresoE")}
        >
          <Image
            source={progresoIcon}
            style={styles.navIcon}
          />
          <Text style={activeTab === "settings" ? styles.activeTabText : styles.tabText}>
            Progreso
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateToScreen("ConfC")}
        >
          <Image
            source={userIcon}
            style={styles.navIcon}
          />
          <Text style={activeTab === "profile" ? styles.activeTabText : styles.tabText}>
            Perfil
          </Text>
        </TouchableOpacity>
      </Animated.View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("Sociales")}>
            <FastImage source={buttonImages[0]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("Ciencias")}>
            <FastImage source={buttonImages[1]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("Matematica")}>
            <FastImage source={buttonImages[2]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("Lenguaje")}>
            <FastImage source={buttonImages[3]} style={styles.buttonImage} />
          </TouchableOpacity>
         
        </View>
        <View style={styles.voiceButtonContainer}>
          <TouchableOpacity style={styles.voiceButton} onPress={() => playVoiceGuide(voiceGuide.mainScreen)}>
            <Text style={styles.voiceButtonText}>🔊</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.LogoMundo}>
      <Image source={require('../../assets/img/Logo.png')} style={styles.LogoMundo} />

      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <TouchableOpacity style={styles.tab} onPress={openModal}>
        <Image source={buttonImages[7]} style={styles.tabImage} />
      </TouchableOpacity>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent, { opacity, transform: [{ translateY }] }]}>
            <Text style={styles.accountText}>Configuración</Text>
            <View style={styles.modalItemContainer}>
              <Text style={styles.modalItem} onPress={handleLogout}>Cerrar sesión</Text>
              <TouchableOpacity onPress={() => playVoiceGuide(voiceGuide.cerrarsesion)}>
                <Text style={styles.audioButton}>🔊</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalItemContainer}>
              <Text style={styles.modalItem} onPress={openFaqsModal}>FAQs</Text>
            </View>
            <View style={styles.modalItemContainer}>
              <Text style={styles.modalItem} onPress={openManualModal}>Manual de Usuario</Text>
            </View>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
      <ImageViewing
        images={manualImages}
        imageIndex={currentImageIndex}
        visible={manualModalVisible}
        onRequestClose={closeManualModal}
      />
      <ImageViewing
        images={faqsImages}
        imageIndex={currentImageIndex}
        visible={faqsModalVisible}
        onRequestClose={closeFaqsModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#bbd9ed', // Color de fondo
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonsContainer: {
    flexDirection: 'column', // Imágenes apiladas
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 65,
    padding: 5,
  },
  button: {
    width: 250,
    height: 100, // Ajusta la altura
    marginBottom: 30,
    marginTop: 25,
    marginRight: 95,
  },
  buttonImage: {
    width: '140%',
    height: '140%',
    resizeMode: 'contain',
    
  },
  tab: {
    position: 'absolute',
    top: 15,
    left: 1,
    backgroundColor: 'transparent', // Cambiar a transparente
    padding: 10,
    borderRadius: 50,
  },
  tabImage: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  userInfoContainer: {
    position: 'absolute',
    top: 26,
    left: 65,
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: 20,
    color: '#253367',
    fontFamily: 'OpenSans-Bold',
  },
  greeting: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'OpenSans-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center', // Centrar el contenido del modal
    alignItems: 'center', // Centrar el contenido del modal
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: 300, // Ajustar el ancho del modal
    backgroundColor: '#A3E1EF', // Color de fondo del modal
    padding: 20,
    borderRadius: 10,
    alignItems: 'center', // Centrar el contenido del modal
  },
  modalImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  modalItemContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // Ajustar el ancho del contenedor de elementos
  },
  modalItem: {
    fontSize: 15,
    flex: 1,
    fontFamily: 'Poppins-Regular',
  },
  audioButton: {
    fontSize: 24,
    color: '#000',
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
    fontFamily: 'Poppins-Regular',
  },
  accountText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
  },
  voiceButtonContainer: {
    position: 'absolute',
    bottom: 75,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButton: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 25,
    elevation: 5,
  },
  voiceButtonText: {
    fontSize: 30,
  },
  imageModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  largeImage: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  closeImageButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'blue',
    fontFamily: 'Poppins-Regular',
  },
  manualModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  manualScrollContainer: {
    alignItems: 'center',
  },
  manualImage: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  closeManualButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'blue',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  tabText: {
    fontSize: 12,
    color: '#555',
  },
  activeTabText: {
    fontSize: 12,
    color: '#007AFF',
  },
  LogoMundo: {
    position: 'absolute',
    top: 0,
    right: -2,
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Home;