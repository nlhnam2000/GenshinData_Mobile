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
  Button,
  Platform,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import GenshinDB from 'genshin-db';
import LinearGradient from 'react-native-linear-gradient';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// components
import {StatTab} from '../../components/Tab/Character/StatTab';
import {CharacterTab} from '../../components/Tab/CharacterTab';
import {TalentTab} from '../../components/Tab/Character/TalentTab';
import {ConstellationTab} from '../../components/Tab/Character/ConstellationTab';
import {MaterialDialog} from '../../components/Dialog/MaterialDialog';

const {width, height} = Dimensions.get('window');
const Tab = createMaterialTopTabNavigator();

export const DetailCharacter = props => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const character = props.route.params.character;

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }

  return (
    <View style={[styles.container, {paddingTop: Platform.OS === 'ios' ? insets.top : 10}]}>
      <View style={styles.headerWrapper}>
        <Feather name="arrow-left" size={20} color={'white'} onPress={() => props.navigation.goBack()} />
      </View>
      <View
        style={{
          width,
          // justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <View style={styles.contentWrapper}>
          <View style={styles.contentHeader}>
            <LinearGradient
              colors={GenshinDB.characters(character).rarity === '5' ? colors.goldCard : colors.purpleCard}
              style={[styles.characterItem]}>
              <Image
                source={{
                  uri: GenshinDB.characters(character).images.icon,
                }}
                style={{width: 80, height: 80}}
              />
            </LinearGradient>

            <View style={styles.descriptionWrapper}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={{
                    color: colors.textWhite,
                    fontWeight: 'bold',
                    fontSize: 19,
                    marginRight: 5,
                  }}>
                  {GenshinDB.characters(character).name} ({GenshinDB.characters(character).rarity}{' '}
                  <Feather name="star" size={20} color={colors.textWhite} />)
                </Text>
                <Image
                  source={{
                    uri: GenshinDB.elements(GenshinDB.characters(character).element).images.wikia,
                  }}
                  style={{width: 20, height: 20}}
                />
              </View>
              <Text
                style={{
                  color: colors.textWhite,
                  fontWeight: 'bold',
                }}>
                {GenshinDB.characters(character).description}
              </Text>
            </View>
          </View>
        </View>
        {/* Tab */}
      </View>
      <View
        style={[styles.container, {marginTop: 20, borderBottomColor: colors.contentBackground, borderBottomWidth: 1}]}>
        <Tab.Navigator
          initialRouteName="example"
          screenOptions={{
            tabBarPressColor: colors.contentBackground,
            tabBarIndicatorStyle: {backgroundColor: 'white'},
            tabBarLabelStyle: {fontWeight: '600', fontSize: 12, color: 'white'},
            tabBarStyle: {backgroundColor: colors.contentBackground},
            tabBarActiveTintColor: 'black',
          }}>
          <Tab.Screen name="Stat" children={() => <StatTab character={character} {...props} />} />
          <Tab.Screen name="Talent" children={() => <TalentTab character={character} {...props} />} />
          <Tab.Screen name="Constellation" children={() => <ConstellationTab character={character} {...props} />} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // opacity: 0.8,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 60,
    paddingHorizontal: 10,
    width: '100%',
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  avatarWrapper: {
    borderWidth: 1,
    borderRadius: 40,
    padding: 10,
    backgroundColor: colors.contentBackground,
  },
  characterAvatar: {
    width: 60,
    height: 60,
  },
  descriptionWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  tabWrapper: {
    flexDirection: 'row',
    marginTop: 20,
  },
  tabName: {
    width: '33%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    // backgroundColor: colors.contentBackground,
    // borderColor: colors.background,
    // borderBottomWidth: 2,
  },
  tabText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
