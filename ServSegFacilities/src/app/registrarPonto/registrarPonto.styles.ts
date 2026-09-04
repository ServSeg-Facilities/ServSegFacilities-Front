import { StyleSheet } from "react-native";
import { Colors, Container, H1, Button, ButtonText, P, H2 } from "../../constants/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    ...Container,
    backgroundColor: 'none',
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  titulo: {
    ...H2,
    color: Colors.AzulTexto,
    marginVertical: 20,
    marginHorizontal: 20,
  },

  cardRegistro: {
    width: '100%',
    minHeight: '60%',
    backgroundColor: Colors.AzulContainer,
    borderRadius: 8,
    padding: 12,
    shadowColor: Colors.AzulTexto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  entradaSaida: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#65B0E8",
    marginBottom: 15,
  },

  opcao: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    gap: 10,
  },

  opcaoSelecionada: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.AzulBotao,
  },

  opcaoTexto: {
    ...H2,
    fontSize: 16,
    color: Colors.AzulTexto,
  },

  dataHora: {
    alignItems: "center",
    gap: 25,
    marginVertical: 20,
  },

  data: {
    ...P,
    color: Colors.AzulTexto,
  },

  horario: {
    ...P,
    color: Colors.AzulTexto,
    backgroundColor: Colors.AzulHeader,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 5,
    elevation: 2,
  },

  mapa: {
    width: "100%",
    height: 140,
    backgroundColor: "#E5E5E5",
    borderRadius: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapaCarregando: {
    ...P,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors.AzulTexto,
  },

  button: {
    ...Button,
    backgroundColor: Colors.AzulBotao,
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 20,
  },

  ButtonText,

  buttonPressed: {
    opacity: 0.7,
  },
});