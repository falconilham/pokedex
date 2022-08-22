import React from 'react';
import {Card as CardComponent} from 'react-native-paper';

function Card({item, setSelectedPokemon}) {
  return (
    <CardComponent.Cover
      source={{uri: item.image}}
      onPress={() => setSelectedPokemon(item)}
    />
  );
}

export default Card;
