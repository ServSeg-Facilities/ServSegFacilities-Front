import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from './cardLista.styles';
import { router } from 'expo-router';

interface CardListaProps {
  empresa: string;
  horario: string;
  data: string;
  dataHoraPonto: string;
}

export default function CardLista({ empresa, horario, data, dataHoraPonto }: CardListaProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push({
        pathname: "/detalhesRegistro",
        params: {
          data: dataHoraPonto
        }
      })}>
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
    </Pressable>
  );
}