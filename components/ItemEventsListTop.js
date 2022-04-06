import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet,Alert, Modal, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback, Pressable } from 'react-native';
import Colors from '../constants/colors';
import Shadow from '../constants/shadow';
import db from '../firebase/config';

const ItemEventsListTop = props => {
    const time = props.event.eventDate?.toDate().toLocaleTimeString();
    const date = props.event.eventDate?.toDate().toDateString();
    const name = props.event.eventName;
    const price = props.event.eventPrice;
    const poster = props.event.eventPoster;
    const venue = props.event.eventVenue?.venueName;
    const isLast = props.isLast;
    const isFirst = props.isFirst;
    const isFirstLast = props.isFirstLast;

    return (
        <View style={isFirst ? (isFirstLast ? styles.containerShadowCardTopFirstLast
                                            : styles.containerShadowCardTopFirst)
                             : (isLast ? styles.containerShadowCardTopLast
                                       : styles.containerShadowCardTop)}>
            <TouchableOpacity style={styles.cardTop}
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate("EventDetails",
                               {event: {...props.event}})}>
                <View style={styles.containerImageEventTop}>
                    <Image style={styles.imageEventTop} source={{uri: poster}} resizeMode="cover"/>
                    <View style={styles.containerLocationTop}>
                        <Text style={styles.textEventTop}>{venue}</Text>
                    </View>
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.containerEventNamePrice}>
                        <Text style={styles.textEventName} numberOfLines={2}>{name}</Text>
                        <Text style={styles.textEventPrice} numberOfLines={1}>{!!price ? price : 'FREE'}</Text>
                    </View>
                    <View style={styles.containerDetailTop}>
                        <View style={styles.containerDateTop}>
                            <Image style={styles.imageDateTop} source={require("../assets/icons/calendar.png")} />
                            <Text style={styles.textDateTop}>{`${date?.slice(0,3)},${date?.slice(7,10)}${date?.slice(3,7)}`}</Text>
                        </View>
                        <View style={styles.containerDateTop}>
                            <Image style={styles.imageTimeTop} source={require("../assets/icons/time-circle.png")} />
                            <Text style={styles.textDateTop}>{time?.slice(0,5)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    containerShadowCardTop: {
        paddingTop:24,
        paddingHorizontal: 8,
        paddingBottom: 16,
        borderRadius: 16,
    },
    containerShadowCardTopFirstLast: {
        paddingTop:24,
        paddingBottom: 16,
        borderRadius: 16,
        paddingHorizontal: 24
    },
    containerShadowCardTopFirst: {
        paddingTop:24,
        paddingRight: 8,
        paddingBottom: 16,
        borderRadius: 16,
        paddingLeft: 24,
    },
    containerShadowCardTopLast: {
        paddingTop:24,
        paddingLeft: 8,
        paddingBottom: 16,
        borderRadius: 16,
        paddingRight: 24
    },
    cardTop: {
        ...Shadow.mainShadow,
        borderRadius: 16,
        padding: 16,
        width: 297,
        height: 341,
        //justifyContent: 'space-between',
        //alignItems: 'center'
    },
    containerImageEventTop: {
        width: '100%',
        height: 205,
        borderRadius: 16,
        backgroundColor: Colors.backgroundImage,
        overflow: 'hidden',
    },
    imageEventTop: {
        width: '100%',
        height: '100%',
    },
    containerLocationTop: {
        backgroundColor:'white',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        left: 12,
        bottom: 12,
        borderRadius: 8,
        maxWidth: 241
    },
    textEventTop: {
        color: Colors.grayMedium,
        fontSize: 10,
        fontFamily:'poppins-medium',
        fontWeight: '500',
    },
    containerBottom: {
        justifyContent: 'space-between',
        flexGrow:1,
        width: '100%',
        marginTop: 16,
        marginBottom: 9
    },
    containerEventNamePrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    textEventName: {
        color: Colors.grayDark,
        fontSize: 14,
        fontFamily:'poppins-bold',
        maxWidth: 165,
        fontWeight: 'bold',
    },
    textEventPrice: {
        color: Colors.grayDark,
        fontSize: 14,
        fontFamily:'poppins-bold',
        maxWidth: 100,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    containerDetailTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    imageDateTop: {
        width: 18,
        height: 20,
        marginRight: 7,
        marginLeft: 3
    },
    imageTimeTop: {
        width: 20,
        height: 20,
        marginRight: 6,
    },
    containerDateTop:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textDateTop: {
        color: Colors.grayMedium,
        fontSize: 10,
        fontFamily:'poppins-medium',
        maxWidth: 90,
        maxHeight: 22,
    },
});

export default ItemEventsListTop;