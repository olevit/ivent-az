import React, { useState, useEffect } from "react";
import { StyleSheet,Alert, Modal, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Colors from '../constants/colors';

const ContainerDescription = props => {
    const [showMore, setShowMore] = useState(false);
    const description = props.description;

    const readMoreLess = () => {
        setShowMore(!showMore);
    };

    return (
        <>
             {!!description &&
                 <>
                 {description?.length > 125 ? (
                     showMore ? (
                         <Text style={styles.textDescription}>{description}
                             <Text style={styles.textReadMore} onPress={readMoreLess}> Read
                               <Text style={styles.textWhite}>t</Text>Less
                             </Text>
                         </Text>
                         ) : (
                         <Text style={styles.textDescription}>
                             {`${description?.slice(0, 125)}... `}
                             <Text onPress={readMoreLess} style={styles.textReadMore}>Read
                                 <Text style={styles.textWhite}>t</Text>More
                             </Text>
                         </Text>)) : (
                     <Text style={styles.textDescription}>{description}</Text>)
                 }
                 </>
             }
        </>
    );
};

const styles = StyleSheet.create({
    textDescription: {
        width: '100%',
        fontSize: 12,
        fontFamily: 'poppins',
        color: Colors.grayLight,
        paddingHorizontal: 24,
        fontWeight: '400',
    },
    textReadMore: {
        fontSize: 12,
        fontFamily: 'poppins-medium',
        color: Colors.primary,
    },
    textWhite: {
        fontSize: 12,
        fontFamily: 'poppins-medium',
        color: 'white',
    }
});

export default ContainerDescription;