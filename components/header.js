import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Cores} from '../assets/cores.js'
import Constants from 'expo-constants';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';

export default function Header() {
    let [fontsLoaded] = useFonts({
        Nunito_800ExtraBold,
    });
    
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.header}>
                <Text style={styles.title}>Serializador</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 10,
        marginTop: Constants.statusBarHeight,
        //backgroundColor: '#bdf28f',
        backgroundColor: Cores.blackcoffee,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        marginBottom: 5,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: Cores.bone,
        fontFamily: 'Nunito_800ExtraBold',
    }
});