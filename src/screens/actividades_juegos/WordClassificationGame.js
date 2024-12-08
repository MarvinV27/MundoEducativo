import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Sound from 'react-native-sound';
import Drawer from 'react-native-drawer';
import LinearGradient from 'react-native-linear-gradient';

const WordClassificationGame = () => {
  const route = useRoute();
  const { subject } = route.params;
  const navigation = useNavigation();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [words, setWords] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [results, setResults] = useState([]); // Estado para almacenar los resultados de cada palabra

  useEffect(() => {
    const wordData = {
      Sociales: [
        { word: "Presidente", category: "Gobierno" },
        { word: "Ciudad", category: "Geografía" },
        { word: "Democracia", category: "Gobierno" },
        { word: "Montaña", category: "Geografía" },
        { word: "Constitución", category: "Gobierno" },
        { word: "Río", category: "Geografía" },
        { word: "Senado", category: "Gobierno" },
        { word: "Isla", category: "Geografía" },
        { word: "Elecciones", category: "Gobierno" },
        { word: "Desierto", category: "Geografía" },
      ],
      Ciencias: [
        { word: "Célula", category: "Biología" },
        { word: "Planeta", category: "Astronomía" },
        { word: "Gen", category: "Biología" },
        { word: "Galaxia", category: "Astronomía" },
        { word: "Ecosistema", category: "Biología" },
        { word: "Estrella", category: "Astronomía" },
        { word: "Evolución", category: "Biología" },
        { word: "Cometa", category: "Astronomía" },
        { word: "Biodiversidad", category: "Biología" },
        { word: "Meteorito", category: "Astronomía" },
      ],
      Matematica: [
        { word: "Suma", category: "Operaciones" },
        { word: "Ángulo", category: "Geometría" },
        { word: "Resta", category: "Operaciones" },
        { word: "Círculo", category: "Geometría" },
        { word: "Multiplicación", category: "Operaciones" },
        { word: "Triángulo", category: "Geometría" },
        { word: "División", category: "Operaciones" },
        { word: "Cuadrado", category: "Geometría" },
        { word: "Exponente", category: "Operaciones" },
        { word: "Rectángulo", category: "Geometría" },
      ],
      Lenguaje: [
        { word: "Verbo", category: "Gramática" },
        { word: "Adjetivo", category: "Gramática" },
        { word: "Sustantivo", category: "Gramática" },
        { word: "Pronombre", category: "Gramática" },
        { word: "Adverbio", category: "Gramática" },
        { word: "Metáfora", category: "Literatura" },
        { word: "Simil", category: "Literatura" },
        { word: "Personificación", category: "Literatura" },
        { word: "Hipérbole", category: "Literatura" },
        { word: "Aliteración", category: "Literatura" },

      ],
    };

    setWords(wordData[subject]);
    setCurrentWordIndex(0);
    setSelectedCategory(null);
    setFeedback(null);
    setScore({ correct: 0, incorrect: 0 });
    setGameOver(false);
    setResults([]); // Reiniciar los resultados al cambiar de tema
  }, [subject]);

  const handleSelectCategory = (category) => {
    if (selectedCategory === category || feedback !== null) return;

    const currentWord = words[currentWordIndex];
    setSelectedCategory(category);

    if (currentWord.category === category) {
      setFeedback({ message: "¡Correcto!", color: "#B5F087" }); 
      setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
      setResults((prevResults) => [...prevResults, { index: currentWordIndex, correct: true }]);
    } else {
      setFeedback({ message: "Incorrecto", color: "#F08787" });
      setScore((prevScore) => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
      setResults((prevResults) => [...prevResults, { index: currentWordIndex, correct: false }]);
    }
  };

  const handleNextWord = () => {
    if (!selectedCategory) return; // Solo avanzar si se seleccionó una categoría

    setSelectedCategory(null);
    setFeedback(null);

    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setFeedback(`Puntuación final: Correctas: ${score.correct}, Incorrectas: ${score.incorrect}`);
      setGameOver(true);
    }
  };

  const handleBackToMenu = () => {
    navigation.navigate("HomeScreen"); // Navegar de vuelta al menú principal
  };

  const getCategories = () => {
    if (words.length === 0 || currentWordIndex >= words.length) return [];
    
    const currentWord = words[currentWordIndex];
    const allCategories = [...new Set(words.map((word) => word.category))];
    let categories = allCategories.filter(category => category !== currentWord.category);
    categories = categories.slice(0, 1);
    categories.push(currentWord.category);
    return categories;
  };

  const categoriesToShow = getCategories();

  // Configurar el archivo de audio
  const audioFile = new Sound('clasificapalabras.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  });

  const playAudio = () => {
    audioFile.play((success) => {
      if (!success) {
        console.log('Sound playback failed');
      }
    });
  };

  let drawer;

  const openDrawer = () => {
    drawer.open();
  };

  return (
    <Drawer
      ref={(ref) => { drawer = ref; }}
      type="overlay"
      tapToClose={true}
      openDrawerOffset={0.2}
      panCloseMask={0.2}
      closedDrawerOffset={-3}
      styles={drawerStyles}
      side="right"
      tweenHandler={(ratio) => ({
        main: { opacity: (2 - ratio) / 2 }
      })}>
      <View style={styles.container}>
        
        
        <LinearGradient
          colors={['#89A3FF', '#253367']}
          style={styles.gameWrapper}
        >
          <Text style={styles.title}>Clasificación de Palabras: {subject}</Text>

          <View style={styles.wordContainer}>
            <Text style={styles.word}>{words[currentWordIndex]?.word}</Text>
            {feedback && <Text style={[styles.feedback, { color: feedback.color, textShadowColor: 'black', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 }]}>{feedback.message}</Text>}
          </View>
          <View style={styles.categoriesContainer}>
            {categoriesToShow.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && { backgroundColor: feedback?.color },
                ]}
                onPress={() => handleSelectCategory(category)}
                disabled={feedback !== null || selectedCategory !== null}
              >
                <Text style={styles.categoryButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {gameOver && (
          <View>
            <Text style={styles.finalScore}>{feedback}</Text>
            <TouchableOpacity style={styles.menuButton} onPress={handleBackToMenu}>
              <Text style={styles.menuButtonText}>Volver al Menú</Text>
            </TouchableOpacity>
          </View>
          )}
          {!gameOver && (
            <TouchableOpacity onPress={handleNextWord} style={styles.nextButton}>
              <LinearGradient
                colors={['#FCB9B9', '#FFDA7C']}
                style={styles.gradient}
              >
                <Text style={styles.nextButtonText}>Siguiente</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          <View style={styles.resultsContainer}>
            {words.map((_, index) => (
              <Text
                key={index}
                style={[
                  styles.resultNumber,
                  results.find(result => result.index === index) && {
                    color: results.find(result => result.index === index).correct ? '#B5F087' : '#F08787'
                  }
                ]}
              >
                {index + 1}
              </Text>
            ))}
          </View>
        </LinearGradient>
        
        <View style={styles.audioButtonContainer}>
          <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
            <Text style={styles.audioButtonText}>🔊</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#BFE0F3',
    
  },
  gameWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15, // Ajusta el radio de las esquinas a 15
    margin: 20,
    marginTop: 80,
  },
  containertxt:{
    width:200,
    height:200,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:100,
    marginTop:-100,
  },
  textoinicio:{
    fontSize:20,
    textAlign:'center',
    color:'black',
  },
  gameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  openDrawerText: {
    position: 'absolute',
    top: 20,
    right: 20,
    color: 'black',
    fontSize: 18,
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#A3E1EF',
    padding: 16,
    borderRadius: 20,
  },
  sidebarText: {
    fontSize: 18,
    marginVertical: 10,
    color: 'black',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarImage: {
    width: 100,
    height: 100,
  },
  cardContainer: {
    flex: 1,
    margin: 10,
  },
  card: {
    width: 140, // Ajusta el tamaño de la tarjeta
    height: 140, // Ajusta el tamaño de la tarjeta
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardText: {
    fontSize: 32,
    color: '#333',
  },
  cardImage: {
    width: 130, // Ajusta el tamaño de la imagen
    height: 130, // Ajusta el tamaño de la imagen
    borderRadius: 8,
  },
  scoreText: {
    fontSize: 24,
    marginTop: 20,
    color: 'white',
    fontFamily: 'Poppins-Bold', // Asegúrate de que la fuente esté correctamente cargada
    textAlign: 'center',
  },
  flatListContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetButton: {
    marginTop: 20,
    borderRadius: 15, // Ajusta el radio de las esquinas a 15
  },
  gradient: {
    padding: 10,
    borderRadius: 5, // Ajusta el radio de las esquinas a 5
    alignItems: 'center', // Asegura que el contenido esté centrado
    width: '100%', // Asegura que el gradiente ocupe todo el ancho del botón
  },
  resetButtonText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-Regular', // Asegúrate de que la fuente esté correctamente cargada
    textAlign: 'center',
  },
  audioButtonContainer: {
    position: 'absolute',
    top: 5,
    bottom: 30, // Ajusta esta distancia según sea necesario
    left: '50%',
    transform: [{ translateX: -25 }], // Ajusta el valor para centrar horizontalmente
  },
  audioButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
  },
  audioButtonText: {
    fontSize: 30,
    color: '#000',
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "#000",
    marginBottom: 60,
    fontFamily: 'Poppins-SemiBold'
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
    fontFamily: 'Poppins-Regular'
  },
  wordContainer: {
    flexDirection: "column",
    alignItems: "center",
    color: "#000",
    marginBottom: 20,
  },
  word: {
    fontSize: 20,
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
    fontFamily: 'Poppins-Bold'
  },
  feedback: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#E6DCF8",
    fontFamily: 'Poppins-Regular'
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#57C1E6",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  selectedCategoryButton: {
    backgroundColor: "#0056b3",
  },
  categoryButtonText: {
    color: "#000", // Cambiar el color del texto a negro
    fontSize: 16,
    textAlign: "center",
    fontFamily: 'Poppins-Regular'
  },
  nextButton: {
    marginTop: 20,
    borderRadius: 5, // Ajusta el radio de las esquinas a 5
    alignSelf: "center",
    width: '80%', // Asegura que el botón ocupe el 80% del ancho del contenedor
  },
  nextButtonText: {
    color: "#000",
    textAlign: "center",
    fontFamily: 'Poppins-Regular', // Usar la fuente Poppins Regular
  },
  menuButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  menuButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: 'Poppins-Regular'
  },
  finalScore: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
    fontFamily: 'Poppins-Regular'
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  resultNumber: {
    fontSize: 18,
    marginHorizontal: 5,
    color: '#000',
    fontFamily: 'Poppins-Regular'
  },
});

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};

export default WordClassificationGame;