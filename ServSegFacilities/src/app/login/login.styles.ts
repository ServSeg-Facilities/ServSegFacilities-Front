import { StyleSheet } from "react-native";
import { Colors } from "../../constants/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.AzulFundo,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: Colors.AzulFundo,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.AzulTexto,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: Colors.AzulTexto,
    opacity: 0.8,
    marginBottom: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.AzulTexto,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.AzulFundo,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#C9EAFB",
    color: Colors.AzulTexto,
  },
  button: {
    backgroundColor: Colors.AzulBotao,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
