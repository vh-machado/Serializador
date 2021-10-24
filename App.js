import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function App() {
  
  const [seriesDom, setSeriesDom] = useState([
    {id: 0, serie: 'Evil'},
  ]);
  const [seriesSeg, setSeriesSeg] = useState([
    {id: 0, serie: 'Black Lightning'},
  ]);
  const [seriesTer, setSeriesTer] = useState([
    {id: 0, serie: 'Stargirl'},
    {id: 1, serie: 'Chucky'},
  ]);
  const [seriesQua, setSeriesQua] = useState([
    {id: 0, serie: 'Legends of Tomorrow'},
    {id: 1, serie: 'The Wonder Years (2021)'},
  ]);
  const [seriesQui, setSeriesQui] = useState([
    {id: 0, serie: 'Doom Patrol'},
    {id: 1, serie: 'RuPauls Drag Race UK'},
    {id: 2, serie: 'Canadas Drag Race'},
  ]);
  const [seriesSex, setSeriesSex] = useState([
    {id: 0, serie: 'Foundation'},
    {id: 1, serie: 'Ted Lasso'}
  ]);
  const [seriesSab, setSeriesSab] = useState([
    {id: 0, serie: 'Harley Queen'},
  ]);
  
  const [checkboxState, setCheckboxState] = useState(true);

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        
        <StatusBar style='auto' backgroundColor='#c2ffe1'/>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Domingo</Text>
          {seriesDom.map(function(val){
            return(
            <View style={styles.item}>
              <BouncyCheckbox 
                fillColor='deepskyblue'
                isChecked={checkboxState} 
                onPress={() => setCheckboxState(!checkboxState)}
              />
              <Text style={styles.texto}>{val.serie}</Text>
            </View>
            );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Segunda</Text>
          {seriesSeg.map(function(val){
            return(
              <View style={styles.item}>
                <BouncyCheckbox 
                  fillColor='deepskyblue'
                  isChecked={checkboxState} 
                  onPress={() => setCheckboxState(!checkboxState)}
                />
                <Text style={styles.texto}>{val.serie}</Text>
              </View>
              );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Terça</Text>
          {seriesTer.map(function(val){
            return(
              <View style={styles.item}>
                <BouncyCheckbox 
                  fillColor='deepskyblue'
                  isChecked={checkboxState} 
                  onPress={() => setCheckboxState(!checkboxState)}
                />
                <Text style={styles.texto}>{val.serie}</Text>
              </View>
              );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quarta</Text>
          {seriesQua.map(function(val){
            return(
              <View style={styles.item}>
                <BouncyCheckbox 
                  fillColor='deepskyblue'
                  isChecked={checkboxState} 
                  onPress={() => setCheckboxState(!checkboxState)}
                />
                <Text style={styles.texto}>{val.serie}</Text>
              </View>
              );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quinta</Text>
          {seriesQui.map(function(val){
            return(
              <View style={styles.item}>
                <BouncyCheckbox 
                  fillColor='deepskyblue'
                  isChecked={checkboxState} 
                  onPress={() => setCheckboxState(!checkboxState)}
                />
                <Text style={styles.texto}>{val.serie}</Text>
              </View>
              );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sexta</Text>
          {seriesSex.map(function(val){
            return(
              <View style={styles.item}>
                <BouncyCheckbox 
                  fillColor='deepskyblue'
                  isChecked={checkboxState} 
                  onPress={() => setCheckboxState(!checkboxState)}
                />
                <Text style={styles.texto}>{val.serie}</Text>
              </View>
              );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sábado</Text>
          {seriesSab.map(function(val){
            return(
              <View style={styles.item}>
                <BouncyCheckbox 
                  fillColor='deepskyblue'
                  isChecked={checkboxState} 
                  onPress={() => setCheckboxState(!checkboxState)}
                />
                <Text style={styles.texto}>{val.serie}</Text>
              </View>
              );
          })}
        </View>

      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    paddingEnd: 10,
    paddingStart: 10,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#c2ffe1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 5,
    marginBottom: 5,
    padding: 15,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#bdf28f',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  item:{
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  texto:{
    textAlignVertical: 'center',
  }
});
