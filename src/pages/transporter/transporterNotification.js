import React from 'react';

import  {
  View,
  Text,
  TouchableOpacity,
  Ionicons
} from './../../components/index';

const NotificationBar = () => {
  return (
    <TouchableOpacity style={{flexDirection: 'row', height: "100%", marginTop: 10}}>
      <Ionicons name="md-notifications" size={22} color="#19788e" style={{marginRight: 25, marginTop: 6}}/>
      <View style={{width: 20, height: 20, backgroundColor: '#19788e', alignItems: "center", justifyContent: "center", borderRadius: 100, position: 'absolute', marginLeft: 12, marginTop: 3}}>
        <Text style={{ fontWeight: 600, color: '#fff', fontSize: 12 }}>10</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationBar;