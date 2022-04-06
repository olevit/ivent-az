import React, { useState, useEffect } from "react";
import { StyleSheet,Alert, Modal, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Colors from '../constants/colors';
import ModalFilter from '../components/ModalFilter';
import SearchInput from '../components/SearchInput';
import BackButton from '../components/BackButton';
import ItemEventsListSmall from '../components/ItemEventsListSmall';
import db from '../firebase/config';

export default function AllEvents({ route, navigation }){
     const {searchText, filters} = route.params;
     const [modalVisible, setModalVisible] = useState(false);
     const [eventsListAll, setEventsListAll] = useState([]);
     const [eventsListEnded, setEventsListEnded] = useState([]);

     const getEventsListAll = async () =>{
        await db
          .firestore()
          .collection("eventsList")
          .orderBy('eventDate')
          .startAt(new Date())
          .onSnapshot((data) =>
            setEventsListAll(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          );
     }
     const getEventsListEnded = async () =>{
         await db
           .firestore()
           .collection("eventsList")
           .orderBy('eventDate')
           .endAt(new Date())
           .onSnapshot((data) =>
             setEventsListEnded(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
           );
     };

     useEffect(()=> {
         getEventsListAll();
     },[]);

     useEffect(()=> {
          getEventsListEnded();
     },[]);

     const getFooterFlatList = () => {
             return(
                 <FlatList
                     style={{width: '100%'}}
                     legacyImplementation={false}
                     keyExtractor={(item, index) => index.toString()}
                     showsVerticalScrollIndicator={false}
                     scrollEnabled={false}
                     data={eventsListEnded}
                     inverted={true}
                     renderItem={({ item }) => {
                     if(filters){
                         return <ItemEventsListSmall
                                    navigation={navigation}
                                    event={item}
                                    eventEnded={true}
                                    filters={filters}/>

                     }
                     if (searchText === "") {
                         return <ItemEventsListSmall
                                    navigation={navigation}
                                    event={item}
                                    eventEnded={true}
                                    filters={false}/>;
                     }
                     if(item.eventName?.toUpperCase().includes(searchText?.toUpperCase().trim().replace(/\s/g, ""))
                            || item.eventDescription?.toUpperCase().includes(searchText?.toUpperCase().trim().replace(/\s/g, ""))
                        ){
                        return <ItemEventsListSmall
                                    navigation={navigation}
                                    event={item}
                                    eventEnded={true}
                                    filters={false}/>
                     }
                 }}/>
             )
         };
     return(
         <View style={styles.container}>
            <View style={styles.containerTop}>
                 <BackButton
                    style={true}
                    onBack={() => navigation.dispatch(CommonActions.goBack())}/>
                 <Text style={styles.textSearch}>Search</Text>
            </View>
            <View style={styles.containerShadowSearchInput}>
                 <SearchInput
                    shadow={true}
                    openModal={() => setModalVisible(true)}
                    navigation={navigation}/>
            </View>
            <FlatList
                style={{width: '100%', paddingBottom: 8}}
                scrollEnabled={true}
                legacyImplementation={false}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={getFooterFlatList}
                data={eventsListAll}
                renderItem={({ item }) => {
                if(filters){
                    return <ItemEventsListSmall
                                   navigation={navigation}
                                   event={item}
                                   eventEnded={false}
                                   filters={filters}/>

                    }
                if(searchText === ""){
                    return <ItemEventsListSmall
                                   navigation={navigation}
                                   event={item}
                                   eventEnded={false}
                                   filters={false}/>
                }
                if(item.eventName?.toUpperCase().includes(searchText.toUpperCase().trim().replace(/\s/g, ""))
                    || item.eventDescription?.toUpperCase().includes(searchText.toUpperCase().trim().replace(/\s/g, ""))){
                    return <ItemEventsListSmall
                                   navigation={navigation}
                                   event={item}
                                   eventEnded={false}
                                   filters={false}/>
                }
            }}/>
             <ModalFilter visible={modalVisible} onClose = {()=> setModalVisible(false)}
                          navigation={navigation} filters={filters}/>
         </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: "flex-start",
        paddingTop: 32,
        backgroundColor: 'white'
    },
    containerTop: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 8,
    },
    containerShadowSearchInput: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
});