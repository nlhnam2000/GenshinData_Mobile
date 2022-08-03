import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import {colors} from '../assets/colors/colors';
import {Navbar} from '../components/Menu/Navbar';
import {domains, materials, talents, characters, weapons} from 'genshin-db';
import {getTodayCharacter} from '../global';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('window');

export const HomeScreen = props => {
  const [loading, setLoading] = useState(true);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [today, setToday] = useState(moment().format('dddd'));

  const renderDayOfWeek = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.dayofweekButton,
          {
            backgroundColor:
              item === today ? colors.contentBackground : colors.background,
          },
        ]}>
        <Text
          style={{
            color: item === today ? 'white' : 'rgb(150,150,150)',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setLoading(false);
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar label="Today Farming" />
      <ScrollView>
        <View style={{width}}>
          <View style={styles.dayofweek}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setToday(day)}
                style={{
                  padding: 10,
                  marginTop: 5,
                  marginLeft: 5,
                  backgroundColor: colors.contentBackground,
                }}>
                <Text
                  style={[styles.text, {color: day === today ? 'white' : colors.text}]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* <FlatList
            data={days}
            keyExtractor={item => item}
            renderItem={renderDayOfWeek}
            horizontal
            showsHorizontalScrollIndicator={false}
          /> */}
          {getTodayCharacter(today, 'Character').map((item, index) => (
            <View style={styles.contentWrapper} key={index}>
              <Text
                style={[
                  styles.text,
                  {paddingHorizontal: 10, color: 'white', fontSize: 19},
                ]}>
                {item.domainEntrance}
              </Text>
              <View style={{width: '100%'}}>
                <View style={styles.characterWrapper}>
                  {item.characters.map((char, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() =>
                        props.navigation.navigate('DetailCharacter', {character: char})
                      }>
                      <LinearGradient
                        colors={
                          characters(char).rarity === '5'
                            ? colors.goldCard
                            : colors.purpleCard
                        }
                        style={[styles.characterItem]}>
                        <FastImage
                          source={{
                            uri: characters(char).images.icon,
                          }}
                          style={{
                            width: 80,
                            height: 80,
                          }}
                        />
                        <View style={styles.characterName}>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: colors.text,
                              fontWeight: 'bold',
                            }}>
                            {char}
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          ))}

          {getTodayCharacter(today, 'Weapon').map((item, index) => (
            <View style={styles.contentWrapper} key={index}>
              <Text
                style={[
                  styles.text,
                  {paddingHorizontal: 10, color: 'white', fontSize: 19},
                ]}>
                {item.domainEntrance}
              </Text>
              <View style={{width: '100%'}}>
                <View style={styles.characterWrapper}>
                  {item.characters.map((char, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() =>
                        props.navigation.navigate('DetailWeapon', {weapon: char})
                      }>
                      {weapons(char).rarity === '5' ? (
                        <LinearGradient
                          colors={colors.goldCard}
                          style={[styles.characterItem]}>
                          <FastImage
                            source={{
                              uri: weapons(char).images.icon,
                            }}
                            style={{
                              width: 100,
                              height: 100,
                            }}
                          />
                          <View style={[styles.characterName, {width: 100}]}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: colors.text,
                                fontWeight: 'bold',
                              }}>
                              {char}
                            </Text>
                          </View>
                        </LinearGradient>
                      ) : null}
                      {weapons(char).rarity === '4' ? (
                        <LinearGradient
                          colors={colors.purpleCard}
                          style={[styles.characterItem]}>
                          <FastImage
                            source={{
                              uri: weapons(char).images.icon,
                            }}
                            style={{
                              width: 100,
                              height: 100,
                            }}
                          />
                          <View style={[styles.characterName, {width: 100}]}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: colors.text,
                                fontWeight: 'bold',
                              }}>
                              {char}
                            </Text>
                          </View>
                        </LinearGradient>
                      ) : null}
                      {weapons(char).rarity === '3' ? (
                        <LinearGradient
                          colors={colors.blueCard}
                          style={[styles.characterItem]}>
                          <FastImage
                            source={{
                              uri: weapons(char).images.icon,
                            }}
                            style={{
                              width: 100,
                              height: 100,
                            }}
                          />
                          <View style={[styles.characterName, {width: 100}]}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: colors.text,
                                fontWeight: 'bold',
                              }}>
                              {char}
                            </Text>
                          </View>
                        </LinearGradient>
                      ) : null}
                      {weapons(char).rarity === '2' ? (
                        <LinearGradient
                          colors={colors.greenCard}
                          style={[styles.characterItem]}>
                          <FastImage
                            source={{
                              uri: weapons(char).images.icon,
                            }}
                            style={{
                              width: 100,
                              height: 100,
                            }}
                          />
                          <View style={[styles.characterName, {width: 100}]}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: colors.text,
                                fontWeight: 'bold',
                              }}>
                              {char}
                            </Text>
                          </View>
                        </LinearGradient>
                      ) : null}
                      {weapons(char).rarity === '1' ? (
                        <LinearGradient
                          colors={colors.grayCard}
                          style={[styles.characterItem]}>
                          <FastImage
                            source={{
                              uri: weapons(char).images.icon,
                            }}
                            style={{
                              width: 100,
                              height: 100,
                            }}
                          />
                          <View style={[styles.characterName, {width: 100}]}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: colors.text,
                                fontWeight: 'bold',
                              }}>
                              {char}
                            </Text>
                          </View>
                        </LinearGradient>
                      ) : null}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          ))}
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
  dayofweek: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dayofweekButton: {
    padding: 10,
    borderRadius: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  contentWrapper: {
    width: '100%',
    marginTop: 20,
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
