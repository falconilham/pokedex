import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screen/Home';
import Pokemon from './screen/Pokemon';
const Stack = createNativeStackNavigator();

const listRoutes = [
  {
    name: 'List Pokemon',
    component: Home,
  },
  {
    name: 'Pokemon Detail',
    component: Pokemon,
  },
];

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List Pokemon">
        {listRoutes.map(({name, component}, key) => (
          <Stack.Screen key={key} name={name} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
