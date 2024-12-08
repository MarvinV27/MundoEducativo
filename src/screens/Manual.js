import React from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const ManualScreen = () => {
  // Array de referencias locales de las imágenes
  const images = [
    require('../../assets/img/Manual1.png'),
    require('../../assets/img/Manual2.png'),
    require('../../assets/img/Manual3.png'),
    require('../../assets/img/Manual4.png'),
    require('../../assets/img/Manual5.png'),
    require('../../assets/img/Manual6.png'),
    require('../../assets/img/Manual7.png'),
    require('../../assets/img/Manual8.png'),
    require('../../assets/img/Manual9.png'),
    require('../../assets/img/Manual10.png'),
    require('../../assets/img/Manual11.png'),
    require('../../assets/img/Manual12.png'),
    require('../../assets/img/Manual13.png'),
    // Agrega más referencias de imágenes según sea necesario
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {images.map((image, index) => (
        <Image
          key={index}
          source={image}
          style={styles.image}
          resizeMode="contain"
        />
      ))}
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
    top: -130,
    marginBottom: -250,
  },
});

export default ManualScreen;