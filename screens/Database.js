import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {WebView} from 'react-native-webview';

export const Database = () => {
  return (
    <WebView
      source={{uri: 'https://webstatic-sea.mihoyo.com/?lang=vi-vn#/map/2?shown_types='}}
      style={{marginTop: 20}}
    />
  );
};
