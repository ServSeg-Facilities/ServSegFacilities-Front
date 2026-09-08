import { StyleSheet } from "react-native";
import { Colors } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  statusBar:{
    backgroundColor: Colors.AzulHeader
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

  headerAzul: {
    width: "100%",
    height: 100,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderBottomLeftRadius: 30,
  },

  paiInpHeader: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: {
    padding: 10,
    width: "80%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    color: "white",
  },

  botaoFiltro: {
    height: 40,
  },

  containerBotao: {
    padding: 20,
  },

  botaoRegistro: {
    backgroundColor: "#113E82",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },

  textoBotao: {
    color: "white",
    fontSize: 20,
  },

  componentesCards: {
    padding: 20,
    gap: 12,
  },

  textoVazio: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
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