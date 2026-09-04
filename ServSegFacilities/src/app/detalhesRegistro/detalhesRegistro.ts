<<<<<<< HEAD
import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#DDF4FD", 
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 20, // Dá um respiro extra na barra de status do Android
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  conteudoHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  divisorHeader: {
    fontSize: 22,
    color: "#183059", // Azul escuro
    marginHorizontal: 12,
    fontWeight: "300",
  },
  tituloHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#183059", // Azul escuro combinando com o botão da outra tela
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#183059",
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
=======
import { StyleSheet } from "react-native";
import { Colors, Container, H1, Button, H2 } from "../../constants/theme";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    header: {
       backgroundColor: Colors.AzulHeader,
        height: '15%',
        justifyContent: "center",
        borderBottomLeftRadius: 30,
        marginBottom: 5,
        paddingHorizontal: 20,
    },

    conteudoHeader:{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    
    divisorHeader: {
        ...H1,
        color: Colors.AzulFundo,
    },
    
    tituloHeader:{
        ...H1,
        color: Colors.AzulFundo,
        paddingHorizontal: 15,
    },
    
    container:{
        ...Container,
        backgroundColor: 'none',
        paddingHorizontal: 20,
        paddingTop: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

      titulo:{
        ...H2,
        color: Colors.AzulTexto,
        marginVertical: 20,
        marginHorizontal: 20
    },

    botaoTentarNovamente:{
        ...Button,
        color: Colors.AzulFundo
    }

})
>>>>>>> origin/merging
