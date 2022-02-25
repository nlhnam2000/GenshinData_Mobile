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

  const sortLabel = ['Element', 'Rarity', 'Weapon', 'Regions'];
  const [currentSort, setCurrentSort] = useState(sortLabel[0]);
  const [sorting, setSorting] = useState(
    GenshinDB.elements('names', {matchCategories: true}).filter(
      item => item !== 'Dendro',
    ),
  );

  const sortingMethod = type => {
    switch (type) {
      case 'Element':
        setCurrentSort(type);
        setSorting(
          GenshinDB.elements('names', {matchCategories: true}).filter(
            item => item !== 'Dendro',
          ),
        );
        break;
      case 'Rarity':
        setCurrentSort(type);
        setSorting(['5', '4']);
        break;
      case 'Weapon':
        setCurrentSort(type);
        setSorting(['Claymore', 'Sword', 'Bow', 'Catalyst', 'Polearm']);
        break;
      case 'Regions':
        setCurrentSort(type);
        setSorting(['Mondstatd', 'Liyue', 'Inazuma']);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setLoading(false);
    // console.log(GenshinDB.characters('5', {matchCategories: true}));
    // setCharacters(GenshinDB.characters('names', {matchCategories: true}));
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
        <Text
          style={[
            styles.text,
            {
              paddingHorizontal: 10,
              marginTop: 20,
              fontSize: 20,
              color: 'white',
            },
          ]}>
          Sort by
        </Text>
        <View
          style={{
            width,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          {sortLabel.map((label, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.labelButton,
                {
                  backgroundColor:
                    label === currentSort
                      ? colors.background
                      : colors.contentBackground,
                },
              ]}
              onPress={() => sortingMethod(label)}>
              <Text style={[styles.text, {fontSize: 20}]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {sorting.map((title, i) => (
          <View
            key={i}
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
              {sorting[i] === '5' || sorting[i] === '4'
                ? sorting[i] + ' Star'
                : sorting[i]}
            </Text>
            <View style={styles.characterWrapper}>
              {GenshinDB.characters(sorting[i], {
                matchCategories: true,
              }).map((character, index) => {
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
              })}
            </View>
          </View>
        ))}
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
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textWhite,
  },
  labelButton: {
    padding: 10,
  },
});
