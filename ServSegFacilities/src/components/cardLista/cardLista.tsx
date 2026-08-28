import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from './cardLista.styles';

interface CardListaProps {
  empresa: string;
  horario: string;
  data: string;
}

export default function CardLista({ empresa, horario, data }: CardListaProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.dataTexto}>{data}</Text>

      <View style={styles.linhaInfo}>
        {/* Ícone de prédio (empresa) */}
        <Ionicons name="business" size={20} color="#183059" />
        <Text style={styles.infoTexto}>{empresa}</Text>
      </View>

      <View style={styles.linhaInfo}>
        {/* Ícone de entrada/ponto */}
        <MaterialCommunityIcons name="login" size={20} color="#183059" />
        <Text style={styles.infoTexto}>{horario}</Text>
      </View>
    </View>
  );
}