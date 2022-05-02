import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import {MapMarkerAltSolid, DeleteButton} from '../components/icons';

const deleteEvent = () => { 
  alert('Event deleted');
}

const onPress = () => {
  alert('Event clicked');
}

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text
        style={{
          textAlign: 'center',
          paddingHorizontal: 20,
          marginBottom: 20,
          fontSize: 22
        }}>
        Yaklaşan Etkinlikler
      </Text>

      <View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            paddingHorizontal: 20
          }}>

          <Image
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
            style={{width: 80, height: 100, borderRadius: 10}}
            resizeMode="cover"
          />

          <View style={{flex: 1, marginLeft: 20}}>
          
            <Text
              style={{
                fontSize: 14,
                color: '#FE9F6A',
                letterSpacing: -0.5,
                textTransform: 'uppercase',
              }}>
              2022
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: '#332C34',
                marginVertical: 5,
              }}>
              Title
            </Text>
            
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MapMarkerAltSolid
                width={14}
                height={14}
                fill={'#542AE7'}
                style={{opacity: 0.8}}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: '#B1B6D4',
                  marginLeft: 7,
                  textTransform: 'uppercase',
                }}>
                Place
              </Text>
            </View>
            
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
                justifyContent:'center',
              }}
            >
            <DeleteButton onPress={deleteEvent}/>
            
          </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
