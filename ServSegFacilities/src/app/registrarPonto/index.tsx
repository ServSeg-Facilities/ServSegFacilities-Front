import { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, ActivityIndicator, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./registrarPonto.styles";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";
import { api, getAuthToken } from "../../services/api";
import { Header } from "../../components/header/header";
import ModalBiometriaFoto from "../../components/modals/modalBiometriaFoto/modalBiometriaFoto";

const FULL_BACKGROUND = require("../../../assets/imgs/Fundo2.png");

// Coordenada padrão (Praça da Sé - SP)
const COORDENADA_EMPRESA_PADRAO = {
  latitude: -23.55052,
  longitude: -46.633309,
};

export default function RegistrarPonto() {
  const [tipoRegistro, setTipoRegistro] = useState<"entrada" | "saida">("entrada");
  const [localizacao, setLocalizacao] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [dataHoraAtual, setDataHoraAtual] = useState(new Date());
  const [carregando, setCarregando] = useState(false);

  // Estado do modal de biometria
  const [modalBiometriaFotoVisivel, setModalBiometriaFotoVisivel] = useState(false);

  // Relógio em tempo real
  useEffect(() => {
    const timer = setInterval(() => {
      setDataHoraAtual(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Obtenção da localização do usuário
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

  // Formatação de data e hora locais
  const formatarData = (data: Date) => {
    const dataFormatada = data.toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  };

  const formatarHora = (data: Date) => {
    return data.toLocaleTimeString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Função para validar e abrir o modal
  const AbrirModalBiometriaFoto = async () => {
    if (!localizacao) {
      Alert.alert("Aviso", "Obtendo localização, aguarde...");
      return;
    }

    const token = await getAuthToken();

    if (!token) {
      Alert.alert(
        "Sessão Não Encontrada",
        "Você precisa estar conectado à sua conta para registrar o ponto. Por favor, faça login novamente."
      );
      return;
    }

    setModalBiometriaFotoVisivel(true);
  };

  // Envio da requisição de registro de ponto (recebendo a fotoUri tirada no modal)
  const handleRegistrar = async (fotoUri?: string) => {
    setModalBiometriaFotoVisivel(false);

    if (carregando || !localizacao) return;

    if (!fotoUri) {
      Alert.alert("Atenção", "A captura da foto é obrigatória para registrar o ponto.");
      return;
    }

    setCarregando(true);

    try {
      const tipoRegistroId = tipoRegistro === "entrada" ? 1 : 2;

      // Cria o FormData para atender a APIs multipart/form-data
      const formData = new FormData();
      formData.append("latitude", String(localizacao.latitude));
      formData.append("longitude", String(localizacao.longitude));
      formData.append("tipoRegistroId", String(tipoRegistroId));

      // Extrai nome e extensão da foto
      const nomeArquivo = fotoUri.split("/").pop() || "foto_biometria.jpg";
      const extensao = nomeArquivo.split(".").pop()?.toLowerCase();
      const mimeType = extensao === "png" ? "image/png" : "image/jpeg";

      // ⚠️ CHAVE CORRIGIDA: De "foto" para "FotoPonto" (exigido pelo backend .NET)
      formData.append("FotoPonto", {
        uri: fotoUri,
        name: nomeArquivo.includes(".") ? nomeArquivo : `${nomeArquivo}.jpg`,
        type: mimeType,
      } as any);

      const resposta = await api.post("/RegistroPonto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const mensagemSucesso =
        typeof resposta.data === "string"
          ? resposta.data
          : `Ponto de ${tipoRegistro === "entrada" ? "Entrada" : "Saída"} registrado com sucesso!`;

      Alert.alert("Sucesso", mensagemSucesso);
      setTipoRegistro(tipoRegistro === "entrada" ? "saida" : "entrada");
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data;
        let mensagem = "";

        if (typeof data === "string" && data.trim() !== "") {
          mensagem = data;
        } else if (data && typeof data === "object") {
          mensagem =
            data.mensagem ||
            data.message ||
            data.detail ||
            data.title ||
            (data.errors ? JSON.stringify(data.errors) : "");
        }

        if (!mensagem || mensagem.trim() === "") {
          mensagem = `Erro no servidor (${error.response.status}). Verifique os dados fornecidos.`;
        }

        Alert.alert("Atenção!", mensagem);
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
    <View style={localStyles.mainContainer}>
      <Image
        source={FULL_BACKGROUND}
        style={localStyles.fullBackgroundImage}
        resizeMode="cover"
      />

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
              onPress={AbrirModalBiometriaFoto}
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

        <ModalBiometriaFoto
          modalVisivel={modalBiometriaFotoVisivel}
          confirmar={(fotoUri?: string) => handleRegistrar(fotoUri)}
          cancelar={() => setModalBiometriaFotoVisivel(false)}
        />
      </SafeAreaView>
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