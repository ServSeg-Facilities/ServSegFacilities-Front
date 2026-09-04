import { StyleSheet } from "react-native";
import { Colors, Container, H1, Button, ButtonText, P, H2 } from "../../constants/theme";

export const styles = StyleSheet.create({
  button: {
    ...Button,
    backgroundColor: Colors.AzulBotao,
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 20
  },

  ButtonText,

  buttonPressed: {
    opacity: 0.7
  },
  bioContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.AzulFundo,
    paddingHorizontal: 10,
    height: 125,
    width: 125,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.AzulTexto,
    marginTop: 10,
    // Sombra bem forte para iOS
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
})