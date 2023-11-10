import React from 'react';

import  {
  View,
  Text,
  TouchableOpacity,
  Ionicons,
  useNavigation
} from './../../components/index';
import appPageStyle from '../../styles/common';

const NotificationBar = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{flexDirection: 'row', height: "100%", marginTop: 10}} onPress={()=>navigation.navigate('NotificationList')}>
      <Ionicons name="md-notifications" size={22} {...appPageStyle.secondaryTextColor} style={{marginRight: 25, marginTop: 6}}/>
      <View style={{width: 20, height: 20, ...appPageStyle.primaryColor, alignItems: "center", justifyContent: "center", borderRadius: 100, position: 'absolute', marginLeft: 12, marginTop: 3}}>
        <Text style={{ fontWeight: 600,...appPageStyle.primaryTextColor , fontSize: 12 }}>10</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationBar;