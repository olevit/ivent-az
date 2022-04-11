import React, { useState, useEffect } from "react";
import { StyleSheet,Alert, Modal, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Colors from '../constants/colors';
import Shadow from '../constants/shadow';

const SearchInput = props => {

    const [searchPhrase, setSearchPhrase] = useState('');

    return (
         <View style={props.shadow ? styles.containerSearchInputShadow : styles.containerSearchInput}>
            <Image style={styles.imageSearch} source={require("../assets/icons/search.png")}/>
            <TextInput
                style={styles.inputSearch}
                placeholder="Search Event"
                placeholderTextColor={Colors.grayLight}
                returnKeyType='search'
                value={searchPhrase}
                onChangeText={(text) => setSearchPhrase(text)}
                onSubmitEditing={()=> {
                    props.navigation.navigate("Search",{searchText: searchPhrase});
                    setSearchPhrase('');
                }}
            />
            <TouchableOpacity style={styles.buttonFilter} onPress={props.openModal}>
                  <Image style={styles.imageFilter} source={require("../assets/icons/filter.png")}/>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    containerSearchInput: {
        height: 48,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    containerSearchInputShadow: {
        ...Shadow.mainShadow,
        height: 48,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    imageSearch: {
        width: 21,
        height: 21,
        marginHorizontal: 16,
    },
    inputSearch: {
        fontFamily: 'poppins',
        fontSize: 12,
        paddingRight: 10,
        flexGrow: 1,
        borderRightColor: Colors.grayLine,
        borderRightWidth: 1,
        minWidth: 5,
    },
    buttonFilter:{
        //flexShrink: 1,
        paddingLeft: 10,
        height:'100%',
        paddingRight: 16,
        alignItems:'center',
        justifyContent: 'center',
    },
    imageFilter: {
        width: 16,
        height: 14
    }
});

export default SearchInput;