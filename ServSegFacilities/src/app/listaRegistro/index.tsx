import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  FlatList,
  StatusBar,
  Image,
} from "react-native";

import CardLista from "../../components/cardLista/cardLista";
import FiltroIcon from "../../../assets/icons/cuida_filter-outline.svg";

import { ListaConvertida, ListaRecebida } from "../../@types/lista";
import { listaService } from "../../services/listaService";

import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";
import { localStyles } from "./listaRegistro.styles";

// Import da imagem de fundo
const FULL_BACKGROUND = require("../../../assets/imgs/Fundo2.png");

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
        const entrada = formatarDataHora(item.dataHoraPontoEntrada);

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
      return Boolean(
        registro.nomeEmpresa?.toLowerCase().includes(busca) ||
        registro.dataPontoEntrada?.toLowerCase().includes(busca) ||
        registro.horaPontoEntrada?.includes(busca) ||
        registro.horaPontoSaida?.includes(busca)
      );
    });
  }, [listaRegistro, termoPesquisa]);

  return (
    <View style={localStyles.mainContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.AzulHeader}
      />

      <Image
        source={FULL_BACKGROUND}
        style={localStyles.fullBackgroundImage}
        resizeMode="cover"
      />

      <View
        style={[
          localStyles.header,
          {
            paddingTop: insets.top + 10,
          },
        ]}
      >
        <View style={localStyles.conteudoHeader}>
          <TextInput
            style={localStyles.input}
            placeholder="Pesquisar..."
            placeholderTextColor="#ccc"
            value={termoPesquisa}
            onChangeText={setTermoPesquisa}
          />

          <Pressable style={localStyles.botaoFiltro}>
            <FiltroIcon width={40} height={40} />
          </Pressable>
        </View>

        <View style={localStyles.pontaDireita} />
      </View>

      <View style={localStyles.container}>
        <View style={localStyles.containerBotao}>
          <Pressable
            style={localStyles.botaoRegistro}
            onPress={() => router.push("/registrarPonto")}
          >
            <Text style={localStyles.textoBotao}>
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
          contentContainerStyle={localStyles.componentesCards}
          ListEmptyComponent={
            <Text style={localStyles.textoVazio}>
              Nenhum registro de entrada encontrado.
            </Text>
          }
        />
      </View>
    </View>
  );
}
