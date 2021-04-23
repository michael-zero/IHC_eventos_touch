import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert,Animated,Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Swiper from 'react-native-swiper' // 1.5.4

export default function App() {

  const [pesquisa, setPesquisa] = React.useState('')
  const [fundo, setFundo] = React.useState(false)

  const valorInicial = new Animated.Value(0)

  const bgInterpolacao = valorInicial.interpolate({
    inputRange: [0,1],
    outputRange: ['white', '#9DD6EB']
  })

  const bg = {
    backgroundColor: bgInterpolacao
  }
  

  const animar = (valor) => {
    Animated.timing(valorInicial,{toValue: valor, useNativeDriver: false, duration: 1500}).start()
  }




  return (
    <View style={styles.container}>

        <View style={{flexDirection: 'row'}}>
            {/* Barra de pesquisa */}
            <View style={{alignSelf:'flex-start', borderRadius: 10, paddingHorizontal: 5,
            borderWidth: 1, width: '70%', flexDirection: 'row', margin: 15}}>
              <FontAwesome name="search" size={22} color="black" style={{marginRight: 10, alignSelf: 'center'}} />
              <TextInput onChangeText={(texto) => setPesquisa(texto)} placeholder='Item procurado' />
            </View>   

            <TouchableOpacity onPress={() => console.log(pesquisa)} style={{alignSelf: 'center', borderWidth: 1, padding: 5}}>
              <Text>Buscar</Text>
            </TouchableOpacity>

        </View>

    
      {/* Conteudo */}
      
        {/* SWIPER */}
        <View style={{height: '70%', borderWidth: 1}}>
            <Swiper style={styles.wrapper} showsButtons onIndexChanged={() => {Alert.alert('Deslizou', 'Alterou um item')}}>
                <View style={styles.slide1}>
                  <Text style={styles.text}>UFPI</Text>
                </View>
              <View style={styles.slide2}>
                <Text style={styles.text}>Computação</Text>
              </View>
              <View style={styles.slide3}>
                <Text style={styles.text}>Touch Events</Text>
              </View>
           </Swiper>
        </View> 
        {/* Fim do conteudo */}

        {/* Footer */}
        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>

          <ScrollView horizontal onScroll={() => Alert.alert('Scroll','Você deu scroll')}
            
          >
            {/* onPress */}
            <Pressable
            onPress={() => {
              setFundo(!fundo)
              Alert.alert('Um toque',`onPress\nMudou o fundo\nSegure 'H'`)
              
            }} 
            style={[styles.elemento, fundo && {borderColor: 'black', backgroundColor: '#9DD6EB'}]}>
              <Text style={{fontSize: 18}} >I</Text>
            </Pressable>

            {/* onLongPress */}
            <Pressable onLongPress={() => animar(1)} onPressOut={() => {
              animar(0)
              Alert.alert('Eventos', 'onLongPress ou \nonPressOut\n2 toques em C')
              }}>
              <Animated.View style={[bg, styles.elemento]}>
              <Text style={[{fontSize: 18,}]} >H</Text>
              </Animated.View>
            </Pressable>

            <Pressable  
            style={styles.elemento}>
              <Text style={{fontSize: 18}} >C</Text>
            </Pressable>

            <Pressable onLongPress={() => {console.log('ok')}} 
            style={styles.elemento}>
              <Text style={{fontSize: 18}} >2</Text>
            </Pressable>

            <Pressable onLongPress={() => {console.log('ok')}} 
            style={styles.elemento}>
              <Text style={{fontSize: 18}} >1</Text>
            </Pressable>


          </ScrollView>

        </View>
  

      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    // borderWidth: 1
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  elemento: {
    borderWidth: 1, 
    borderColor: '#92BBD9',
    height: 60,
    width: 60,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    
  }
});
