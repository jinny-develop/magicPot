import React, { useRef, useEffect }  from 'react';
import { ImageBackground, StyleSheet, Text, View,
TouchableOpacity, Image, Animated, } from 'react-native';
import data from '../message.json';
import {useFonts} from 'expo-font';
import { AppLoading } from 'expo';
import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

export default function SecondPage({navigation}) {
     useEffect(()=>{
        AdMobInterstitial.setAdUnitID("ca-app-pub-3584295739357422/3319732092"); // real id
        //AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712"); // google test

        AdMobInterstitial.addEventListener("interstitialDidClose", () => {
            navigation.navigate('FirstPage')
        });
        AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () => {
            navigation.navigate('FirstPage')
        });
    },[])
    const goDetail = async () =>{
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
      await AdMobInterstitial.showAdAsync();
    }


    var RandomNumber = Math.floor(Math.random() * 111)+1;
    console.log("RandomNumber : " + RandomNumber);
    if (RandomNumber > 111){
        RandomNumber = 110;
        
    }

    

    // Set Font
    let [fontsLoaded] = useFonts({
        'SangSangAnt': require('../assets/fonts/SangSangAnt.otf'),        
    });

    // Font animation
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
        }).start();
    };

    fadeIn();
    
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <ImageBackground source={require('../assets/background_result.png')} 
                style={styles.backgroundStyle}>
                <View style={{flex:9}}>
                    <Image  source={require('../assets/pot_result.png')}
                    style={styles.item1} />  
                    <Animated.View
                        style={[
                            styles.message,
                            {
                            opacity: fadeAnim, // Bind opacity to animated value                            
                            },
                        ]}>
                        <View style={styles.temp}>
                            <Text style={styles.fadingText}>{data[RandomNumber].name}</Text>
                        </View>
                    </Animated.View>
                    <View style={{marginBottom:20}}>
                        <TouchableOpacity style={styles.touchable} 
                            onPress={()=>{goDetail()}}>
                            <Image
                            source={require('../assets/reset.png')}
                            style={styles.item2} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <AdMobBanner
                        bannerSize="fullBanner"
                        servePersonalizedAds={true}
                        adUnitID="ca-app-pub-3584295739357422/3163641811" // real
                        //adUnitID="ca-app-pub-3940256099942544/6300978111" // test
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
        width:'100%',
        height:'100%',
        resizeMode :'cover',    
    },
  
    item1 : {
        resizeMode:'contain',
        width: '90%',
        height: '60%',    
        marginTop:'40%',
        alignSelf: 'center',
    },
    item2 : {
        resizeMode:'contain',
        
        width: '160%',    
    },
    message: {    
        alignItems: 'center',
        justifyContent:'center',
        alignSelf: 'center',
        position:'absolute',
        marginTop:'65%',
    },
    touchable: {      
        
        resizeMode:'contain',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width:50,
        height:50,
    },
    fadingText: {
        fontSize: 28,
        color: '#E3CFE5',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'SangSangAnt',
        marginLeft:'25%',
        marginRight:'25%',
        marginTop:'15%',
        marginBottom: '45%',
  },
  temp:{
    width:"90%",
    height:"100%",
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
  },
  banner:{
    position: 'absolute',
    bottom:0,
    left:0,
    right:0,
  },
});
