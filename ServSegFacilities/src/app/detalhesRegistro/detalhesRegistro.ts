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