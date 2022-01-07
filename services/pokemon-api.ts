import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pokemon } from './../types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<any, string>({
        query: () => `pokemon?limit=400`,//We can think about an infinite scroll that will call the api multiple time and keep the cache memory safe
      }), 
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonsQuery,useGetPokemonByNameQuery } = pokemonApi