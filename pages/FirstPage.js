import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image,
  TouchableOpacity } from 'react-native';
import {useFonts} from 'expo-font';
import { AppLoading } from 'expo';
import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

export default function FirstPage({navigation}) {
  
    let [fontsLoaded] = useFonts({
        'SangSangAnt': require('../assets/fonts/SangSangAnt.otf'),        
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
       return (
        <ImageBackground style={styles.backgroundStyle} 
          source={require('../assets/background.png')} >
          <View style={{flex:9}}>
              <View>
                <Text style={styles.title1}>고민을 생각한 후</Text>
                <Text style={styles.title2}>마법항아리를 누르세요</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.touchable} 
                  onPress={()=>navigation.navigate('LoadingPage')}>
                    <Image style={styles.imageStyle} source={require('../assets/pot.png')}/> 
                  </TouchableOpacity>
              </View>
           </View>
           <View style={{flex:1}}>
              <AdMobBanner
                  bannerSize="fullBanner"
                  servePersonalizedAds={true}
                  adUnitID="ca-app-pub-3584295739357422/3163641811" // real
                  //adUnitID="ca-app-pub-3940256099942544/6300978111" // google test
                  style={styles.banner}
              />
          </View>
        </ImageBackground>
        
       );
    }
}

const styles = StyleSheet.create({
  backgroundStyle:{
    flex:1, 
    justifyContent: 'center',
    width:'100%',
    height:'100%',
    resizeMode :'cover',    
    paddingBottom: 0,
  },
  imageStyle:{
    width:'80%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '5%',
  },
  touchable: {      
    resizeMode:'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title1:{
    fontFamily:'SangSangAnt', 
    color: 'black',    
    fontSize: 40,    
    marginTop : '40%',
    marginBottom: 15,
    alignSelf: 'center',
  },
  title2:{
    fontFamily:'SangSangAnt', 
    color: 'black',    
    fontSize: 40,    
    alignSelf: 'center',
  },
  banner:{
    position: 'absolute',
    bottom:0,
    left:0,
    right:0,
  },
});
