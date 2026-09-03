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