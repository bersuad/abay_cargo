import React, { useState, useEffect } from "react";

import {
    useNavigation,
    ScrollView,
    View,
    StyleSheet,
    Text,
    AntDesign,
    Button,
    SafeAreaView,
    appPageStyle,
    ApiConfig,
    ActivityIndicator,
    StatusBar,
    AsyncStorage,
    postWithAuthCallWithErrorResponse
} from './../../../../components/index';

import Accordion from 'react-native-collapsible/Accordion';

export default function OfferGoodsDetails(props) {

    const navigation = useNavigation();
    const offer = props.route.params.details;
    const [state, setState] = useState({
        isLoading: true,
        checkInternet:true,
        tariffExportList:'',
        tariffImprotList:'',
        customerData:'',
        customer_id:'',
        user_id:'',
        api_key: '',
        from_date:'',
        to_date:''
    });
    const [customer_id, setMyClientID]        = useState('');
      const [api_key, setAPI_KEY]               = useState('');
      const [user_id, setMyUserID]              = useState('');
      const [offerLoadData, setOfferLoadData ]  = useState([]);
      const [user_details, setUserDetails]      = useState('');
      const [ sections, setSections ] = useState();
      
      

    const getFrightDetails = async () => {
        const user_id = await AsyncStorage.getItem('user_id');
        const customer_id = await AsyncStorage.getItem('customer_id');
        const api_key = await AsyncStorage.getItem('api_key');
        
        await AsyncStorage.getItem('customer_id').then((myClientID) => {
            setMyClientID(myClientID);
        });
        
        await AsyncStorage.getItem('api_key').then(value =>{
            setAPI_KEY(value);
        });
    
        await AsyncStorage.getItem('user_id').then(value =>{
            setMyUserID(value);
        });
    
        await AsyncStorage.getItem('userDetails').then(value =>{
            setUserDetails(value);
        });  

        postWithAuthCallWithErrorResponse(
            ApiConfig.VEHICLE_LIST_BY_LOADID,
            JSON.stringify({ user_id, api_key, customer_id, load_id: offer.trip_id })
        ).then((res) => {
            console.log(res.json.vehicle_list);
          if (res.json.message === 
            "Invalid user authentication,Please try to relogin with exact credentials.") {
                setState({ ...state, isLoading: false});  
                AsyncStorage.clear();
                navigation.navigate('TruckLogin');
                return;
          }
          if (res.json.result) {
            setSections(res.json.vehicle_list);
          }
        });
      };
    
        const [ activeSections, setActiveSections ] = useState([]);

        useEffect(() => {
      
            // Anything in here is fired on component unmount.
            this.mounted = true;
            getFrightDetails();
        
            return () => {     
              setState({ ...state, isLoading: true, checkInternet:true,});
              this.mounted = false;   
            }
        }, []);

        function renderHeader(section, _, isActive) {
            return (
                <View style={styles.accordHeader}>
                    <Text style={styles.accordTitle}>{ section.plate_number } / { section.vehicle_type }</Text>
                    <AntDesign name={ isActive ? 'caretup' : 'caretdown' } size={18} {...appPageStyle.secondaryTextColor} />
                </View>
            );
        };

            function renderContent(section, _, isActive) {
            return (
                <View style={styles.accordBody}>
                    <Text style={styles.accordTitle}>
                        Owner Name: <Text style={{fontWeight: 'bold'}}>{section.vehicle_owner}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Vehicle Type: <Text style={{fontWeight: 'bold'}}>{section.vehicle_type}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Model: <Text style={{fontWeight: 'bold'}}>{section.vehicle_model_no}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Plate No.: <Text style={{fontWeight: 'bold'}}>{section.plate_number}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Chassis Number: <Text style={{fontWeight: 'bold'}}>{section.vehicle_chassis_no}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Motor Number: <Text style={{fontWeight: 'bold'}}>{section.vehicle_motor_no}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Vehicle Load Capacity: <Text style={{fontWeight: 'bold'}}>{section.vehicle_load_capacity}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Initial km: <Text style={{fontWeight: 'bold'}}>{section.vehicle_initial_km}</Text>
                    </Text>
                    <Text style={{...styles.accordTitle, marginLeft: 0, marginTop:25, fontWeight:'bold', marginBottom:10}}>
                        GPS Availability
                    </Text>
                    <Text style={styles.accordTitle}>
                        Vendor Name: <Text style={{fontWeight: 'bold'}}>{section.vehicle_vendor_name}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Vendor Contact: <Text style={{fontWeight: 'bold'}}>{section.vehicle_vendor_contact}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Vendor Platform: <Text style={{fontWeight: 'bold'}}>{section.vehicle_vendor_platform}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Vendor Address: <Text style={{fontWeight: 'bold'}}>{section.vehicle_vendor_address}</Text>
                    </Text>
                </View>
            );
            }
            return (
            <SafeAreaView style={styles.container}>
                
                <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.container}>
                    {sections && sections && sections.length > 0 ?(
                        <Accordion
                            align="bottom"
                            sections={sections}
                            activeSections={activeSections}
                            renderHeader={renderHeader}
                            renderContent={renderContent}
                            onChange={(sections) => setActiveSections(sections)}
                            sectionContainerStyle={styles.accordContainer}
                        />
                    ):
                        <Text style={{...styles.accordTitle, marginLeft: 50}}>No Vehicle Found.</Text>
                    }
                </ScrollView>
            </SafeAreaView>
            );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    accordContainer: {
        paddingBottom: 4,
        marginTop: 8,
    },
    accordHeader: {
        height: 70,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#19788e',
        shadowOpacity: 0.2,
        elevation: 1,
        width: '95%',
        alignItems: "center",
        alignSelf:'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10
    },
    accordTitle: {
        fontSize: 20,
    },
    accordBody: {
        paddingLeft: 25,
        width: '90%',
        minHeight: 300
    },
    textSmall: {
        fontSize: 16
    },
    seperator: {
        height: 12
    }
});

