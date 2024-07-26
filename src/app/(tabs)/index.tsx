import { Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { Data } from '@/src/components/Data';
import { Temperatura, Umidade, Vento } from '@/src/components/animation_emojis/Emojis';
import {
  FirebaseDadosData, FirebaseDadosTemperatura, FirebaseDadosUmidade,
  FirebaseDadosHorario
} from '@/src/utils/firebaseUtils';

export default function HomeScreen() {
  const [temperatura, setTemperatura] = useState(0);
  const [umidade, setUmidade] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dates = await FirebaseDadosData();
        const latestDate = dates[dates.length - 1];
        const latestHour = await FirebaseDadosHorario(latestDate);

        const temperatureData = await FirebaseDadosTemperatura(latestDate, latestHour[0]);
        const humidityData = await FirebaseDadosUmidade(latestDate, latestHour[0]);

        setTemperatura(temperatureData.temperature);
        setUmidade(humidityData.humidity);
        FirebaseDadosTemperatura(latestDate, latestHour[0]).then((data) => {
          setTemperatura(data.temperature);
        });

        FirebaseDadosUmidade(latestDate, latestHour[0]).then((data) => {
          setUmidade(data.humidity);
        });
      } catch (error) {
        console.error('Erro ao buscar dados do Firebase:', error);
      }
    };

    const interval = setInterval(fetchData, 60000);
    fetchData();

    return () => clearInterval(interval);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/src/assets/images/Horta.png')} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.viewContainer}>
        <Data />
        <ThemedView style={styles.rowContainer}>
          <ThemedView style={styles.view1}>
            <ThemedText style={styles.text}>
              <Umidade /> Umidade
            </ThemedText>
            <ThemedText type="title">{`${umidade.toFixed(1)}%`}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.view1}>
            <ThemedText style={styles.text}>
              <Temperatura /> Temperatura
            </ThemedText>
            <ThemedText type="title">{`${temperatura.toFixed(1)}°C`}</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.view2}>
          <ThemedText style={styles.text}>
            <Vento /> Vento
          </ThemedText>
          <ThemedText type="title">5 km/h</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: '100%',
    width: '100%',
  },
  viewContainer: {
    padding: 10
  },
  rowContainer: {
   
    justifyContent: 'space-between',
  },
  view1: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#21844E',
    borderRadius: 15,
    margin: 10,
    paddingBottom: 20,
    opacity: 0.8,
  },
  view2: {    
    backgroundColor: '#21844E',
    borderRadius: 15,
    margin: 10,
    width:'90%',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,

  },
  text: {
    marginBottom: 10,
   
  },
});
