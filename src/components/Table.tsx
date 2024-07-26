import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/src/components/ThemedText';

interface TableProps {
  data: any[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.textHeader}>
          <ThemedText>Horas</ThemedText>
        </View>
        <View style={styles.textHeader}>
          <ThemedText>Data</ThemedText>
        </View>
        <View style={styles.textHeader}>
          <ThemedText>Tº</ThemedText>
        </View>
        <View style={styles.textHeader}>
          <ThemedText>Umidade</ThemedText>
        </View>
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.cell}>
            <ThemedText>{item.column1}</ThemedText>
          </View>
          <View style={styles.cell}>
            <ThemedText>{item.column2}</ThemedText>
          </View>
          <View style={styles.cell}>
            <ThemedText>{item.column3}</ThemedText>
          </View>
          <View style={styles.cell}>
            <ThemedText>{item.column4}</ThemedText>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#105932',
    height: 60,
    borderWidth: 1, 
    borderColor: '#fff', 
    borderRadius: 10, 
  },
  textHeader: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10, 
  },
  cell: {
    flex: 1,
    fontSize: 5,
    alignItems: 'center',
  },
});

export default Table;
