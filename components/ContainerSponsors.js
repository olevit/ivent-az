import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback, Linking } from 'react-native';
import Shadow from '../constants/shadow';
import Colors from '../constants/colors';

const ContainerSponsors = props => {
    const sponsors = props.sponsors;
    const showContainerSponsors = props.showContainerSponsors;
    return (
        <>
        {showContainerSponsors &&
                <>
                    <Text style={styles.textTitle}>Sponsor</Text>
                    <FlatList
                         horizontal
                         style = {{width: '100%'}}
                         legacyImplementation={false}
                         keyExtractor={(item, index) => index.toString()}
                         showsHorizontalScrollIndicator={false}
                         data={sponsors}
                         renderItem={({ item, index }) => {
                            if(!!item){
                                return(
                                    <View style={index === 0 ? (!(!!sponsors[1]) ? styles.containerShadowSponsorLogoFirstLast
                                                                                 : styles.containerShadowSponsorLogoFirst)
                                                             : (index === 4 || !(!!sponsors[index + 1]) ? styles.containerShadowSponsorLogoLast
                                                                                                        : styles.containerShadowSponsorLogo)}>
                                       <View style={styles.containerSponsorLogo}>
                                           <Image style={styles.imageSponsorLogo} source={{uri: item}}/>
                                       </View>
                                    </View>
                                )
                            }
                         }}
                    />
                </>
            }
        </>
    );
};

const styles = StyleSheet.create({
    textTitle: {
        width:'100%',
        paddingHorizontal: 24,
        fontSize: 16,
        fontFamily: 'poppins-semi-bold',
        color: Colors.grayDark,
        paddingTop: 8,
    },
    containerShadowSponsorLogo: {
         paddingHorizontal: 8,
         paddingVertical: 16,
         borderRadius: 12,
         //backgroundColor: 'red',
    },
    containerShadowSponsorLogoFirstLast: {
         paddingVertical: 16,
         borderRadius: 12,
         paddingHorizontal: 24,
    },
    containerShadowSponsorLogoFirst: {
         paddingRight: 8,
         paddingVertical: 16,
         borderRadius: 12,
         paddingLeft: 24,
    },
    containerShadowSponsorLogoLast: {
        paddingLeft: 8,
        paddingVertical: 16,
        borderRadius: 12,
        paddingRight: 24,
    },
    containerSponsorLogo: {
        ...Shadow.mainShadow,
        width: 100,
        height: 56,
        borderRadius: 12,
    },
    imageSponsorLogo: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
});

export default ContainerSponsors;