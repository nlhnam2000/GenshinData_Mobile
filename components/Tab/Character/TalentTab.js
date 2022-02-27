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
  ImageBackground,
} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {materials, talents} from 'genshin-db';
import Feather from 'react-native-vector-icons/Feather';
import {IMAGE_URL} from '../../../global';
import {MaterialDialog} from '../../Material/MaterialDialog';
import {color} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

export const TalentTab = props => {
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [materialClicked, setMaterialClicked] = useState('');
  const [toggleSkills, setToggleSkills] = useState({
    skill1: false,
    skill2: false,
    skill3: false,
  });
  const [togglePassive, setTogglePassive] = useState({
    passive1: false,
    passive2: false,
    passive3: false,
  });
  const [level, setLevel] = useState({
    skill1: 1,
    skill2: 1,
    skill3: 1,
  });

  let URL_SKILLS = [
    require('../../../assets/gifs/Diluc/skill1.gif'),
    require('../../../assets/gifs/Diluc/skill2.gif'),
    require('../../../assets/gifs/Diluc/skill3.gif'),
  ];

  const talentLevel = [
    {
      label: 'Level 2',
      key: 'lvl2',
    },
    {
      label: 'Level 3',
      key: 'lvl3',
    },
    {
      label: 'Level 4',
      key: 'lvl4',
    },
    {
      label: 'Level 5',
      key: 'lvl5',
    },
    {
      label: 'Level 6',
      key: 'lvl6',
    },
    {
      label: 'Level 7',
      key: 'lvl7',
    },
    {
      label: 'Level 8',
      key: 'lvl8',
    },
    {
      label: 'Level 9',
      key: 'lvl9',
    },
    {
      label: 'Level 10',
      key: 'lvl10',
    },
  ];

  const inspectTalentsAttributes = (labels, parameters, level) => {
    let result = [];
    // loop through the labels, take the info name, params and its value
    labels.forEach(label => {
      let name = label.split('|')[0];
      let str = label.split('|')[1];
      let params = [];

      if (label.includes('/' || 'Low/High Plunge DMG')) {
        params.push(str.substring(str.indexOf('{') + 1, str.indexOf('}')));
        params.push(str.substring(str.indexOf('/') + 2, str.lastIndexOf('}')));
      } else if (label.includes('+' || 'Charged Attack DMG')) {
        params.push(str.substring(str.indexOf('{') + 1, str.indexOf('}')));
        params.push(str.substring(str.indexOf('+') + 2, str.lastIndexOf('}')));
      } else {
        params.push(str.substring(str.indexOf('{') + 1, str.lastIndexOf('}')));
      }

      let paramsValue;

      if (params.length === 2) {
        paramsValue = params.reduce((el1, el2) => {
          let paramsName1 = el1.split(':')[0];
          let formattedSymbol1 = el1.split(':')[1];
          let paramsName2 = el2.split(':')[0];
          let formattedSymbol2 = el2.split(':')[1];

          return (
            attributeFormated(parameters[paramsName1][level - 1], formattedSymbol1) +
            ' / ' +
            attributeFormated(parameters[paramsName2][level - 1], formattedSymbol2)
          );
        });
      } else {
        let paramsName = params[0].split(':')[0];
        let paramsFormatedSymbol = params[0].split(':')[1];
        paramsValue = attributeFormated(parameters[paramsName][level - 1], paramsFormatedSymbol);
      }

      result.push({
        label: name,
        value: paramsValue,
      });
    });

    return result;
  };

  const attributeFormated = (value, formatter) => {
    if (formatter === 'F') {
      return value.toFixed(2);
    } else if (formatter === 'F1P') {
      return (value * 100).toFixed(1) + '%';
    } else if (formatter === 'P') {
      return (value * 100).toFixed(2) + '%';
    } else if (formatter === 'F1') {
      return value.toFixed(1);
    } else if (formatter === 'I') {
      return value;
    }
  };

  const decreaseSkillLevel = skill => {
    if (skill === 1) {
      if (level.skill1 >= 2) {
        setLevel(prev => ({...prev, skill1: prev.skill1 - 1}));
      }
    } else if (skill === 2) {
      if (level.skill2 >= 2) {
        setLevel(prev => ({...prev, skill2: prev.skill2 - 1}));
      }
    }
    if (level.skill3 >= 2) {
      setLevel(prev => ({...prev, skill3: prev.skill3 - 1}));
    }
  };

  const increaseSkillLevel = skill => {
    if (skill === 1) {
      if (level.skill1 <= 9) {
        setLevel(prev => ({...prev, skill1: prev.skill1 + 1}));
      }
    } else if (skill === 2) {
      if (level.skill2 <= 9) {
        setLevel(prev => ({...prev, skill2: prev.skill2 + 1}));
      }
    } else if (skill === 3) {
      if (level.skill3 <= 9) {
        setLevel(prev => ({...prev, skill3: prev.skill3 + 1}));
      }
    }
  };

  useEffect(() => {
    console.log(talents(props.character).combat1.attributes);
    setLoading(false);

    return () => {
      // setLevel(prev => ({...prev, skill1: 1, skill2: 1, skill3: 1}));
      // setToggleSkills(prev => ({
      //   ...prev,
      //   skill1: false,
      //   skill2: false,
      //   skill3: false,
      // }));
      // setTogglePassive(prev => ({
      //   ...prev,
      //   passive1: false,
      //   passive2: false,
      //   passive3: false,
      // }));
    };
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
            <Text style={styles.heading}>Skills</Text>
            <View style={styles.talenWrapper}>
              <View style={styles.talentName}>
                <Image
                  source={{
                    uri: IMAGE_URL + talents(props.character).images.combat1 + '.png',
                  }}
                  style={{width: 60, height: 60, marginBottom: 10}}
                />
                <Text style={[styles.heading, {textAlign: 'center'}]}>{talents(props.character).combat1.name}</Text>
              </View>

              {toggleSkills.skill1 ? null : (
                <Text style={{textAlign: 'center', marginTop: 10}}>
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={'white'}
                    onPress={() => setToggleSkills(prev => ({...prev, skill1: true}))}
                  />
                </Text>
              )}
              {toggleSkills.skill1 ? (
                <View style={{width: '100%'}}>
                  <Text style={[styles.text, {marginTop: 10}]}>{talents(props.character).combat1.info}</Text>
                  <View style={styles.attributeInfoWrapper}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        paddingHorizontal: 100,
                        marginBottom: 20,
                      }}>
                      <Feather
                        name="minus-circle"
                        size={20}
                        color={colors.textWhite}
                        onPress={() => decreaseSkillLevel(1)}
                      />
                      <Text style={styles.text}>Level {level.skill1}</Text>
                      <Feather
                        name="plus-circle"
                        size={20}
                        color={colors.textWhite}
                        onPress={() => increaseSkillLevel(1)}
                      />
                    </View>
                    {inspectTalentsAttributes(
                      talents(props.character).combat1.attributes.labels,
                      talents(props.character).combat1.attributes.parameters,
                      level.skill1,
                    ).map((item, index) => {
                      return (
                        <View style={styles.line} key={index}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                            }}>
                            <Text
                              style={[
                                styles.text,
                                {
                                  fontSize: item.label.split(' ').length > 2 ? 13 : 15,
                                },
                              ]}>
                              {item.label}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                            }}>
                            <Text style={[styles.text, {fontSize: 15, color: 'white'}]}>{item.value}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                  <Text style={{textAlign: 'center'}}>
                    <Feather
                      name="chevron-up"
                      size={20}
                      color={'white'}
                      onPress={() => setToggleSkills(prev => ({...prev, skill1: false}))}
                    />
                  </Text>
                </View>
              ) : null}
            </View>
            {/* skill 2 */}
            <View style={styles.talenWrapper}>
              <View style={styles.talentName}>
                <Image
                  source={{
                    uri: IMAGE_URL + talents(props.character).images.combat2 + '.png',
                  }}
                  style={{width: 60, height: 60, marginBottom: 10}}
                />
                <Text style={[styles.heading, {textAlign: 'center'}]}>{talents(props.character).combat2.name}</Text>
                {/* {toggleSkills.skill2 ? (
                  <ImageBackground
                    source={URL_SKILLS[1]}
                    style={{
                      width: width - 20,
                      height: 170,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      marginTop: -10,
                      opacity: 0.5,
                    }}
                  />
                ) : null} */}
              </View>

              {toggleSkills.skill2 ? null : (
                <Text style={{textAlign: 'center', marginTop: 10}}>
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={'white'}
                    onPress={() => setToggleSkills(prev => ({...prev, skill2: true}))}
                  />
                </Text>
              )}
              {toggleSkills.skill2 ? (
                <View style={{width: '100%'}}>
                  <Text style={[styles.text, {marginTop: 10}]}>{talents(props.character).combat2.info}</Text>
                  <View style={styles.attributeInfoWrapper}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        paddingHorizontal: 100,
                        marginBottom: 20,
                      }}>
                      <Feather
                        name="minus-circle"
                        size={20}
                        color={colors.textWhite}
                        onPress={() => decreaseSkillLevel(2)}
                      />
                      <Text style={styles.text}>Level {level.skill2}</Text>
                      <Feather
                        name="plus-circle"
                        size={20}
                        color={colors.textWhite}
                        onPress={() => increaseSkillLevel(2)}
                      />
                    </View>
                    {inspectTalentsAttributes(
                      talents(props.character).combat2.attributes.labels,
                      talents(props.character).combat2.attributes.parameters,
                      level.skill2,
                    ).map((item, index) => {
                      return (
                        <View style={styles.line} key={index}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              width: '80%',
                            }}>
                            <Text style={[styles.text, {fontSize: 15}]}>{item.label}</Text>
                          </View>
                          <Text style={[styles.text, {fontSize: 15, color: 'white'}]}>{item.value}</Text>
                        </View>
                      );
                    })}
                  </View>
                  <Text style={{textAlign: 'center'}}>
                    <Feather
                      name="chevron-up"
                      size={20}
                      color={'white'}
                      onPress={() => setToggleSkills(prev => ({...prev, skill2: false}))}
                    />
                  </Text>
                </View>
              ) : null}
            </View>
            {/* skill 3 */}
            <View style={styles.talenWrapper}>
              <View style={styles.talentName}>
                <Image
                  source={{
                    uri: IMAGE_URL + talents(props.character).images.combat3 + '.png',
                  }}
                  style={{width: 60, height: 60, marginBottom: 10}}
                />
                <Text style={[styles.heading, {textAlign: 'center'}]}>{talents(props.character).combat3.name}</Text>
                {/* {toggleSkills.skill3 ? (
                  <ImageBackground
                    source={URL_SKILLS[2]}
                    style={{
                      width: width - 20,
                      height: 170,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      marginTop: -10,
                      opacity: 0.5,
                    }}
                  />
                ) : null} */}
              </View>

              {toggleSkills.skill3 ? null : (
                <Text style={{textAlign: 'center', marginTop: 10}}>
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={'white'}
                    onPress={() => setToggleSkills(prev => ({...prev, skill3: true}))}
                  />
                </Text>
              )}
              {toggleSkills.skill3 ? (
                <View style={{width: '100%'}}>
                  <Text style={[styles.text, {marginTop: 10}]}>{talents(props.character).combat3.info}</Text>
                  <View style={styles.attributeInfoWrapper}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        paddingHorizontal: 100,
                        marginBottom: 20,
                      }}>
                      <Feather
                        name="minus-circle"
                        size={20}
                        color={colors.textWhite}
                        onPress={() => decreaseSkillLevel(3)}
                      />
                      <Text style={styles.text}>Level {level.skill3}</Text>
                      <Feather
                        name="plus-circle"
                        size={20}
                        color={colors.textWhite}
                        onPress={() => increaseSkillLevel(3)}
                      />
                    </View>
                    {inspectTalentsAttributes(
                      talents(props.character).combat3.attributes.labels,
                      talents(props.character).combat3.attributes.parameters,
                      level.skill3,
                    ).map((item, index) => {
                      return (
                        <View style={styles.line} key={index}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              width: '80%',
                            }}>
                            <Text style={[styles.text, {fontSize: 15}]}>{item.label}</Text>
                          </View>
                          <Text style={[styles.text, {fontSize: 15, color: 'white'}]}>{item.value}</Text>
                        </View>
                      );
                    })}
                  </View>
                  <Text style={{textAlign: 'center'}}>
                    <Feather
                      name="chevron-up"
                      size={20}
                      color={'white'}
                      onPress={() => setToggleSkills(prev => ({...prev, skill3: false}))}
                    />
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          {/* Passives */}
          <View style={styles.contentSection}>
            <Text style={styles.heading}>Passives</Text>
            <View style={styles.talenWrapper}>
              <Image
                source={{
                  uri: IMAGE_URL + talents(props.character).images.passive1 + '.png',
                }}
                style={{width: 60, height: 60, marginBottom: 10}}
              />
              <Text style={[styles.heading, {textAlign: 'center'}]}>{talents(props.character).passive1.name}</Text>

              {togglePassive.passive1 ? null : (
                <Text style={{textAlign: 'center', marginTop: 10}}>
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={'white'}
                    onPress={() => setTogglePassive(prev => ({...prev, passive1: true}))}
                  />
                </Text>
              )}
              {togglePassive.passive1 ? (
                <View>
                  <Text style={[styles.text, {marginTop: 10}]}>{talents(props.character).passive1.info}</Text>
                  <Text style={{textAlign: 'center'}}>
                    <Feather
                      name="chevron-up"
                      size={20}
                      color={'white'}
                      onPress={() => setTogglePassive(prev => ({...prev, passive1: false}))}
                    />
                  </Text>
                </View>
              ) : null}
            </View>
            {/* passive 2 */}
            <View style={styles.talenWrapper}>
              <Image
                source={{
                  uri: IMAGE_URL + talents(props.character).images.passive2 + '.png',
                }}
                style={{width: 60, height: 60, marginBottom: 10}}
              />
              <Text style={[styles.heading, {textAlign: 'center'}]}>{talents(props.character).passive2.name}</Text>
              {togglePassive.passive2 ? null : (
                <Text style={{textAlign: 'center', marginTop: 10}}>
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={'white'}
                    onPress={() => setTogglePassive(prev => ({...prev, passive2: true}))}
                  />
                </Text>
              )}
              {togglePassive.passive2 ? (
                <View>
                  <Text style={[styles.text, {marginTop: 10}]}>{talents(props.character).passive2.info}</Text>
                  <Text style={{textAlign: 'center'}}>
                    <Feather
                      name="chevron-up"
                      size={20}
                      color={'white'}
                      onPress={() => setTogglePassive(prev => ({...prev, passive2: false}))}
                    />
                  </Text>
                </View>
              ) : null}
            </View>
            {/* passive 3 */}
            <View style={styles.talenWrapper}>
              <Image
                source={{
                  uri: IMAGE_URL + talents(props.character).images.passive3 + '.png',
                }}
                style={{width: 60, height: 60, marginBottom: 10}}
              />
              <Text style={[styles.heading, {textAlign: 'center'}]}>{talents(props.character).passive3.name}</Text>
              {togglePassive.passive3 ? null : (
                <Text style={{textAlign: 'center', marginTop: 10}}>
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={'white'}
                    onPress={() => setTogglePassive(prev => ({...prev, passive3: true}))}
                  />
                </Text>
              )}
              {togglePassive.passive3 ? (
                <View>
                  <Text style={[styles.text, {marginTop: 10}]}>{talents(props.character).passive3.info}</Text>
                  <Text style={{textAlign: 'center'}}>
                    <Feather
                      name="chevron-up"
                      size={20}
                      color={'white'}
                      onPress={() => setTogglePassive(prev => ({...prev, passive3: false}))}
                    />
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          {/* Material */}
          <View style={styles.contentSection}>
            <Text style={styles.heading}>Talent Materials</Text>
            <View
              style={[
                styles.talenWrapper,
                {
                  backgroundColor: colors.contentBackground,
                  width,
                  justifyContent: 'space-between',
                  paddingHorizontal: 0,
                },
              ]}>
              {talentLevel.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: index % 2 === 0 ? colors.contentBackground : colors.contentBackground2,
                  }}>
                  <Text style={[styles.text, {marginRight: 15, fontSize: 21}]}>{item.label}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    {talents(props.character).costs[item.key].map((mat, i) => (
                      <TouchableOpacity
                        key={i}
                        style={{alignItems: 'center'}}
                        onPress={() => {
                          setMaterialClicked(mat.name);
                          setOpenModal(true);
                        }}>
                        <Image source={{uri: materials(mat.name).images.fandom}} style={{width: 45, height: 45}} />
                        <Text style={styles.text}>{mat.count}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      {openModal ? (
        <MaterialDialog visible={openModal} message={materialClicked} onCancel={() => setOpenModal(false)} />
      ) : null}
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  talenWrapper: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  talentName: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textWhite,
  },
  attributeInfoWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
});
