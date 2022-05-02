import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';


export default function SearchScreen() {
  
  return (
    <View>
      <View style={[styles.searchHeader]}></View>

      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              value='Furkanix'
              placeholder="Etkinlik, sanatçı arayın."
              style={styles.searchInput}
              placeholderTextColor="rgba(255, 255, 255, 0.85)"
              selectionColor="rgba(255, 255, 255, 0.85)"
            />
           
          </View>
        </View>

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
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    top: 0,
  },
});
