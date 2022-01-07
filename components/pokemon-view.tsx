import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import {useGetPokemonByNameQuery} from '../services/pokemon-api';
import { Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';

export default function PokemonView({navigation, route}: {navigation: any, route: any}) {
  const {data, error, isLoading} = useGetPokemonByNameQuery(route.params.name);
  const [fontsLoaded] = useFonts({
    'PressStart2P': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });
  const [spriteUrl, setSpriteUrl] = useState({front: true, url: data?.sprites?.front_default});

  if(!isLoading && !spriteUrl.url) {
    setSpriteUrl({front: true, url: data?.sprites?.front_default});
  }
  if (error) {
    return <Text>An error occured</Text>;
  }
  const flip = () => {
    if(spriteUrl.front) {
      setSpriteUrl({front: false, url: data?.sprites?.back_default});
    } else {
      setSpriteUrl({front: true, url: data?.sprites?.front_default});
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {route.params.name.toUpperCase()}
      </Text>
      <Image style={styles.sprite} source={{uri: spriteUrl.url}}/>
      <TouchableOpacity 
        style={styles.flipButton}
        onPress={() => flip()}
      >
        <Icon
          name='arrow-return-left'
          type='fontisto' tvParallaxProperties={undefined} />
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical : 10
  },
  title: {
    fontFamily: "PressStart2P",
    paddingVertical : 10,
    fontSize: 30,
  },
  sprite: {
    width: 200,
    height: 200,
  },
  flipButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 60,
    backgroundColor: '#ff3a10',
  }
});