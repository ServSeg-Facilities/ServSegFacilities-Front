import React, { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { H1, H2, Input } from "../../constants/theme";

import Logo from '../../../assets/imgs/ServSeg Escuro.svg'
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "expo-router";
import { autenticacaoService } from "../../services/autenticacaoService";

export default function Login () {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();
    
    async function acessar(){
        router.push("/") //! LEMBRAR DE TROCAR DEPOIS
        const emailDigitado = email.trim();
        const senhaDigitada = senha.trim();

        if(emailDigitado || !senhaDigitada){
            Alert.alert("Login inválido!", "Preencha o e-mail e a senha corretamente.")
            return;
        }

        try{
            await autenticacaoService.login({email: emailDigitado, senha: senhaDigitada})
            router.replace("/") //! LEMBRAR DE TROCAR DEPOIS
        } catch(error){
            Alert.alert("Login inválido!", "E-mail ou senha inválidos.")
        }
    }
    return (
        <View style={{ flex: 1, position: 'relative'}}>
            <Image source={require('../../../assets/imgs/Mapa1.png')}
            style={{ width: '100%', height: 375, position: 'absolute' }} resizeMode="contain"/>
            <View style={styles.logo}>
                <Logo width={150} />
                <Text style={H1}>ServSeg Facilities</Text>
            </View>
            <View>
                <Text style={H2}>E-Mail</Text>
                <TextInput style={Input} placeholder="email@email.com"
                value={email} onChangeText={setEmail} keyboardType="email-address"/>
                <Text style={H2}>Senha</Text>
                <TextInput style={Input} placeholder="********"
                value={senha} onChangeText={setSenha}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 125
    }
})