import { View, Text } from "react-native";
import { styles } from "./cardDetalhes.styles";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";
import MapView, { Marker } from "react-native-maps";
import { DetalhesRegistro } from "../../@types/detalhesRegistro";

interface CardDetalheProps {
  detalhes: DetalhesRegistro;
}

export default function CardDetalhe({ detalhes }: CardDetalheProps) {
  return (
    <View style={styles.cardDetalhe}>
      <View style={styles.identificacaoENomeEmpresa}>
        <View style={styles.informacao}>
          <View style={styles.titulo}>
            <Feather name="user" size={18} color={Colors.AzulTexto} />

            <Text style={styles.texto}>Identificação:</Text>
          </View>

          <View style={styles.campoValor}>
            <Text style={styles.infoTexto}>{detalhes.nome}</Text>
          </View>
        </View>

        <View style={styles.informacao}>
          <View style={styles.titulo}>
            <Octicons name="organization" size={18} color={Colors.AzulTexto} />

            <Text style={styles.texto}>Empresa:</Text>
          </View>

          <View style={styles.campoValor}>
            <Text style={styles.infoTexto}>{detalhes.razaoSocial}</Text>
          </View>
        </View>
      </View>

      <View style={styles.gridHorarios}>
        <View style={styles.colunaHorario}>
          <View style={styles.titulo}>
            <AntDesign name="clock-circle" size={16} color={Colors.AzulTexto} />

            <Text style={styles.texto}>Entrada</Text>
          </View>

          <Text style={styles.horario}>{detalhes.entrada.horario}</Text>

          <View style={styles.miniMapa}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: detalhes.entrada.localizacao.latitude,
                longitude: detalhes.entrada.localizacao.longitude,
                latitudeDelta: detalhes.entrada.localizacao.precisao,
                longitudeDelta: detalhes.entrada.localizacao.precisao,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: detalhes.entrada.localizacao.latitude,
                  longitude: detalhes.entrada.localizacao.longitude,
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

          {detalhes.saida ? (
            <>
              <Text style={styles.horario}>{detalhes.saida.horario}</Text>

              <View style={styles.miniMapa}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: detalhes.saida.localizacao.latitude,
                    longitude: detalhes.saida.localizacao.longitude,
                    latitudeDelta: detalhes.saida.localizacao.precisao,
                    longitudeDelta: detalhes.saida.localizacao.precisao,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                >
                  <Marker
                    coordinate={{
                      latitude: detalhes.saida.localizacao.latitude,
                      longitude: detalhes.saida.localizacao.longitude,
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
