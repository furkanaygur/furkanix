import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';

import axios from 'axios';
import moment from 'moment';

import {MapMarkerAltSolid, DeleteButton, FavoriteButton, FavoriteFilledButton, Empty} from '../components/icons';

const HomeScreen = () => {

  const [events, setEvents] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const fetchedEvents = await axios('http://localhost:8080/api/events');
    if (fetchedEvents.data.status == 200) {
      setEvents(fetchedEvents.data.data);
    }
    setLoading(false);
    setIsEmpty(false);
  };

  const getDate = date => {
    return moment(date.split('T')[0]).format('DD MMM, Y');
  };

  const deleteEvent = (id) => { 
    alert(`${id} deleted`);
  }
  
  const toggleFavorite = (id) => {  
    favoriteEvents.includes(id) ? deleteFavorite(id) : addFavorite(id);
  }

  const deleteFavorite = (id) => {
    setFavoriteEvents(favoriteEvents.filter(e => e !== id))
  }

  const addFavorite = (id) => { 
    setFavoriteEvents([...favoriteEvents, id])
  }

  const checkFavorite = (id) => favoriteEvents.includes(id)

  const deleteAllEvents = async () => {
    const fetchedEvents = await axios.delete('http://localhost:8080/api/events');
    alert(fetchedEvents.data.message);   
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
          Henüz bir etkinlik bulunmuyor. Etkinlikleri kaçırmamak için lütfen arama yapın.
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
                marginRight:20
              }}
            >
              {
                checkFavorite(item._id) ? ( <FavoriteFilledButton onPress={() => toggleFavorite(item._id)} />) : ( <FavoriteButton onPress={() => toggleFavorite(item._id)} />)
              }
            
            
            <DeleteButton style={{ marginLeft:25 }} onPress={() => deleteEvent(item._id)}/>            
            
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
          {isEmpty ? 'Son Etkinlikler' : 'Etkinlikler Sayfasi'}
        </Text>
        { isEmpty ? (<View
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
            <DeleteButton isAll={true} onPress={() => deleteAllEvents()} />
            </View>
        )
       : null}

       </View>

      
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

export default HomeScreen;
