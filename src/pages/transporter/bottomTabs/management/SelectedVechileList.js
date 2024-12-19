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
    postWithAuthCallWithErrorResponse,
    Image,
    MaterialCommunityIcons
} from './../../../../components/index';

import Accordion from 'react-native-collapsible/Accordion';

export default function SelectedVechileList(props) {

    const navigation = useNavigation();
    const vehicle = props.route.params;
    
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
      
      

    const getVehicleList = async () => {
        const user_id = await AsyncStorage.getItem('user_id');
        const customer_id = await AsyncStorage.getItem('customer_id');
        const api_key = await AsyncStorage.getItem('api_key');
        const load_id = vehicle.transporter_list.offer.trip_id;
        
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
            ApiConfig.VEHICLE_LIST,
            JSON.stringify({ user_id, api_key, customer_id, load_id: load_id })
        ).then((res) => {
            
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
            this.mounted = true;
            getVehicleList();
        
            return () => {     
              setState({ ...state, isLoading: true, checkInternet:true,});
              this.mounted = false;   
            }
        }, []);

        function renderHeader(section, _, isActive) 
        {
            
            if(section.trip_vehicle_status){

                return (
                    <View>
                        <View style={styles.accordHeader}>
                            <Text style={styles.accordTitle}>
                                Owner: {section.vehicle_owner}
                                {"\n"}
                                    Type: { section.vehicle_type } 
                                {"\n"}
                                    Model: { section.vehicle_model_no }
                                {"\n"} 
                                    Plate No: {section.plate_number}
                                {"\n"} 
                                    Driver: {section.driver_name}
                                {"\n"} 
                                Nationality: {section.nationality}
                            </Text>
                            <AntDesign name={ isActive ? 'caretup' : 'caretdown' } size={18} {...appPageStyle.secondaryTextColor} />
                        </View>

                    </View>
                );
            }else{
                return (
                    <View style={{...styles.accordHeader, height:0, padding:0, margin:0}}>
                        <Text></Text>
                    </View>
                );
            }
            
        };

            function renderContent(section, _, isActive) {
            return (
                <View style={styles.accordBody}>
                    <Text style={{...styles.accordTitle, ...appPageStyle.secondaryTextColor, fontWeight: 'bold', margin: 10}}> {section.vehicle_owner}</Text>
                    
                    <View style={{...styles.iconArea, ...appPageStyle.primaryColor, height: 100, width: 100, borderRadius: 10, marginLeft: 0, marginTop:10}}>
                        {section.vehicle_images
                        && section.vehicle_images.length > 0
                        ?
                        section.vehicle_images.map((img, index) => {
                            return(

                                <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width: 100,}}
                                source={{
                                    uri: ApiConfig.BASE_URL_FOR_IMAGES+img.trip_image_url 
                                }}
                                />
                            )
                        })
                        :
                            <MaterialCommunityIcons name="truck-cargo-container" size={30} color="#fff" />
                        }
                    </View>
                    <Text style={styles.accordTitle}>
                        Driver Name: <Text style={{fontWeight: 'bold'}}>{section.vehicle_type}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Plate Number: <Text style={{fontWeight: 'bold'}}>{section.plate_number}</Text>
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
                    <Text style={{...styles.accordTitle, ...appPageStyle.secondaryTextColor, fontWeight: 'bold', margin: 10}}> Driver Details</Text>
                    
                    <Text style={styles.accordTitle}>
                        Name: <Text style={{fontWeight: 'bold'}}>{section.driver_name}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Nationality: <Text style={{fontWeight: 'bold'}}>{section.nationality}</Text>
                    </Text>
                    <Text style={styles.accordTitle}>
                        Driver Licence Number: <Text style={{fontWeight: 'bold'}}>{section.driver_licence_number}</Text>
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
        minHeight: 150,
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
        fontWeight:'bold',
    },
    accordBody: {
        paddingLeft: 25,
        width: '90%',
        minHeight: 400,
        alignContent:'space-between'
    },
    textSmall: {
        fontSize: 16
    },
    seperator: {
        height: 12
    },
    iconArea:{
        height: 100,
        width: '100%',
        backgroundColor: 'green',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    cardImage:{
        position: "absolute",
        right: 0,
        top:0,
        opacity: 0.9,
    },
});

