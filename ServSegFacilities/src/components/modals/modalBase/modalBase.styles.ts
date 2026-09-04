import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/theme";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(16, 1, 70, 0.)",
    justifyContent: "flex-end", 
    alignItems: "center",
  },

  cardModal: {
    backgroundColor: Colors.AzulFundo, 
    height: '75%',
    width: '100%', 
    borderTopLeftRadius: 32,  
    borderTopRightRadius: 32, 
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: "center",
  },

  puxador: {
    width: '25%',
    height: 5,
    backgroundColor: Colors.AzulBotao,
    borderRadius: 2,
    marginBottom: 40,
  },
});