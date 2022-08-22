import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {getColorTypePokemon, capitalize} from '../helper';
import {useSelector} from 'react-redux';

function Pokemon({route}) {
  const detailPokemon = useSelector(state =>
    state.find(({id}) => id === route.params.pokemonId),
  );
  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="contained" accessible>
        <Card.Cover resizeMode="center" source={{uri: detailPokemon.image}} />
        <Card.Content>
          <Title>{capitalize(detailPokemon?.name)}</Title>
          <View style={styles.containerContent}>
            <View style={styles.wrapper}>
              <Title>Type</Title>
              <View style={styles.containerType}>
                {detailPokemon.types.map(({type}, i) => (
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
            <View style={styles.wrapper}>
              <Title>Stats</Title>
              <View>
                {detailPokemon.stats.map(({stat, base_stat}, i) => (
                  <View key={i} style={styles.containerStats}>
                    <Text>{capitalize(stat.name)}</Text>
                    <View>
                      <Text>{base_stat}</Text>
                      {/* <ProgressBar progress={parseInt(`0.${base_stat}`, 10)} /> */}
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.wrapper}>
              <Title>Abilities</Title>
              <View style={styles.containerType}>
                {detailPokemon.abilities.map(({ability}, i) => (
                  <View key={i} style={styles.containerAbilities}>
                    <Text>{capitalize(ability.name)}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerType: {
    flexDirection: 'row',
  },
  wrapper: {
    width: '50%',
  },
  wrapperType: {
    padding: 5,
    marginRight: 2,
    color: 'white',
    justifyContent: 'center',
  },
  textType: {
    color: 'white',
  },
  containerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerAbilities: {
    flexDirection: 'column',
    marginRight: 10,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
});
export default Pokemon;
