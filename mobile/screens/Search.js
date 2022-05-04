import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
  Image
} from 'react-native';

import {MapMarkerAltSolid, Search, FavoriteButton, FavoriteFilledButton} from '../components/icons';

import axios from 'axios';
import moment from 'moment';

export default function SearchScreen() {
  
  const [query, setQuery] = useState();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  
  const searchByKeywordFromBackend = async () => {
    setQuery(null);
    setLoading(true);
    setEvents([]);
    const searchedEvents = await axios.get(
      `http://localhost:8080/api/event-search?keyword=${query.toLowerCase()}`,
    );

    if (searchedEvents.data.status == 200) {
      setEvents(searchedEvents.data.data);
    }
    setLoading(false);
    setIsStart(false);
  }

  const getDate = date => {
    return moment(date.split('T')[0]).format('DD MMM, Y');
  };

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

  const emptyContent = () => {
    return (
        <Text style={{
          paddingHorizontal: 20,
          marginBottom: 20,
          paddingVertical: 100,
          fontSize: 22,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#002AE7'
        }}>
          {isStart ? 'Etkinlikleri kaçırmamak için arama yapın.' : 'Aradığınız etkinlik veya sanatçı için hiçbir sonuç bulunamadı!'}
        </Text> 
    )
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
        style={{marginTop: 70}}
        ListEmptyComponent={emptyContent}
      />
    );
  }

  return (
    <View>
      <View style={[styles.searchHeader]}></View>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              value={query}
              placeholder="Etkinlik, sanatçı arayın."
              style={styles.searchInput}
              placeholderTextColor="rgba(255, 255, 255, 0.85)"
              selectionColor="rgba(255, 255, 255, 0.85)"
              onChangeText={text => setQuery(text)}
            />
           {query ? (
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => searchByKeywordFromBackend()}>
                <Search stroke={'#fff'} width={30} height={30} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        {loading ? (
          <View style={{flex: 1, justifyContent: 'center', marginTop: 200}}>
            <ActivityIndicator size="large" color="#002AE7" />
          </View>
        ) : (
          renderEventList()
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    fontSize: 22,
    paddingLeft: 5,
    paddingRight: 15,
    color: '#fff',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255, 0.5)',
    width: '100%',
    height: 60,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
  },
  searchHeader: {
    backgroundColor: '#0064FE',
    width: '100%',
    height: 175,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    top: 0,
  },
});
