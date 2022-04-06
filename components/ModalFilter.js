import React, { useState, useEffect } from "react";
import { StyleSheet,Alert, Modal, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback,
         ImageBackground} from 'react-native';
import Colors from '../constants/colors';
import LineTop from './LineTop';
import { AntDesign } from '@expo/vector-icons';
import db from '../firebase/config';

const initialState = {
       allVenue: false,
       allPeriod: false,
       allCategory: false,
       categoryBusiness: false,
       categoryCircus: false,
       categoryConcert: false,
       categoryEducation: false,
       categoryExhibition: false,
       categoryFair: false,
       categoryForKids: false,
       categoryMovies: false,
       categoryMuseum: false,
       categoryOnline: false,
       categorySale: false,
       categorySport: false,
       categoryTheatre: false,
       categoryTraining: false,
       periodDay:false,
       periodWeek: false,
       periodMonth: false,
       venueOnline: false,
       venueOffline: false,
   };

const ModalFilter = props => {

    const [selected, setSelected] = useState(props.filters ? props.filters : initialState);
    const [categoryList, setCategoryList] = useState([]);

    const getCategoryList = async () =>{
        await db
          .firestore()
          .collection("category")
          .orderBy('categoryName')
          .onSnapshot((data) =>
            setCategoryList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          );
    };

    useEffect(()=> {
        getCategoryList();
    },[]);

    const getLeftFlatList = () => {
        return(
            <>
                <TouchableOpacity style={selected.allCategory ? styles.chipOn : styles.chipOff }
                      onPress={() => {
                          if(!selected.allCategory){
                             setSelected((prevState) => ({...prevState, categoryBusiness: true}));
                             setSelected((prevState) => ({...prevState, categoryCircus: true}));
                             setSelected((prevState) => ({...prevState, categoryConcert: true}));
                             setSelected((prevState) => ({...prevState, categoryEducation: true}));
                             setSelected((prevState) => ({...prevState, categoryExhibition: true}));
                             setSelected((prevState) => ({...prevState, categoryFair: true}));
                             setSelected((prevState) => ({...prevState, categoryForKids: true}));
                             setSelected((prevState) => ({...prevState, categoryMovies: true}));
                             setSelected((prevState) => ({...prevState, categoryMuseum: true}));
                             setSelected((prevState) => ({...prevState, categoryOnline: true}));
                             setSelected((prevState) => ({...prevState, categorySale: true}));
                             setSelected((prevState) => ({...prevState, categorySport: true}));
                             setSelected((prevState) => ({...prevState, categoryTheatre: true}));
                             setSelected((prevState) => ({...prevState, categoryTraining: true}));
                          }
                          if(selected.allCategory){
                              setSelected((prevState) => ({...prevState, categoryBusiness: false}));
                              setSelected((prevState) => ({...prevState, categoryCircus: false}));
                              setSelected((prevState) => ({...prevState, categoryConcert: false}));
                              setSelected((prevState) => ({...prevState, categoryEducation: false}));
                              setSelected((prevState) => ({...prevState, categoryExhibition: false}));
                              setSelected((prevState) => ({...prevState, categoryFair: false}));
                              setSelected((prevState) => ({...prevState, categoryForKids: false}));
                              setSelected((prevState) => ({...prevState, categoryMovies: false}));
                              setSelected((prevState) => ({...prevState, categoryMuseum: false}));
                              setSelected((prevState) => ({...prevState, categoryOnline: false}));
                              setSelected((prevState) => ({...prevState, categorySale: false}));
                              setSelected((prevState) => ({...prevState, categorySport: false}));
                              setSelected((prevState) => ({...prevState, categoryTheatre: false}));
                              setSelected((prevState) => ({...prevState, categoryTraining: false}));
                          }
                          setSelected((prevState) => ({...prevState, allCategory: !selected.allCategory}));
                      }}>
                    <Text style={selected.allCategory ? styles.textChipOn : styles.textChipOff }>Select All</Text>
                </TouchableOpacity>
            </>
        );
    };

    return (
        <Modal
                animationType="slide"
                transparent={true}
                visible={props.visible}
                onPressOut={props.onClose}>
            <TouchableOpacity
                 activeOpacity={1}
                 onPressOut={props.onClose}
                 style={styles.containerModal}>
                <TouchableWithoutFeedback>
                    <View style={styles.modal}>
                        <LineTop style={false}/>
                        <View style={styles.containerClose}>
                            <TouchableOpacity onPress={props.onClose} style={styles.containerIconClose}>
                                <AntDesign name="close" size={24} color={Colors.grayLight} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerFilterBy}>
                            <Text style={styles.textFilterBy}>Filter by</Text>
                            <TouchableOpacity style={styles.buttonClearFilter}
                                onPress={() => setSelected(initialState)}>
                                <Text style={styles.textClearFilter}>Clear Filter</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerTextItem}>
                            <Text style={styles.textItem}>Venue</Text>
                        </View>
                        <View style={styles.containerChips}>
                            <TouchableOpacity style={selected.allVenue ? styles.chipOn : styles.chipOff }
                             onPress={() => {
                                 if(!selected.allVenue){
                                    setSelected((prevState) => ({...prevState, venueOnline: true}));
                                    setSelected((prevState) => ({...prevState, venueOffline: true}));
                                 }
                                 if(selected.allVenue){
                                     setSelected((prevState) => ({...prevState, venueOnline: false}));
                                     setSelected((prevState) => ({...prevState, venueOffline: false}));
                                 }
                                 setSelected((prevState) => ({...prevState, allVenue: !selected.allVenue}));
                             }}>
                                <Text style={selected.allVenue ? styles.textChipOn : styles.textChipOff }>
                                    Select All
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={selected.venueOnline ? styles.chipOn : styles.chipOff}
                                onPress={() => {
                                    if(selected.venueOnline){
                                       setSelected((prevState) => ({...prevState, allVenue: false}));
                                    }
                                    if(selected.venueOffline && !selected.venueOnline){
                                       setSelected((prevState) => ({...prevState, allVenue: true}));
                                    }
                                    setSelected((prevState) => ({...prevState, venueOnline: !selected.venueOnline}));
                                }}>
                                <Text style={selected.venueOnline ? styles.textChipOn : styles.textChipOff}>
                                    Online Event
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={selected.venueOffline ? styles.chipOn :  styles.chipOff}
                                    onPress={() => {
                                          if(selected.venueOffline){
                                             setSelected((prevState) => ({...prevState, allVenue: false}));
                                          }
                                          if(!selected.venueOffline && selected.venueOnline){
                                             setSelected((prevState) => ({...prevState, allVenue: true}));
                                          }
                                          setSelected((prevState) => ({...prevState, venueOffline: !selected.venueOffline}))
                                    }}>
                                <Text style={selected.venueOffline ? styles.textChipOn : styles.textChipOff }>
                                    Offline Event
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerTextItem}>
                            <Text style={styles.textItem}>Category</Text>
                        </View>
                        <View style={styles.containerChips}>
                            <FlatList
                                horizontal
                                legacyImplementation={false}
                                keyExtractor={(item, index) => index.toString()}
                                showsHorizontalScrollIndicator={false}
                                ListHeaderComponent={getLeftFlatList}
                                data={categoryList}
                                renderItem={({ item }) => {
                                if(item.id === 'categoryBusiness'){
                                    return (
                                        <TouchableOpacity style={selected.categoryBusiness ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(!selected.categoryBusiness &&
                                                     selected.categoryCircus &&
                                                     selected.categoryConcert &&
                                                     selected.categoryEducation &&
                                                     selected.categoryExhibition &&
                                                     selected.categoryFair &&
                                                     selected.categoryForKids &&
                                                     selected.categoryMovies &&
                                                     selected.categoryMuseum &&
                                                     selected.categoryOnline &&
                                                     selected.categorySale &&
                                                     selected.categorySport &&
                                                     selected.categoryTheatre &&
                                                     selected.categoryTraining){
                                                     setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categoryBusiness: !selected.categoryBusiness}));
                                            }}>
                                            <Text style={selected.categoryBusiness ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categoryCircus'){
                                    return (
                                        <TouchableOpacity style={selected.categoryCircus ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    !selected.categoryCircus &&
                                                    selected.categoryConcert &&
                                                    selected.categoryEducation &&
                                                    selected.categoryExhibition &&
                                                    selected.categoryFair &&
                                                    selected.categoryForKids &&
                                                    selected.categoryMovies &&
                                                    selected.categoryMuseum &&
                                                    selected.categoryOnline &&
                                                    selected.categorySale &&
                                                    selected.categorySport &&
                                                    selected.categoryTheatre &&
                                                    selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categoryCircus: !selected.categoryCircus}));
                                            }}>
                                            <Text style={selected.categoryCircus ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categoryConcert'){
                                    return (
                                        <TouchableOpacity style={selected.categoryConcert ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    selected.categoryCircus &&
                                                    !selected.categoryConcert &&
                                                    selected.categoryEducation &&
                                                    selected.categoryExhibition &&
                                                    selected.categoryFair &&
                                                    selected.categoryForKids &&
                                                    selected.categoryMovies &&
                                                    selected.categoryMuseum &&
                                                    selected.categoryOnline &&
                                                    selected.categorySale &&
                                                    selected.categorySport &&
                                                    selected.categoryTheatre &&
                                                    selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categoryConcert: !selected.categoryConcert}));
                                            }}>
                                            <Text style={selected.categoryConcert ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categoryEducation'){
                                    return (
                                        <TouchableOpacity style={selected.categoryEducation ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    selected.categoryCircus &&
                                                    selected.categoryConcert &&
                                                    !selected.categoryEducation &&
                                                    selected.categoryExhibition &&
                                                    selected.categoryFair &&
                                                    selected.categoryForKids &&
                                                    selected.categoryMovies &&
                                                    selected.categoryMuseum &&
                                                    selected.categoryOnline &&
                                                    selected.categorySale &&
                                                    selected.categorySport &&
                                                    selected.categoryTheatre &&
                                                    selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categoryEducation: !selected.categoryEducation}));
                                            }}>
                                            <Text style={selected.categoryEducation ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categoryExhibition'){
                                    return (
                                        <TouchableOpacity style={selected.categoryExhibition ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    selected.categoryCircus &&
                                                    selected.categoryConcert &&
                                                    selected.categoryEducation &&
                                                    !selected.categoryExhibition &&
                                                    selected.categoryFair &&
                                                    selected.categoryForKids &&
                                                    selected.categoryMovies &&
                                                    selected.categoryMuseum &&
                                                    selected.categoryOnline &&
                                                    selected.categorySale &&
                                                    selected.categorySport &&
                                                    selected.categoryTheatre &&
                                                    selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categoryExhibition: !selected.categoryExhibition}));
                                            }}>
                                            <Text style={selected.categoryExhibition ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categoryFair'){
                                    return (
                                        <TouchableOpacity style={selected.categoryFair ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    selected.categoryCircus &&
                                                    selected.categoryConcert &&
                                                    selected.categoryEducation &&
                                                    selected.categoryExhibition &&
                                                    !selected.categoryFair &&
                                                    selected.categoryForKids &&
                                                    selected.categoryMovies &&
                                                    selected.categoryMuseum &&
                                                    selected.categoryOnline &&
                                                    selected.categorySale &&
                                                    selected.categorySport &&
                                                    selected.categoryTheatre &&
                                                    selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categoryFair: !selected.categoryFair}));
                                            }}>
                                            <Text style={selected.categoryFair ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categoryForKids'){
                                    return (
                                        <TouchableOpacity style={selected.categoryForKids ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    selected.categoryCircus &&
                                                    selected.categoryConcert &&
                                                    selected.categoryEducation &&
                                                    selected.categoryExhibition &&
                                                    selected.categoryFair &&
                                                    !selected.categoryForKids &&
                                                    selected.categoryMovies &&
                                                    selected.categoryMuseum &&
                                                    selected.categoryOnline &&
                                                    selected.categorySale &&
                                                    selected.categorySport &&
                                                    selected.categoryTheatre &&
                                                    selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categoryForKids: !selected.categoryForKids}));
                                            }}>
                                            <Text style={selected.categoryForKids ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categoryMovies'){
                                    return (
                                        <TouchableOpacity style={selected.categoryMovies ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    selected.categoryCircus &&
                                                    selected.categoryConcert &&
                                                    selected.categoryEducation &&
                                                    selected.categoryExhibition &&
                                                    selected.categoryFair &&
                                                    selected.categoryForKids &&
                                                    !selected.categoryMovies &&
                                                    selected.categoryMuseum &&
                                                    selected.categoryOnline &&
                                                    selected.categorySale &&
                                                    selected.categorySport &&
                                                    selected.categoryTheatre &&
                                                    selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categoryMovies: !selected.categoryMovies}));
                                            }}>
                                            <Text style={selected.categoryMovies ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categoryMuseum'){
                                    return (
                                        <TouchableOpacity style={selected.categoryMuseum ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    selected.categoryCircus &&
                                                    selected.categoryConcert &&
                                                    selected.categoryEducation &&
                                                    selected.categoryExhibition &&
                                                    selected.categoryFair &&
                                                    selected.categoryForKids &&
                                                    selected.categoryMovies &&
                                                    !selected.categoryMuseum &&
                                                    selected.categoryOnline &&
                                                    selected.categorySale &&
                                                    selected.categorySport &&
                                                    selected.categoryTheatre &&
                                                    selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categoryMuseum: !selected.categoryMuseum}));
                                            }}>
                                            <Text style={selected.categoryMuseum ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categoryOnline'){
                                    return (
                                        <TouchableOpacity style={selected.categoryOnline ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    selected.categoryCircus &&
                                                    selected.categoryConcert &&
                                                    selected.categoryEducation &&
                                                    selected.categoryExhibition &&
                                                    selected.categoryFair &&
                                                    selected.categoryForKids &&
                                                    selected.categoryMovies &&
                                                    selected.categoryMuseum &&
                                                    !selected.categoryOnline &&
                                                    selected.categorySale &&
                                                    selected.categorySport &&
                                                    selected.categoryTheatre &&
                                                    selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categoryOnline: !selected.categoryOnline}));
                                            }}>
                                            <Text style={selected.categoryOnline ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categorySale'){
                                    return (
                                        <TouchableOpacity style={selected.categorySale ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    selected.categoryCircus &&
                                                    selected.categoryConcert &&
                                                    selected.categoryEducation &&
                                                    selected.categoryExhibition &&
                                                    selected.categoryFair &&
                                                    selected.categoryForKids &&
                                                    selected.categoryMovies &&
                                                    selected.categoryMuseum &&
                                                    selected.categoryOnline &&
                                                    !selected.categorySale &&
                                                    selected.categorySport &&
                                                    selected.categoryTheatre &&
                                                    selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categorySale: !selected.categorySale}));
                                            }}>
                                            <Text style={selected.categorySale ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categorySport'){
                                    return (
                                        <TouchableOpacity style={selected.categorySport ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    selected.categoryCircus &&
                                                    selected.categoryConcert &&
                                                    selected.categoryEducation &&
                                                    selected.categoryExhibition &&
                                                    selected.categoryFair &&
                                                    selected.categoryForKids &&
                                                    selected.categoryMovies &&
                                                    selected.categoryMuseum &&
                                                    selected.categoryOnline &&
                                                    selected.categorySale &&
                                                    !selected.categorySport &&
                                                    selected.categoryTheatre &&
                                                    selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categorySport: !selected.categorySport}));
                                            }}>
                                            <Text style={selected.categorySport ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categoryTheatre'){
                                    return (
                                        <TouchableOpacity style={selected.categoryTheatre ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    selected.categoryCircus &&
                                                    selected.categoryConcert &&
                                                    selected.categoryEducation &&
                                                    selected.categoryExhibition &&
                                                    selected.categoryFair &&
                                                    selected.categoryForKids &&
                                                    selected.categoryMovies &&
                                                    selected.categoryMuseum &&
                                                    selected.categoryOnline &&
                                                    selected.categorySale &&
                                                    selected.categorySport &&
                                                    !selected.categoryTheatre &&
                                                    selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categoryTheatre: !selected.categoryTheatre}));
                                            }}>
                                            <Text style={selected.categoryTheatre ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if(item.id === 'categoryTraining'){
                                    return (
                                        <TouchableOpacity style={selected.categoryTraining ? styles.chipOn : styles.chipOff}
                                             onPress={() => {
                                                 if(selected.categoryBusiness &&
                                                    selected.categoryCircus &&
                                                    selected.categoryConcert &&
                                                    selected.categoryEducation &&
                                                    selected.categoryExhibition &&
                                                    selected.categoryFair &&
                                                    selected.categoryForKids &&
                                                    selected.categoryMovies &&
                                                    selected.categoryMuseum &&
                                                    selected.categoryOnline &&
                                                    selected.categorySale &&
                                                    selected.categorySport &&
                                                    selected.categoryTheatre &&
                                                    !selected.categoryTraining){
                                                    setSelected((prevState) => ({...prevState, allCategory: true}));
                                                 }else{
                                                     setSelected((prevState) => ({...prevState, allCategory: false}));
                                                 }
                                                 setSelected((prevState) => ({...prevState, categoryTraining: !selected.categoryTraining}));
                                            }}>
                                            <Text style={selected.categoryTraining ? styles.textChipOn : styles.textChipOff}>{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            }}/>
                        </View>
                        <View style={styles.containerTextItem}>
                           <Text style={styles.textItem}>Period</Text>
                        </View>
                        <View style={styles.containerChips}>
                            <TouchableOpacity style={selected.allPeriod ? styles.chipOn : styles.chipOff }
                               onPress={() => {
                                if(!selected.allPeriod){
                                    setSelected((prevState) => ({...prevState, periodDay: true}));
                                    setSelected((prevState) => ({...prevState, periodWeek: true}));
                                    setSelected((prevState) => ({...prevState, periodMonth: true}));
                                }
                                if(selected.allPeriod){
                                    setSelected((prevState) => ({...prevState, periodDay: false}));
                                    setSelected((prevState) => ({...prevState, periodWeek: false}));
                                    setSelected((prevState) => ({...prevState, periodMonth: false}));
                                }
                                setSelected((prevState) => ({...prevState, allPeriod: !selected.allPeriod}));
                                }}>
                                <Text style={selected.allPeriod ? styles.textChipOn : styles.textChipOff }>Select All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={selected.periodDay ? styles.chipOn : styles.chipOff}
                                onPress={() => {
                                    setSelected((prevState) => ({...prevState, allPeriod: false}));
                                    setSelected((prevState) => ({...prevState, periodWeek: false}));
                                    setSelected((prevState) => ({...prevState, periodMonth: false}));
                                    setSelected((prevState) => ({...prevState, periodDay: !selected.periodDay}));
                                }}>
                                <Text style={selected.periodDay ? styles.textChipOn : styles.textChipOff}>Day</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={selected.periodWeek ? styles.chipOn :  styles.chipOff}
                                onPress={() => {
                                    setSelected((prevState) => ({...prevState, allPeriod: false}));
                                    setSelected((prevState) => ({...prevState, periodDay: false}));
                                    setSelected((prevState) => ({...prevState, periodMonth: false}));
                                    setSelected((prevState) => ({...prevState, periodWeek: !selected.periodWeek}));
                                }}>
                                <Text style={selected.periodWeek ? styles.textChipOn : styles.textChipOff }>Week</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={selected.periodMonth ? styles.chipOn :  styles.chipOff}
                                onPress={() => {
                                   setSelected((prevState) => ({...prevState, allPeriod: false}));
                                   setSelected((prevState) => ({...prevState, periodDay: false}));
                                   setSelected((prevState) => ({...prevState, periodWeek: false}));
                                   setSelected((prevState) => ({...prevState, periodMonth: !selected.periodMonth}));
                                }}>
                                <Text style={selected.periodMonth ? styles.textChipOn : styles.textChipOff }>Month</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.containerButtonApply}
                            onPress={()=> {
                                   props.navigation.navigate("Search", {filters: selected});
                                   props.onClose();
                               }
                            }>
                              <ImageBackground style={styles.imageShadowApply} source={require("../assets/shadow-primary.png")}
                                                           resizeMode='stretch'>
                                  <View style={styles.buttonApply}>
                                      <Text style={styles.textApply}>Apply</Text>
                                  </View>
                              </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};
const styles = StyleSheet.create({
    containerModal: {
        backgroundColor:'rgba(41, 35, 57, 0.4)',
        flex: 1,
        alignItems:'center',
        justifyContent: "flex-end",
    },
    modal: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        justifyContent: "flex-start",
        alignItems:'center',
    },
    containerClose:{
        width: '100%',
        justifyContent: "flex-start",
        alignItems:'flex-end',
    },
    containerIconClose: {
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems:'center',
    },
    containerFilterBy: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 24,
    },
    textFilterBy: {
        fontFamily: 'poppins-semi-bold',
        fontSize:18,
        color: Colors.grayDark,
        paddingBottom: 16,
    },
    buttonClearFilter:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 38,
        paddingBottom: 16,
    },
    textClearFilter: {
        fontFamily:'poppins-medium',
        fontSize: 12,
        color: Colors.primary
    },
    containerTextItem:{
        paddingTop: 16,
        paddingHorizontal: 24,
        width: '100%',
        paddingBottom: 8,
    },
    textItem: {
        fontFamily:'poppins-semi-bold',
        fontSize: 14,
        color: Colors.grayDark,
        width:'100%',
    },
    containerChips: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 24,
        width: '100%',
        paddingVertical: 8,
    },
    chipOn: {
        borderWidth: 1,
        borderColor: Colors.primary,
        padding: 8,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginRight: 16,
    },
    chipOff:{
        borderColor: '#F0EFF1',
        borderWidth: 1,
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 16,
    },
    textChipOn: {
        fontFamily:'poppins-medium',
        fontSize: 12,
        color: 'white',
    },
    textChipOff: {
         fontFamily:'poppins',
         fontSize: 12,
         color: Colors.grayMedium,
    },
    containerButtonApply: {
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 32,
    },
    imageShadowApply: {
        width: '100%',
        height: 96,
        paddingHorizontal: 8,
        paddingBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonApply: {
        width: '100%',
        paddingVertical: 16,
        backgroundColor: Colors.primary,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: "center",
    },
    textApply:{
        fontFamily:'poppins-semi-bold',
        fontSize: 16,
        color: 'white',
    },
});

export default ModalFilter;