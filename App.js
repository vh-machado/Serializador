import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, Pressable, TextInput } from 'react-native';
import {Cores} from './assets/cores.js'
import Header from "./components/header";
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AppLoading from 'expo-app-loading';
import { PlusOutlined, HourglassOutlined, CalendarOutlined, EyeOutlined, FileSearchOutlined } from '@ant-design/icons';
import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {
  useFonts,
  Nunito_200ExtraLight,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  Nunito_300Light_Italic,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black,
  Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito';

export default function App() {
  /*
  const [series, setSeries] = useState([
    {id: uuid.v4(), dia: 0, titulo: 'Evil', contS: 1, contE: 1, status: "ar"},
    {id: uuid.v4(), dia: 1, titulo: 'Black Lightning', contS: 1, contE: 1, status: "ar"},
    {id: uuid.v4(), dia: 2, titulo: 'Stargirl', contS: 1, contE: 1, status: "ar"},
    {id: uuid.v4(), dia: 2, titulo: 'Chucky', contS: 1, contE: 1, status: "ar"},
    {id: uuid.v4(), dia: 3, titulo: 'Legends of Tomorrow', contS: 1, contE: 1, status: "ar"},
    {id: uuid.v4(), dia: 3, titulo: 'The Wonder Years (2021)', contS: 1, contE: 1, status: "ar"},
    {id: uuid.v4(), dia: 4, titulo: 'Doom Patrol', contS: 1, contE: 1, status: "ar"},
    {id: uuid.v4(), dia: 4, titulo: 'RuPauls Drag Race UK', contS: 1, contE: 1, status: "ar"},
    {id: uuid.v4(), dia: 4, titulo: 'Canadas Drag Race', contS: 1, contE: 1, status: "ar"},
    {id: uuid.v4(), dia: 5, titulo: 'Foundation', contS: 1, contE: 1, status: "ar"},
    {id: uuid.v4(), dia: 5, titulo: 'Ted Lasso', contS: 1, contE: 1, status: "ar"},
    {id: uuid.v4(), dia: 6, titulo: 'Harley Queen', contS: 1, contE: 1, status: "ar"},
  ]);*/

  const [series, setSeries] = useState([]);
  
  const [checkboxState, setCheckboxState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [serieNova, setSerieNova] = useState("");
  const [selection, setSelection] = useState(0);

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e){}
  }

  useEffect(()=>{
    // Ao inicializar o app
    (async () =>{
      try {
        const jsonValue = await AsyncStorage.getItem('semanais');
        await AsyncStorage.removeItem('semanais')
        setSeries(jsonValue != null ? JSON.parse(jsonValue) : null)
      } catch(e) {}
    })();
  },[])

  // Função para adicionar um zero na frente do número de contagem de episódios e temporadas
  function zeros(n) {
    return (n < 10) ? ("0" + n) : n;
  }

  // Função que adiciona série
  function addSerie(){
    setModalVisible(!modalVisible);
    const nova = {id:uuid.v4(), dia: selection, titulo:serieNova, contS: 1, contE: 1, status: "ar"};
    if(series != null) {
      setSeries([...series, nova]);
      storeData('semanais', [...series, nova]);
    } else {
      setSeries([nova]);
      storeData('semanais', [nova]);
    }
    setSerieNova('');
  }

  // Função para incrementar episódios
  function atualizaEpisodio(diaSemana){
    series.filter(function(val){
      return val.dia == diaSemana}).map(function (valor){ valor.contE++; })
  }
  
  var dataRegistrada = new Date();
  // Função para verificar se houve alguma passagem de dias
  function verificaDia(){
    var dataAtual = new Date();
    if (dataAtual.getDate() != dataRegistrada.getDate()){
      
      var intervalo = eachDayOfInterval({
        start: new Date(dataRegistrada.getFullYear(), dataRegistrada.getMonth(), dataRegistrada.getDate()),
        end: new Date(dataAtual.getFullYear(), dataAtual.getMonth()+1, dataAtual.getDate())
      });
      
      intervalo.shift();
      intervalo.map((dataIntervalo)=>{atualizaEpisodio(dataIntervalo.getDay())});
      dataRegistrada = dataAtual;
    }
  }

  let [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_300Light_Italic,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black,
    Nunito_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    verificaDia(); // Se for um dia diferente, a contagem dos episódios será atualizada
    return (
      <View style={styles.container}>
        <Header></Header>
        <ScrollView style={styles.scroll}>
            
            <StatusBar style='light' backgroundColor={Cores.blackcoffee}/>
            
            {/* Domingo */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Domingo</Text>
              {(series != null) ? series.filter(function(val){
                return val.dia == 0}).map(function (valor){
                  return(
                    <View style={styles.item} key={valor.id}>
                      <BouncyCheckbox 
                        //fillColor='deepskyblue'
                        fillColor={Cores.yellowgreencrayola}
                        isChecked={checkboxState} 
                        onPress={() => setCheckboxState(!checkboxState)}
                      />
                      <Text style={styles.texto}>{valor.titulo} S{zeros(valor.contS)}E{zeros(valor.contE)}</Text>
                    </View>
                    );
                  }) : null}
            </View>
            
            {/* Segunda */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Segunda</Text>
              {(series != null) ? series.filter(function(val){
                return val.dia == 1}).map(function (valor){
                  return(
                    <View style={styles.item} key={valor.id}>
                      <BouncyCheckbox 
                        //fillColor='deepskyblue'
                        fillColor={Cores.yellowgreencrayola}
                        isChecked={checkboxState} 
                        onPress={() => setCheckboxState(!checkboxState)}
                      />
                      <Text style={styles.texto}>{valor.titulo} S{zeros(valor.contS)}E{zeros(valor.contE)}</Text>
                    </View>
                    );
                  }) : null}
            </View>
            
            {/* Terça */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Terça</Text>
              {(series != null) ? series.filter(function(val){
                return val.dia == 2}).map(function (valor){
                  return(
                    <View style={styles.item} key={valor.id}>
                      <BouncyCheckbox 
                        //fillColor='deepskyblue'
                        fillColor={Cores.yellowgreencrayola}
                        isChecked={checkboxState} 
                        onPress={() => setCheckboxState(!checkboxState)}
                      />
                      <Text style={styles.texto}>{valor.titulo} S{zeros(valor.contS)}E{zeros(valor.contE)}</Text>
                    </View>
                    );
                  }) : null}
            </View>
            
            {/* Quarta */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Quarta</Text>
              {(series != null) ? series.filter(function(val){
                return val.dia == 3}).map(function (valor){
                  return(
                    <View style={styles.item} key={valor.id}>
                      <BouncyCheckbox 
                        //fillColor='deepskyblue'
                        fillColor={Cores.yellowgreencrayola}
                        isChecked={checkboxState} 
                        onPress={() => setCheckboxState(!checkboxState)}
                      />
                      <Text style={styles.texto}>{valor.titulo} S{zeros(valor.contS)}E{zeros(valor.contE)}</Text>
                    </View>
                    );
                }) : null}
            </View>
            
            {/* Quinta */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Quinta</Text>
              {(series != null) ? series.filter(function(val){
                return val.dia == 4}).map(function (valor){
                  return(
                    <View style={styles.item} key={valor.id}>
                      <BouncyCheckbox 
                        //fillColor='deepskyblue'
                        fillColor={Cores.yellowgreencrayola}
                        isChecked={checkboxState} 
                        onPress={() => setCheckboxState(!checkboxState)}
                      />
                      <Text style={styles.texto}>{valor.titulo} S{zeros(valor.contS)}E{zeros(valor.contE)}</Text>
                    </View>
                    );
                  }) : null}
            </View>

            {/* Sexta */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Sexta</Text>
              {(series != null) ? series.filter(function(val){
                return val.dia == 5}).map(function (valor){
                  return(
                    <View style={styles.item} key={valor.id}>
                      <BouncyCheckbox 
                        //fillColor='deepskyblue'
                        fillColor={Cores.yellowgreencrayola}
                        isChecked={checkboxState} 
                        onPress={() => setCheckboxState(!checkboxState)}
                      />
                      <Text style={styles.texto}>{valor.titulo} S{zeros(valor.contS)}E{zeros(valor.contE)}</Text>
                    </View>
                    );
                  }) : null}
            </View>
            
            {/* Sábado */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Sábado</Text>
              {(series != null) ? series.filter(function(val){
                return val.dia == 6;}).map(function (valor){
                  return(
                    <View style={styles.item} key={valor.id}>
                      <BouncyCheckbox 
                        //fillColor='deepskyblue'
                        fillColor={Cores.yellowgreencrayola}
                        isChecked={checkboxState} 
                        onPress={() => setCheckboxState(!checkboxState)}
                      />
                      <Text style={styles.texto}>{valor.titulo} S{zeros(valor.contS)}E{zeros(valor.contE)}</Text>
                    </View>
                    );
                  }) : null}
            </View>

        </ScrollView>

        <View style={styles.menu}> 
          <Pressable style={styles.buttonIconMenu} onPress={() => alert('séries semanais')}>
            <Entypo name="calendar" size={32} color={Cores.yellowgreencrayola} />
            {/*
            <CalendarOutlined style={{fontSize: '16px', color: 'deepskyblue'}}/>
            */}
          </Pressable>          
          <Pressable style={styles.buttonIconMenu} onPress={() => alert('séries assistidas')}>
            <AntDesign name="eye" size={32} color={Cores.yellowgreencrayola} />
            {/*
            <EyeOutlined style={{fontSize: '16px', color: 'deepskyblue'}}/>
            */}
          </Pressable>
          <Pressable style={styles.buttonIconMenu} onPress={() => alert('séries chegando')}>
            <AntDesign name="hourglass" size={32} color={Cores.yellowgreencrayola} />
            {/*
            <HourglassOutlined style={{fontSize: '16px', color: 'deepskyblue'}}/>
            */}
          </Pressable>
          <Pressable style={styles.buttonIconMenu} onPress={() => alert('séries na fila')}>
            <MaterialCommunityIcons name="text-box-search" size={32} color={Cores.yellowgreencrayola} />
            {/*
            <FileSearchOutlined style={{fontSize: '16px', color: 'deepskyblue'}}/>
            */}
          </Pressable>
          
          <Pressable style={styles.buttonAddSerie} onPress={() => setModalVisible(!modalVisible)}>
            <AntDesign name="plus" size={32} color={Cores.white}/>
            {/*
            <PlusOutlined style={{fontSize: '16px', color: 'deepskyblue'}}/>
            */}
          </Pressable>
        </View>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Adicionar Série</Text>

              <TextInput
                style={styles.input}
                placeholder="Digite o nome da série"
                placeholderTextColor='#6B7280'
                onChangeText={text => setSerieNova(text)}
              />

              {/*
              
              */}
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Pressable
                  style={[styles.button, styles.buttonDay, selection === 0 ? styles.buttonSelect : null]}
                  onPress={() => setSelection(0)} 
                >
                  <Text style={styles.textStyle}>Dom</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonDay, selection === 1 ? styles.buttonSelect : null]}
                  onPress={() => setSelection(1)}
                >
                  <Text style={styles.textStyle}>Seg</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonDay, selection === 2 ? styles.buttonSelect : null]}
                  onPress={() => setSelection(2)}
                >
                  <Text style={styles.textStyle}>Ter</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonDay, selection === 3 ? styles.buttonSelect : null]}
                  onPress={() => setSelection(3)}
                >
                  <Text style={styles.textStyle}>Qua</Text>
                </Pressable>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 15}}>
                <Pressable
                  style={[styles.button, styles.buttonDay, selection === 4 ? styles.buttonSelect : null]}
                  onPress={() => setSelection(4)}
                >
                  <Text style={styles.textStyle}>Qui</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonDay, selection === 5 ? styles.buttonSelect : null]}
                  onPress={() => setSelection(5)}
                >
                  <Text style={styles.textStyle}>Sex</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonDay, selection === 6 ? styles.buttonSelect : null]}
                  onPress={() => setSelection(6)}
                >
                  <Text style={styles.textStyle}>Sáb</Text>
                </Pressable>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => (serieNova=='')? alert('Campo vazio!'): addSerie()}
              >
                <Text style={styles.textStyle}>Concluir</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
  
  
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    //backgroundColor: '#c2ffe1',
    backgroundColor: Cores.smokyblack2,
  },
  scroll: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingEnd: 10,
    paddingStart: 10,
    paddingBottom: 10,
  },
  card: {
    flexDirection: 'column',
    marginTop: 5,
    marginBottom: 5,
    padding: 15,
    width: '100%',
    borderRadius: 10,
    //backgroundColor: '#bdf28f',
    backgroundColor: Cores.cinereous,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 17,
    marginBottom: 15,
  },
  item:{
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  texto:{
    textAlignVertical: 'center',
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
  },

  menu: {
    flexDirection: 'row',
    width: '100%',
    padding: 5,
    alignSelf: 'baseline',
    //backgroundColor: 'white',
    backgroundColor: Cores.blackcoffee,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonAddSerie: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: Cores.yellowgreencrayola,
      alignItems: 'center'
  },
  buttonIconMenu: {
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMenu: {
    fontSize: '16px',
    color: Cores.yellowgreencrayola,
  },

  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 2
  },
  buttonDay: {
    backgroundColor: "#6B7280",
  },
  buttonSelect: {
    backgroundColor: "deepskyblue",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#bdf28f",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: "Nunito_700Bold",
    fontSize: 13
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 15
  },

  input: {
    width: '100%',
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor: '#6B7280',
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
  },
});
