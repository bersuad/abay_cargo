import React, { useState, useEffect } from "react";

import {
    View,
    Text,
    StyleSheet,
    Animated,
    Image,
    StatusBar,
    Logo,
    AsyncStorage,
    LogBox,
    useNavigation
} from './../components/index';

export default function Splash() {

    const navigation = useNavigation();
    
    const [state, setState] = useState({
        isUserLoggedIn: false,
        isLoading: false,
        checkInternet:true,
        LogoAnimate: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        SimpleText: new Animated.Value(0),
    });

    const componentWillMount = () => {
        useEffect( () => {
          // Anything in here is fired on component unmount.
            LogBox.ignoreLogs(['componentWillReceiveProps', 'componentWillMount']);
            this.mounted = true;
            this._checkUser();

            return () => {
                // Anything in here is fired on component unmount.
                setState({ ...state, isLoading: false, checkInternet:true,});
                this.mounted = false;
            }
        }, []);
    }
    
    componentWillMount();
    
    
    const [timePassed, setTimePassed] = useState(false);

    

    _checkUser = async () =>{
        AsyncStorage.getItem('user_id').then(value =>
            value === null ? setState({...state, isUserLoggedIn:false}) : setState({...state, isUserLoggedIn:true},
                console.log(value),
            ),
        );
    }

    Animated.parallel([
        Animated.spring(state.LogoAnimate,{
            toValue:1,
            tension:8,
            friction:1.13,
            duration: 2500,
            
        }).start(),

        Animated.timing(state.LogoText, {
            toValue: 1,
            duration:2600,
        }),
        Animated.timing(state.SimpleText, {
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
                        opacity: state.LogoAnimate,
                        top: state.LogoAnimate.interpolate({
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
    
    if (state.isUserLoggedIn) {
        navigation.navigate('TransporterDashboard');
    }else{
        navigation.navigate('HomeRoute');
    }
}

// export default Splash;

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
  },
  logoText:{
      color: '#19788e',
      fontSize: 25,
      marginTop: 15,
      fontWeight: '300',
  },
  simpleText:{
      color: '#19788e',
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

