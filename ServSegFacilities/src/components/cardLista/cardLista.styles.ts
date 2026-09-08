import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#98C9ED",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 15,
  },

  dataTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#183059",
    marginBottom: 12,
  },

  linhaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  infoTexto: {
    fontSize: 20,
    fontWeight: "600",
    color: "#183059",
    marginLeft: 8,
  },

  linhaHorarios: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  horarioEntrada: {
    flexDirection: "row",
    alignItems: "center",
  },

  horarioSaida: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 35,
  },
});