import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    // Azul médio idêntico ao dos cards na sua imagem
    backgroundColor: "#98C9ED", 
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    // Sombra leve para destacar o card do fundo
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  dataTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#183059", // Azul escuro
    marginBottom: 12,
  },
  linhaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#183059", // Azul escuro
    marginLeft: 8,
  },
});