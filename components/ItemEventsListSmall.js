import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet,Alert, Modal, ScrollView, Text, View,
         TouchableOpacity, FlatList, Image, SafeAreaView,
         TextInput, Platform, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Colors from '../constants/colors';
import Shadow from '../constants/shadow';
import { Entypo } from '@expo/vector-icons';
import db from '../firebase/config';

const ItemEventsListSmall = props => {
    const poster = props.event.eventPoster;
    const time = props.event.eventDate?.toDate().toLocaleTimeString();
    const date = props.event.eventDate?.toDate().toDateString();
    const name = props.event.eventName;
    const price = props.event.eventPrice;
    const venue = props.event.eventVenue;
    const category = props.event.eventCategory;
    const day = new Date();
    day.setDate(day.getDate() + 1);
    const week = new Date();
    week.setDate(week.getDate() + 6);
    const month = new Date();
    month.setMonth(month.getMonth() + 1);

    const EventView = () => {
        return(
        <View style={styles.containerShadowCard}>
            <TouchableOpacity style={styles.card}
              activeOpacity={0.5}
              onPress={() => props.navigation.navigate("EventDetails",
                             {event: {...props.event}})}>
              <View style={styles.containerImage}>
                  <Image style={styles.imageEvent} source={{uri: poster}} resizeMode="cover"/>
              </View>
              <View style={styles.containerRight}>
                  <View style={styles.containerPrice}>
                      <Text style={styles.textEventName} numberOfLines={1}>{name}</Text>
                      <Text style={styles.textEventPrice} numberOfLines={1}>{!!price ? price : 'FREE'}</Text>
                  </View>
                  <View style={styles.containerDate}>
                      <Image style={styles.imageDate} source={require("../assets/icons/calendar.png")} />
                      <Text style={styles.textDate}>{`${date.slice(0,3)},${date.slice(7,10)}${date.slice(3,7)}`}</Text>
                      <Entypo name="dot-single" size={13} color={Colors.grayMedium} style={{marginHorizontal: 3}} />
                      <Text style={styles.textDate}>{time.slice(0,5)}</Text>
                  </View>
                  <View style={styles.containerLocation}>
                       <Image style={styles.imageLocation} source={require("../assets/icons/location.png")}/>
                       <Text style={styles.textLocation} numberOfLines={1}>{venue?.venueName}</Text>
                  </View>
              </View>
            </TouchableOpacity>
            {props.eventEnded &&
            <View style={styles.containerEventEnded}>
                <View style={styles.cardEnded}>
                    <Text style={styles.textEventEnded}>EVENT ENDED</Text>
                </View>
            </View>
          }
      </View>
      );
    }

    if (props.filters?.allVenue || (!props.filters?.venueOnline  && !props.filters?.venueOffline)){
        if(props.filters?.allCategory || (!props.filters?.categoryBusiness
            && !props.filters?.categoryCircus && !props.filters?.categoryConcert
            && !props.filters?.categoryExhibition && !props.filters?.categoryFair
            && !props.filters?.categoryForKids && !props.filters?.categoryMovies
            && !props.filters?.categoryMuseum && !props.filters?.categoryOnline
            && !props.filters?.categorySale && !props.filters?.categorySport
            && !props.filters?.categoryTheatre && !props.filters?.categoryTraining
            && !props.filters?.categoryEducation)){
            if(props.filters?.allPeriod || (!props.filters?.periodDay
                && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                return <EventView/>;
            }else{
                if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                    && props.event.eventDate.toDate() <=  day)){
                    return <EventView/>;
                }
                if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                    && props.event.eventDate.toDate() <=  week)){
                    return <EventView/>;
                }
                if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                    && props.event.eventDate.toDate() <=  month)){
                    return <EventView/>;
                }
            }
        }else{
            if(props.filters?.categoryBusiness && category.some(item => item === 'categoryBusiness')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                    if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  day)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  week)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  month)){
                        return <EventView/>;
                    }
                }
            }
            if(props.filters?.categoryCircus && category.some(item => item === 'categoryCircus')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                            return <EventView/>;
                }else{
                    if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  day)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  week)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  month)){
                        return <EventView/>;
                    }
                }
            }
            if(props.filters?.categoryConcert && category.some(item => item === 'categoryConcert')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                    if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  day)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  week)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  month)){
                        return <EventView/>;
                    }
                }
            }
            if(props.filters?.categoryEducation && category.some(item => item === 'categoryEducation')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                    if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  day)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  week)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  month)){
                        return <EventView/>;
                    }
                }
            }
            if(props.filters?.categoryExhibition && category.some(item => item === 'categoryExhibition')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                    if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  day)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  week)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  month)){
                        return <EventView/>;
                    }
                }
            }
            if(props.filters?.categoryFair && category.some(item => item === 'categoryFair')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                    if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  day)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  week)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  month)){
                        return <EventView/>;
                    }
                }
            }
            if(props.filters?.categoryForKids && category.some(item => item === 'categoryForKids')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                    if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  day)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  week)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  month)){
                        return <EventView/>;
                    }
                }
            }
            if(props.filters?.categoryMovies && category.some(item => item === 'categoryMovies')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                   if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                       && props.event.eventDate.toDate() <=  day)){
                       return <EventView/>;
                   }
                   if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                       && props.event.eventDate.toDate() <=  week)){
                       return <EventView/>;
                   }
                   if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                       && props.event.eventDate.toDate() <=  month)){
                       return <EventView/>;
                   }
                }
            }
            if(props.filters?.categoryMuseum && category.some(item => item === 'categoryMuseum')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                   if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                       && props.event.eventDate.toDate() <=  day)){
                       return <EventView/>;
                   }
                   if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                       && props.event.eventDate.toDate() <=  week)){
                       return <EventView/>;
                   }
                   if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                       && props.event.eventDate.toDate() <=  month)){
                       return <EventView/>;
                   }
                }
            }
            if(props.filters?.categoryOnline && category.some(item => item === 'categoryOnline')){
               if(props.filters?.allPeriod || (!props.filters?.periodDay
                   && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                   return <EventView/>;
               }else{
                   if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                       && props.event.eventDate.toDate() <=  day)){
                       return <EventView/>;
                   }
                   if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                       && props.event.eventDate.toDate() <=  week)){
                       return <EventView/>;
                   }
                   if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                       && props.event.eventDate.toDate() <=  month)){
                       return <EventView/>;
                   }
               }
            }
            if(props.filters?.categorySale && category.some(item => item === 'categorySale')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                    if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  day)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  week)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  month)){
                        return <EventView/>;
                    }
                }
            }
            if(props.filters?.categorySport && category.some(item => item === 'categorySport')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                    if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  day)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  week)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  month)){
                        return <EventView/>;
                    }
                }
            }
            if(props.filters?.categoryTheatre && category.some(item => item === 'categoryTheatre')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                    if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  day)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  week)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  month)){
                        return <EventView/>;
                    }
                }
            }
            if(props.filters?.categoryTraining && category.some(item => item === 'categoryTraining')){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                   if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                       && props.event.eventDate.toDate() <=  day)){
                       return <EventView/>;
                   }
                   if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                       && props.event.eventDate.toDate() <=  week)){
                       return <EventView/>;
                   }
                   if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                       && props.event.eventDate.toDate() <=  month)){
                       return <EventView/>;
                   }
                }
            }
        }
    }else{
        if(props.filters?.venueOnline &&  venue.id === 'venueZoomMeeting'){
            if(props.filters?.allCategory || (!props.filters?.categoryBusiness
                && !props.filters?.categoryCircus && !props.filters?.categoryConcert
                && !props.filters?.categoryExhibition && !props.filters?.categoryFair
                && !props.filters?.categoryForKids && !props.filters?.categoryMovies
                && !props.filters?.categoryMuseum && !props.filters?.categoryOnline
                && !props.filters?.categorySale && !props.filters?.categorySport
                && !props.filters?.categoryTheatre && !props.filters?.categoryTraining
                && !props.filters?.categoryEducation)){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                    if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  day)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  week)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  month)){
                        return <EventView/>;
                    }
                }
            }else{
                if(props.filters?.categoryBusiness && category.some(item => item === 'categoryBusiness')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                       if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  day)){
                           return <EventView/>;
                       }
                       if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  week)){
                           return <EventView/>;
                       }
                       if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  month)){
                           return <EventView/>;
                       }
                    }
                }
                if(props.filters?.categoryCircus && category.some(item => item === 'categoryCircus')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                                return <EventView/>;
                    }else{
                       if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  day)){
                           return <EventView/>;
                       }
                       if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  week)){
                           return <EventView/>;
                       }
                       if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  month)){
                           return <EventView/>;
                       }
                    }
                }
                if(props.filters?.categoryConcert && category.some(item => item === 'categoryConcert')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryEducation && category.some(item => item === 'categoryEducation')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryExhibition && category.some(item => item === 'categoryExhibition')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryFair && category.some(item => item === 'categoryFair')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryForKids && category.some(item => item === 'categoryForKids')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryMovies && category.some(item => item === 'categoryMovies')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryMuseum && category.some(item => item === 'categoryMuseum')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                       if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  day)){
                           return <EventView/>;
                       }
                       if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  week)){
                           return <EventView/>;
                       }
                       if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  month)){
                           return <EventView/>;
                       }
                    }
                }
                if(props.filters?.categoryOnline && category.some(item => item === 'categoryOnline')){
                   if(props.filters?.allPeriod || (!props.filters?.periodDay
                       && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                       return <EventView/>;
                   }else{
                      if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                          && props.event.eventDate.toDate() <=  day)){
                          return <EventView/>;
                      }
                      if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                          && props.event.eventDate.toDate() <=  week)){
                          return <EventView/>;
                      }
                      if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                          && props.event.eventDate.toDate() <=  month)){
                          return <EventView/>;
                      }
                   }
                }
                if(props.filters?.categorySale && category.some(item => item === 'categorySale')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                       if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  day)){
                           return <EventView/>;
                       }
                       if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  week)){
                           return <EventView/>;
                       }
                       if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  month)){
                           return <EventView/>;
                       }
                    }
                }
                if(props.filters?.categorySport && category.some(item => item === 'categorySport')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryTheatre && category.some(item => item === 'categoryTheatre')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryTraining && category.some(item => item === 'categoryTraining')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
            }
        }
        if(props.filters?.venueOffline && venue?.id !== 'venueZoomMeeting'){
            if(props.filters?.allCategory || (!props.filters?.categoryBusiness
                && !props.filters?.categoryCircus && !props.filters?.categoryConcert
                && !props.filters?.categoryExhibition && !props.filters?.categoryFair
                && !props.filters?.categoryForKids && !props.filters?.categoryMovies
                && !props.filters?.categoryMuseum && !props.filters?.categoryOnline
                && !props.filters?.categorySale && !props.filters?.categorySport
                && !props.filters?.categoryTheatre && !props.filters?.categoryTraining
                && !props.filters?.categoryEducation)){
                if(props.filters?.allPeriod || (!props.filters?.periodDay
                    && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                    return <EventView/>;
                }else{
                    if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  day)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  week)){
                        return <EventView/>;
                    }
                    if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                        && props.event.eventDate.toDate() <=  month)){
                        return <EventView/>;
                    }
                }
            }else{
                if(props.filters?.categoryBusiness && category.some(item => item === 'categoryBusiness')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryCircus && category.some(item => item === 'categoryCircus')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                                return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryConcert && category.some(item => item === 'categoryConcert')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryEducation && category.some(item => item === 'categoryEducation')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryExhibition && category.some(item => item === 'categoryExhibition')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryFair && category.some(item => item === 'categoryFair')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryForKids && category.some(item => item === 'categoryForKids')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryMovies && category.some(item => item === 'categoryMovies')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryMuseum && category.some(item => item === 'categoryMuseum')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryOnline && category.some(item => item === 'categoryOnline')){
                   if(props.filters?.allPeriod || (!props.filters?.periodDay
                       && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                       return <EventView/>;
                   }else{
                       if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  day)){
                           return <EventView/>;
                       }
                       if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  week)){
                           return <EventView/>;
                       }
                       if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                           && props.event.eventDate.toDate() <=  month)){
                           return <EventView/>;
                       }
                   }
                }
                if(props.filters?.categorySale && category.some(item => item === 'categorySale')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categorySport && category.some(item => item === 'categorySport')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryTheatre && category.some(item => item === 'categoryTheatre')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
                if(props.filters?.categoryTraining && category.some(item => item === 'categoryTraining')){
                    if(props.filters?.allPeriod || (!props.filters?.periodDay
                        && !props.filters?.periodWeek && !props.filters?.periodMonth)){
                        return <EventView/>;
                    }else{
                        if(props.filters?.periodDay && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  day)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodWeek && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  week)){
                            return <EventView/>;
                        }
                        if(props.filters?.periodMonth && (props.event.eventDate.toDate() >= new Date()
                            && props.event.eventDate.toDate() <=  month)){
                            return <EventView/>;
                        }
                    }
                }
            }
        }
    }

    return (
        <>
         {!props.filters && <EventView/>}
        </>
    );
};

const styles = StyleSheet.create({
    containerShadowCard:{
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 16,
        width: '100%',
    },
    card:{
        ...Shadow.mainShadow,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 16,
        paddingRight: 12,
        paddingLeft: 10,
        paddingVertical: 10,
        width: '100%',
        height: 100
    },
    containerImage:{
        width: 80,
        height: '100%',
        borderRadius: 16,
        backgroundColor: Colors.backgroundImage,
        overflow: 'hidden',
    },
    imageEvent: {
        width: '100%',
        height: '100%'
    },
    containerRight: {
        marginLeft: 16,
        flexGrow: 1,
        height:'100%',
    },
    containerPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    textEventName: {
        color: Colors.grayDark,
        fontSize: 14,
        fontFamily:'poppins-semi-bold',
        //maxWidth: Dimensions.get('window').width - 236,
        width: Dimensions.get('window').width - 236,
        //backgroundColor: 'red'
        fontWeight: '600',
    },
    textEventPrice: {
        color: Colors.grayDark,
        fontSize: 14,
        fontFamily:'poppins-bold',
        //maxWidth: 70,
        width: 70,
        //backgroundColor:'red',
        textAlign: 'right',
        fontWeight: 'bold',
    },
    containerDate: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 3,
        marginTop: 9,
    },
    containerLocation: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 7,
        marginLeft: 3,
    },
    imageDate: {
        width: 15,
        height: 16.67,
        marginRight: 11
    },
    textDate: {
        color: Colors.grayMedium,
        fontSize: 10,
        fontFamily:'poppins-medium',
        maxWidth: 80
    },
    textLocation: {
        color: Colors.grayMedium,
        fontSize: 10,
        fontFamily:'poppins-medium',
        maxWidth: Dimensions.get('window').width - 194,
        fontWeight: '500',
    },
    imageLocation: {
        width: 14.17,
        height: 16.67,
        marginRight: 11
    },
    containerEventEnded: {
        width: '100%',
        zIndex: 1,
        position: 'absolute',
        borderRadius: 16,
        top: 0,
        left: 0,
        paddingVertical: 8,
        paddingHorizontal: 24,
    },
    cardEnded: {
         backgroundColor:'rgba(95, 90, 107, 0.64)',
         borderRadius: 16,
         justifyContent: 'center',
         alignItems: 'center',
         elevation: 6,
         width: '100%',
         height: 100
    },
    textEventEnded: {
        color: 'white',
        fontSize: 20,
        fontFamily:'poppins-bold',
    },
});
export default ItemEventsListSmall;