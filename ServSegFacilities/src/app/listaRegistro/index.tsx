import React from 'react';
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import CardLista from '../../components/cardLista/cardLista';
import FiltroIcon from '../../../assets/icons/cuida_filter-outline.svg';
// import { Button } from 'react-native/types_generated/index';

export default function ListaRegistro() {
    return (
        <View style={styles.container}>

            <View style={styles.headerAzul}>
                <View style={styles.paiInpHeader}>
                    <TextInput style={styles.input}></TextInput>
                    {/* <View style={styles.iconeFiltro}></View> */}
                    {/* <Image source={require('./assets/icons/cuida_filter-outline.svg')} /> */}
                    <Pressable style={styles.botaoFiltro}>
                        <FiltroIcon
                            width={40}
                            height={40}
                        />
                    </Pressable>
                </View>
            </View>

            <View style={styles.containerBotao}>
                <Pressable style={styles.botaoRegistro}>
                    <Text style={styles.textoBotao}>Registrar Novo Ponto</Text>
                </Pressable>
            </View>

            <View style={styles.componentesCards}>
                <CardLista />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerAzul: {
        width: '100%',
        height: 100,
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        borderBottomLeftRadius: 30
    },

    paiInpHeader: {
        width: "90%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },

    input: {
        padding: 10,
        width: '80%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white'
    },

    iconeFiltro: {
        backgroundColor: 'white',
        height: 30,
        width: 30
    },

    botaoFiltro: {
        height: 40
    },

    containerBotao: {
        padding: 20,
    },

    botaoRegistro: {
        backgroundColor: '#113E82',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10
    },

    textoBotao: {
        color: 'white',
    },

    componentesCards: {
        flex: 1,
        padding: 20,
    },
});