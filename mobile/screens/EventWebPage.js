import React from 'react';
import {WebView} from 'react-native-webview';

const EventWebPage = ({route, navigation}) => {
  const {page_url} = route.params;
  return <WebView source={{uri: page_url}} />;
};

export default EventWebPage;
