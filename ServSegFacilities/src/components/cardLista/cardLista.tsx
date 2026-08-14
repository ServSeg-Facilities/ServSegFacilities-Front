import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./cardLista.styles"

export default function CardLista() {
    return (
        <View style={styles.card}>
            <Text style={styles.dataTexto}>Quarta-Feira, 12/08/2026</Text>

            <View style={styles.linhaInfo}>
                {/* Ícone de prédio (empresa) */}
                <Ionicons name="business" size={20} color="#183059" />
                <Text style={styles.infoTexto}>Nascentech</Text>
            </View>

            <View style={styles.linhaInfo}>
                {/* Ícone de entrada/ponto */}
                <MaterialCommunityIcons name="login" size={20} color="#183059" />
                <Text style={styles.infoTexto}>09:08</Text>
            </View>
        </View>
    );
}
