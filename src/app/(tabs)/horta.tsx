import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { InserirModal } from '@/src/components/modal/InserirModal';

interface ButtonState {
  image: Image; 
  label: string;
}

export default function Horta() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
  const [buttonsState, setButtonsState] = useState<ButtonState[]>([
    { image: require('@/src/assets/images/Canteiro_Indisponivel.png'), label: 'Canteiro' },
    { image: require('@/src/assets/images/Canteiro_Indisponivel.png'), label: 'Canteiro' },
    { image: require('@/src/assets/images/Canteiro_Indisponivel.png'), label: 'Canteiro' },
    { image: require('@/src/assets/images/Canteiro_Indisponivel.png'), label: 'Canteiro' },
    { image: require('@/src/assets/images/Canteiro_Indisponivel.png'), label: 'Canteiro' },
    { image: require('@/src/assets/images/Canteiro_Indisponivel.png'), label: 'Canteiro' },
    { image: require('@/src/assets/images/Canteiro_Indisponivel.png'), label: 'Canteiro' },
    { image: require('@/src/assets/images/Canteiro_Indisponivel.png'), label: 'Canteiro' },
  ]);

  const handleConfirm = (selectedCulture: string | null) => {
    if (selectedButtonIndex !== null) {
      const updatedButtonsState = [...buttonsState];
      if (selectedCulture === null) {
        updatedButtonsState[selectedButtonIndex] = {
          image: require('@/src/assets/images/Canteiro_Indisponivel.png'),
          label: 'Canteiro',
        };
      } else {
        updatedButtonsState[selectedButtonIndex] = {
          image: require('@/src/assets/images/Canteiro_Disponivel.png'),
          label: selectedCulture,
        };
      }
      setButtonsState(updatedButtonsState);
    }
    setOpen(false);
    setSelectedButtonIndex(null);
  };

  const handleOpenModal = (index: number) => {
    setSelectedButtonIndex(index);
    setOpen(true);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Image source={require('@/src/assets/images/Horta.png')} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type='title'>Canteiros</ThemedText>
        <View style={styles.viewButtons}>
          {buttonsState.map((button, index) => (
            <TouchableOpacity key={index} onPress={() => handleOpenModal(index)} style={styles.button}>
              <Image source={button.image} style={styles.imageButton} />
              <ThemedText>{button.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        <InserirModal isOpen={open} onClose={handleConfirm} currentCulture={buttonsState[selectedButtonIndex]?.label} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: '100%',
    width: '100%',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageButton: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  viewButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    margin: 10,
  },
});
