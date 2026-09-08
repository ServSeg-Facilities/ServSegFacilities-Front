import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Colors } from "../../constants/theme";

import { localStyles } from "./detalhesRegistro";

import CardDetalhe from "../../components/cardDetalhes/cardDetalhes";

import { useDetalhesRegistro } from "../../hooks/useDetalhesRegistro";

import { Header } from "../../components/header/header";

export default function DetalhesRegistro() {
  const FULL_BACKGROUND = require("../../../assets/imgs/Fundo2.png");

  const router = useRouter();

  const { historicoId } =
    useLocalSearchParams<{ historicoId: string }>();

  const {
    loading,
    error,
    detalhes,
    carregarDetalhesRegistro,
  } = useDetalhesRegistro(historicoId);

  // ======================
  // ESTADO DE CARREGAMENTO
  // ======================

  if (loading) {
    return (
      <View style={localStyles.safeArea}>
        <Image
          source={FULL_BACKGROUND}
          style={localStyles.fullBackgroundImage}
          resizeMode="cover"
        />

        <Header titulo="Detalhes" />

        <Text style={localStyles.titulo}>
          Detalhes {detalhes?.dataPontoEntrada ?? "..."}
        </Text>

        <View style={localStyles.container}>
          <ActivityIndicator
            size="large"
            color={Colors.AzulBotao}
          />

          <Text style={localStyles.titulo}>
            Carregando informações...
          </Text>
        </View>
      </View>
    );
  }

  // ==============
  // ESTADO DE ERRO
  // ==============

  if (error || !detalhes) {
    return (
      <View style={localStyles.safeArea}>
        <Image
          source={FULL_BACKGROUND}
          style={localStyles.fullBackgroundImage}
          resizeMode="cover"
        />

        <Header titulo="Detalhes" />

        <View style={localStyles.container}>
          <Text style={localStyles.titulo}>
            {error || "Registro não encontrado."}
          </Text>

          <View style={localStyles.container}>
            <TouchableOpacity
              style={localStyles.botaoTentarNovamente}
              onPress={carregarDetalhesRegistro}
              activeOpacity={0.7}
            >
              <Text>Tente novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // ============================
  // PROCESSAMENTO DE INFORMAÇÕES
  // ============================

  return (
    <View style={localStyles.safeArea}>
      <Image
        source={FULL_BACKGROUND}
        style={localStyles.fullBackgroundImage}
        resizeMode="cover"
      />

      <Header titulo="Detalhes" />

      <Text style={localStyles.titulo}>
        Detalhes {detalhes.dataPontoEntrada}:
      </Text>

      <View style={localStyles.container}>
        <CardDetalhe detalhes={detalhes} />
      </View>
    </View>
  );
}