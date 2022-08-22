import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screen/Home';
import Pokemon from './screen/Pokemon';
const Stack = createNativeStackNavigator();

const listRoutes = [
  {
    name: 'Home',
    component: Home,
    options: {title: 'List Pokemon'},
  },
  {
    name: 'Detail',
    component: Pokemon,
    options: {title: 'Pokemon Detail'},
  },
];

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List Pokemon">
        {listRoutes.map(({name, component, options}, key) => (
          <Stack.Screen
            key={key}
            name={name}
            component={component}
            options={options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
