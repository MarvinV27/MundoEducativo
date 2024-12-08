import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

const videos = [
  { id: "YC76paJ1_Zs", title: "Video Educativo Estudios Sociales" },
  
  
  // Agrega más videos con sus títulos aquí
];

const Videosedu = () => {
  const [playing, setPlaying] = useState({});

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

  return (
    <View style={styles.container}>
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.listContainer}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A3E1EF',
  },
  listContainer: {
    paddingVertical: 10, // Espacio alrededor de toda la lista (puedes reducir esto si es necesario)
  },
  videoContainer: {
    marginBottom: -200, // Espacio reducido entre videos
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, // Espacio pequeño entre el título y el video
    textAlign: 'center',
  },
});

export default Videosedu;