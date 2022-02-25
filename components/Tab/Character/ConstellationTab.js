import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import {constellations} from 'genshin-db';
import Markdown from 'react-native-markdown-package';

const {width, height} = Dimensions.get('window');

export const ConstellationTab = props => {
  const [loading, setLoading] = useState(true);
  const c = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  useEffect(() => {
    // console.log(constellations(props.character)[c[0]]);
    setLoading(false);
  });
  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.contentSection}>
            {c.map((constellation, index) => {
              return (
                <View key={index} style={styles.constellationWrapper}>
                  <View style={styles.constellationName}>
                    <Text
                      style={[
                        styles.text,
                        {textAlign: 'center', color: 'white', marginBottom: 10},
                      ]}>
                      {constellations(props.character)[c[index]].name}
                    </Text>
                    <Text style={[styles.text, {opacity: 0.4}]}>
                      Constellation lv.{index + 1}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      marginTop: 10,
                    }}>
                    <Markdown styles={markdownStyle.singleLineMd}>
                      {constellations(props.character)[c[index]].effect}
                    </Markdown>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width,
  },
  contentSection: {
    backgroundColor: colors.contentBackground,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textWhite,
  },
  constellationWrapper: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  constellationName: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
});

const markdownStyle = {
  singleLineMd: {
    text: {
      color: colors.text,
      fontWeight: '600',
      fontSize: 17,
    },
  },
};
