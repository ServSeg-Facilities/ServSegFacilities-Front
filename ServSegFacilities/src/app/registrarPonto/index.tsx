import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./registrarPonto.styles";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";
import { api, getAuthToken } from "../../services/api";

// Coordenada padrão (Praça da Sé - SP, sede da empresa cadastrada no banco)
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

  // Atualização em tempo real do relógio
  useEffect(() => {
    const timer = setInterval(() => {
      setDataHoraAtual(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Obtenção da localização do usuário com fallback automático para emulador
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
        // Em caso de erro na obtenção do GPS do notebook/emulador, usa as coordenadas da empresa
        setLocalizacao(COORDENADA_EMPRESA_PADRAO);
      }
    }

    obterLocalizacao();
  }, []);

  // Conversão e formatação da data em GMT-3 (Horário de Brasília)
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

  // Envio da requisição de registro de ponto (Entrada / Saída)
  const handleRegistrar = async () => {
    if (!localizacao) {
      Alert.alert("Aviso", "Obtendo localização, aguarde...");
      return;
    }

    if (!getAuthToken()) {
      Alert.alert("Atenção", "Usuário não autenticado. Forneça o token de acesso.");
      return;
    }

    if (carregando) return;

    setCarregando(true);

    try {
      // 1 = Entrada, 2 = Saída
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

      // Alterna automaticamente entre entrada e saída após registro bem-sucedido
      setTipoRegistro(tipoRegistro === "entrada" ? "saida" : "entrada");
    } catch (error: any) {
      if (error.response) {
        // Resposta de erro do backend (ex: regras de negócio / DomainException)
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.conteudoHeader} onPress={() => {}}>
          <AntDesign name="arrow-left" size={24} color={Colors.AzulFundo} />
          <Text style={styles.divisorHeader}>|</Text>
          <Text style={styles.tituloHeader}>Ponto Eletrônico</Text>
        </Pressable>
      </View>

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