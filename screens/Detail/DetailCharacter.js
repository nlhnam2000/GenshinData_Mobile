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
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import GenshinDB from 'genshin-db';
import LinearGradient from 'react-native-linear-gradient';
import {StatTab} from '../../components/Tab/Character/StatTab';
import {CharacterTab} from '../../components/Tab/CharacterTab';

const {width} = Dimensions.get('window');

export const DetailCharacter = props => {
  const [loading, setLoading] = useState(true);
  const character = props.route.params.character;
  //   const [characterInfo, setCharacterInfo] = useState(
  //     GenshinDB.characters(character),
  //   );
  const tabContent = ['Stats', 'Talents', 'Constellations'];
  const [tab, setTab] = useState(tabContent[0]);

  useEffect(() => {
    // console.log(GenshinDB.talents(character).costs.lvl10[1].name);
    setLoading(false);
    return () => {
      setTab(tabContent[0]);
    };
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Feather
          name="arrow-left"
          size={20}
          color={'white'}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <ScrollView>
        <View
          style={{
            width,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View style={styles.contentWrapper}>
            <View style={styles.contentHeader}>
              <LinearGradient
                colors={
                  GenshinDB.characters(character).rarity === '5'
                    ? colors.goldCard
                    : colors.purpleCard
                }
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
                    {GenshinDB.characters(character).name} (
                    {GenshinDB.characters(character).rarity}{' '}
                    <Feather name="star" size={20} color={colors.textWhite} />)
                  </Text>
                  <Image
                    source={{
                      uri: GenshinDB.elements(
                        GenshinDB.characters(character).element,
                      ).images.wikia,
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
          <View style={styles.tabWrapper}>
            {tabContent.map((tabname, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tabName,
                    {
                      backgroundColor:
                        tabname === tab
                          ? colors.background
                          : colors.contentBackground,
                    },
                  ]}
                  onPress={() => setTab(tabname)}>
                  <Text style={styles.tabText}>{tabname}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{width}}>
            <CharacterTab tabname={tab} character={character} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width,
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
