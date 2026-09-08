import { StyleSheet } from "react-native";

import { Colors, Container, H1, Button, H2 } from "../../constants/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  header: {
    backgroundColor: Colors.AzulHeader,
    height: "15%",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    marginBottom: 5,
    paddingHorizontal: 20,
  },

  conteudoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  divisorHeader: {
    ...H1,
    color: Colors.AzulFundo,
  },

  tituloHeader: {
    ...H1,
    color: Colors.AzulFundo,
    paddingHorizontal: 15,
  },

  container: {
    ...Container,
    backgroundColor: "none",
    paddingHorizontal: 20,
    paddingTop: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.60, // Aumentado de 0.30 para 0.60 para dobrar a intensidade
    shadowRadius: 10,   // Espalha mais a sombra
    // Sombra forte para Android
    elevation: 16,     // Aumentado para dar mais destaque
  },

  titulo: {
    ...H2,
    color: Colors.AzulTexto,
    marginVertical: 20,
    marginHorizontal: 20,
  },

  botaoTentarNovamente: {
    ...Button,
    color: Colors.AzulFundo,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.60, // Aumentado de 0.30 para 0.60 para dobrar a intensidade
    shadowRadius: 10,   // Espalha mais a sombra
    // Sombra forte para Android
    elevation: 16,     // Aumentado para dar mais destaque
  },
});