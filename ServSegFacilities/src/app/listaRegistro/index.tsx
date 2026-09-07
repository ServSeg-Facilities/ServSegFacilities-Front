import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TextInput, Text, Pressable, FlatList, StatusBar } from 'react-native';
import CardLista from '../../components/cardLista/cardLista';
import FiltroIcon from '../../../assets/icons/cuida_filter-outline.svg';
import { RegistroPonto } from '../../@types';
import { ListaConvertida, ListaRecebida } from '../../@types/lista';
import { listaService } from '../../services/listaService';
import { useListaRegistroPonto } from '../../hooks/useLista';
import { router } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';

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
  const [listaRegistro, setListaRegistro] = useState<ListaConvertida[]>([]);
  const insets = useSafeAreaInsets();

  async function carregarRegistros() {
    try {
      const resposta: ListaRecebida[] = await listaService.listarHistoricoPontos();

      const listaMapeada: ListaConvertida[] = resposta.map((item) => {
        const { dataTratada, horaTratada } = formatarDataHora(
          item.dataHoraPonto
        );
        
        const { dataHoraPonto, ...restoObjeto } = item;

        return {
          ...restoObjeto,
          dataHoraPonto: dataHoraPonto,
          dataPonto: dataTratada,
          horaPonto: horaTratada,
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
      const data = registro.dataPonto;
      const registroExistente = apenasPrimeirasEntradas[data];

      if (!registroExistente) {
        apenasPrimeirasEntradas[data] = registro;
      } else {
        if (registro.horaPonto < registroExistente.horaPonto) {
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
        registro.nomeEmpresa.toLowerCase().includes(busca) ||
        registro.dataPonto.toLowerCase().includes(busca) ||
        registro.horaPonto.includes(busca)
      );
    });
  }, [listaRegistro, termoPesquisa]); // Fechamento correto do useMemo

  // O return do layout visual JSX fica isolado aqui na raiz do componente
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.AzulHeader}
      />

      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.conteudoHeader}>
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

        {/* Ponta que desce no canto inferior direito */}
        <View style={styles.pontaDireita} />
      </View>

      <View style={styles.container}>
        <View style={styles.containerBotao}>
          <Pressable style={styles.botaoRegistro} onPress={() => router.push("/registrarPonto")}>
            <Text style={styles.textoBotao}>Registrar Novo Ponto</Text>
          </Pressable>
        </View>

        <FlatList
          data={registrosFiltrados} // Alterado para renderizar a lista filtrada
          keyExtractor={(item) => String(item.registroPontoId)}
          renderItem={({ item }) => (
            <CardLista
              key={item.registroPontoId}
              empresa={item.nomeEmpresa}
              dataHoraPonto={item.dataHoraPonto}
              data={item.dataPonto}
              horario={item.horaPonto}
            />
          )}
          contentContainerStyle={styles.componentesCards}
          ListEmptyComponent={
            <Text style={styles.textoVazio}>Nenhum registro de entrada encontrado.</Text>
          }q
        />
      </View>
    </>
  );
} // Fechamento correto da função do componente ListaRegistro

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.AzulHeader,
    paddingTop: 10,
    paddingBottom: 35,
    justifyContent: "center",
    borderBottomLeftRadius: 25,
    paddingHorizontal: 20,
    position: "relative",
    marginBottom: 10,
  },
  conteudoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
  pontaDireita: {
    position: "absolute",
    bottom: -30, // O quanto a ponta desce (igual à altura da borda superior)
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",

    // Define a largura e inclinação da ponta
    borderLeftWidth: 50,  // Base esquerda do cone
    borderRightWidth: 0,  // Alinha a borda direita reta com o final da tela

    // Define a altura do cone e a cor
    borderTopWidth: 35,   // Altura da ponta que desce
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: Colors.AzulHeader, // Cor do Header
  },
});
