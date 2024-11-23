import React from 'react';

import {
  View,
  Image,
  Logo,
  whiteLogo
} from './../components/index'

const ActionBarImage = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={whiteLogo}
        style={{
          width: 40,
          height: 40,
          objectFit: "fill" ,
          marginLeft: 20,
          marginBottom: 5
        }}
      />
    </View>
  );
};

export default ActionBarImage;