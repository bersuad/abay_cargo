import React, { useState} from 'react';

import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    AntDesign,
    Button,
    SafeAreaView
} from './../../../../components/index';

import Accordion from 'react-native-collapsible/Accordion';

function App(): JSX.Element {
  const [ activeSections, setActiveSections ] = useState([]);
  const sections = [
    {
      title: 'Lorem ipsum dolor sit amet',
      content: <Text style={styles.textSmall}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
      </Text>
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      content: <Text style={styles.textSmall}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
      </Text>
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      content:  <><Text style={styles.textSmall}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </Text>
        <View style={styles.seperator}></View>
        <Button title="Read more..."/>
      </>
    }
  ];

  function renderHeader(section, _, isActive) {
    return (
        <View style={styles.accordHeader}>
            <Text style={styles.accordTitle}>{ section.title }</Text>
            <AntDesign name={ isActive ? 'caretup' : 'caretdown' } size={18} color="#19788e" />
        </View>
    );
};

    function renderContent(section, _, isActive) {
    return (
        <View style={styles.accordBody}>
            {section.content}
        </View>
    );
    }
    return (
    <SafeAreaView style={styles.container}>
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
            <Accordion
                align="bottom"
                sections={sections}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={(sections) => setActiveSections(sections)}
                sectionContainerStyle={styles.accordContainer}
            />
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
        width: '99%',
        alignItems: "center",
        alignSelf:'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    accordTitle: {
        fontSize: 20,
    },
    accordBody: {
        padding: 12,
        width: '90%'
    },
    textSmall: {
        fontSize: 16
    },
    seperator: {
        height: 12
    }
});

export default App;