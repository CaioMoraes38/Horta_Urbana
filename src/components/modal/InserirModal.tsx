import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ThemedText } from '../ThemedText';

interface Imodal {
  isOpen: boolean;
  onClose: (selectedCulture: string | null) => void;
  currentCulture: string | null;
}

const cultures: string[] = ["Couve", "Alface", "Cenoura", "Pepino", "Rucula", "Tomate",
   "Espinafre","Beterraba", "Abobrinha", "Batata", "Repolho", "Cebola"];

export const InserirModal: React.FC<Imodal> = ({ isOpen, onClose, currentCulture }) => {
  const [selectedCulture, setSelectedCulture] = useState<string | null>(currentCulture);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCultures, setFilteredCultures] = useState<string[]>(cultures);

  useEffect(() => {
    setSelectedCulture(currentCulture);
  }, [currentCulture]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredCultures(cultures);
    } else {
      setFilteredCultures(cultures.filter(culture => culture.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  }, [searchQuery]);

  const handleSelection = (culture: string) => {
    setSelectedCulture(culture === selectedCulture ? null : culture);
  };

  const handleConfirm = () => {
    onClose(selectedCulture);
    setSearchQuery('');
  };

  const handleRemove = () => {
    onClose(null); 
    setSearchQuery('');
  };

  const handleClose = () => {
    onClose(null); 
    setSearchQuery('');
  };

  return (
    <Modal visible={isOpen} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.textheader} type="title">Culturas</ThemedText>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cultura..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <ScrollView contentContainerStyle={styles.viewCulturas}>
            {filteredCultures.map((culture, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelection(culture)}
                style={[
                  styles.cultureButton,
                  selectedCulture === culture && styles.selectedCultureButton
                ]}
              >
                <ThemedText
                  style={[
                    styles.text,
                    selectedCulture === culture && styles.selectedText
                  ]}
                  type="subtitle"
                >
                  {culture}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
          {currentCulture && (
            <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remover Cultura</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C3720',
  },
  modalContent: {
    width: '95%',
    height: '90%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  textheader: {
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    color: 'black',
  },
  viewCulturas: {
    flexGrow: 1,
  },
  cultureButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedCultureButton: {
    backgroundColor: '#21844E',
  },
  selectedText: {
    color: 'white',
  },
  confirmButton: {
    padding: 10,
    backgroundColor: '#21844E',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  removeButton: {
    padding: 10,
    backgroundColor: '#d9534f',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#21844E',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
