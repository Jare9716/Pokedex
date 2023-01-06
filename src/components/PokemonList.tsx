import React, {useEffect, useState} from "react";
import { View,Text, StyleSheet, Image, Button, TouchableOpacity, useColorScheme, SafeAreaView, StatusBar, TextInput, Pressable, Keyboard} from "react-native";
import { PokemonClient } from "pokenode-ts";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPokemon } from "../features/pokemon/pokemonSlice";
import { increment, decrement, incrementByAmount, decrementByAmount, start } from "../features/counter/counterSlice";
import Pokemon, {Stats} from "../models/pokemon";
import { Colors } from "../colors";

const PokemonList = () =>{

    const dispatch = useAppDispatch()
    const currentPokemon = useAppSelector(state => state.pokemon)
    const counter = useAppSelector(state => state.counter.value)

    const [pokemonNmae, setPokemonName] = useState("")
    
    useEffect(()=>{
        const fetchPokemon = async () =>{
            const api = new PokemonClient()
            await api
            .getPokemonById(counter)
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
    const startValue = (value: number) =>{
        dispatch(start(value))
    }

    const searchPokemon = async () =>{
        const api = new PokemonClient()
        await api
        .getPokemonByName(pokemonNmae.toLocaleLowerCase())
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
            dispatch(setPokemon(newPokemon))
            startValue(newPokemon.id)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const StatLine = (props:{ number: number | undefined; type: string | undefined;})=>{
        return(
            <View 
                style={{
                    width: props.number ? props.number > 199? props.number-20 : props.number : props.number,
                    marginVertical: 6.5,
                    height: 6,
                    marginLeft: 10,
                    borderRadius: 5,
                    backgroundColor: Colors[props.type?.toString() as keyof typeof Colors]
                }}
            >
            </View>
        )
    }

    return (
        <View style = {[styles.container, {backgroundColor: currentPokemon.color }]}>
            <StatusBar 
                barStyle={"light-content"}
                backgroundColor={currentPokemon.color}
            />
            <Image
                style={styles.pokeball}
                source={require('../images/Pokeball.png')}
            />
            <View style={styles.whiteSheet}></View>
            <SafeAreaView>
                {/* Barra de busqueda */}
                <TextInput
                    style={styles.input}
                    value={pokemonNmae}
                    onChangeText={setPokemonName}
                    placeholder={'Pokemon Name or ID'}
                    textAlign='center'
                />
                {/* Boton de busqueda */}
                <Pressable style={styles.pressable} onPress={()=>{searchPokemon(); Keyboard.dismiss()}}>
                    <Text style={{textAlign:'center'}}>Search</Text>
                </Pressable>
                {/* Nombre y ID del pokemon */}
                <View style={styles.row}>
                    <Text style={styles.pokemonName}>{currentPokemon.name.charAt(0).toLocaleUpperCase() + currentPokemon.name.slice(1)}</Text>
                    <Text style={[styles.pokemonName, {textAlign: 'right', marginRight: 20, fontSize: 25}]}>#{currentPokemon.id}</Text>
                </View>
                {/* Botones e Imagen del pokemon */}
                <View style={[styles.row,{height: 190}]}>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={handlePrevButton}>
                            <Text style={styles.buttonText}>⬅️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleDecrementByAmount(100)}>
                            <Text style={styles.buttonText}>⏮</Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        style={styles.pokemonImage}
                        source={{uri: currentPokemon.image}}
                    />
                     <View>
                        <TouchableOpacity style={styles.button} onPress={handleNextButton}>
                            <Text style={styles.buttonText}>➡️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleIncrementByAmount(100)}>
                            <Text style={styles.buttonText}>⏭</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Pokemon Type */}
                <View style={[styles.pokemonTypeContainer, {alignSelf: 'center', backgroundColor:currentPokemon.color}]}>
                    <Text style={styles.type}>{currentPokemon.type}</Text>
                </View>
                {/* Pokemon Information */}
                <View>
                    <Text style={[styles.about, {color: currentPokemon.color}]}>About</Text>
                    <View style={[styles.row, {justifyContent: 'center', marginTop: 20}]}>
                        <View style={{alignItems: 'center', marginHorizontal: 10}}>
                            <Text>
                                ⚖️{' '}
                                {currentPokemon.weight?.toString().slice(0, currentPokemon.weight.toString().length-1)}
                                .
                                {currentPokemon.weight?.toString().slice(currentPokemon.weight.toString().length-1, currentPokemon.weight.toString().length)}
                                {' '}kg
                            </Text>
                            <Text
                                style={{color: Colors.mediumGray, fontSize: 12, marginTop: 10}}>
                                Weight
                            </Text>
                        </View>
                        <View style={{alignItems: 'center', marginHorizontal: 10}}>
                            <Text>
                                📏{' '}
                                {currentPokemon.height?.toString().slice(0, currentPokemon.height.toString().length - 1)}
                                .
                                {currentPokemon.height?.toString().slice(currentPokemon.height.toString().length - 1,currentPokemon.height.toString().length,
                                )}{' '}m
                            </Text>
                            <Text
                                style={{color: Colors.mediumGray, fontSize: 12, marginTop: 10}}>
                                Height
                            </Text>
                        </View>
                        <View style={{alignItems: 'center', marginHorizontal: 10}}>
                            <Text>{currentPokemon.move}</Text>
                            <Text
                                style={{color: Colors.mediumGray, fontSize: 12, marginTop: 10}}>
                                Move
                            </Text>
                        </View>
                    </View>
                </View>
                {/* Pokemon Abilites */}
                <View>
                    <Text style={[styles.baseStyles, {color: currentPokemon.color}]}>Base Stats</Text>
                    <View style={[styles.row, {justifyContent:'flex-start',marginHorizontal:30,marginTop:20}]}>
                        <View style={{alignItems: 'flex-end', marginEnd: 10}}>
                            <Text>HP</Text>
                            <Text>Attack</Text>
                            <Text>Defense</Text>
                            <Text>Special Attack</Text>
                            <Text>Special Defence</Text>
                            <Text>Speed</Text>
                        </View>
                        <View style={{height:100, width:2,backgroundColor: Colors.lightGray, marginRight:10}}>
                        </View>
                        <View>
                            <Text>{currentPokemon.stats?.hp} </Text>
                            <Text>{currentPokemon.stats?.attack} </Text>
                            <Text>{currentPokemon.stats?.defense}</Text>
                            <Text>{currentPokemon.stats?.specialAttack}</Text>
                            <Text>{currentPokemon.stats?.specialDefense}</Text>
                            <Text>{currentPokemon.stats?.speed}</Text>
                        </View>
                        <View>
                            <StatLine
                                number={currentPokemon.stats?.hp}
                                type={currentPokemon.type}
                            />
                            <StatLine
                                number={currentPokemon.stats?.attack}
                                type={currentPokemon.type}
                            />
                            <StatLine
                                number={currentPokemon.stats?.defense}
                                type={currentPokemon.type}
                            />
                            <StatLine
                                number={currentPokemon.stats?.specialAttack}
                                type={currentPokemon.type}
                            />
                            <StatLine
                                number={currentPokemon.stats?.specialDefense}
                                type={currentPokemon.type}
                            />
                            <StatLine
                                number={currentPokemon.stats?.speed}
                                type={currentPokemon.type}
                            />
                            
                        </View>
                    </View>
                </View>
                
            </SafeAreaView>
        </View>
    )
}

export default PokemonList


const  styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        backgroundColor: Colors.fire
    },
    pokeball:{
        position: "absolute",
        right: 20,
        top: 50
    },
    pokemonName:{
        fontSize: 35,
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 20
    },
    pokemonImage:{
        width: 200,
        height: 200
    },
    button:{
        width: 50,
        height: 50,
        backgroundColor: Colors.white + '70',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonText:{
        fontSize: 20,
        color: Colors.black
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    type:{
        color: Colors.white,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    pokemonTypeContainer:{
        marginTop: 30,
        height: 30,
        borderRadius:50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    whiteSheet:{
        position: 'absolute',
        marginTop: 310,
        left: 10,
        borderRadius: 20,
        backgroundColor: Colors.white,
        width: '95%',
        height: '55%'
    },
    about:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
    },
    baseStyles:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 15
    },
    input:{
        backgroundColor: '#FFF',
        padding: 3,
        borderRadius: 10,
        marginTop: 15,
        width: 300,
        marginHorizontal: 50
    },
    pressable:{
        marginVertical: 6,
        backgroundColor: Colors.lightGray,
        paddingVertical: 5,
        marginHorizontal: 150,
        borderRadius: 10,
    }

})