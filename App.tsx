import {Provider} from 'react-redux';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonList from './components/pokemon-list';
import {store} from './store';
import PokemonView from './components/pokemon-view';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="PokemonList"
        component={PokemonList}
        options={{ title: 'Pokemons' }}
        />
        <Stack.Screen
        name="PokemonView"
        component={PokemonView}
        options={{ title: 'Sprite' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}


