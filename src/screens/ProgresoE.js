import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ProgresoE = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const studentQuerySnapshot = await firestore().collection('Usuario').where('email', '==', user.email).get();
          if (!studentQuerySnapshot.empty) {
            const studentDoc = studentQuerySnapshot.docs[0];
            setStudentData(studentDoc.data());
          } else {
            Alert.alert('Error', 'No se encontró la cuenta del estudiante');
          }
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!studentData) {
    return <Text>No se encontraron datos del estudiante.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progreso del Estudiante</Text>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Nombre: {studentData.name}</Text>
        <Text style={styles.progressText}>Progreso en Ciencia:</Text>
        <Text style={styles.progressDetail}>Lecciones Completadas: {studentData.progreso.ciencia.leccionesCompletadas} de 4</Text>
        <Text style={styles.progressText}>Progreso en Sociales:</Text>
        <Text style={styles.progressDetail}>Lecciones Completadas: {studentData.progreso.sociales.leccionesCompletadas} de 4</Text>
        <Text style={styles.progressText}>Progreso en Lenguaje:</Text>
        <Text style={styles.progressDetail}>Lecciones Completadas: {studentData.progreso.lenguaje.leccionesCompletadas} de 4</Text>
        <Text style={styles.progressText}>Progreso en Matemática:</Text>
        <Text style={styles.progressDetail}>Lecciones Completadas: {studentData.progreso.matematica.leccionesCompletadas} de 4</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.homeButton}>
        <Text style={styles.homeButtonText}>Volver a Home</Text>
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
  homeButton: {
    backgroundColor: '#50BFFD',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: '600',
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

export default ProgresoE;