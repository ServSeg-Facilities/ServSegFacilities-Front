import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors, Font, H1, H2 } from "../../constants/theme";

import Logo from '../../../assets/imgs/ServSeg Escuro.svg';
import Biometria from '../../../assets/icons/Biometria.svg';
import { styles as buttonStyles } from "./login.styles";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "expo-router";

const BACKGROUND_IMAGES = [
    require('../../../assets/imgs/Mapa1.png'),
    require('../../../assets/imgs/Mapa2.png'),
];

export default function Login() {
    //? consts para a animação das imagens.
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    //? consts para o consumo da API.
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    async function acessar(){
        const emailDigitado = email.trim();
        const senhaDigitada = senha.trim();

        if(!emailDigitado || !senhaDigitada){
            Alert.alert("Login Inválido!", "Preencha o e-mail e a senha corretamente.");
            return;
        }

        try{
            await login({email: emailDigitado, senha: senhaDigitada})
            router.replace("/listaRegistro")
        }catch(error){
            Alert.alert("Login Inválido!", "E-mail ou senha incorretos/inválidos.");
        }
    }

    //? Controle da animação.
    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [fadeAnim]);

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <Animated.Image
                source={BACKGROUND_IMAGES[currentImageIndex]}
                style={{ width: '100%', height: 400, position: 'absolute', opacity: fadeAnim }}
                resizeMode="cover"
            />
            <View style={localStyles.logo}>
                <Logo width={150} style={{ marginBottom: -100 }} />
                <Text style={H1}>ServSeg Facilities</Text>
            </View>
            <View style={localStyles.espacamento}>
                <Text style={[H2, localStyles.h2]}>E-Mail</Text>
                <TextInput style={localStyles.input} placeholder="email@email.com"
                value={email} onChangeText={setEmail} autoCapitalize="none" />
                <Text style={[H2, localStyles.h2]}>Senha</Text>
                <TextInput style={localStyles.input} placeholder="********" secureTextEntry
                value={senha} onChangeText={setSenha} />
                <Pressable style={({ pressed }) =>
                [buttonStyles.button, pressed && buttonStyles.buttonPressed]} onPress={acessar}>
                    <Text style={buttonStyles.ButtonText}>Entrar</Text>
                </Pressable>
                <Pressable> //* ⬅ Colocar o onPress da biometria nesse Pressable.
                    <Biometria width={80} style={{ alignSelf: 'center' }} />
                </Pressable>
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 125,
    },
    espacamento: {
        paddingHorizontal: 30,
    },
    input: {
        padding: 10,
        fontFamily: Font.regular,
        backgroundColor: Colors.AzulFundo,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Colors.AzulTexto,
        marginTop: 5,
    },
    h2: {
        marginTop: 15,
    },
});