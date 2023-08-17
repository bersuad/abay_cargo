import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import HomeScreen from "./transporterDashboard";
import UserScreen from "./transporterRegistration";
import SettingScreen from "./transporter_login";

const TabNavigator = createMaterialBottomTabNavigator(
{
	Home: {
    screen: HomeScreen,
    navigationOptions: {
      showLabel: false,
      tabBarLabel:() => {return null},
      
      tabBarIcon: (tabInfo) => (
        <Ionicons
          name="md-home"
          size={tabInfo.focused ? 20 : 17}
          color={tabInfo.tintColor}
        />
      ),
      tabBarOptions: {
        style: {
            backgroundColor: '#f9f9f9',
        },
      },
    },

	},
	User: {
	screen: UserScreen,
	navigationOptions: {
		tabBarLabel:() => {return null},
		tabBarIcon: (tabInfo) => (
		<Ionicons
			name="swap-horizontal"
			size={tabInfo.focused ? 20 : 17}
			color={tabInfo.tintColor}
		/>
		),
	},
	},
  Offer: {
    screen: UserScreen,
    navigationOptions: {
      tabBarLabel:() => {return null},
      tabBarIcon: (tabInfo) => (
        <MaterialCommunityIcons 
          name="offer" 
          size={tabInfo.focused ? 20 : 17}
          color={tabInfo.tintColor}
        />
      ),
    },
    },
	Setting: {
	screen: SettingScreen,
	navigationOptions: {
		tabBarLabel:() => {return null},
		tabBarIcon: (tabInfo) => (
		<Ionicons
			name="md-settings-outline"
			size={tabInfo.focused ? 20 : 17}
			color={tabInfo.tintColor}
		/>
		),
	},
	},
},
{
	initialRouteName: "Home",
  activeColor: 'rgba(25, 120, 142, 1)',
  inactiveColor: 'rgba(25, 120, 142, 0.88)',
  gestureEnabled: true,
  gestureDirection: 'horizontal',
	barStyle: {
    paddingVertical: Platform.OS === 'ios' ? 0 : 0, 
    borderTopColor:'rgba(25, 120, 142, 0.5)', 
    borderTopWidth:1, 
    backgroundColor: "#ffffff", 
    height: Platform.OS === 'ios' ? 75 : 60, 
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
