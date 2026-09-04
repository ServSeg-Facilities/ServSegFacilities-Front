import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./registrarPonto.styles";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";
import { api, getAuthToken } from "../../services/api";
import { Header } from "../../components/header/header";

const DEFAULT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBzZXJ2c2VnLmNvbSIsImlzcyI6IlNlcnZTZWdBUEkiLCJhdWQiOiJTZXJ2U2VnQVBJIiwibmJmIjoxNzg4MTc0ODI1LCJleHAiOjE4MTk3MTA4MjV9.mPpkv87L0YSdnxgCe2pNJLDmFmKjHJfm6B6U7R4whRo";

const COORDENADA_EMPRESA_PADRAO = {
  latitude: -23.55052,
  longitude: -46.633309,
};

export default function RegistrarPonto() {
  const [tipoRegistro, setTipoRegistro] = useState<"entrada" | "saida">(
    "entrada"
  );
  const [localizacao, setLocalizacao] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [dataHoraAtual, setDataHoraAtual] = useState(new Date());
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDataHoraAtual(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function obterLocalizacao() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocalizacao(COORDENADA_EMPRESA_PADRAO);
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (location && location.coords) {
          setLocalizacao({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } else {
          setLocalizacao(COORDENADA_EMPRESA_PADRAO);
        }
      } catch {
        setLocalizacao(COORDENADA_EMPRESA_PADRAO);
      }
    }

    obterLocalizacao();
  }, []);

  const converterParaGMT3 = (data: Date) => {
    const utc = data.getTime() + data.getTimezoneOffset() * 60000;
    return new Date(utc - 3 * 3600000);
  };

  const formatarData = (data: Date) => {
    const dataGMT3 = converterParaGMT3(data);
    const dias = [
      "Domingo",
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
      "Sábado",
    ];
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    return `${dias[dataGMT3.getDay()]}, ${dataGMT3.getDate()} de ${meses[dataGMT3.getMonth()]} de ${dataGMT3.getFullYear()}`;
  };

  const formatarHora = (data: Date) => {
    const dataGMT3 = converterParaGMT3(data);
    const hora = dataGMT3.getHours().toString().padStart(2, "0");
    const min = dataGMT3.getMinutes().toString().padStart(2, "0");
    return `${hora} : ${min}`;
  };

  const handleRegistrar = async () => {
    if (!localizacao) {
      Alert.alert("Aviso", "Obtendo localização, aguarde...");
      return;
    }

    if (!getAuthToken()) {
      Alert.alert(
        "Sessão Não Encontrada",
        "Você precisa estar conectado à sua conta para registrar o ponto. Por favor, faça login novamente."
      );
      return;
    }

    if (carregando) return;

    setCarregando(true);

    try {
      const tipoRegistroId = tipoRegistro === "entrada" ? 1 : 2;

      const resposta = await api.post("/RegistroPonto", {
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
        tipoRegistroId: tipoRegistroId,
      });

      const mensagemSucesso =
        typeof resposta.data === "string"
          ? resposta.data
          : `Ponto de ${
              tipoRegistro === "entrada" ? "Entrada" : "Saída"
            } registrado com sucesso!`;

      Alert.alert("Sucesso", mensagemSucesso);

      setTipoRegistro(tipoRegistro === "entrada" ? "saida" : "entrada");
    } catch (error: any) {
      if (error.response) {
        const mensagem =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data?.mensagem ||
              error.response.data?.message ||
              "Erro ao registrar o ponto.";
        Alert.alert("Atenção", mensagem);
      } else {
        Alert.alert(
          "Erro de Conexão",
          "Não foi possível comunicar com o servidor. Verifique se o backend está em execução."
        );
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
      <Header titulo="Ponto Eletrônico" />

      <Text style={styles.titulo}>Registrar Ponto:</Text>

      <View style={styles.container}>
        <View style={styles.cardRegistro}>
          <View style={styles.entradaSaida}>
            <Pressable
              style={[
                styles.opcao,
                tipoRegistro === "entrada" && styles.opcaoSelecionada,
              ]}
              onPress={() => setTipoRegistro("entrada")}
            >
              <AntDesign name="clock-circle" size={18} color={Colors.AzulTexto} />
              <Text style={styles.opcaoTexto}>Entrada</Text>
            </Pressable>

            <Pressable
              style={[
                styles.opcao,
                tipoRegistro === "saida" && styles.opcaoSelecionada,
              ]}
              onPress={() => setTipoRegistro("saida")}
            >
              <AntDesign name="clock-circle" size={18} color={Colors.AzulTexto} />
              <Text style={styles.opcaoTexto}>Saída</Text>
            </Pressable>
          </View>

          <View style={styles.dataHora}>
            <Text style={styles.data}>{formatarData(dataHoraAtual)}</Text>
            <Text style={styles.horario}>{formatarHora(dataHoraAtual)}</Text>
          </View>

          <View style={styles.mapa}>
            {localizacao ? (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: localizacao.latitude,
                  longitude: localizacao.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                <Marker
                  coordinate={{
                    latitude: localizacao.latitude,
                    longitude: localizacao.longitude,
                  }}
                  title="Minha localização"
                />
              </MapView>
            ) : (
              <Text style={styles.mapaCarregando}>Obtendo localização...</Text>
            )}
          </View>

          <Pressable
            onPress={handleRegistrar}
            disabled={carregando}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              carregando && { opacity: 0.6 },
            ]}
          >
            {carregando ? (
              <ActivityIndicator color={Colors.AzulFundo} />
            ) : (
              <Text style={styles.ButtonText}>Registrar</Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}