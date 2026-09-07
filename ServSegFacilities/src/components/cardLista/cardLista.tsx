import React from "react";
import { View, Text, Pressable } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { styles } from "./cardLista.styles";
import { router } from "expo-router";

interface CardListaProps {
  historicoId: number;
  empresa: string;
  data: string;
  horaEntrada: string;
  horaSaida: string | null;
}

export default function CardLista({
  historicoId,
  empresa,
  data,
  horaEntrada,
  horaSaida,
}: CardListaProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/detalhesRegistro",
          params: {
            historicoId: String(historicoId),
          },
        })
      }
    >
      <Text style={styles.dataTexto}>
        {data}
      </Text>

      <View style={styles.linhaInfo}>
        <Ionicons
          name="business"
          size={20}
          color="#183059"
        />

        <Text style={styles.infoTexto}>
          {empresa}
        </Text>
      </View>

      <View style={styles.linhaHorarios}>
        <View style={styles.horarioEntrada}>
          <Ionicons
            name="log-in"
            size={20}
            color="#183059"
          />

          <Text style={styles.infoTexto}>
            {horaEntrada}
          </Text>
        </View>

        {horaSaida && (
          <View style={styles.horarioSaida}>
            <Ionicons
              name="log-out"
              size={20}
              color="#183059"
            />

            <Text style={styles.infoTexto}>
              {horaSaida}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}