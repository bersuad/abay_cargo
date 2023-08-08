// Example: Switch from One Screen to another using React Navigation //
// https://aboutreact.com/react-native-stack-navigation //
import * as React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, ImageBackground, Image } from 'react-native';
import BackImage from './../../assets/background.jpg';
import Driver from './../../assets/driver.png';
import Truck from './../../assets/truck.png';

const HomeRoute = ({ navigation }) => {
  return (
      <ImageBackground 
        source={BackImage}
        style={{ flex: 1,
          width: null,
          height: null,
          objectFit: 'contain'
          }}
      >
        <StatusBar barStyle = "white-content" hidden = {false} backgroundColor = "#1e73be" translucent = {true}/>

        <SafeAreaView style={styles.container}>

          <View>

            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>

              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  marginBottom: 16,
                  color: '#1f1f1f'
                }}>
                Transporter
              </Text>

            </View>

            

          </View>

        </SafeAreaView>

      </ImageBackground>
  );
}

export default HomeRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: '100%',
    height: '100%'
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#1f1f1f',
    backgroundColor: 'transparent',
  },

  buttonCard:{
    height: 120,
    width: 120,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 30,
    shadowColor: '#1f1f1f',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text:{
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: '#1f1f1f',
  },

  buttonImage:{
    width: 80,
    height: 80
  }
});