import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RadioButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Signin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setShowPassword(false);
    }, [])
  );

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !userType) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'El email no es válido');
      return;
    }

    if (password.length <= 5) {
      Alert.alert('Error', 'La contraseña debe tener más de 5 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      const counterDoc = firestore().collection('metadata').doc('counters');
      await firestore().runTransaction(async (transaction) => {
        const doc = await transaction.get(counterDoc);
        if (!doc.exists) {
          transaction.set(counterDoc, { userCount: 0 });
          throw new Error('El documento de contador no existía, se ha inicializado. Por favor, intente de nuevo.');
        }

        const newCount = doc.data().userCount + 1;
        transaction.update(counterDoc, { userCount: newCount });

        const formattedUserId = `UsuarioId${newCount}`;

        const userData = {
          id: formattedUserId,
          name,
          email,
          userType,
        };

        if (userType === 'estudiante') {
          userData.progreso = {
            ciencia: {
              leccionesCompletadas: 0,
              
            },
            sociales: {
              leccionesCompletadas: 0,
              
            },
            lenguaje: {
              leccionesCompletadas: 0,
              
            },
            matematica: {
              leccionesCompletadas: 0,
              
            },
          };
        }

        await firestore().collection('Usuario').doc(formattedUserId).set(userData);
      });

      Alert.alert('Éxito', 'Usuario registrado correctamente');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUserType('');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'El email ya está en uso');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/img/delfi.png')} style={styles.image} />
      <LinearGradient
        colors={['#F6F6F6', '#50BFFD']}
        locations={[0, 6]}
        style={styles.gradientBox}
      >
        <Text style={styles.title}>Registro</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={setName}
            autoCapitalize="characters"
          />
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
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
          />
          <View style={styles.radioContainer}>
            <View style={styles.radioButton}>
              <RadioButton
                value="estudiante"
                status={userType === 'estudiante' ? 'checked' : 'unchecked'}
                onPress={() => setUserType('estudiante')}
              />
              <Image source={require('../../../assets/img/Estudiante.png')} style={styles.radioButtonImage} />
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="padre"
                status={userType === 'padre' ? 'checked' : 'unchecked'}
                onPress={() => setUserType('padre')}
              />
              <Image source={require('../../../assets/img/Padre.png')} style={styles.radioButtonImage} />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Image source={require('../../../assets/img/Registrarse.png')} style={styles.registerButtonImage} />
        </TouchableOpacity>
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
    marginBottom: -10,
    marginTop: -50, // Move the input container higher
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
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensure the buttons are on opposite sides
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonImage: {
    width: 100, // Increase the width of the button image
    height: 80, // Increase the height of the button image
    marginLeft: 10,
    resizeMode: 'contain',
  },
  registerButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonImage: {
    width: 250, // Adjust the size of the button image
    height: 70,
    resizeMode: 'contain',
  },
  image: {
    width: 220, // Increase the size of the image
    height: 206.96,
    position: 'absolute',
    top: 60, // Set the y position
    left: 110, // Set the x position
    zIndex: 0, // Ensure the image is behind the gradient box
  },
});

export default Signin;