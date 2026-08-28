import { View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./cardLista.styles";

interface CardListaProps {
  empresa: string;
  horario: string;
  data: string;
}

export default function CardLista({ empresa, horario, data }: CardListaProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.dataTexto}>{data}</Text>
      <Text style={styles.infoTexto}>{empresa}</Text>
      <Text style={styles.infoTexto}>{horario}</Text>
    </View>
  );
}

// export default function CardLista() {
//     return (
//         <View style={styles.card}>
//             <Text style={styles.dataTexto}>Quarta-Feira, 12/08/2026</Text>

//             <View style={styles.linhaInfo}>
//                 {/* Ícone de prédio (empresa) */}
//                 <Ionicons name="business" size={20} color="#183059" />
//                 <Text style={styles.infoTexto}>Nascentech</Text>
//             </View>

//             <View style={styles.linhaInfo}>
//                 {/* Ícone de entrada/ponto */}
//                 <MaterialCommunityIcons name="login" size={20} color="#183059" />
//                 <Text style={styles.infoTexto}>09:08</Text>
//             </View>
//         </View>
//     );
// }
