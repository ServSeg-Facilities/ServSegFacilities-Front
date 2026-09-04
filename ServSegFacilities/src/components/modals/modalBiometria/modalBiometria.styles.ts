import { StyleSheet } from "react-native";
import { Colors, H1, Button, P } from "../../../constants/theme";

export const styles = StyleSheet.create({
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
    color: Colors.AzulTexto,
    textAlign: "center",
  },

  botoesContainer: {
    flexDirection: "row",
    gap: 40,
  },

  botao: {
    ...Button,
    width: "45%",
  },

  textoBotao: {
    color: Colors.AzulFundo,
    fontWeight: "bold",
  },
});
