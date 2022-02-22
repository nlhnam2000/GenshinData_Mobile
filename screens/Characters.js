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
import {colors} from '../assets/colors/colors';
// import {characters} from '../assets/characters/characters';
import GenshinDB from 'genshin-db';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {Navbar} from '../components/Menu/Navbar';

const {width} = Dimensions.get('window');

export const Characters = props => {
  const drawerNavigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    setLoading(false);
    // console.log(GenshinDB.characters('names', {matchCategories: true}));
    setCharacters(GenshinDB.characters('names', {matchCategories: true}));
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView>
        {/* Mondstatd */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: colors.contentBackground,
            //padding: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              paddingHorizontal: 20,
              paddingTop: 10,
            }}>
            Mondstatd
          </Text>
          <View style={styles.characterWrapper}>
            {GenshinDB.characters('Mondstatd', {matchCategories: true}).map(
              (character, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      props.navigation.navigate('DetailCharacter', {
                        character: GenshinDB.characters(character).name,
                      })
                    }>
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
                      <View style={styles.characterName}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: colors.text,
                            fontWeight: 'bold',
                          }}>
                          {GenshinDB.characters(character).name}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        </View>
        {/* Liyue */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: colors.contentBackground,
            //padding: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              paddingHorizontal: 20,
              paddingTop: 10,
            }}>
            Liyue
          </Text>
          <View style={styles.characterWrapper}>
            {GenshinDB.characters('Liyue', {matchCategories: true}).map(
              (character, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      props.navigation.navigate('DetailCharacter', {
                        character: GenshinDB.characters(character).name,
                      })
                    }>
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
                      <View style={styles.characterName}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: colors.text,
                            fontWeight: 'bold',
                          }}>
                          {GenshinDB.characters(character).name}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        </View>
        {/* Inazuma */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: colors.contentBackground,
            //padding: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              paddingHorizontal: 20,
              paddingTop: 10,
            }}>
            Inazuma
          </Text>
          <View style={styles.characterWrapper}>
            {GenshinDB.characters('Inazuma', {matchCategories: true}).map(
              (character, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      props.navigation.navigate('DetailCharacter', {
                        character: GenshinDB.characters(character).name,
                      })
                    }>
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
                      <View style={styles.characterName}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: colors.text,
                            fontWeight: 'bold',
                          }}>
                          {GenshinDB.characters(character).name}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              },
            )}
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
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerWrapper: {
    width: width,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.contentBackground,
    paddingVertical: 10,
  },
  contentWrapper: {
    // paddingHorizontal: 20,
  },
  characterWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexBasis: '17%',
    flexWrap: 'wrap',
    marginVertical: 20,
    backgroundColor: colors.contentBackground,
    paddingVertical: 10,
  },
  characterItem: {
    // padding: 10,
    marginLeft: 5,
    marginBottom: 5,
  },
  characterName: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    flexWrap: 'wrap',
    width: 80,
    flexDirection: 'row',
  },
});
