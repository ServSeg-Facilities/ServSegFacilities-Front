import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Pressable, FlatList } from 'react-native';
import CardLista from '../../components/cardLista/cardLista';
import FiltroIcon from '../../../assets/icons/cuida_filter-outline.svg';
import { useLista } from '../../hooks/useLista';
import { RegistroPonto } from '../../@types';

const { lista, loading, error } = useLista();

// interface RegistroPonto {
//   id: string;
//   empresa: string;
//   horario: string;
//   data: string;
// }

// Dados mockados temporários para validação da busca
const REGISTROS_MOCK: RegistroPonto[] = [
  { id: 1, empresa: 'Nascentech', horario: '09:08', data: 'Quarta-Feira, 12/08/2026' },
  { id: 2, empresa: 'ServSeg Facilities', horario: '18:00', data: 'Quarta-Feira, 12/08/2026' },
  { id: 3, empresa: 'Nascentech', horario: '08:55', data: 'Terça-Feira, 11/08/2026' },
  { id: 4, empresa: 'Alpha Tech', horario: '13:00', data: 'Segunda-Feira, 10/08/2026' },
];

export default function ListaRegistro() {
  const [termoPesquisa, setTermoPesquisa] = useState('');

  // Filtra a lista dinamicamente conforme o usuário digita
  const registrosFiltrados = REGISTROS_MOCK.filter((registro) => {
    const busca = termoPesquisa.toLowerCase().trim();
    return (
      registro.empresa.toLowerCase().includes(busca) ||
      registro.data.toLowerCase().includes(busca) ||
      registro.horario.includes(busca)
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerAzul}>
        <View style={styles.paiInpHeader}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar..."
            placeholderTextColor="#ccc"
            value={termoPesquisa}
            onChangeText={setTermoPesquisa}
          />
          <Pressable style={styles.botaoFiltro}>
            <FiltroIcon width={40} height={40} />
          </Pressable>
        </View>
      </View>

      <View style={styles.containerBotao}>
        <Pressable style={styles.botaoRegistro}>
          <Text style={styles.textoBotao}>Registrar Novo Ponto</Text>
        </Pressable>
      </View>

      <FlatList
        data={registrosFiltrados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CardLista
            key={item.id}
            empresa={item.empresa}
            data={item.data}
            horario={item.horario}
          />
        )}
        contentContainerStyle={styles.componentesCards}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>Nenhum registro encontrado.</Text>
        }
      />
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
    justifyContent: 'space-evenly', // <- Altere de 'justify' para 'justifyContent'
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
  },
  paiInpHeader: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    padding: 10,
    width: '80%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
  },
  botaoFiltro: {
    height: 40,
  },
  containerBotao: {
    padding: 20,
  },
  botaoRegistro: {
    backgroundColor: '#113E82',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  textoBotao: {
    color: 'white',
    fontSize: 20,
  },
  componentesCards: {
    padding: 20,
    gap: 12,
  },
  textoVazio: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});