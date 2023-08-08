import React from 'react';
import { NavigationActions } from 'react-navigation';
import { Drawer } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';



export default class SideMenu extends React.Component {
  state = {
    active: 'home',
  };

  navigateToScreen = (route, active) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.setState({ active });
  }

  render () {
    const { active } = this.state;
    return (
      <Drawer.Section title="Some title">
        
     </Drawer.Section>
    );
  }
}