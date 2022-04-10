import React, { useState, useEffect } from "react";
import { Share, StyleSheet,Alert, Modal, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback, } from 'react-native';
import Colors from '../constants/colors';
import db from '../firebase/config';

const ShareButton = props => {
    const eventLink = props.eventLink;
    const eventName = props.eventName;
    //const [notification, setNotification] = useState([]);


    /*const getEventNotification = async () =>{
        await db
          .firestore()
          .collection('notification')
          .onSnapshot((data) =>
            setNotification(data.docs.map((doc) => ({...doc.data()})))
          );
    };

    useEffect(()=> {
        getEventNotification();
    },[]);*/

    const onShare = async () => {
        try {
          const result = await Share.share({
            message: `${eventName}\n`+ 'https://ivent-az-olevit.vercel.app/',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {} else {}
          } else if (result.action === Share.dismissedAction) {}
        } catch (error) {
          alert(error.message);
        }
      };

    return (
         <TouchableOpacity style={styles.buttonShare} onPress={onShare}>
              <Image style={styles.imageShare} source={require('../assets/icons/share.png')}/>
         </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    buttonShare: {
      height: 40,
      width: 40,
      alignItems:'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: 'white',
    },
    imageShare: {
       width: 16,
       height: 16,
    },
});

export default ShareButton;