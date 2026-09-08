import { View, Text } from "react-native";
import { styles } from "./cardDetalhes.styles";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";
import MapView, { Marker } from "react-native-maps";
import { ListaConvertida } from "../../@types/lista";


// Recebe os detalhes já organizados pelo hook.
// O componente não faz requisição para a API.
interface CardDetalheProps {
detalhes:ListaConvertida
}

export default function CardDetalhe({detalhes }: CardDetalheProps) {
  return (
    <View style={styles.cardDetalhe}>
      <View style={styles.identificacaoENomeEmpresa}>
        <View style={styles.informacao}>
          <View style={styles.titulo}>
            <Feather name="user" size={18} color={Colors.AzulTexto} />
             {/* Nome do funcionário */}
            <Text style={styles.texto}>Identificação:</Text>
          </View>

          <View style={styles.campoValor}>
            <Text style={styles.infoTexto}>{detalhes.nomeUsuario}</Text>
          </View>
        </View>

        <View style={styles.informacao}>
          <View style={styles.titulo}>
            <Octicons name="organization" size={18} color={Colors.AzulTexto} />
            {/* Nome empresa */}
            <Text style={styles.texto}>Empresa:</Text>
          </View>

          <View style={styles.campoValor}>
            <Text style={styles.infoTexto}>{detalhes.nomeEmpresa}</Text>
          </View>
        </View>
      </View>

      {/* ===========
      ENTRADA E SAÍDA
      =============== */}
      <View style={styles.gridHorarios}>
        <View style={styles.colunaHorario}>
          <View style={styles.titulo}>
            <AntDesign name="clock-circle" size={16} color={Colors.AzulTexto} />

            <Text style={styles.texto}>Entrada</Text>
          </View>

          <Text style={styles.horario}>{detalhes.horaPontoEntrada}</Text>

          <View style={styles.miniMapa}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: detalhes.latitudeEntrada,
                longitude: detalhes.longitudeEntrada,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: detalhes.latitudeEntrada,
                  longitude: detalhes.longitudeEntrada,
                }}
              />
            </MapView>
          </View>
        </View>

        <View style={styles.colunaHorario}>
          <View style={styles.titulo}>
            <AntDesign name="clock-circle" size={16} color={Colors.AzulTexto} />

            <Text style={styles.texto}>Saída</Text>
          </View>

          {detalhes.horaPontoSaida &&
          detalhes.latitudeSaida !== null &&
          detalhes.longitudeSaida !== null ? (
            <>
              <Text style={styles.horario}>{detalhes.horaPontoSaida}</Text>

              <View style={styles.miniMapa}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: detalhes.latitudeSaida,
                    longitude: detalhes.longitudeSaida,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                >
                  <Marker
                    coordinate={{
                      latitude: detalhes.latitudeSaida,
                      longitude: detalhes.longitudeSaida,
                    }}
                  />
                </MapView>
              </View>
            </>
          ) : (
            <Text style={styles.horario}>Não registrado</Text>
          )}
        </View>
      </View>
    </View>
  );
}
