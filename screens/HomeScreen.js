import React, { useState, useEffect } from "react";
import { StyleSheet,Alert, Modal, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback, Pressable } from 'react-native';
import Colors from '../constants/colors';
import Shadow from '../constants/shadow';
import db from '../firebase/config';
import ModalFilter from '../components/ModalFilter';
import SearchInput from '../components/SearchInput';
import ItemEventsListTop from '../components/ItemEventsListTop';
import ItemEventsListSmall from '../components/ItemEventsListSmall';

export default function HomeScreen({ route, navigation }){
    const [modalVisible, setModalVisible] = useState(false);
    const [eventsListPopular, setEventsListPopular] = useState([]);
    const [eventsListTop, setEventsListTop] = useState([]);
    const [venue, setVenue] = useState([]);

    const getEventsListPopular = async () =>{
        await db
          .firestore()
          .collection("eventsList")
          .where('eventPopular', '==', true)
          .orderBy('eventDate')
          .startAt(new Date())
          .limit(20)
          .onSnapshot((data) =>
            setEventsListPopular(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          );
    };

    const getEventsListTop = async () =>{
        await db
          .firestore()
          .collection("eventsList")
          .where('eventTop', '==', true)
          .orderBy('eventDate')
          .startAt(new Date())
          .limit(10)
          .onSnapshot((data) =>
            setEventsListTop(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          );
    };

    useEffect(()=> {
        getEventsListPopular();
    },[]);

    useEffect(()=> {
        getEventsListTop();
    },[]);

    const getHeaderFlatList = () => {
        return(
            <>
                <FlatList
                    horizontal
                    legacyImplementation={false}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    data={eventsListTop}
                    renderItem={({ item, index }) => (
                    <ItemEventsListTop
                        event={item}
                        isFirstLast = {eventsListTop.length === 1}
                        isFirst={index === 0}
                        isLast={index === eventsListTop.length - 1}
                        navigation={navigation}
                    />
                )}/>
                <View style={styles.containerTitlePopular}>
                    <Text style={styles.textPopular}>Popular Now</Text>
                    <TouchableOpacity style={styles.containerSeeAll}
                        onPress={() => navigation.navigate("Search", {searchText: ''})}>
                        <Text style={styles.textSeeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    };

    return(
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Image style={styles.imageLogo} source={require("../assets/ivent.png")}/>
                <SearchInput shadow={false}
                             openModal={() => setModalVisible(true)}
                             navigation={navigation}/>
            </View>
            <FlatList
                style={styles.containerScroll}
                legacyImplementation={false}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={getHeaderFlatList}
                data={eventsListPopular}
                renderItem={({ item }) => (
                <ItemEventsListSmall navigation={navigation}
                                     event={item}
                                     eventEnded={false}/>
                )}/>
            <ModalFilter visible = {modalVisible}
                         onClose = {() => setModalVisible(false)}
                         navigation={navigation}/>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: "flex-start",
  },
  containerTop: {
     width:'100%',
     backgroundColor: Colors.primary,
     alignItems: 'flex-start',
     justifyContent: "flex-start",
     padding: 24
  },
  imageLogo: {
      marginTop: 10,
      marginBottom: 27,
      width: 99,
      height: 35,
  },
  containerScroll: {
    backgroundColor: 'white',
    width:'100%',
    paddingBottom: 8,
  },
  containerTitlePopular: {
    width: '100%',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    paddingVertical: 8,
  },
  textPopular: {
    color: Colors.grayDark,
    fontSize: 18,
    fontFamily:'poppins-semi-bold',
  },
  containerSeeAll: {
    paddingVertical: 4,
    paddingHorizontal: 24,
  },
  textSeeAll: {
    color: Colors.grayLight,
    fontSize: 12,
    fontFamily:'poppins-medium',
  },
});