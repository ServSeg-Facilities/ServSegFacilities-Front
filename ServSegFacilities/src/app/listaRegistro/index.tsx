import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Pressable,
    ScrollView
} from 'react-native';

import CardLista from '../../components/cardLista/cardLista';
import FiltroIcon from '../../../assets/icons/cuida_filter-outline.svg';

export default function ListaRegistro() {

    // Guarda o texto digitado no campo de pesquisa
    const [pesquisa, setPesquisa] = useState('');

    // Lista provisória de registros
    const registros = [
        {
            id: 1,
            empresa: 'Nascentech',
            horario: '09:08',
            data: 'Quarta-Feira, 12/08/2026'
        },
        {
            id: 2,
            empresa: 'Nascentech',
            horario: '09:08',
            data: 'Quarta-Feira, 12/08/2026'
        },
        {
            id: 3,
            empresa: 'Nascentech',
            horario: '09:08',
            data: 'Quarta-Feira, 12/08/2026'
        },
        {
            id: 4,
            empresa: 'Nascentech',
            horario: '09:08',
            data: 'Quarta-Feira, 12/08/2026'
        }
    ];

    // Filtra os registros conforme o texto digitado
    const registrosFiltrados = registros.filter((registro) =>
        registro.empresa.toLowerCase().includes(pesquisa.toLowerCase()) ||
        registro.data.toLowerCase().includes(pesquisa.toLowerCase()) ||
        registro.horario.includes(pesquisa)
    );

    return (
        <View style={styles.container}>

            <View style={styles.headerAzul}>

                <View style={styles.paiInpHeader}>

                    <TextInput
                        style={styles.input}
                        value={pesquisa}
                        onChangeText={setPesquisa}
                        placeholder="Pesquisar"
                        placeholderTextColor="white"
                    />

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
                    <Text style={styles.textoBotao}>
                        Registrar Novo Ponto
                    </Text>
                </Pressable>

            </View>

            <ScrollView style={styles.componentesCards}>

                {registrosFiltrados.map((registro) => (
                    <CardLista
                        key={registro.id}
                        empresa={registro.empresa}
                        horario={registro.horario}
                        data={registro.data}
                    />
                ))}

            </ScrollView>

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
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    input: {
        padding: 10,
        width: '80%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        color: 'white'
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
        fontSize: 20
    },

    componentesCards: {
        flex: 1,
        padding: 20,
    },
});