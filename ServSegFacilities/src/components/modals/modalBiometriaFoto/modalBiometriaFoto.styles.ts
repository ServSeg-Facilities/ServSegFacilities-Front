import { StyleSheet } from "react-native";
import { Colors, H1, Button, P } from "../../../constants/theme";

export const styles = StyleSheet.create({
  icone: {
    width: 225,
    height: 225,
  },
  texto: {
    marginVertical: 30,
    gap: 25,
  },
  titulo: {
    ...H1,
    color: Colors.AzulTexto,
    textAlign: "center",
  },
  descricaoContainer: {
    gap: 6,
  },
  descricao: {
    ...P,
    color: Colors.AzulTexto,
    textAlign: "justify",
  },
  botaoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  botao: {
    ...Button,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotao: {
    color: Colors.AzulFundo,
    fontWeight: "bold",
  },
  
  /* Estilos do Modo Câmera */
  containerCamera: {
    width: "100%",
    alignItems: "center",
    gap: 20,
    marginVertical: 10,
  },
  tituloCamera: {
    ...H1,
    fontSize: 18,
    color: Colors.AzulTexto,
    textAlign: "center",
  },
  frameCamera: {
    width: 240,
    height: 240,
    borderRadius: 120,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.AzulFundo || "#0B2B5B",
  },
  cameraView: {
    width: "100%",
    height: "100%",
  },
});