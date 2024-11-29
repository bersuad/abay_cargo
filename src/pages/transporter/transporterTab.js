import React from "react";

import{
  Ionicons,
  MaterialCommunityIcons,
  createAppContainer,
  createMaterialBottomTabNavigator,
  View,
  StyleSheet,
  Text,
  FontAwesome5
} from './../../components/index';

import HomeScreen from "./bottomTabs/transporterDashboard";
import transporterManagmentSystem from "./bottomTabs/transporterManagmentSystem";
import transportMarketPlace from "./bottomTabs/transportMarketplace";
import SettingScreen from "./bottomTabs/transporterSetting";


const TabNavigator = createMaterialBottomTabNavigator(
{
	Home: {
    screen: HomeScreen,
    title:"Home",
    navigationOptions: {
      tabBarLabel:() => {return null},
      
      tabBarIcon: ({focused}) => {
        return focused ? (
          <View style={styles.labelFocusedContainer}>
            <Ionicons name="home" size={20} color={"rgba(240,138,41,1)"}/>
          </View>
        ) : (
          <View style={styles.labelContainer}>
            <Ionicons name="home" size={19} color={"rgba(240,138,41,1)"}/>
          </View>
        );
      },
    },

	},
	TransporterManagmentSystem: {
	screen: transporterManagmentSystem,
  title: "Transporter Management System",
	navigationOptions: {
    tabBarLabel:() => {return null},
    tabBarIcon: ({focused}) => {
      return focused ? (
        <View style={styles.labelFocusedContainer}>
          <MaterialCommunityIcons name="offer" size={20}  color={"rgba(240,138,41,1)"}/>
        </View>
      ) : (
        <View style={styles.labelContainer}>
          <MaterialCommunityIcons name="offer" size={19} color={"rgba(240,138,41,1)"}/>
        </View>
      );
    },
	},
	},
  transportMarketPlace: {
    screen: transportMarketPlace,
    navigationOptions: {
      tabBarLabel:() => {return null},
      tabBarIcon: ({focused}) => {
        return focused ? (
          <View style={styles.labelFocusedContainer}>
            <FontAwesome5 name="truck-loading" size={20} color={"rgba(240,138,41,1)"}/>
          </View>
        ) : (
          <View style={styles.labelContainer}>
            <FontAwesome5 name="truck-loading" size={19} color={"rgba(240,138,41,1)"}/>
          </View>
        );
      },
      
    },
    },
	Setting: {
	screen: SettingScreen,
	navigationOptions: {
		tabBarLabel:() => {return null},
    tabBarIcon: ({focused}) => {
      return focused ? (
        <View style={styles.labelFocusedContainer}>
          <Ionicons name="settings-outline" size={20} color={"rgba(240,138,41,1)"}/>
        </View>
      ) : (
        <View style={styles.labelContainer}>
          <Ionicons name="settings-outline" size={19} color={"rgba(240,138,41,1)"}/>
        </View>
      );
    },
	},
	},
},
{
	initialRouteName: "Home",
  activeColor: 'rgba(240,138,41,1)',
  inactiveColor: 'rgba(240,138,41,0.88)',
  gestureEnabled: true,
  gestureDirection: 'horizontal',
	barStyle: {
    paddingVertical: 0, 
    borderTopColor:'rgba(240,138,41,0.5)', 
    borderTopWidth:1, 
    backgroundColor: "#ffffff", 
    height: 60, 
    marginBottom: 5
  },

}
);

const Navigator = createAppContainer(TabNavigator);

export default function App() {
return (
	<Navigator>
    <HomeScreen />
	</Navigator>
);
}

const styles = StyleSheet.create({
  labelContainer: {
    alignItems: 'center',
    width: '100%',
  },
  labelFocusedContainer: {
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'rgba(240,138,41,0.5)',
    width: 100,
    minWidth: '100%',
    maxWidth: 300,
    height:300,
    backgroundColor:'rgba(240,138,41,0.3)',
    paddingTop: 10,
    marginTop: -8
  },
  labelFocusedStyle: {
    textAlign: 'center',
    marginVertical: 8,
    color: 'blue',
    backgroundColor: 'transparent',
    fontSize: 10,
  },
  labelStyle: {
    textAlign: 'center',
    marginVertical: 8,
    color: 'red',
    backgroundColor: 'transparent',
    fontSize: 10,
  },
});

