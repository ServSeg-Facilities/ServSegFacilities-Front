import { StyleSheet } from "react-native";
import { Colors, Font } from "../../constants/theme";

export const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.AzulFundo,
  },
  fullBackgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.1,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.AzulHeader,
    paddingTop: 10,
    paddingBottom: 35,
    justifyContent: "center",
    borderBottomLeftRadius: 25,
    paddingHorizontal: 20,
    position: "relative",
    marginBottom: 10,
  },

  conteudoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  input: {
    paddingHorizontal: 10,
    width: "80%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    color: "white",
    marginTop: 5,
    fontFamily: Font.regular, // <--- Aplicado a fonte no input
  },

  botaoFiltro: {
    marginLeft: 20,
    height: 30,
  },

  containerBotao: {
    padding: 30,
  },

  botaoRegistro: {
    backgroundColor: Colors.AzulBotao,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
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

  textoBotao: {
    color: Colors.AzulFundo,
    fontSize: 25,
    fontFamily: Font.regular, // <--- Aplicado a fonte em negrito
  },

  componentesCards: {
    padding: 20,
    gap: 12,
  },

  textoVazio: {
    textAlign: "center",
    color: "#555",
    marginTop: 0,
    fontFamily: Font.regular, // <--- Aplicado a fonte no texto de lista vazia
  },

  pontaDireita: {
    position: "absolute",
    bottom: -30,
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 50,
    borderRightWidth: 0,
    borderTopWidth: 35,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: Colors.AzulHeader,
  },
});