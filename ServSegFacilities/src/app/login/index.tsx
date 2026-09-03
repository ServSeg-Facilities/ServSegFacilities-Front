import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors, Font, H1, H2 } from "../../constants/theme";
import Logo from '../../../assets/imgs/ServSeg Escuro.svg';
import Biometria from '../../../assets/icons/Biometria.svg';
import { styles as buttonStyles, styles } from "./login.styles";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "expo-router";
import { useAuthLocal } from "../../hooks/useAuthLocal";

// 1. Nova imagem de fundo para a tela inteira
const FULL_BACKGROUND = require('../../../assets/imgs/Fundo.png');

// 2. Imagem fixa de fundo (rodapé)
const BASE_BACKGROUND = require('../../../assets/imgs/FundoMapas.png');

// 3. Apenas os mapas que vão alternar no carrossel
const MAP_IMAGES = [
    require('../../../assets/imgs/Mapa1.png'),
    require('../../../assets/imgs/Mapa2.png'),
    require('../../../assets/imgs/Mapa3.png'),
];

export default function Login() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [BioAtiva, setBioAtiva] = useState(false);

    const { login } = useAuth();
    const { resetarDados, ...restanteHook } = useAuthLocal();
    const { verificarPrimeiroLogin, salvarDados, adiarAutenticacaoLocal,
        autenticar, isBiometriaAtiva } = useAuthLocal();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function checkBio() {
            if (isBiometriaAtiva) {
                const ativa = await isBiometriaAtiva();
                setBioAtiva(ativa);
            }
        } checkBio();
    }, [isBiometriaAtiva]);

    async function acessar() {
        const emailDigitado = email.trim().toLowerCase();
        const senhaDigitada = senha.trim();

        if (!emailDigitado || !senhaDigitada) {
            Alert.alert("Login Inválido!", "Preencha o e-mail e a senha corretamente.");
            return;
        }

        try {
            await login({ email: emailDigitado, senha: senhaDigitada });

            let devePerguntarBiometria = false;
            try {
                if (verificarPrimeiroLogin) {
                    devePerguntarBiometria = await verificarPrimeiroLogin(emailDigitado);
                }
            } catch (bioError) {
                console.warn("Aviso na verificação biométrica:", bioError);
            }

            if (devePerguntarBiometria) {
                Alert.alert(
                    "Autenticação Biométrica",
                    "Deseja cadastrar a biometria para facilitar seus próximos acessos?",
                    [
                        {
                            text: "Não",
                            onPress: async () => {
                                if (adiarAutenticacaoLocal) await adiarAutenticacaoLocal();
                                router.replace("/listaRegistro");
                            },
                            style: "cancel"
                        },
                        {
                            text: "Sim",
                            onPress: async () => {
                                if (salvarDados) await salvarDados(emailDigitado, senhaDigitada);
                                setBioAtiva(true);
                                router.replace("/listaRegistro");
                            }
                        }
                    ]
                );
            } else {
                router.replace("/listaRegistro");
            }
        } catch (error) {
            console.error("Erro no login:", error);
            Alert.alert("Login Inválido!", "E-mail ou senha incorretos ou erro de rede.");
        }
    }

    async function handleLoginBiometrico() {
        try {
            const resultado = await autenticar();
            if (resultado !== null) {
                router.replace("/listaRegistro");
            }
        } catch (error) {
            Alert.alert("Biometria", "Não foi possível autenticar por biometria.");
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % MAP_IMAGES.length);
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
        <View style={{ flex: 1, position: 'relative', backgroundColor: Colors.AzulFundo }}>
            {/* 1. Imagem de Fundo Geral (Com Opacidade Reduzida) */}
            <Animated.Image
                source={FULL_BACKGROUND}
                style={localStyles.fullBackgroundImage}
                resizeMode="cover"
            />

            {/* 2. Imagem de Fundo Estática do Rodapé */}
            <Animated.Image
                source={BASE_BACKGROUND}
                style={localStyles.backgroundImage}
                resizeMode="cover"
            />

            {/* 3. Imagem do Carrossel Alternante */}
            <Animated.Image
                source={MAP_IMAGES[currentImageIndex]}
                style={[localStyles.backgroundImage, { opacity: fadeAnim }]}
                resizeMode="cover"
            />

            <View style={localStyles.logo}>
                <Logo width={150} style={{ marginBottom: -100 }} />
                <Text style={H1}>ServSeg Facilities</Text>
            </View>

            <View style={localStyles.espacamento}>
                <Text style={[H2, localStyles.h2]}>E-Mail</Text>
                <TextInput
                    style={localStyles.input}
                    placeholder="email@email.com"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <Text style={[H2, localStyles.h2]}>Senha</Text>
                <TextInput
                    style={localStyles.input}
                    placeholder="********"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />
                <Pressable
                    style={({ pressed }) => [buttonStyles.button, pressed && buttonStyles.buttonPressed]}
                    onPress={acessar}>
                    <Text style={buttonStyles.ButtonText}>Entrar</Text>
                </Pressable>

                {BioAtiva && (
                    <Pressable onPress={handleLoginBiometrico} style={styles.bioContainer}>
                        <Biometria width={80} style={{ alignSelf: 'center' }} />
                    </Pressable>
                )}
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    fullBackgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.1,
    },
    backgroundImage: {
        width: '100%',
        height: 350,
        position: 'absolute',
        bottom: 0,
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -25,
    },
    espacamento: {
        paddingHorizontal: 30,
    },
    input: {
        padding: 15,
        fontFamily: Font.regular,
        backgroundColor: Colors.AzulFundo,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Colors.AzulTexto,
        marginTop: 5,
    },
    h2: {
        marginTop: 10,
    },
});