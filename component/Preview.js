import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Modal, Text, Button} from 'react-native-paper';
import {getColorTypePokemon, capitalize} from '../helper';
import {useNavigation} from '@react-navigation/native';

function PreviewComponent({selectedPokemon, setSelectedPokemon}) {
  const navigation = useNavigation();
  return (
    <Modal
      visible={Boolean(selectedPokemon)}
      onDismiss={() => setSelectedPokemon(null)}>
      <View style={styles.wrapperImageModal}>
        <View style={styles.closeButton}>
          <Text onPress={() => setSelectedPokemon(null)}>X</Text>
        </View>
        <Image source={{uri: selectedPokemon?.image}} style={styles.image} />
        <View>
          <Text numberOfLines={1} variant="titleMedium" style={styles.text}>
            {selectedPokemon?.name.charAt(0).toUpperCase() +
              selectedPokemon?.name.slice(1) || ''}
          </Text>
          <View style={styles.containerType}>
            {selectedPokemon?.types.map(({type}, i) => (
              <View
                key={i}
                style={{
                  backgroundColor: getColorTypePokemon(type.name),
                  ...styles.wrapperType,
                }}>
                <Text style={styles.textType}>{capitalize(type.name)}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.containerButton}>
        <Button
          onPress={() =>
            navigation.navigate('Detail', {
              pokemonId: selectedPokemon.id,
            })
          }
          mode="contained">
          Detail
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapperImageModal: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '80%',
    width: '80%',
    marginBottom: 10,
  },
  containerButton: {
    alignSelf: 'center',
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
  },
  wrapperType: {
    padding: 5,
    marginRight: 2,
    color: 'white',
    alignItems: 'center',
  },
  containerType: {
    flexDirection: 'row',
  },
  textType: {
    color: 'white',
  },
  image: {
    width: '80%',
    height: '80%',
  },
});

export default PreviewComponent;
