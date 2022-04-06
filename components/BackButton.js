import React, { useState, useEffect } from "react";
import { StyleSheet,Alert, Modal, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Colors from '../constants/colors';

const BackButton = props => {
        return (
         <TouchableOpacity style={props.style ? styles.buttonBackWithMargin : styles.buttonBack} onPress={props.onBack}>
              <Image style={styles.imageBack} source={require("../assets/icons/arrow-left.png")}/>
         </TouchableOpacity>
    );
};
const styles = StyleSheet.create({

    buttonBack: {
      height: 40,
      width: 40,
      alignItems:'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: 'white',
    },
    buttonBackWithMargin: {
      height: 40,
      width: 40,
      alignItems:'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: 'white',
      marginRight: 11
    },
    imageBack: {
       width: 8,
       height: 12,
    },
});

export default BackButton;