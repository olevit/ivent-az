import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback, Linking} from 'react-native';
import Shadow from '../constants/shadow';
import Colors from '../constants/colors';


const ContainerOrganizer = props => {

    const organizer = props.organizer;
    const showContainerOrganizer = props.showContainerOrganizer;

    return (
    <>
        {showContainerOrganizer &&
            <>
                <Text style={styles.textTitle}>Organizer</Text>
                <View style={styles.containerShadowOrganizer}>
                    <View style={styles.containerOrganizer}>
                        <View style={styles.containerOrganizerInner}>
                            <View style={styles.containerImageOrganizer}>
                                {!!organizer.organizerImage &&
                                <Image style={styles.imageOrganizer}
                                    source={{uri: organizer?.organizerImage}}
                                    resizeMode="cover"/>
                                }
                            </View>
                            <Text style={styles.textNameOrganizer}>{organizer?.organizerName}</Text>
                        </View>
                        <View style={styles.containerOrganizerInner}>
                            {!!organizer.organizerWhatsapp &&
                                 <TouchableOpacity style={styles.buttonChat}
                                    onPress={()=> {Linking.openURL('whatsapp://send?phone='
                                     + organizer?.organizerWhatsapp)}}>
                                    <Image style={styles.imageChat}
                                        source={require("../assets/icons/chat.png")}/>
                                 </TouchableOpacity>
                            }
                            {!!organizer.organizerPhone &&
                                <TouchableOpacity style={styles.buttonPhone}
                                    onPress={()=> {Linking.openURL(`tel:${organizer?.organizerPhone}`)}}>
                                    <Image style={styles.imagePhone}
                                        source={require("../assets/icons/phone.png")}/>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
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
    },
    containerShadowOrganizer:{
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 16
    },
    containerOrganizer: {
        ...Shadow.mainShadow,
        width: '100%',
        borderRadius: 16,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12
    },
    containerOrganizerInner: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    containerImageOrganizer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.backgroundImage,
        overflow: 'hidden',
    },
    imageOrganizer:{
        width: '100%',
        height: '100%',
    },
    textNameOrganizer: {
        marginLeft: 12,
        fontSize: 12,
        fontFamily: 'poppins-semi-bold',
        color: Colors.grayDark,
        fontWeight: '600',
    },
    buttonChat: {
        width: 28,
        height:28,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#E6F5EC',
        marginRight: 12
    },
    buttonPhone: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#FCEAE6',
        marginRight: 4
    },
    imageChat: {
        width: 12,
        height: 12,
    },
    imagePhone: {
        width: 12,
        height: 12,
    },
});

export default ContainerOrganizer;