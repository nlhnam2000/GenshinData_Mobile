import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
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
  Dimensions,
} from 'react-native';
import {colors} from '../assets/colors/colors';
import {Navbar} from '../components/Menu/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import {Avatar} from '../components/Avatar/Avatar';
import {SERVER_HOST, GetAuthenticationFromHoyolab} from '../global';

const {width, height} = Dimensions.get('window');

export const Hoyolab = props => {
  const [loading, setLoading] = useState(true);
  const [hoyolabData, setHoyolabData] = useState(null);
  const scrollRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  // const [formData, setFormData] = useState({
  //   ltuid: 0,
  //   ltoken: '',
  //   uid: 0,
  // });
  const [UID, setUID] = useState(0);
  const [cookie, setCookie] = useState('');
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const artifactPos = [0, 1, 2, 3, 4, 5];
  const [selectedArtifact, setSelectedArtifact] = useState(artifactPos[0]);

  useEffect(() => {
    const loginHoyolab = async () => {
      const hoyolab = await AsyncStorage.getItem('@hoyolab');
      // console.log(hoyolab);
      if (hoyolab) {
        setHoyolabData(JSON.parse(hoyolab));
      }
      setLoading(false);
    };

    loginHoyolab();
  }, []);

  useEffect(() => {
    const applyHoyolabData = async () => {
      if (hoyolabData) {
        const res = await axios.post(`${SERVER_HOST}/characters`, hoyolabData);
        setCharacters(res.data);
      }
    };

    applyHoyolabData();
  }, [hoyolabData]);

  useEffect(() => {
    if (characters.length > 0) {
      setSelectedCharacter(characters[0]);
    }
  }, [characters]);

  const submitHoyolabData = async () => {
    try {
      setLoading(true);
      const body = GetAuthenticationFromHoyolab(cookie, UID);
      let res = await axios.post(`${SERVER_HOST}/login`, body);
      if (res.data.isAuth) {
        setHoyolabData(res.data);
        await AsyncStorage.setItem('@hoyolab', JSON.stringify(res.data));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@hoyolab');
    setHoyolabData(null);
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
        <Modal animationType="fade" transparent={false} visible={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={{width: '100%'}}>
                <Text style={styles.heading}>
                  Note: to sync your ingame data, please open the developer console on your browser, choose Application
                  tab, on the left sidebar, click cookies tab, search for ltuid and ltoken
                </Text>

                <TextInput
                  onChangeText={text => setUID(text)}
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
                <TextInput
                  multiline
                  numberOfLines={5}
                  style={{
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: colors.contentBackground2,
                    marginTop: 15,
                    color: 'white',
                  }}
                  placeholder="Hoyolab cookie"
                  placeholderTextColor={colors.text}
                  onChangeText={text => setCookie(text)}
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
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{width: '100%', paddingBottom: 30}}
          // onContentSizeChange={() => scrollRef.current.scrollToEnd({animated: true})}
        >
          <FastImage
            source={{uri: selectedCharacter?.image}}
            resizeMode={FastImage.resizeMode.contain}
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
                    <FastImage source={{uri: selectedCharacter?.artifacts[0]?.icon}} style={{width: 40, height: 40}} />
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
                    <FastImage source={{uri: selectedCharacter?.artifacts[2].icon}} style={{width: 40, height: 40}} />
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
                    <FastImage source={{uri: selectedCharacter?.artifacts[3].icon}} style={{width: 40, height: 40}} />
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
                    <FastImage source={{uri: selectedCharacter?.artifacts[4].icon}} style={{width: 40, height: 40}} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.constellationWrapper}>
                <TouchableOpacity style={[styles.constellations, {marginLeft: -80}]}>
                  <FastImage
                    source={{uri: selectedCharacter?.constellations[0].icon}}
                    style={{
                      width: 30,
                      height: 30,
                      opacity: selectedCharacter?.constellations[0].is_activated ? 1 : 0.4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.constellations, {marginLeft: -15}]}>
                  <FastImage
                    source={{uri: selectedCharacter?.constellations[1].icon}}
                    style={{
                      width: 30,
                      height: 30,
                      opacity: selectedCharacter?.constellations[1].is_activated ? 1 : 0.4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.constellations, {}]}>
                  <FastImage
                    source={{uri: selectedCharacter?.constellations[2].icon}}
                    style={{
                      width: 30,
                      height: 30,
                      opacity: selectedCharacter?.constellations[2].is_activated ? 1 : 0.4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.constellations, {}]}>
                  <FastImage
                    source={{uri: selectedCharacter?.constellations[3].icon}}
                    style={{
                      width: 30,
                      height: 30,
                      opacity: selectedCharacter?.constellations[3].is_activated ? 1 : 0.4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.constellations, {marginLeft: -15}]}>
                  <FastImage
                    source={{uri: selectedCharacter?.constellations[4].icon}}
                    style={{
                      width: 30,
                      height: 30,
                      opacity: selectedCharacter?.constellations[4].is_activated ? 1 : 0.4,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.constellations, {marginLeft: -80}]}>
                  <FastImage
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
          </FastImage>
          <View style={{padding: 10}}>
            <View style={styles.itemInfoWrapper}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.artifact}>
                  <FastImage
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
              <View style={{}}>
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
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
  },
  characterSummary: {
    width: '100%',
    alignItems: 'center',
    //  marginTop: 20,
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
    marginTop: 20,
  },
  itemInfoWrapper: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
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
    marginLeft: 20,
  },
});
