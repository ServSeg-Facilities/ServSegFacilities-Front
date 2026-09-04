import React from "react";
import { View, Text, Pressable, StyleSheet, StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, H1 } from "../../constants/theme";

interface HeaderProps {
  titulo: string;
  onPressBack?: () => void;
  mostrarBotaoVoltar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  titulo,
  onPressBack,
  mostrarBotaoVoltar = true,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleVoltar = () => {
    if (onPressBack) {
      onPressBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.conteudoHeader}>
          {mostrarBotaoVoltar && (
            <Pressable
              onPress={handleVoltar}
              style={styles.botaoVoltar}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <AntDesign name="arrow-left" size={24} color={Colors.AzulFundo} />
            </Pressable>
          )}

          {mostrarBotaoVoltar && <Text style={styles.divisorHeader}>|</Text>}

          <Text style={styles.tituloHeader} numberOfLines={1}>
            {titulo}
          </Text>
        </View>

        {/* Ponta que desce no canto inferior direito */}
        <View style={styles.pontaDireita} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.AzulHeader,
    paddingBottom: 35,
    justifyContent: "center",
    borderBottomLeftRadius: 25,
    paddingHorizontal: 20,
    position: "relative", // Necessário para posicionar a ponta
    marginBottom: 10, // Dá espaço extra no layout para a ponta que se projeta para fora
  },
  conteudoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  botaoVoltar: {
    paddingRight: 5,
  },
  divisorHeader: {
    ...H1,
    color: Colors.AzulFundo,
  },
  tituloHeader: {
    ...H1,
    color: Colors.AzulFundo,
    paddingHorizontal: 10,
  },
  pontaDireita: {
    position: "absolute",
    bottom: -30, // O quanto a ponta desce (igual à altura da borda superior)
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    
    // Define a largura e inclinação da ponta
    borderLeftWidth: 50,  // Base esquerda do cone
    borderRightWidth: 0,  // Alinha a borda direita reta com o final da tela
    
    // Define a altura do cone e a cor
    borderTopWidth: 35,   // Altura da ponta que desce
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: Colors.AzulHeader, // Cor do Header
    },
});