import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FrightVehicleDetail from './frightVechicleDetails';
import OfferGoodsDetails from './goodsDetails';
import { appPageStyle } from '../../../../components';
import {
    useNavigation,
} from './../../../../components/index';


const FirstRoute = () => (
  <OfferGoodsDetails navigation/>
  );
  
const SecondRoute = () => (
  <FrightVehicleDetail/>
);

const renderScene = SceneMap({
  goods: FirstRoute,
  vehicle: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'goods', title: 'Goods Details' },
    { key: 'vehicle', title: 'Vehicle Details' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <TabBar {...props} style={{...appPageStyle.primaryColor, }}/>}
    />
  );
}