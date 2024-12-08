import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const PadresScreen = () => {
  const [childEmail, setChildEmail] = useState('');
  const [childData, setChildData] = useState(null);
  const navigation = useNavigation();

  const handleFetchChildData = async () => {
    if (!childEmail) {
      Alert.alert('Error', 'Por favor, ingrese el correo del hijo');
      return;
    }

    try {
      // Obtener el documento del hijo por correo electrónico
      const childQuerySnapshot = await firestore().collection('Usuario').where('email', '==', childEmail).get();
      if (!childQuerySnapshot.empty) {
        const childDoc = childQuerySnapshot.docs[0];
        const childData = childDoc.data();
        setChildData(childData);
      } else {
        Alert.alert('Error', 'No se encontró la cuenta del hijo');
        setChildData(null);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      setChildData(null);
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al cerrar sesión: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ver Progreso del Hijo</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo del hijo"
        value={childEmail}
        onChangeText={setChildEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handleFetchChildData} style={styles.button}>
        <Text style={styles.buttonText}>Ver Progreso</Text>
      </TouchableOpacity>
      {childData && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Nombre: {childData.name}</Text>
          <Text style={styles.progressText}>Progreso en Ciencia:</Text>
          <Text style={styles.progressDetail}>Lecciones Completadas: {childData.progreso.ciencia.leccionesCompletadas} de 4</Text>
          <Text style={styles.progressText}>Progreso en Sociales:</Text>
          <Text style={styles.progressDetail}>Lecciones Completadas: {childData.progreso.sociales.leccionesCompletadas} de 4</Text>
          <Text style={styles.progressText}>Progreso en Lenguaje:</Text>
          <Text style={styles.progressDetail}>Lecciones Completadas: {childData.progreso.lenguaje.leccionesCompletadas} de 4</Text>
          <Text style={styles.progressText}>Progreso en Matemática:</Text>
          <Text style={styles.progressDetail}>Lecciones Completadas: {childData.progreso.matematica.leccionesCompletadas} de 4</Text>
        </View>
      )}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
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
  button: {
    backgroundColor: '#50BFFD',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default PadresScreen;