import { StyleSheet } from "react-native";
import { Colors, H1, Button, P } from "../../../constants/theme";

export const styles = StyleSheet.create({
  icone:{
    width:250,
    height: 250
  },

    texto: {
      marginVertical: 30,
      marginBottom: 40,
      gap: 40

  },

  titulo: {
    ...H1,
    color: Colors.AzulTexto,
    textAlign: "center",
  },

  descricao: {
    ...P,
    flexWrap: 'wrap',
    flexDirection: 'column',
    color: Colors.AzulTexto,
    textAlign: "justify",
  },

  botaoContainer: {
    flexDirection: "row",
    gap: 40,
  },

  botao: {
    ...Button,
    width: "70%",
  },

  textoBotao: {
    color: Colors.AzulFundo,
    fontWeight: "bold",
  },
})