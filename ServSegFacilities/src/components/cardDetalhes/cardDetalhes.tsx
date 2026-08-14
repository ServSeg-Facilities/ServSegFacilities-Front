import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./cardDetalhes.styles";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";
import { useEffect, useState } from "react";

export default function CardDetalhe() {
  const [localizacao, setLocalizacao] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    async function obterLocalizacao() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocalizacao(location.coords);
      }
    }
    obterLocalizacao();
  }, []);

  return (
    <View style={styles.cardDetalhe}>
      <View style={styles.identificacaoEmpresa}>
        <View style={styles.informacao}>
          <View style={styles.titulo}>
            <Feather name="user" size={18} color={Colors.AzulTexto} />
            <Text style={styles.texto}>Identificação:</Text>
          </View>
          <View style={styles.campoValor}>
            <Text style={styles.infoTexto}>João Silva Santos</Text>
          </View>
        </View>

        <View style={styles.informacao}>
          <View style={styles.titulo}>
            <Octicons name="organization" size={18} color={Colors.AzulTexto} />
            <Text style={styles.texto}>Empresa:</Text>
          </View>
          <View style={styles.campoValor}>
            <Text style={styles.infoTexto}>Nascentech</Text>
          </View>
        </View>
      </View>

      <View style={styles.gridHorarios}>
        <View style={styles.colunaHorario}>
          <View style={styles.titulo}>
            <AntDesign name="clock-circle" size={16} color={Colors.AzulTexto} />
            <Text style={styles.texto}>Entrada</Text>
          </View>

          <Text style={styles.horario}>09 : 08</Text>

          <View style={styles.miniMapa}>
            {localizacao ? (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: localizacao.latitude,
                  longitude: localizacao.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: localizacao.latitude,
                    longitude: localizacao.longitude,
                  }}
                />
              </MapView>
            ) : (
              <Text style={styles.mapaCarregando}>...</Text>
            )}
          </View>
        </View>

        <View style={styles.colunaHorario}>
          <View style={styles.titulo}>
            <AntDesign name="clock-circle" size={16} color={Colors.AzulTexto} />
            <Text style={styles.texto}>Saída</Text>
          </View>

          <Text style={styles.horario}>16 : 05</Text>

          <View style={styles.miniMapa}>
            {localizacao ? (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: localizacao.latitude,
                  longitude: localizacao.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: localizacao.latitude,
                    longitude: localizacao.longitude,
                  }}
                />
              </MapView>
            ) : (
              <Text style={styles.mapaCarregando}>...</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
