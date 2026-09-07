import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  FlatList,
  StatusBar,
} from "react-native";

import CardLista from "../../components/cardLista/cardLista";
import FiltroIcon from "../../../assets/icons/cuida_filter-outline.svg";

import { ListaConvertida, ListaRecebida } from "../../@types/lista";
import { listaService } from "../../services/listaService";

import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";

const formatarDataHora = (dataIsoString: string) => {
  const dataObjeto = new Date(dataIsoString);

  const dataFormatadaBruta = dataObjeto.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const dataTratada =
    dataFormatadaBruta.charAt(0).toUpperCase() +
    dataFormatadaBruta.slice(1);

  const horaTratada = dataObjeto.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    dataTratada,
    horaTratada,
  };
};

export default function ListaRegistro() {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [listaRegistro, setListaRegistro] = useState<ListaConvertida[]>([]);

  const insets = useSafeAreaInsets();

  async function carregarRegistros() {
    try {
      const resposta: ListaRecebida[] =
        await listaService.listarHistoricoPontos();

      const listaMapeada: ListaConvertida[] = resposta.map((item) => {
        const entrada = formatarDataHora(
          item.dataHoraPontoEntrada
        );

        const saida = item.dataHoraPontoSaida
          ? formatarDataHora(item.dataHoraPontoSaida)
          : null;

        return {
          historicoId: item.historicoId,

          registroPontoEntradaId: item.registroPontoEntradaId,
          registroPontoSaidaId: item.registroPontoSaidaId,

          latitudeEntrada: item.latitudeEntrada,
          latitudeSaida: item.latitudeSaida,

          longitudeEntrada: item.longitudeEntrada,
          longitudeSaida: item.longitudeSaida,

          dataHoraPontoEntrada: item.dataHoraPontoEntrada,
          dataHoraPontoSaida: item.dataHoraPontoSaida,

          dataPontoEntrada: entrada.dataTratada,
          dataPontoSaida: saida?.dataTratada ?? null,

          horaPontoEntrada: entrada.horaTratada,
          horaPontoSaida: saida?.horaTratada ?? null,

          nomeUsuario: item.nomeUsuario,
          nomeEmpresa: item.nomeEmpresa,
        };
      });

      setListaRegistro(listaMapeada);
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
    }
  }

  useEffect(() => {
    carregarRegistros();
  }, []);

  const registrosFiltrados = useMemo(() => {
    const busca = termoPesquisa.toLowerCase().trim();

    if (!busca) {
      return listaRegistro;
    }

    return listaRegistro.filter((registro) => {
      return (
        registro.nomeEmpresa.toLowerCase().includes(busca) ||
        registro.dataPontoEntrada.toLowerCase().includes(busca) ||
        registro.horaPontoEntrada.includes(busca) ||
        registro.horaPontoSaida?.includes(busca)
      );
    });
  }, [listaRegistro, termoPesquisa]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.AzulHeader}
      />

      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 10,
          },
        ]}
      >
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

        <View style={styles.pontaDireita} />
      </View>

      <View style={styles.container}>
        <View style={styles.containerBotao}>
          <Pressable
            style={styles.botaoRegistro}
            onPress={() => router.push("/registrarPonto")}
          >
            <Text style={styles.textoBotao}>
              Registrar Novo Ponto
            </Text>
          </Pressable>
        </View>

        <FlatList
          data={registrosFiltrados}
          keyExtractor={(item) => String(item.historicoId)}
          renderItem={({ item }) => (
            <CardLista
              historicoId={item.historicoId}
              empresa={item.nomeEmpresa}
              data={item.dataPontoEntrada}
              horaEntrada={item.horaPontoEntrada}
              horaSaida={item.horaPontoSaida}
            />
          )}
          contentContainerStyle={styles.componentesCards}
          ListEmptyComponent={
            <Text style={styles.textoVazio}>
              Nenhum registro de entrada encontrado.
            </Text>
          }
        />
      </View>
    </>
  );
}

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
    width: "100%",
    height: 100,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderBottomLeftRadius: 30,
  },

  paiInpHeader: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: {
    padding: 10,
    width: "80%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    color: "white",
  },

  botaoFiltro: {
    height: 40,
  },

  containerBotao: {
    padding: 20,
  },

  botaoRegistro: {
    backgroundColor: "#113E82",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },

  textoBotao: {
    color: "white",
    fontSize: 20,
  },

  componentesCards: {
    padding: 20,
    gap: 12,
  },

  textoVazio: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },

  pontaDireita: {
    position: "absolute",
    bottom: -30,
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 50,
    borderRightWidth: 0,
    borderTopWidth: 35,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: Colors.AzulHeader,
  },
});