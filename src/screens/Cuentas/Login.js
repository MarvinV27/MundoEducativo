import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setShowPassword(false);
    }, [])
  );

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      // Buscar el documento del usuario en Firestore usando el correo electrónico
      const userQuerySnapshot = await firestore().collection('Usuario').where('email', '==', email).get();
      if (!userQuerySnapshot.empty) {
        const userDoc = userQuerySnapshot.docs[0];
        const userType = userDoc.data().userType;
        Alert.alert('Éxito', `Inicio de sesión exitoso. Bienvenido ${userDoc.data().name}`);
        if (userType === 'padre') {
          navigation.navigate('PadresScreen');
        } else if (userType === 'estudiante') {
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Error', 'Tipo de usuario desconocido');
        }
      } else {
        Alert.alert('Error', 'Usuario no encontrado en la base de datos');
      }

      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'Usuario no encontrado');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Contraseña incorrecta');
      } else if (error.code === 'auth/network-request-failed') {
        Alert.alert('Error', 'Sin conexión a Internet');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleNavigateToSignup = () => {
    setEmail('');
    setPassword('');
    navigation.navigate('Signin');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/img/delfi.png')} style={styles.image} />
      <LinearGradient
        colors={['#F6F6F6', '#50BFFD']}
        locations={[0, 6]}
        style={styles.gradientBox}
      >
        <Text style={styles.title}>Inicio de Sesión</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleNavigateToSignup}>
            <Text style={styles.signupText}>
              ¿No tienes cuenta?{'\n'}
              <Text style={styles.signupTextBold}>Regístrate</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Image source={require('../../../assets/img/Iniciarsesion.png')} style={styles.loginButtonImage} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#A3E1EF',
  },
  gradientBox: {
    position: 'absolute',
    top: 191,
    left: 0,
    borderRadius: 40,
    padding: 20,
    width: 410,
    height: 614,
    zIndex: 1, // Ensure the gradient box is above the image
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    width: 206,
    height: 96,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  inputPassword: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showPasswordButton: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#456668', // Change the text color
    fontFamily: 'Poppins-SemiBold', // Change the font to Poppins-SemiBold
    fontWeight: '600', // Ensure the text is semi-bold
    marginLeft: 20, // Add some margin to the left
  },
  signupTextBold: {
    fontFamily: 'Poppins-SemiBold', // Ensure the "Regístrate" text is bold
  },
  image: {
    width: 220, // Increase the size of the image
    height: 206.96,
    position: 'absolute',
    top: 60, // Set the y position
    left: 110, // Set the x position
    zIndex: 0, // Ensure the image is behind the gradient box
  },
  loginButton: {
    alignSelf: 'flex-end', // Align the button to the right
  },
  loginButtonImage: {
    width: 250, // Increase the width of the button image
    height: 70, // Increase the height of the button image
    resizeMode: 'contain',
  },
});

export default Login;