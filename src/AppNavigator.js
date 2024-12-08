  import React, { useEffect, useState } from 'react';
  import { createStackNavigator } from '@react-navigation/stack';
  import auth from '@react-native-firebase/auth';
  import firestore from '@react-native-firebase/firestore';
  import HomeScreen from './screens/HomeScreen';
  import Sociales from './screens/menus/Sociales';
  import Ciencias from './screens/menus/Ciencias';
  import Matematica from './screens/menus/Matematica';
  import Lenguaje from './screens/menus/Lenguaje';
  import CienciasLecciones from './screens/menus_L_A/CienciasLecciones';
  import CienciasActividades from './screens/menus_L_A/CienciasActividades';
  import MatematicasLecciones from './screens/menus_L_A/MatematicasLecciones';
  import MatematicasActividades from './screens/menus_L_A/MatematicasActividades';
  import SocialesLecciones from './screens/menus_L_A/SocialesLecciones';
  import SocialesActividades from './screens/menus_L_A/SocialesActividades';
  import LenguajeLecciones from './screens/menus_L_A/LenguajeLecciones';
  import LenguajeActividades from './screens/menus_L_A/LenguajeActividades';
  import ActividadArrastrarSoLtarL from './screens/actividades_juegos/ActiArraSoL';
  import JuegoMemoriaL from './screens/actividades_juegos/JuegoMemoriaL';
  import ClasificacionPalabrasL from './screens/actividades_juegos/ClaPaL';
  import ActividadArrastrarSoLtarM from './screens/actividades_juegos/ActiArraSoM';
  import JuegoMemoriaM from './screens/actividades_juegos/JuegoMemoriaM';
  import ClasificacionPalabrasM from './screens/actividades_juegos/ClaPaM';
  import ActividadArrastrarSoLtarC from './screens/actividades_juegos/ActiArraSoC';
  import JuegoMemoriaC from './screens/actividades_juegos/JuegoMemoriaC';
  import ClasificacionPalabrasC from './screens/actividades_juegos/ClaPaC';
  import ActividadArrastrarSoLtarS from './screens/actividades_juegos/ActiArraSoS';
  import JuegoMemoriaS from './screens/actividades_juegos/JuegoMemoriaS';
  import ClasificacionPalabrasS from './screens/actividades_juegos/ClaPaS';
  import WordClassificationGame from './screens/actividades_juegos/WordClassificationGame';
  import DrawingScreen from './screens/actividades_juegos/DrawingScreen';
  import DibujosC from './screens/actividades_juegos/DibujosC';
  import ColorearScreen from './screens/actividades_juegos/ColorearScreen';
  import L1ciencia from './screens/Lciencia/L1ciencia';
  import L2ciencia from './screens/Lciencia/L2ciencia';
  import L3ciencia from './screens/Lciencia/L3ciencia';
  import L4ciencia from './screens/Lciencia/L4ciencia';
  import L1sociales from './screens/Lsociales/L1sociales';
  import L2sociales from './screens/Lsociales/L2sociales';
  import L3sociales from './screens/Lsociales/L3sociales';
  import L4sociales from './screens/Lsociales/L4sociales';
  import L1mate from './screens/LMate/L1mate';
  import L2mate from './screens/LMate/L2mate';
  import L3mate from './screens/LMate/L3mate';
  import L4mate from './screens/LMate/L4mate';
  import L1lenguaje from './screens/Llenguaje/L1lenguaje';
  import L2lenguaje from './screens/Llenguaje/L2lenguaje';
  import L3lenguaje from './screens/Llenguaje/L3lenguaje';
  import L4lenguaje from './screens/Llenguaje/L4lenguaje';
  import Signin from './screens/Cuentas/Signin';
  import Login from './screens/Cuentas/Login';
  import ConfC from './screens/Cuentas/ConfC';
  import Manual from './screens/Manual';
  import PadresScreen from './screens/PadresScreen';
  import ProgresoE from './screens/ProgresoE';
  
  const Stack = createStackNavigator();
  
  function AppNavigator() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);
  
    // Manejar el estado de usuario
    const onAuthStateChanged = async (user) => {
      setUser(user);
      if (user) {
        // Buscar el documento del usuario en Firestore usando el correo electrónico
        const userQuerySnapshot = await firestore().collection('Usuario').where('email', '==', user.email).get();
        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0];
          setUserType(userDoc.data().userType);
        }
      }
      if (initializing) setInitializing(false);
    };
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  
    return (
      <Stack.Navigator>
        {user ? (
          userType === 'estudiante' ? (
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            
          ) : (
            <Stack.Screen name="PadresScreen" component={PadresScreen} options={{ headerShown: false }} />
          )
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Iniciar Sesion', headerShown: false }} />
            <Stack.Screen name="Signin" component={Signin} options={{ title: 'Registrarse', headerShown: false }} />
          </>
        )}
        <Stack.Screen name="Sociales" component={Sociales} options={{ headerShown: false }} />
        <Stack.Screen name="Ciencias" component={Ciencias} options={{ headerShown: false }} />
        <Stack.Screen name="Matematica" component={Matematica} options={{ headerShown: false }} />
        <Stack.Screen name="Lenguaje" component={Lenguaje} options={{ headerShown: false }} />
        <Stack.Screen name="CienciasLecciones" component={CienciasLecciones} options={{ headerShown: false }} />
        <Stack.Screen name="CienciasActividades" component={CienciasActividades} options={{ headerShown: false }} />
        <Stack.Screen name="MatematicasLecciones" component={MatematicasLecciones} options={{ headerShown: false }} />
        <Stack.Screen name="MatematicasActividades" component={MatematicasActividades} options={{ headerShown: false }} />
        <Stack.Screen name="SocialesLecciones" component={SocialesLecciones} options={{ headerShown: false }} />
        <Stack.Screen name="SocialesActividades" component={SocialesActividades} options={{ headerShown: false }} />
        <Stack.Screen name="LenguajeLecciones" component={LenguajeLecciones} options={{ headerShown: false }} />
        <Stack.Screen name="LenguajeActividades" component={LenguajeActividades} options={{ headerShown: false }} />
        <Stack.Screen name="ActividadArrastrarSoLtarL" component={ActividadArrastrarSoLtarL} options={{ headerShown: false }} />
        <Stack.Screen name="JuegoMemoriaL" component={JuegoMemoriaL} options={{ headerShown: false }} />
        <Stack.Screen name="ClasificacionPalabrasL" component={ClasificacionPalabrasL} options={{ headerShown: false }} />
        <Stack.Screen name="ActividadArrastrarSoLtarM" component={ActividadArrastrarSoLtarM} options={{ headerShown: false }} />
        <Stack.Screen name="JuegoMemoriaM" component={JuegoMemoriaM} options={{ headerShown: false }} />
        <Stack.Screen name="ClasificacionPalabrasM" component={ClasificacionPalabrasM} options={{ headerShown: false }} />
        <Stack.Screen name="ActividadArrastrarSoLtarC" component={ActividadArrastrarSoLtarC} options={{ headerShown: false }} />
        <Stack.Screen name="JuegoMemoriaC" component={JuegoMemoriaC} options={{ headerShown: false }} />
        <Stack.Screen name="ClasificacionPalabrasC" component={ClasificacionPalabrasC} options={{ headerShown: false }} />
        <Stack.Screen name="ActividadArrastrarSoLtarS" component={ActividadArrastrarSoLtarS} options={{ headerShown: false }} />
        <Stack.Screen name="JuegoMemoriaS" component={JuegoMemoriaS} options={{ headerShown: false }} />
        <Stack.Screen name="ClasificacionPalabrasS" component={ClasificacionPalabrasS} options={{ headerShown: false }} />
        <Stack.Screen name="WordClassificationGame" component={WordClassificationGame} options={{ headerShown: false }} />
        <Stack.Screen name="DrawingScreen" component={DrawingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DibujosC" component={DibujosC} options={{ headerShown: false }} />
        <Stack.Screen name="ColorearScreen" component={ColorearScreen} options={{ headerShown: false }} />
        <Stack.Screen name="L1ciencia" component={L1ciencia} options={{ headerShown: false }} />
        <Stack.Screen name="L2ciencia" component={L2ciencia} options={{ headerShown: false }} />
        <Stack.Screen name="L3ciencia" component={L3ciencia} options={{ headerShown: false }} />
        <Stack.Screen name="L4ciencia" component={L4ciencia} options={{ headerShown: false }} />
        <Stack.Screen name="L1sociales" component={L1sociales} options={{ headerShown: false }} />
        <Stack.Screen name="L2sociales" component={L2sociales} options={{ headerShown: false }} />
        <Stack.Screen name="L3sociales" component={L3sociales} options={{ headerShown: false }} />
        <Stack.Screen name="L4sociales" component={L4sociales} options={{ headerShown: false }} />
        <Stack.Screen name="L1mate" component={L1mate} options={{ headerShown: false }} />
        <Stack.Screen name="L2mate" component={L2mate} options={{ headerShown: false }} />
        <Stack.Screen name="L3mate" component={L3mate} options={{ headerShown: false }} />
        <Stack.Screen name="L4mate" component={L4mate} options={{ headerShown: false }} />
        <Stack.Screen name="L1lenguaje" component={L1lenguaje} options={{ headerShown: false }} />
        <Stack.Screen name="L2lenguaje" component={L2lenguaje} options={{ headerShown: false }} />
        <Stack.Screen name="L3lenguaje" component={L3lenguaje} options={{ headerShown: false }} />
        <Stack.Screen name="L4lenguaje" component={L4lenguaje} options={{ headerShown: false }} />
        <Stack.Screen name="ConfC" component={ConfC} options={{ headerShown: false }} />
        <Stack.Screen name="Manual" component={Manual} options={{ headerShown: false }} />
        <Stack.Screen name="ProgresoE" component={ProgresoE} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
  
  export default AppNavigator;