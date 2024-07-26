import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Data() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formattedDate = currentDate.toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'long',
    });

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:200,
        marginLeft: 10,
        padding: 10,
    },
    dateText: {
        fontSize: 30,
        color: '#fff',
        opacity: 0.8,
    },
});
