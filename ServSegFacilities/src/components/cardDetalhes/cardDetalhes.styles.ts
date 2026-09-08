import { StyleSheet } from "react-native";
import { Colors, P, H2 } from "../../constants/theme";

export const styles = StyleSheet.create({
  cardDetalhe: {
    width: '100%',
    minHeight: '60%',
    backgroundColor: Colors.AzulContainer,
    borderRadius: 8,
    padding: 20,
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

  identificacaoENomeEmpresa: {
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

  infoTexto: {
    ...P,
    color: Colors.AzulFundo,
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
    color: Colors.AzulFundo,
    fontWeight: "bold",
    paddingVertical: 8,
    borderRadius: 6,
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

  miniMapa: {
    width: "100%",
    height: 90,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#E5E5E5",
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

  map: {
    width: "100%",
    height: "100%",
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

  mapaCarregando: {
    ...P,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors.AzulTexto,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.60, // Aumentado de 0.30 para 0.60 para dobrar a intensidade
    shadowRadius: 10,   // Espalha mais a sombra
    // Sombra forte para Android
    elevation: 16,     // Aumentado para dar mais destaque
  }

});
