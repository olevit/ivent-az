import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback, Linking } from 'react-native';
import Shadow from '../constants/shadow';
import Colors from '../constants/colors';
import { Entypo } from '@expo/vector-icons';

const ContainerDateLocal = props => {
    const eventLink = props.eventLink;
    const time = props.time;
    const venue = props.venue;
    const date = props.date;
    const dateCalendar = props.dateCalendar;
    const showButtonSeeDetails = props.showButtonSeeDetails;
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=',
        web: 'https://www.google.de/maps/@' });
    const latLng = `${venue?.coordinate?.latitude},${venue?.coordinate?.longitude}`;
    const label = venue?.venueName;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
      web: `${scheme}${latLng}?q=${label}`
    });

    const openCalendar = () => {
        if(Platform.OS === 'ios') {
          Linking.openURL('calshow:');
        } else if(Platform.OS === 'android') {
          Linking.openURL('content://com.android.calendar/time/');
        }
         else {
          Linking.openURL('https://calendar.google.com/calendar/u/0/r/day/' + `${dateCalendar.getFullYear()}/${dateCalendar.getMonth() + 1}/${dateCalendar.getDate()}?tab=cc`);
        }
    };

    return (
        <View style={styles.containerShadowDateLocation}>
            <View style={styles.containerDateLocation}>
                <View style={styles.containerDate}>
                    <View style={styles.containerInnerLeft}>
                        <View style={styles.containerIconDate}>
                            <Image style={styles.imageDate}
                                source={require("../assets/icons/calendar.png")} />
                        </View>
                        <Text style={styles.textDate}>
                            {`${date?.slice(0,3)},${date?.slice(7,10)}${date?.slice(3,7)}`}
                        </Text>
                        <Entypo name="dot-single" size={13} color={Colors.grayDark}
                            style={{marginHorizontal: 3}} />
                        <Text style={styles.textDate}>{time?.slice(0,5)}</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonRight} onPress ={openCalendar}>
                        <Text style={styles.textButton}>Add to</Text>
                        <Image style={styles.imageGoogleCalendar}
                            source={require("../assets/icons/google-calendar.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerLocation}>
                    <View style={styles.containerInnerLeft}>
                        <View style={styles.containerIconLocation}>
                            <Image style={styles.imageLocation}
                                source={require("../assets/icons/location.png")}/>
                        </View>
                        <Text style={showButtonSeeDetails ? styles.textLocationSmall
                            : styles.textLocationBig}>{venue?.venueName}</Text>
                    </View>
                    {showButtonSeeDetails &&
                        <TouchableOpacity style={styles.buttonRight} onPress={() => {!!eventLink
                            ? Linking.openURL(eventLink) : Linking.openURL(url)}}>
                            <Text style={styles.textButton}>See Details</Text>
                            <Image style={styles.imageSend}
                                source={require("../assets/icons/send.png")}/>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerShadowDateLocation:{
        padding: 24,
        width: '100%',
    },
    containerDateLocation: {
        ...Shadow.mainShadow,
        borderRadius: 16,
        width: '100%',
        justifyContent: "flex-start",
        alignItems:'center',
        padding: 16
    },
    containerDate: {
        width:'100%',
        borderBottomColor: '#F0EFF1',
        borderBottomWidth: 1,
        paddingBottom: 16,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerLocation: {
        width:'100%',
        paddingTop: 16,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerInnerLeft: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    containerIconDate: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 12,
        backgroundColor: '#FFE0E0'
    },
    containerIconLocation: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 12,
        backgroundColor: '#FFF5E0'
    },
    imageDate: {
        width: 12,
        height: 13.33,
    },
    imageLocation: {
        width: 11.33,
        height: 13.33,
    },
    textDate: {
        fontSize: 12,
        fontFamily: 'poppins-semi-bold',
        color: Colors.grayDark,
    },
    textLocationSmall: {
        fontSize: 12,
        fontFamily: 'poppins-semi-bold',
        color: Colors.grayDark,
        width: Dimensions.get('window').width - 231,
        fontWeight: '600',
    },
    textLocationBig: {
        fontSize: 12,
        fontFamily: 'poppins-semi-bold',
        color: Colors.grayDark,
        width: Dimensions.get('window').width - 132,
        fontWeight: '600',
    },
    buttonRight: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primary,
        height: 27,
        paddingHorizontal: 8,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton:{
         fontSize: 10,
         fontFamily: 'poppins-medium',
         color: Colors.primary,
    },
    imageGoogleCalendar: {
        marginLeft: 3,
        width: 14,
        height: 14,
    },
    imageSend: {
        width: 10.5,
        height: 10.5,
        marginLeft: 4
    },
});

export default ContainerDateLocal;