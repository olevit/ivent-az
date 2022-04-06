import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, ImageBackground,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback, Linking } from 'react-native';
import Shadow from '../constants/shadow';
import Colors from '../constants/colors';
import { Entypo } from '@expo/vector-icons';

const ContainerButtonBuyTicket = props => {

    const buyTicket = props.buyTicket;
    const price = props.price;

    return (
        <>
            <View style={styles.container}>
                <View style={styles.containerPrice}>
                    <Text style={styles.textPrice}>Price</Text>
                    <Text style={styles.textNumberPrice}>{!!price ? price : 'FREE'}</Text>
                </View>
                {!!buyTicket ?
                <TouchableOpacity style={styles.containerButtonBuy} onPress={() => {Linking.openURL(buyTicket)}}>
                    <ImageBackground style={styles.imageShadowButton}
                        source={require("../assets/shadow-primary-small.png")}
                        resizeMode='stretch'>
                        <View style={styles.buttonBuy}>
                            <Text style={styles.textButtonBuy}>Buy Ticket</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                :
                <View style={styles.containerButtonBuyDefault}>
                    <View style={styles.buttonBuyDefault}>
                        <Text style={styles.textButtonBuyDefault}>Buy Ticket</Text>
                    </View>
                </View>
                }
            </View>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection:'row',
        paddingLeft: 24,
        paddingTop: 8,
        paddingRight: 16,
        width: '100%',
        height: 96,
        //backgroundColor:'red'
    },
    containerPrice: {
        marginTop: 8,
        justifyContent: 'center',
        marginRight: 28,
        height: 56,
    },
    textPrice:  {
        fontSize: 12,
        fontFamily: 'poppins-medium',
        color: Colors.grayMedium,
    },
    textNumberPrice: {
        fontSize: 20,
        fontFamily: 'poppins-bold',
        color: Colors.grayDark,
        fontWeight: 'bold',
    },
    containerButtonBuy: {
        flexGrow:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageShadowButton: {
        flex: 1,
        width: '100%',
        height: 88,
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonBuy: {
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 16,
        backgroundColor: Colors.primary,
    },
    containerButtonBuyDefault:{
        flex: 1,
        width: '100%',
        height: 88,
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBuyDefault: {
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 16,
        backgroundColor: Colors.backgroundImage,
    },
    textButtonBuy:{
        fontSize: 16,
        fontFamily: 'poppins-semi-bold',
        color: 'white',
    },
    textButtonBuyDefault:{
        fontSize: 16,
        fontFamily: 'poppins-semi-bold',
        color: Colors.grayLine,
    },
});

export default ContainerButtonBuyTicket;