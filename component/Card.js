import React from 'react';
import {Card as CardComponent} from 'react-native-paper';

function Card({image, id, setPreview}) {
  return (
    <CardComponent onLongPress={() => setPreview(id)}>
      <CardComponent.Cover source={{uri: image}} />
    </CardComponent>
  );
}

export default Card;
