import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';

import axios from 'axios';

import {ChevronLeft, FavoriteFilledIcon, FavoriteIcon, MapMarkerAltSolid} from '../components/icons';
import DailyData from "../components/DailyData";
import { LOCATION_API_URL, LOCATION_API_KEY, WEATHER_API_URL, WEATHER_API_KEY } from '../util/evn';

const EventScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [daysData, setDaysData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [showDailyData, setShowDailyData] = useState(false);

  useEffect(() => {
    const {item} = route.params;
    setEvent(item);
    getFavoriteEvents()
    setLoading(false);
    lanLongByCityName(item.city);
  }, []);

  const lanLongByCityName = async (cityName) => {
    const url = `${LOCATION_API_URL}/address?key=${LOCATION_API_KEY}&inFormat=kvp&outFormat=json&location=${cityName}&noCacheIE=${new Date().getTime()}&callback=GeocodeCallback`
    const result = await axios.get(url)
    const regex = /lat":([0-9]+.[0-9]+),"lng":([0-9]+.[0-9]+)/gm;
    const regexResult = regex.exec(result.data)[0]
    const lat = regexResult.split(',')[0].split(':')[1]
    const lng = regexResult.split(',')[1].split(':')[1]
    const weatherUrl = `${WEATHER_API_URL}lat=${lat}&lon=${lng}&exclude=current,minutely,hourly&units=metric&lang=en&appid=${WEATHER_API_KEY}`
    const weatherResult = await axios.get(weatherUrl)
    const days= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysData = [];
    const tempData = [];

    weatherResult.data.daily.map((e, index) => {
      if (index >= 1) {
        const dd = new Date(e.dt * 1000).getUTCDay();
        daysData.push(days[dd]);
        tempData.push(e.temp["eve"]);
      }
    });
    setDaysData(daysData)
    setTempData(tempData)
    setShowDailyData(true)
  }

  const getFavoriteEvents = async () => {
    const fetchedEvents = await axios('http://localhost:8080/api/favorites');

    if (fetchedEvents.data.status == 200) {
      setFavoriteEvents(fetchedEvents.data.data.map(favorite => favorite._id));
    }
  }

  const dateFormatter = (ms) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };
    const date = new Date(ms.split('T')[0]).toLocaleDateString('en-EN', options)
    if(date == undefined || date == "") { return "-"}
    return date.split(" ")
  };

  const getTime = date => {
    if(date == undefined || date == "") { return "-"}
    return date.split('T')[1].replace('::', ':')
  };

  const toggleFavorite = async (id) => {  
    favoriteEvents.includes(id) ? setFavoriteEvents(favoriteEvents.filter(e => e !== id)) : setFavoriteEvents([...favoriteEvents, id]);
    await axios.post('http://localhost:8080/api/favorite', {'favoriteID':id});
  }

  const checkFavorite = (id) => favoriteEvents.includes(id)

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#002AE7" />
    </View>
  ) : (
    <View style={{flex: 1}}>
      <View>
        <Image
          source={{uri: event.image_url}}
          style={{
            width: '100%',
            height: 250,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            position: 'absolute',
            top: 0,
          }}
          resizeMode="cover"
        />
       <SafeAreaView>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: 'rgba(216, 219, 233, 0.9)',
                width: 40,
                height: 30,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#332C34',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 1,
              }}>
              <ChevronLeft stroke={'#332C34'} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
      <ScrollView
        style={{
          marginTop: 170,
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{paddingBottom: 100}}>
        <Text
          style={{
            fontSize: 28,
            letterSpacing: -0.5,
            color: '#332C34',
          }}>
          {event.title}
        </Text>
        <View
          style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 42, 231, .1)',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#002AE7',
                }}>
                {dateFormatter(event.date)[2].replace(',','')}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#002AE7',
                }}>
                {dateFormatter(event.date)[1].replace(',','')}
              </Text>
            </View>
            <View
              style={{
                marginLeft: 14,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#002AE7',
                }}>
               {dateFormatter(event.date)[3]}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#002AE7',
                  marginTop: 5,
                }}>
                {dateFormatter(event.date)[0].replace(',','')} - {getTime(event.date)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
              onPress={() => toggleFavorite(event._id)}>
            <View
              style={{
                backgroundColor: 'rgba(0, 42, 231, .1)',
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {
                  checkFavorite(event._id) ? ( <FavoriteFilledIcon width={22} height={22} />) : ( <FavoriteIcon width={24} height={24} />)
                }
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 42, 231, .1)',
              borderRadius: 20,
            }}>
            <MapMarkerAltSolid width={20} height={20} fill={'#002AE7'} />
          </View>
          <View
            style={{
              marginLeft: 14,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#2B0C0D',
              }}>
              Place
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#7C8298',
                marginTop: 5,
                textTransform: 'uppercase',
              }}>
              {event.place}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 24,
            letterSpacing: -0.5,
            color: '#332C34',
            marginTop: 30,
          }}>
          About
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#7C8298',
            marginTop: 15,
            lineHeight: 25,
            letterSpacing: -0.2,
          }}>
          {event.content}
        </Text>
        {
          showDailyData 
          ? 
          (
          <View>
            <Text
              style={{
                fontSize: 24,
                letterSpacing: -0.5,
                color: '#332C34',
                marginTop: 30,
              }}>
              Weather
            </Text>

            <View style={styles.DailyData} >
              <DailyData dayData={daysData} tempData={tempData} /> 
            </View>
          </View>
          )
          : null 
        }

      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 95,
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Event Detail', {page_url: event.page_url});
          }}
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: 'rgba(0, 42, 231, .8)',
            height: 55,
            borderRadius: 65,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              letterSpacing: -0.5,
              color: '#fff',
            }}>
            Buy Ticket
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  DailyData: {
    flex: 1,
    width: 360,
    height:300,
    alignSelf: "center",
    borderRadius: 30,
  },
});