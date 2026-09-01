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
  }

})