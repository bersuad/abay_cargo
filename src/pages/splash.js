import React, { useState } from "react";
import {Alert, View, Text, StyleSheet, Animated, Image, BackHandler, LogBox, StatusBar, Button} from 'react-native';
import Logo from './../../assets/splash_logo.png';

const Splash = ({ navigation }) => {
    state = { 
        LogoAnimate: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        SimpleText: new Animated.Value(0),
    };
    const [timePassed, setTimePassed] = useState(false);

    const {LogoAnimate, LogoText, SimpleText}= this.state;
    Animated.parallel([
        Animated.spring(LogoAnimate,{
            toValue:1,
            tension:8,
            friction:1.13,
            duration: 2500,
            
        }).start(),

        Animated.timing(LogoText, {
            toValue: 1,
            duration:2600,
        }),
        Animated.timing(SimpleText, {
            toValue: 1,
            duration:3000,
        }),
    ]);

    setTimeout(function () {
        setTimePassed(true);
    }, 5000);

    if (!timePassed) {
        return (
            <View
                style={styles.container}
            >
                <StatusBar barStyle = "white-content" hidden = {false} backgroundColor = "#1e73be" translucent = {true}/>
                <Animated.View
                    style={{
                        opacity: this.state.LogoAnimate,
                        top: this.state.LogoAnimate.interpolate({
                            inputRange:[0,1],
                            outputRange:[80,0]
                        }),
                    }}
                >
                    <Image style={styles.image} source={Logo}/>
                </Animated.View>
                
                <Text style={styles.logoText}>Abay Cargo & Delivery</Text>
                <Text style={styles.simpleText}>"Your gateway to any destination in the world."</Text>
            </View>
        );
    }
    navigation.navigate('HomeRoute');
}

export default Splash;

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
  },
  logoText:{
      color: '#002A25',
      fontSize: 25,
      marginTop: 15,
      fontWeight: '300',
  },
  simpleText:{
      color: '#002A25',
      fontSize: 14,
      marginTop: 2.9,
      fontWeight: '300',
      textAlign:'center',
  },
  image:{
      height: 150,
      width: 150,
      objectFit: 'contain'
  },
});

