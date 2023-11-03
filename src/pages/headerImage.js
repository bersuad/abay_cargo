import React from 'react';

import {
  View,
  Image,
  Logo,
} from './../components/index'

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
          marginBottom: 5
        }}
      />
    </View>
  );
};

export default ActionBarImage;