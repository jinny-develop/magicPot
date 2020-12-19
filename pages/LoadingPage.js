import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import {useFonts} from 'expo-font';
import { AppLoading } from 'expo';

export default function LoadingPage({navigation}) {
    let [fontsLoaded] = useFonts({
      'SangSangAnt': require('../assets/fonts/SangSangAnt.otf'),        
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
      return (
          <ImageBackground source={require('../assets/background.png')} 
            style={styles.backgroundStyle}>
              <View>
                <Text style={styles.title}>마법 해답 제조중...</Text>
              </View>
            <Image source={require('../assets/pot_move.gif')} 
            style={styles.image_loading} 
            onLoad={()=>{
              setTimeout(() => {
                navigation.navigate('SecondPage')
                 }, 3000)
            }}
            />
          </ImageBackground>    
      );
    }
}

const styles = StyleSheet.create({
    backgroundStyle:{
      flex:1,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',  
    },
    image_loading: {        
        resizeMode:'contain',
        width: '90%',    
        marginTop : '10%',
    },
    title:{
    fontFamily:'SangSangAnt', 
    color: 'black',    
    fontSize: 40,    
    marginTop : '20%',
    marginBottom: 15,
    alignSelf: 'center',
  },
})