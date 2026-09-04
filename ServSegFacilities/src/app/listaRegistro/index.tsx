<<<<<<< HEAD
import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TextInput, Text, Pressable, FlatList } from 'react-native';
import CardLista from '../../components/cardLista/cardLista';
import FiltroIcon from '../../../assets/icons/cuida_filter-outline.svg';
import { useLista } from '../../hooks/useLista';
import { RegistroPonto } from '../../@types';
import { ListaConvertida, ListaRecebida } from '../../@types/lista';
import { listaService } from '../../services/listaService';

// Função auxiliar fora do componente para formatar a data e hora
const formatarDataHora = (dataIsoString: string) => {
  const dataObjeto = new Date(dataIsoString);

  // 1. Formata o dia da semana e a data (ex: quarta-feira, 12/08/2026)
  const dataFormatadaBruta = dataObjeto.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  // 2. Coloca a primeira letra do dia da semana em Maiúsculo
  const dataTratada = dataFormatadaBruta.charAt(0).toUpperCase() + dataFormatadaBruta.slice(1);

  // 3. Formata o horário (ex: 09:08)
  const horaTratada = dataObjeto.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { dataTratada, horaTratada };
};

export default function ListaRegistro() {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const { lista, loading, error } = useLista();
  const [listaRegistro, setListaRegistro] = useState<ListaConvertida[]>([]);

  async function carregarRegistros() {
    try {
      const resposta: ListaRecebida[] = await listaService.listarHistoricoPontos();

      const listaMapeada: ListaConvertida[] = resposta.map((item) => {
        const { dataTratada, horaTratada } = formatarDataHora(item.DataHoraPonto);
        const { DataHoraPonto, ...restoObjeto } = item;

        return {
          ...restoObjeto,
          DataPonto: dataTratada,
          HoraPonto: horaTratada,
        };
      });

      setListaRegistro(listaMapeada);
    } catch (err) {
      console.error("Erro ao carregar e converter registros:", err);
    }
  }

  useEffect(() => {
    carregarRegistros();
  }, []);
  
  // CORREÇÃO: O useMemo processa APENAS a filtragem do array de dados
  const registrosFiltrados = useMemo(() => {
    const apenasPrimeirasEntradas: { [data: string]: ListaConvertida } = {};

    // 1. Filtra a primeira entrada do dia
    listaRegistro.forEach((registro) => {
      const data = registro.DataPonto;
      const registroExistente = apenasPrimeirasEntradas[data];

      if (!registroExistente) {
        apenasPrimeirasEntradas[data] = registro;
      } else {
        if (registro.HoraPonto < registroExistente.HoraPonto) {
          apenasPrimeirasEntradas[data] = registro;
        }
      }
    });

    const listaApenasEntradas = Object.values(apenasPrimeirasEntradas);

    // 2. Filtra pelo termo de pesquisa
    const busca = termoPesquisa.toLowerCase().trim();
    if (!busca) return listaApenasEntradas;

    return listaApenasEntradas.filter((registro) => {
      return (
        registro.NomeEmpresa.toLowerCase().includes(busca) ||
        registro.DataPonto.toLowerCase().includes(busca) ||
        registro.HoraPonto.includes(busca)
      );
    });
  }, [listaRegistro, termoPesquisa]); // Fechamento correto do useMemo

  // O return do layout visual JSX fica isolado aqui na raiz do componente
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
        data={registrosFiltrados} // Alterado para renderizar a lista filtrada
        keyExtractor={(item) => String(item.HistoricoId)}
        renderItem={({ item }) => (
          <CardLista
            key={item.HistoricoId}
            empresa={item.NomeEmpresa}
            data={item.DataPonto}
            horario={item.HoraPonto}
          />
        )}
        contentContainerStyle={styles.componentesCards}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>Nenhum registro de entrada encontrado.</Text>
        }
      />
    </View>
  );
} // Fechamento correto da função do componente ListaRegistro

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
=======
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { styles } from "./listaRegistro.styles";
import { Colors } from "../../constants/theme";
import { useListaRegistroPonto } from "../../hooks/useLista";

export default function ListaRegistro() {
  const router = useRouter();

  const {
    registros,
    loading,
    error,
  } = useListaRegistroPonto();

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator
          size="large"
          color={Colors.AzulBotao}
        />

        <Text style={styles.titulo}>
          Carregando registros...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.titulo}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.titulo}>
        Registros de ponto
      </Text>

      <FlatList
        data={registros}
        keyExtractor={(item) =>
          item.historicoId.toString()
        }
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => {
              router.push({
                pathname: "/detalhesRegistro",
                params: {
                  data: item.dataHoraPonto.split("T")[0],
                },
              });
            }}
          >
            <Text style={styles.data}>
              {formatarData(item.dataHoraPonto)}
            </Text>

            <Text style={styles.empresa}>
              {item.nomeEmpresa}
            </Text>

            <Text style={styles.horario}>
              {item.tipoRegistro}:{" "}
              {formatarHorario(item.dataHoraPonto)}
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

function formatarData(dataHora: string): string {
  const [ano, mes, dia] = dataHora.split("T")[0].split("-");

  return `${dia}/${mes}/${ano}`;
}

function formatarHorario(dataHora: string): string {
  return new Date(dataHora).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
>>>>>>> origin/merging
