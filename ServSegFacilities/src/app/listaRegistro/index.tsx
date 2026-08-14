import React from 'react';
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import CardLista from '../../components/cardLista/cardLista';

export default function ListaRegistro() {
    return (
        <View style={styles.container}>

            <View style={styles.headerAzul}>
                <View style={styles.paiInpHeader}>
                    <TextInput style={styles.input}></TextInput>
                    <View style={styles.iconeFiltro}></View>
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
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
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

    containerBotao: {
        padding: 20,
    },

    botaoRegistro: {
        backgroundColor: 'blue',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10
    },

    textoBotao: {
        color: 'white'
    },

    componentesCards: {
        flex: 1,
        padding: 20,
    },
});