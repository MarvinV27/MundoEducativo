import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ConfC = () => {
  const navigation = useNavigation();
  const user = auth().currentUser;
  const [displayName, setDisplayName] = useState(user ? user.displayName : '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = firestore().collection('Usuario').where('email', '==', user.email);
          const snapshot = await userDocRef.get();
          
          if (!snapshot.empty) {
            const userData = snapshot.docs[0].data();
            setDisplayName(userData.name);
          } else {
            setError('El documento del usuario no se encuentra.');
          }
        } catch (error) {
          setError('Error al obtener los datos del usuario: ' + error.message);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      if (user) {
        await user.updateProfile({ displayName });

        const userDocRef = firestore().collection('Usuario').where('email', '==', user.email);
        const snapshot = await userDocRef.get();

        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0].ref;
          await userDoc.update({ name: displayName });
          setSuccess('Nombre actualizado exitosamente');
          setError('');
        } else {
          setError('El documento del usuario no se encuentra.');
        }
      }
    } catch (error) {
      setError('Error al actualizar el nombre: ' + error.message);
      setSuccess('');
    }
  };

  const reauthenticate = async (currentPassword) => {
    const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
    try {
      await user.reauthenticateWithCredential(credential);
    } catch (error) {
      setError('Error en la reautenticación: ' + error.message);
      setSuccess('');
      throw error;
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (user) {
        await reauthenticate(currentPassword);
        await user.updatePassword(newPassword);
        setSuccess('Contraseña actualizada exitosamente');
        setError('');
      }
    } catch (error) {
      setError('Error al actualizar la contraseña: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modificar Datos del Usuario</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Actualizar Nombre</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Contraseña Actual"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Actualizar Contraseña</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver Atrás</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#50BFFD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ConfC;