import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback,
         ImageBackground, Linking } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Colors from '../constants/colors';
import Shadow from '../constants/shadow';
import ShareButton from '../components/ShareButton';
import BackButton from '../components/BackButton';
import ContainerDescription from '../components/ContainerDescription';
import ContainerDateLocal from '../components/ContainerDateLocal';
import ContainerOrganizer from '../components/ContainerOrganizer';
import ContainerSponsors from '../components/ContainerSponsors';
import ContainerButtonBuyTicket from '../components/ContainerButtonBuyTicket';
import LineTop from '../components/LineTop';
import { Entypo } from '@expo/vector-icons';
import db from "../firebase/config";


export default function EventDetails({ route, navigation }){

     const {event} = route.params;
     const poster = event.eventPoster;
     const time = event.eventDate?.toDate().toLocaleTimeString();
     const date = event.eventDate?.toDate().toDateString();
     const dateCalendar = event.eventDate?.toDate().toLocaleString();
     const name = event.eventName;
     const price = event.eventPrice;
     const organizer = event.eventOrganizer;
     const description = event.eventDescription;
     const sponsors = event.eventSponsors;
     const buyTicket = event.eventBuyTicket;
     const eventLink = event.eventLink;
     const venue = event.eventVenue;
     const showButtonSeeDetails = !!venue?.coordinate?.latitude || !!venue?.coordinate?.longitude
        || !!eventLink;
     const showContainerOrganizer =!!organizer.organizerName || !!organizer.organizerImage
        || !!organizer.organizerPhone || !!organizer.organizerWhatsapp;
     const showContainerSponsors = !!sponsors[0] || !!sponsors[1] || !!sponsors[2] || !!sponsors[3]
        || !!sponsors[4];

     return(
         <View style={styles.container}>
            <ImageBackground
                        style={styles.imageBackground}
                        source={{uri: poster}}>
                <View style={styles.containerTop}>
                    <BackButton
                        style={false}
                        onBack={() => navigation.dispatch(CommonActions.goBack())}/>
                    <ShareButton eventLink={eventLink} eventName={name} />
                </View>
                <View style={styles.containerMain}>
                    <View style={{width: '100%'}}>
                        <LineTop style = {true}/>
                        <Text style={styles.textTitle}>{name}</Text>
                    </View>
                    <ScrollView style={styles.containerScroll}>
                        <ContainerDescription description={description}/>
                        <ContainerDateLocal time={time} date={date} venue={venue}
                            dateCalendar={dateCalendar}
                            showButtonSeeDetails={showButtonSeeDetails}
                            eventLink={eventLink}/>
                        <ContainerOrganizer showContainerOrganizer={showContainerOrganizer}
                            organizer={organizer}/>
                        <ContainerSponsors sponsors={sponsors} showContainerSponsors={showContainerSponsors}/>
                    </ScrollView>
                    <ContainerButtonBuyTicket buyTicket={buyTicket} price={price}/>
                </View>
            </ImageBackground>
         </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageBackground: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').width < Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height,
        resizeMode: "cover",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 32,
    },
    containerTop: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 24,
    },
    containerMain: {
        width: "100%",
        maxHeight: Dimensions.get('window').width < Dimensions.get('window').height
            ? Dimensions.get('window').height - Dimensions.get('window').width / 2
            : Dimensions.get('window').height / 3 * 2,
        minHeight: Dimensions.get('window').height - Dimensions.get('window').width + 24,
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerScroll: {
        width: '100%',
        flexGrow: 1,
    },
    textTitle: {
         width: '100%',
         fontSize: 20,
         fontFamily: 'poppins-bold',
         color: Colors.grayDark,
         paddingHorizontal: 24,
         paddingVertical: 16,
         fontWeight: 'bold',
    },
});