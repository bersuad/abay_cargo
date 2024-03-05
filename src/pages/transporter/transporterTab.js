import React from "react";

import{
  Ionicons,
  MaterialCommunityIcons,
  createAppContainer,
  createMaterialBottomTabNavigator
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
      tabBarIcon: (tabInfo) => (
        <Ionicons
          name="md-home"
          size={tabInfo.focused ? 20 : 19}
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
	TransporterManagmentSystem: {
	screen: transporterManagmentSystem,
  title: "Transporter Management System",
	navigationOptions: {
    tabBarLabel:() => {return null},
		tabBarIcon: (tabInfo) => (
      <MaterialCommunityIcons 
        name="offer" 
        size={tabInfo.focused ? 20 : 19}
        color={tabInfo.tintColor}
      />
		),
	},
	},
  transportMarketPlace: {
    screen: transportMarketPlace,
    navigationOptions: {
      tabBarLabel:() => {return null},
      tabBarIcon: (tabInfo) => (
        <Ionicons name="notifications"
          size={tabInfo.focused ? 20 : 19}  
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
			size={tabInfo.focused ? 20 : 19}
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
