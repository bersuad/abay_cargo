// Example: Switch from One Screen to another using React Navigation //
// https://aboutreact.com/react-native-stack-navigation //
import * as React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity } from 'react-native';
import BackImage from './../../assets/background.jpg';
import Driver from './../../assets/driver.png';
import Truck from './../../assets/truck.png';
import Logo from './../../assets/splash_logo.png';
import { ScrollView } from 'react-native-gesture-handler';

const HomeRoute = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <StatusBar barStyle = "white-content" hidden = {false} backgroundColor = "#1370a4" translucent = {true}/>
      <SafeAreaView 
        style={styles.container}
      >

        <View>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
          }}>
            <View style={{...styles.HeaderLogo, height: 120, width:120}}>
              <Image style={{...styles.buttonImage, height: 90, width:90}} source={Logo}/>
            </View>
            <Text
              style={styles.buttonText}>
              Abay Logistics PLC
            </Text>

            <TouchableOpacity style={styles.buttonCard} onPress={()=>navigation.navigate('TruckLogin')}>
              <Image style={styles.buttonImage} source={Truck}/>
            </TouchableOpacity>
            <Text style={styles.text}>Transporter Login</Text>

            <TouchableOpacity style={styles.buttonCard} onPress={()=>navigation.navigate('DriverLogin')}>
              <Image style={styles.buttonImage} source={Driver}/>
            </TouchableOpacity>
            <Text style={styles.text}>Driver Login</Text>

          </View>

          

        </View>

      </SafeAreaView>
    </ScrollView>

  );
}

export default HomeRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19788e',
  },
  HeaderLogo:{
    backgroundColor:'#FFF',
    borderRadius: 100,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    color: '#fff',
    fontWeight: 'bold'
  },

  buttonCard:{
    height: 100,
    width: 100,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1f1f1f',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  text:{
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    fontWeight: "bold",
  },

  buttonImage:{
    width: 75,
    height: 75
  }

  
});