import React from 'react';

import {View, Image} from 'react-native';
import Logo from './../../assets/splash_logo.png';

const ActionBarImage = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={Logo}
        style={{
          width: 40,
          height: 40,
        //   borderRadius: 100,
          marginLeft: 15,
        }}
      />
    </View>
  );
};

export default ActionBarImage;