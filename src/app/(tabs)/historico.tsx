import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import Table from '@/src/components/Table';
import { FirebaseDadosData, FirebaseDadosTemperatura, FirebaseDadosUmidade, FirebaseDadosHorario } from '@/src/utils/firebaseUtils';

interface DataEntry {
  date: string;
  temperature: number;
  humidity: number;
  horario: string;
}

export default function Historico() {
  const [data, setData] = useState<DataEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dates = await FirebaseDadosData();
        const dataPromises = dates.map(async (date) => {
          const hours = await FirebaseDadosHorario(date);
          const promises = hours.map(async (hour) => {
            const temperaturePromise = FirebaseDadosTemperatura(date, hour);
            const humidityPromise = FirebaseDadosUmidade(date, hour);
            const [temperatureData, humidityData] = await Promise.all([temperaturePromise, humidityPromise]);
            return { date, temperature: temperatureData.temperature, humidity: humidityData.humidity, horario: hour };
          });
          return Promise.all(promises);
        });
        const fetchedData = await Promise.all(dataPromises);
        const flattenedData = fetchedData.flat(); 
        setData(flattenedData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do Firebase:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formattedData = data.map(entry => ({
    column1: entry.horario,
    column2: entry.date,
    column3: `${entry.temperature.toFixed(1)}°C`,
    column4: `${entry.humidity.toFixed(1)}%`,
  }));

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Image style={styles.historiLogo} source={require('../../assets/images/dados.png')} />}
    >
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View>
            <Table data={formattedData} />
          </View>
        )}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  historiLogo: {
    height: '100%',
    width: '100%',
  },
  container: {
    marginTop: 20,
    backgroundColor: '#105932',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    opacity: 0.9,
  },
});
