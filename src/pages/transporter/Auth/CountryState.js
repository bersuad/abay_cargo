import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity }from "./../../../components/index";
import { Picker } from '@react-native-picker/picker';
import CountryPicker from 'react-native-country-picker-modal';
import { Country, City, State } from 'react-country-state-city';


const CountryStateCitySelector = () => {

    const [country, setCountry] = useState(null); 
    const [state, setState] = useState(null); 
    const [city, setCity] = useState(null); 
    const [isVisible, setIsVisible] = useState(false); 
    const onSelectCountry = (country) => { 
        setCountry(country); 
        setState(null); 
        setCity(null); 
    }; 
    
return ( 
    <View style={styles.container}> 
        {/* <Text style={styles.label}>Select Country</Text>  */}
        <CountryPicker visible={isVisible} onSelect={onSelectCountry} onClose={() => setIsVisible(false)} withFilter={true} withFlag={true} withCountryNameButton={true} />
        <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.picker}> 
            <Text>{country ? country.name : 'Select Country'}</Text> 
        </TouchableOpacity> 
        
    </View> );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%"
  },
  label: {
    color: '#090909',
    fontSize: 13,
    alignSelf:'flex-start',
    marginLeft: 10,
    padding: 15
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: "rgba(240,138,41, 0.3)",
    borderRadius: 10,
    width: '95%',
    height: 45,
    marginBottom: 10,
  },
});

export default CountryStateCitySelector;
