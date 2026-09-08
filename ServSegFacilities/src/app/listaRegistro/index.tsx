import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
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
import { Colors, Font } from "../../constants/theme"; // <--- Importado a constante Font

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
      return (
        registro.nomeEmpresa.toLowerCase().includes(busca) ||
        registro.dataPontoEntrada.toLowerCase().includes(busca) ||
        registro.horaPontoEntrada.includes(busca) ||
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
    </View>
  );
}

const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.AzulFundo,
  },
  fullBackgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.1,
  },
});

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

  input: {
    paddingHorizontal: 10,
    width: "80%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    color: "white",
    marginTop: 5,
    fontFamily: Font.regular, // <--- Aplicado a fonte no input
  },

  botaoFiltro: {
    marginLeft: 20,
    height: 30,
  },

  containerBotao: {
    padding: 30,
  },

  botaoRegistro: {
    backgroundColor: Colors.AzulBotao,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.60, // Aumentado de 0.30 para 0.60 para dobrar a intensidade
    shadowRadius: 10,   // Espalha mais a sombra
    // Sombra forte para Android
    elevation: 16,     // Aumentado para dar mais destaque
  },

  textoBotao: {
    color: Colors.AzulFundo,
    fontSize: 25,
    fontFamily: Font.regular, // <--- Aplicado a fonte em negrito
  },

  componentesCards: {
    padding: 20,
    gap: 12,
  },

  textoVazio: {
    textAlign: "center",
    color: "#555",
    marginTop: 0,
    fontFamily: Font.regular, // <--- Aplicado a fonte no texto de lista vazia
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