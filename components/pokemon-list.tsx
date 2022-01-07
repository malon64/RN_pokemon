import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import {useGetPokemonsQuery} from '../services/pokemon-api';
import { Pokemon } from '../types';
import { useFonts } from 'expo-font';

export default function PokemonList({navigation}: {navigation: any}) {
  const {data, error, isLoading} = useGetPokemonsQuery("");
  const [fontsLoaded] = useFonts({
    'PressStart2P': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  if (isLoading || !fontsLoaded) {
    return <View></View>;
  }
  if (error) {
    return <Text>An error occured</Text>;
  }
    return(
    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {data?.results?.map((pokemon: Pokemon, index: number) => {
            return (
              <TouchableOpacity 
                key = {index}
                style={styles.pokemonButton}
                onPress={() => navigation.navigate("PokemonView", {name: pokemon.name})}
              >
                <Text style={styles.pokemonText}>{pokemon.name.toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10
    },
    scrollView: {
      flexDirection: "column",
      alignSelf: "stretch",
      flex: 1,
      marginVertical: 40,
      paddingBottom: 20,
    },
    pokemonButton: {
      alignItems: "center",
      textAlign: 'center',
      alignSelf: "stretch",
      backgroundColor: "#ff3a10",
      color: "#ffffff",
      paddingVertical: 30,
      marginVertical: 10,
    },
    pokemonText: {
      fontFamily: 'PressStart2P',
      fontSize: 25,
      color: "#ffffff",
      paddingHorizontal: 0,
    }
  });