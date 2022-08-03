import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import GenshinDB from 'genshin-db';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

export const MaterialDialog = props => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          {GenshinDB.materials(props.message).rarity === '5' ? (
            <>
              <LinearGradient colors={colors.goldCard} style={styles.materialNameWrapper}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  {props.message}
                </Text>
                <TouchableOpacity onPress={() => props.onCancel()}>
                  <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.materialImageWrapper}
                colors={colors.goldCard}>
                <View style={styles.materialType}>
                  <Text style={{color: 'white', fontWeight: '600'}}>
                    {GenshinDB.materials(props.message).materialtype}
                  </Text>
                  {/* <Text style={{color: 'white', fontWeight: '600'}}>Rarity</Text> */}
                </View>
                <Image
                  source={{uri: GenshinDB.materials(props.message).images.fandom}}
                  style={{width: 80, height: 80}}
                />
              </LinearGradient>
            </>
          ) : null}
          {GenshinDB.materials(props.message).rarity === '4' ? (
            <>
              <LinearGradient
                colors={colors.purpleCard}
                style={styles.materialNameWrapper}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  {props.message}
                </Text>
                <TouchableOpacity onPress={() => props.onCancel()}>
                  <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.materialImageWrapper}
                colors={colors.purpleCard}>
                <View style={styles.materialType}>
                  <Text style={{color: 'white', fontWeight: '600'}}>
                    {GenshinDB.materials(props.message).materialtype}
                  </Text>
                  {/* <Text style={{color: 'white', fontWeight: '600'}}>Rarity</Text> */}
                </View>
                <Image
                  source={{uri: GenshinDB.materials(props.message).images.fandom}}
                  style={{width: 80, height: 80}}
                />
              </LinearGradient>
            </>
          ) : null}
          {GenshinDB.materials(props.message).rarity === '3' ? (
            <>
              <LinearGradient colors={colors.blueCard} style={styles.materialNameWrapper}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  {props.message}
                </Text>
                <TouchableOpacity onPress={() => props.onCancel()}>
                  <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.materialImageWrapper}
                colors={colors.blueCard}>
                <View style={styles.materialType}>
                  <Text style={{color: 'white', fontWeight: '600'}}>
                    {GenshinDB.materials(props.message).materialtype}
                  </Text>
                  {/* <Text style={{color: 'white', fontWeight: '600'}}>Rarity</Text> */}
                </View>
                <Image
                  source={{uri: GenshinDB.materials(props.message).images.fandom}}
                  style={{width: 80, height: 80}}
                />
              </LinearGradient>
            </>
          ) : null}
          {GenshinDB.materials(props.message).rarity === '2' ? (
            <>
              <LinearGradient
                colors={colors.greenCard}
                style={styles.materialNameWrapper}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  {props.message}
                </Text>
                <TouchableOpacity onPress={() => props.onCancel()}>
                  <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.materialImageWrapper}
                colors={colors.greenCard}>
                <View style={styles.materialType}>
                  <Text style={{color: 'white', fontWeight: '600'}}>
                    {GenshinDB.materials(props.message).materialtype}
                  </Text>
                  {/* <Text style={{color: 'white', fontWeight: '600'}}>Rarity</Text> */}
                </View>
                <Image
                  source={{uri: GenshinDB.materials(props.message).images.fandom}}
                  style={{width: 80, height: 80}}
                />
              </LinearGradient>
            </>
          ) : null}
          {GenshinDB.materials(props.message).rarity === '1' ? (
            <>
              <LinearGradient colors={colors.grayCard} style={styles.materialNameWrapper}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  {props.message}
                </Text>
                <TouchableOpacity onPress={() => props.onCancel()}>
                  <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.materialImageWrapper}
                colors={colors.grayCard}>
                <View style={styles.materialType}>
                  <Text style={{color: 'white', fontWeight: '600'}}>
                    {GenshinDB.materials(props.message).materialtype}
                  </Text>
                  {/* <Text style={{color: 'white', fontWeight: '600'}}>Rarity</Text> */}
                </View>
                <Image
                  source={{uri: GenshinDB.materials(props.message).images.fandom}}
                  style={{width: 80, height: 80}}
                />
              </LinearGradient>
            </>
          ) : null}
          {GenshinDB.materials(props.message).rarity === undefined ? (
            <>
              <LinearGradient colors={colors.grayCard} style={styles.materialNameWrapper}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  {props.message}
                </Text>
                <TouchableOpacity onPress={() => props.onCancel()}>
                  <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.materialImageWrapper}
                colors={colors.grayCard}>
                <View style={styles.materialType}>
                  <Text style={{color: 'white', fontWeight: '600'}}>
                    {GenshinDB.materials(props.message).materialtype}
                  </Text>
                  {/* <Text style={{color: 'white', fontWeight: '600'}}>Rarity</Text> */}
                </View>
                <Image
                  source={{uri: GenshinDB.materials(props.message).images.fandom}}
                  style={{width: 80, height: 80}}
                />
              </LinearGradient>
            </>
          ) : null}
          <ScrollView>
            <View
              style={{
                width: '100%',
                padding: 15,
                maxHeight: 250,
                backgroundColor: 'white',
              }}>
              <Text>{GenshinDB.materials(props.message).description}</Text>
            </View>
          </ScrollView>

          <View style={styles.materialSourceWrapper}>
            <Feather name="map-pin" size={17} color={colors.background} />
            <Text style={{marginLeft: 5, color: colors.background, fontWeight: 'bold'}}>
              Source
            </Text>
          </View>
          <View style={styles.sourceWrapper}>
            {GenshinDB.materials(props.message).daysofweek?.length > 0 ? (
              <TouchableOpacity
                style={{
                  backgroundColor: colors.contentBackground,
                  padding: 10,
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{maxWidth: '90%'}}>
                  <Text style={{color: 'white', fontWeight: 'bold', marginBottom: 5}}>
                    {GenshinDB.materials(props.message).dropdomain}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {GenshinDB.materials(props.message).daysofweek.map((day, index) => {
                      if (day !== 'Sunday') {
                        return (
                          <Text
                            key={index}
                            style={{color: colors.yellow, fontWeight: 'bold'}}>
                            {day}/
                          </Text>
                        );
                      } else {
                        return (
                          <Text
                            key={index}
                            style={{color: colors.yellow, fontWeight: 'bold'}}>
                            {day}
                          </Text>
                        );
                      }
                    })}
                  </View>
                </View>
                <Feather name="chevron-right" size={24} color="white" />
              </TouchableOpacity>
            ) : (
              <View>
                {GenshinDB.materials(props.message).source.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: 'white',
                        padding: 10,
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        borderColor: colors.contentBackground,
                      }}>
                      <View>
                        <Text
                          style={{color: colors.contentBackground, fontWeight: 'bold'}}>
                          {item}
                        </Text>
                      </View>
                      <Feather name="chevron-right" size={24} color="white" />
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    // opacity: 0.2,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
  },
  cancelModal: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    width: '30%',
    marginRight: 20,
  },
  confirmModal: {
    backgroundColor: 'yellow',
    borderRadius: 20,
    padding: 10,
    width: '30%',
  },
  materialNameWrapper: {
    width: '100%',
    backgroundColor: 'rgb(171,134,193)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  materialImageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  materialType: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  materialSourceWrapper: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sourceWrapper: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
});
