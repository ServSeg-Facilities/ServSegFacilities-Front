import { View, Text, Pressable, TouchableOpacity, ActivityIndicator, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";
import { styles } from "./detalhesRegistro";
import CardDetalhe from "../../components/cardDetalhes/cardDetalhes";
import { useDetalhesRegistro } from "../../hooks/useDetalhesRegistro";
import { Header } from "../../components/header/header";

// Import da imagem de fundo
const FULL_BACKGROUND = require("../../../assets/imgs/Fundo.png");

export default function DetalhesRegistro() {
  const router = useRouter();
  // Recupera o parâmetro "data" enviado pela tela anterior.
  // Essa data será utilizada pelo hook para localizar os registros daquele dia.
  const { data } = useLocalSearchParams<{ data: string }>();
  // Informações provindas do hook
  const { loading, error, detalhes, carregarDetalhesRegistro } =
    useDetalhesRegistro(data);

  // Função para renderizar o conteúdo interno
  const renderConteudo = () => {
    // ======================
    // ESTADO DE CARREGAMENTO
    // ======================
    if (loading) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <Header titulo="Detalhes" />
          <Text style={styles.titulo}>
            Detalhes {detalhes?.dataHoraPonto ?? "..."}
          </Text>
          <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.AzulBotao} />
            <Text style={styles.titulo}>Carregando informações...</Text>
          </View>
        </SafeAreaView>
      );
    }

    // ==============
    // ESTADO DE ERRO
    // ==============
    if (error || !detalhes) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <Header titulo="Detalhes" />

          <View style={styles.container}>
            <Text style={styles.titulo}>
              {error || "Registro não encontrado."}
            </Text>

            <View style={styles.container}>
              <TouchableOpacity
                style={styles.botaoTentarNovamente}
                onPress={carregarDetalhesRegistro}
                activeOpacity={0.7}
              >
                <Text>Tente novamente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    // ============================
    // PROCESSAMENTO DE INFORMAÇÕES
    // ============================
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header titulo="Detalhes" />

        <Text style={styles.titulo}>Detalhes {detalhes.dataHoraPonto}:</Text>

        <View style={styles.container}>
          <CardDetalhe detalhes={detalhes} />
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={localStyles.mainContainer}>
      {/* Imagem de Fundo em camada absoluta */}
      <Image
        source={FULL_BACKGROUND}
        style={localStyles.fullBackgroundImage}
        resizeMode="cover"
      />

      {renderConteudo()}
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