import React, {useEffect, useState} from "react";
import { View,Text, StyleSheet, Image, Button, TouchableOpacity, useColorScheme, SafeAreaView, StatusBar } from "react-native";
import { PokemonClient } from "pokenode-ts";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPokemon } from "../features/pokemon/pokemonSlice";
import { increment, decrement, incrementByAmount, decrementByAmount } from "../features/counter/counterSlice";
import Pokemon, {Stats} from "../models/pokemon";
import { Colors } from "../colors";

const PokemonList = () =>{

    const dispatch = useAppDispatch()
    const currentPokemon = useAppSelector(state => state.pokemon)
    const counter = useAppSelector(state => state.counter)

    useEffect(()=>{
        const fetchPokemon = async () =>{
            const api = new PokemonClient()
            await api
            .getPokemonById(4)
            .then(pokemon =>{
                const currentPokemonStats: Stats = {
                    hp: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    specialAttack: pokemon.stats[3].base_stat,
                    specialDefense: pokemon.stats[4].base_stat,
                    speed: pokemon.stats[5].base_stat,
                }
                const newPokemon: Pokemon ={
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon?.sprites?.front_default?.toString(),
                    height: pokemon.height,
                    weight: pokemon.weight,
                    type: pokemon?.types[0]?.type?.name?.toString(),
                    move: pokemon?.moves[0]?.move?.name?.toString(),
                    stats: currentPokemonStats,
                    color: 
                        /* 
                        Acá estamos indicando que el color se obtiene dependiendo del Pokemon y por tanto como estamos en typescrpt es necesario indicar que el valor 
                        pertenece a la clase Colors a persar que este declarado como objeto en javascript
                        */      
                        Colors[pokemon?.types[0]?.type?.name?.toString() as keyof typeof Colors]
                }
                console.log()
                dispatch(setPokemon(newPokemon))
            })
            .catch(err=>{
                console.log(err)
            })
        }
        fetchPokemon()
    },[counter,dispatch])

    const handleNextButton = () =>{
        dispatch(increment())
    }
    const handlePrevButton = () =>{
        dispatch(decrement())
    }
    const handleIncrementByAmount = (value: number)=>{
        dispatch(incrementByAmount(value))
    }
    const handleDecrementByAmount = (value: number) =>{
        dispatch(decrementByAmount(value))
    }


    return (
        <View style = {{backgroundColor: currentPokemon.color, height: '100%'}}>
            <StatusBar 
                barStyle={"light-content"}
                backgroundColor={currentPokemon.color}
            />
            <Text>
                {currentPokemon.height}
            </Text>
        </View>
    )
}

export default PokemonList