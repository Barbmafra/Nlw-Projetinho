import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';

import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Routes } from './src/routes';
import { Loading } from './src/componentes/Loading';
import { Background } from './src/componentes/Background'; 

import './src/services/notificationConfig';
import { getPushNotificationToken } from './src/services/getPushNotificationToken'



export default function App() {

  const getPushNotificationListener = useRef<Subscription>();
  const responsePushNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  });

  useEffect(() => {
    getPushNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    });

    responsePushNotificationListener.current = Notifications.addNotificationResponseReceivedListener (response => {
      console.log(response);
    });

    return() => {
      if(getPushNotificationListener.current && responsePushNotificationListener.current){
        Notifications.removeNotificationSubscription(getPushNotificationListener.current);
        Notifications.removeNotificationSubscription(responsePushNotificationListener.current);
      }
    }

  }, []);

  const [fontsLoad] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
        />
        { fontsLoad ? <Routes /> : <Loading/> }
    </Background>
  );
}
