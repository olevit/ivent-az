import React, { useState, useEffect } from "react";
import { StyleSheet,Alert, Modal, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Colors from '../constants/colors';

const LineTop = props => {
        return (
        <View style={props.style ? styles.containerPaddingVertical : styles.container}>
            <View style={styles.topLine}/>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        width: '100%',
        paddingTop: 8,
        justifyContent: "center",
        alignItems:'center',
    },
    containerPaddingVertical:{
        width: '100%',
        paddingVertical: 8,
        justifyContent: "center",
        alignItems:'center',
    },
    topLine: {
        height: 4,
        width: 40,
        backgroundColor: Colors.grayLine,
        borderRadius: 99
    },
});

export default LineTop;