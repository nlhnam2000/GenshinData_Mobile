import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Modal,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Button,
} from 'react-native';
import {colors} from '../assets/colors/colors';
import {Navbar} from '../components/Menu/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {Avatar} from '../components/Avatar/Avatar';
import GenshinDB from 'genshin-db';

export const Hoyolab = props => {
  const [loading, setLoading] = useState(true);
  const [hoyolabData, setHoyolabData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [ltuid, setLtuid] = useState(0);
  const [ltoken, setLtoken] = useState('');
  const [uid, setUid] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const artifactPos = [0, 1, 2, 3, 4, 5];
  const [selectedArtifact, setSelectedArtifact] = useState(artifactPos[0]);

  useLayoutEffect(() => {
    AsyncStorage.getItem('@hoyolab')
      .then(data => setHoyolabData(JSON.parse(data)))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const applyHoyolabData = async () => {
      if (hoyolabData === null) {
        setOpenModal(true);
      } else {
        await AsyncStorage.removeItem('@hoyolab');
        await AsyncStorage.setItem('@hoyolab', JSON.stringify(hoyolabData));
        setOpenModal(false);

        let res = await axios.post('http://locahost:8000/characters', hoyolabData);
        setCharacters(res.data);
        setSelectedCharacter(res.data[0]);
      }
    };

    applyHoyolabData();
  }, [hoyolabData]);

  // useEffect(() => {
  //   // console.log(characters[0].name);
  //   setSelectedCharacter(characters[0]);
  // }, [characters]);

  const submitHoyolabData = async () => {
    try {
      let data = {
        uid: parseInt(uid),
        ltoken,
        ltuid: parseInt(ltuid),
      };
      let res = await axios.post('http://localhost:8000/characters', data);
      if (res.data.isAuth) {
        setHoyolabData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@hoyolab');
    setOpenModal(true);
  };

  const renderCharacter = ({item}) => {
    return (
      <TouchableOpacity style={{padding: 10}} onPress={() => setSelectedCharacter(item)}>
        <Avatar name={item.name} rarity={item.rarity} source={item.icon} />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size={'large'} color="white" />
      </View>
    );
  }

  if (hoyolabData === null) {
    return (
      <View style={styles.container}>
        <Modal animationType="fade" transparent={false} visible={openModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={{width: '100%'}}>
                <Text style={styles.heading}>
                  Note: to sync your ingame data, please open the developer console on your browser, choose Application
                  tab, on the left sidebar, click cookies tab, search for ltuid and ltoken
                </Text>
                <TextInput
                  onChangeText={text => setLtuid(text)}
                  placeholder="ltuid"
                  placeholderTextColor={colors.text}
                  style={{
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: colors.contentBackground2,
                    marginTop: 15,
                    color: 'white',
                  }}
                />
                <TextInput
                  onChangeText={text => setLtoken(text)}
                  placeholder="ltoken"
                  placeholderTextColor={colors.text}
                  style={{
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: colors.contentBackground2,
                    marginTop: 15,
                    color: 'white',
                  }}
                />
                <TextInput
                  onChangeText={text => setUid(text)}
                  placeholder="ingame UID"
                  placeholderTextColor={colors.text}
                  style={{
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: colors.contentBackground2,
                    marginTop: 15,
                    color: 'white',
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => submitHoyolabData()}
                style={{
                  paddingVertical: 10,
                  borderRadius: 10,
                  backgroundColor: colors.background,
                  marginTop: 15,
                  paddingHorizontal: 20,
                }}>
                <Text style={styles.heading}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar label="Hoyolab" />
      <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button title="Logout" color={colors.text} onPress={() => logout()} />
      </View>
      <View style={styles.inputWrapper}>
        <FlatList
          data={characters}
          horizontal
          renderItem={renderCharacter}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
        <ScrollView style={{width: '100%', height: '100%'}}>
          <ImageBackground
            source={{uri: selectedCharacter?.image}}
            resizeMode="contain"
            style={styles.characterSummary}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
              <View style={styles.artifactWrapper}>
                <View style={styles.left}>
                  <TouchableOpacity
                    onPress={() => setSelectedArtifact(0)}
                    style={[styles.artifact, {borderColor: selectedArtifact === 0 ? 'yellow' : colors.text}]}>
                    <Image source={{uri: selectedCharacter?.weapon.icon}} style={{width: 40, height: 40}} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedArtifact(1)}
                    style={[
                      styles.artifact,
                      {
                        borderColor:
                          selectedArtifact === selectedCharacter?.artifacts[0]?.pos ? 'yellow' : colors.textWhite,
                      },
                    ]}>
                    <Image source={{uri: selectedCharacter?.artifacts[0]?.icon}} style={{width: 40, height: 40}} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedArtifact(2)}
                    style={[
                      styles.artifact,
                      {
                        borderColor:
                          selectedArtifact === selectedCharacter?.artifacts[1].pos ? 'yellow' : colors.textWhite,
                      },
                    ]}>
                    <Image source={{uri: selectedCharacter?.artifacts[1].icon}} style={{width: 40, height: 40}} />
                  </TouchableOpacity>
                </View>
                <View style={styles.right}>
                  <TouchableOpacity
                    onPress={() => setSelectedArtifact(3)}
                    style={[
                      styles.artifact,
                      {
                        borderColor:
                          selectedArtifact === selectedCharacter?.artifacts[2].pos ? 'yellow' : colors.textWhite,
                      },
                    ]}>
                    <Image source={{uri: selectedCharacter?.artifacts[2].icon}} style={{width: 40, height: 40}} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedArtifact(4)}
                    style={[
                      styles.artifact,
                      {
                        borderColor:
                          selectedArtifact === selectedCharacter?.artifacts[3].pos ? 'yellow' : colors.textWhite,
                      },
                    ]}>
                    <Image source={{uri: selectedCharacter?.artifacts[3].icon}} style={{width: 40, height: 40}} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedArtifact(5)}
                    style={[
                      styles.artifact,
                      {
                        borderColor:
                          selectedArtifact === selectedCharacter?.artifacts[4].pos ? 'yellow' : colors.textWhite,
                      },
                    ]}>
                    <Image source={{uri: selectedCharacter?.artifacts[4].icon}} style={{width: 40, height: 40}} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.constellationWrapper}>
                <TouchableOpacity style={[styles.constellations, {marginLeft: -120}]}>
                  <Image
                    source={{uri: selectedCharacter?.constellations[0].icon}}
                    style={{
                      width: 30,
                      height: 30,
                      opacity: selectedCharacter?.constellations[0].is_activated ? 1 : 0.4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.constellations, {marginLeft: -50}]}>
                  <Image
                    source={{uri: selectedCharacter?.constellations[1].icon}}
                    style={{
                      width: 30,
                      height: 30,
                      opacity: selectedCharacter?.constellations[1].is_activated ? 1 : 0.4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.constellations, {}]}>
                  <Image
                    source={{uri: selectedCharacter?.constellations[2].icon}}
                    style={{
                      width: 30,
                      height: 30,
                      opacity: selectedCharacter?.constellations[2].is_activated ? 1 : 0.4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.constellations, {}]}>
                  <Image
                    source={{uri: selectedCharacter?.constellations[3].icon}}
                    style={{
                      width: 30,
                      height: 30,
                      opacity: selectedCharacter?.constellations[3].is_activated ? 1 : 0.4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.constellations, {marginLeft: -50}]}>
                  <Image
                    source={{uri: selectedCharacter?.constellations[4].icon}}
                    style={{
                      width: 30,
                      height: 30,
                      opacity: selectedCharacter?.constellations[4].is_activated ? 1 : 0.4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.constellations, {marginLeft: -120}]}>
                  <Image
                    source={{uri: selectedCharacter?.constellations[5].icon}}
                    style={{
                      width: 30,
                      height: 30,
                      opacity: selectedCharacter?.constellations[5].is_activated ? 1 : 0.4,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.characterName}>
              {/* <Image
                source={{uri: GenshinDB.elements(selectedCharacter?.element).images.wikia}}
                style={{width: 20, height: 20}}
              /> */}
              <Text style={[styles.heading, {textAlign: 'center'}]}>{selectedCharacter?.name}</Text>
              <Text style={{color: colors.text}}>Friendship level: {selectedCharacter?.friendship}</Text>
            </View>
          </ImageBackground>
          <View style={{padding: 20}}>
            <View style={styles.itemInfoWrapper}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.artifact}>
                  <Image
                    source={{
                      uri:
                        selectedArtifact === 0
                          ? selectedCharacter?.weapon.icon
                          : selectedCharacter?.artifacts[selectedArtifact - 1].icon,
                    }}
                    style={{width: 40, height: 40}}
                  />
                </View>
                <View style={{paddingHorizontal: 10}}>
                  <Text style={styles.heading}>
                    {selectedArtifact === 0
                      ? selectedCharacter?.weapon.name
                      : selectedCharacter?.artifacts[selectedArtifact - 1].name}
                  </Text>
                  {selectedArtifact === 0 ? (
                    <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                      <Text
                        style={{
                          padding: 5,
                          borderRadius: 20,

                          color: 'white',
                          fontWeight: '600',
                          fontSize: 17,
                        }}>
                        Level {selectedCharacter?.weapon.level}
                      </Text>
                      <Text style={[styles.text, {fontSize: 16, paddingHorizontal: 10}]}>
                        Refinement level {selectedCharacter?.weapon.refinement}
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        padding: 5,
                        borderRadius: 10,

                        color: 'white',
                        fontWeight: '600',
                        fontSize: 17,
                      }}>
                      +{selectedCharacter?.artifacts[selectedArtifact - 1].level}
                    </Text>
                  )}
                </View>
              </View>
              <ScrollView style={{width: '100%', height: 150}}>
                {selectedArtifact === 0 ? (
                  <Text style={styles.text}>{selectedCharacter?.weapon.description}</Text>
                ) : (
                  <View>
                    <Text style={[styles.text, {marginBottom: 10}]}>
                      2 set pieces: {selectedCharacter?.artifacts[selectedArtifact - 1].set.effects[0].effect}
                    </Text>
                    <Text style={styles.text}>
                      4 set pieces: {selectedCharacter?.artifacts[selectedArtifact - 1].set.effects[1].effect}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* modal */}
      <Modal animationType="fade" transparent={false} visible={openModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={{width: '100%'}}>
              <Text style={styles.heading}>
                Note: to sync your ingame data, please open the developer console on your browser, choose Application
                tab, on the left sidebar, click cookies tab, search for ltuid and ltoken
              </Text>
              <TextInput
                onChangeText={text => setLtuid(text)}
                placeholder="ltuid"
                placeholderTextColor={colors.text}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: colors.contentBackground2,
                  marginTop: 15,
                  color: 'white',
                }}
              />
              <TextInput
                onChangeText={text => setLtoken(text)}
                placeholder="ltoken"
                placeholderTextColor={colors.text}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: colors.contentBackground2,
                  marginTop: 15,
                  color: 'white',
                }}
              />
              <TextInput
                onChangeText={text => setUid(text)}
                placeholder="ingame UID"
                placeholderTextColor={colors.text}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: colors.contentBackground2,
                  marginTop: 15,
                  color: 'white',
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => submitHoyolabData()}
              style={{
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: colors.background,
                marginTop: 15,
                paddingHorizontal: 20,
              }}>
              <Text style={styles.heading}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    // opacity: 0.2,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.contentBackground,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    padding: 20,
  },
  inputWrapper: {
    width: '100%',
  },
  characterSummary: {
    width: '100%',
    alignItems: 'center',
    height: 350,
    marginTop: 20,
  },
  artifactWrapper: {
    flexDirection: 'row',
    margin: 15,
  },
  artifact: {
    borderRadius: 10,
    padding: 5,
    borderColor: 'yellow',
    borderWidth: 1,
    marginBottom: 10,
  },
  left: {
    marginRight: 10,
  },
  right: {
    marginTop: 30,
  },
  characterName: {
    width: '80%',
    backgroundColor: colors.contentBackgroundBlured,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.text,
  },
  itemInfoWrapper: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    backgroundColor: colors.contentBackgroundBlured,
    borderColor: colors.text,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  constellationWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  constellations: {
    borderRadius: 40,
    padding: 5,
    borderColor: colors.text,
    borderWidth: 1,
    marginBottom: 10,
  },
});
