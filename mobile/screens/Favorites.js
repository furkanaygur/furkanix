import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  LogBox
} from 'react-native';

import axios from 'axios';
import moment from 'moment';

import AwesomeAlert from 'react-native-awesome-alerts';

import {MapMarkerAltSolid, FavoriteButton, FavoriteFilledButton, Empty} from '../components/icons';

const FavoriteScreen = ({navigation}) => {

  const [events, setEvents] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { 
    LogBox.ignoreAllLogs();
    const unsubscribe = navigation.addListener('tabPress', (e) => {
    getEvents();
    });
    getEvents();
    return unsubscribe;

  }, [navigation]);

  const getEvents = async () => {
    setLoading(true);
    const fetchedEvents = await axios('http://localhost:8080/api/favorites');
    if (fetchedEvents.data.status == 200) {
      setEvents(fetchedEvents.data.data);
      setFavoriteEvents(fetchedEvents.data.data.map(favorite => favorite._id));
    }
    setLoading(false);
    setIsEmpty(true);
    
    if(fetchedEvents.data.data.length > 0){
      setIsEmpty(false);
    }
  };

  const getDate = date => {
    return moment(date.split('T')[0]).format('DD MMM, Y');
  };
  
  const toggleFavorite = async (id) => {  
    favoriteEvents.includes(id) ? setFavoriteEvents(favoriteEvents.filter(e => e !== id)) : setFavoriteEvents([...favoriteEvents, id]);
    await axios.post('http://localhost:8080/api/favorite', {'favoriteID':id});
  }

  const checkFavorite = (id) => favoriteEvents.includes(id)

  const unFavoriteAllEvents = async () => {
    const fetchedEvents = await axios.post('http://localhost:8080/api/favorite?All=1');
    getEvents();
    setMessage(fetchedEvents.data.message);
    toggleAlert();   
  }

  const toggleAlert = () => {
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 2000)
  }

  const emptyContent = () => {
    return (
      <View style={{ 
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: 110,
       }}>
        <Empty/>
        <Text style={{
          paddingHorizontal: 20,
          marginBottom: 20,
          paddingVertical: 20,
          fontSize: 22,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#002AE7'
        }}>
          There is no favorite events yet.
        </Text>
    </View>);
  };

  function renderEventList() {
    const renderItem = ({item}) => (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Event', {
              item,
            })
          }
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            paddingHorizontal: 20,
            backgroundColor: '#eee',
            paddingVertical: 10,
            borderRadius: 10,
          }}>

          <Image
            source={{
              uri: item.image_url,
            }}
            style={{width: 80, height: 100, borderRadius: 10}}
            resizeMode="cover"
          />
          <View style={{flex: 1, marginLeft: 20}}>
            {item.date != '' ? (
              <Text
                style={{
                  fontSize: 11,
                  color: '#002AE7',
                  letterSpacing: -0.5,
                  textTransform: 'uppercase',
                }}>
                {getDate(item.date)}
              </Text>
            ) : null}

            <Text
              style={{
                fontSize: 11,
                color: '#332C34',
                marginVertical: 5,
              }}>
              {item.title}
            </Text>
            {item.place != '' ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MapMarkerAltSolid
                  width={14}
                  height={14}
                  fill={'#002AE7'}
                  marginVertical={5}
                  style={{opacity: 1}}
                />
                <Text
                  style={{
                    fontSize: 8,
                    color: 'black',
                    marginLeft: 7,
                    opacity:1,
                    textTransform: 'uppercase',
                  }}>
                  {item.place}
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
          <View
              style={{
                position: 'absolute',
                top:0,
                right:0,
                height:100,
                width:50,
                flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                marginRight:20,
                marginTop:-20,
              }}
            >
              {
                checkFavorite(item._id) ? ( <FavoriteFilledButton onPress={() => toggleFavorite(item._id)} />) : ( <FavoriteButton onPress={() => toggleFavorite(item._id)} />)
              }
         
            
          </View>

      </View>
    );

    return (
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        onRefresh={getEvents}
        refreshing={loading}
        ListEmptyComponent={emptyContent}
      />
    );
  }

  return (
      <SafeAreaView style={{flex: 1}}>
        
        <View style={{
            fontSize: 22
          }}>
          <Text style={{
            paddingHorizontal: 20,
            marginBottom: 20,
            fontSize: 22
            
          }}>
           Favorite Events
          </Text>
            { isEmpty == true ? null :(<View
                style={{
                  position: 'absolute',
                  top:0,
                  right:0,
                  height:25,
                  width:50,
                  flex:1,
                  flexDirection:'row',
                  justifyContent:'center',
                  alignItems:'center',
                  marginRight:20
                }}
              > 
              <FavoriteFilledButton isAll={true} fill='#002AE7' onPress={() => unFavoriteAllEvents()} />
              </View> 
          )
        }

        </View>

        <AwesomeAlert
          show={show}
          showProgress={false}
          title={message}
          closeOnTouchOutside={true}
          titleStyle={styles.titleStyle}
          overlayStyle={styles.overlayStyle}
        />

        {loading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#002AE7" />
          </View>
        ) : (
          renderEventList()
        )}
        
      </SafeAreaView>
  
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    color: '#002AE7',
    textAlign: 'center',
  },
  overlayStyle: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});