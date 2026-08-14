import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./registrarPonto.styles";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";

export default function RegistrarPonto() {
  const [tipoRegistro, setTipoRegistro] = useState<"entrada" | "saida">(
    "entrada",
  );

  const [localizacao, setLocalizacao] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    async function obterLocalizacao() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos da sua localização para registrar o ponto.",
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setLocalizacao(location.coords);
    }

    obterLocalizacao();
  }, []);

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
            <Text style={styles.data}>Quarta-Feira, 12 de Agosto de 2026</Text>

            <Text style={styles.horario}>09 : 08</Text>
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
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.ButtonText}>Registrar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}