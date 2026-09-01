import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";
import { styles } from "./detalhesRegistro";
import CardDetalhe from "../../components/cardDetalhes/cardDetalhes";
import { useDetalhesRegistro } from "../../hooks/useDetalhesRegistro";

export default function DetalhesRegistro() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const { loading, error, detalhes, carregarDetalhesRegistro } =
    useDetalhesRegistro(id);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            style={styles.conteudoHeader}
            onPress={() => router.back()}
          >
            <AntDesign name="arrow-left" size={24} color={Colors.AzulFundo} />

            <Text style={styles.divisorHeader}>|</Text>

            <Text style={styles.tituloHeader}>Detalhes</Text>
          </Pressable>
        </View>

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

  if (error || !detalhes) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            style={styles.conteudoHeader}
            onPress={() => router.back()}
          >
            <AntDesign name="arrow-left" size={24} color={Colors.AzulFundo} />

            <Text style={styles.divisorHeader}>|</Text>

            <Text style={styles.tituloHeader}>Detalhes</Text>
          </Pressable>
        </View>

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.conteudoHeader} onPress={() => router.back()}>
          <AntDesign name="arrow-left" size={24} color={Colors.AzulFundo} />

          <Text style={styles.divisorHeader}>|</Text>

          <Text style={styles.tituloHeader}>Detalhes</Text>
        </Pressable>
      </View>

      <Text style={styles.titulo}>Detalhes {detalhes.dataHoraPonto}:</Text>

      <View style={styles.container}>
        <CardDetalhe detalhes={detalhes} />
      </View>
    </SafeAreaView>
  );
}
