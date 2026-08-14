import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./detalhesRegistro";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";
import CardDetalhe from "../../components/cardDetalhes/cardDetalhes";

export default function DetalhesRegistro() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.conteudoHeader} onPress={() => {}}>
          <AntDesign name="arrow-left" size={24} color={Colors.AzulFundo} />
          <Text style={styles.divisorHeader}>|</Text>
          <Text style={styles.tituloHeader}>Detalhes</Text>
        </Pressable>
      </View>

      <Text style={styles.titulo}>Detalhes 12/08:</Text>

      <View style={styles.container}>
       <CardDetalhe/>
      </View>
    </SafeAreaView>
  );
}