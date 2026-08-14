import { StyleSheet } from "react-native";
import { Colors, Container, H1, Button, ButtonText, P, H2 } from "../../constants/theme";
import CardDetalhes from "./cardDetalhes";

export const styles = StyleSheet.create({
    cardDetalhe:{
        width: '100%',
        minHeight: '60%',
        backgroundColor: Colors.AzulContainer,
        borderRadius: 8,
        padding: 20,
        shadowColor: Colors.AzulTexto,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },

    identificacaoEmpresa:{
        gap: 10
    },

    informacao: {
    gap: 5,
  },

  titulo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  texto: {
     ...H2,
    fontSize: 16,
    color: Colors.AzulTexto,
    textDecorationLine: "underline",
    paddingVertical: 8,
  },

  campoValor: {
    backgroundColor: Colors.AzulHeader, 
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: Colors.AzulTexto,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  infoTexto: {
    ...P,
    color: Colors.AzulTexto,
  },

  gridHorarios: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 20,
  },

  colunaHorario: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },

  horario: {
    ...P,
    width: "100%",
    textAlign: "center",
    backgroundColor: Colors.AzulHeader,
    color: Colors.AzulTexto,
    fontWeight: "bold",
    paddingVertical: 8,
    borderRadius: 6,
    shadowColor: Colors.AzulTexto,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },

  miniMapa: {
    width: "100%",
    height: 90,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#E5E5E5",
  },

  map: {
    width: "100%",
    height: "100%",
    shadowColor: Colors.AzulTexto,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },

  mapaCarregando: {
    ...P,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors.AzulTexto,
  }

});
