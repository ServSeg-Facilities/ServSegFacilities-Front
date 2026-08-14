import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // Cor de fundo azul bem clarinha, inspirada na imagem do seu projeto
    backgroundColor: "#DDF4FD", 
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 20, // Dá um respiro extra na barra de status do Android
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // Sombrinha leve no cabeçalho para destacar do fundo
    elevation: 4, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  conteudoHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  divisorHeader: {
    fontSize: 22,
    color: "#183059", // Azul escuro
    marginHorizontal: 12,
    fontWeight: "300",
  },
  tituloHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#183059", // Azul escuro combinando com o botão da sua outra tela
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#183059",
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});