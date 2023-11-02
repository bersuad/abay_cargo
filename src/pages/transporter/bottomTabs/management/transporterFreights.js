import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import OnGoingFright from './ongoingFright';
import UpComingFright from './upComingFright';
import CompletedFright from './completedFright';

const FirstRoute = () => (
  <UpComingFright/>
  );
  
const SecondRoute = () => (
  <OnGoingFright/>
);

const CompletedRoute = () => (
  <CompletedFright/>
);

const renderScene = SceneMap({
  upcoming: FirstRoute,
  ongoing: SecondRoute,
  completed: CompletedRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'upcoming', title: 'Upcoming' },
    { key: 'ongoing', title: 'Ongoing' },
    { key: 'completed', title: 'Completed' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}