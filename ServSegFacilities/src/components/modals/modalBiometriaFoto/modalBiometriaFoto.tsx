import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  Pressable,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import ModalBase from "../modalBase/modalBase";
import { styles } from "./modalBiometriaFoto.styles";

interface ModalBiometriaFotoProps {
  modalVisivel: boolean;
  confirmar: (fotoUri?: string) => void;
  cancelar: () => void;
}

export default function ModalBiometriaFoto({
  modalVisivel,
  confirmar,
  cancelar,
}: ModalBiometriaFotoProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [exibindoCamera, setExibindoCamera] = useState(false);
  const [capturando, setCapturando] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);

  // Reseta o estado do modal quando ele for fechado/reaberto
  useEffect(() => {
    if (!modalVisivel) {
      setExibindoCamera(false);
      setCapturando(false);
    }
  }, [modalVisivel]);

  const iniciarCaptura = async () => {
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) {
        Alert.alert(
          "Permissão Negada",
          "É necessário permitir o uso da câmera para registrar a biometria."
        );
        return;
      }
    }
    setExibindoCamera(true);
  };

  const tirarFoto = async () => {
    if (cameraRef.current && !capturando) {
      try {
        setCapturando(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: false,
        });

        if (photo?.uri) {
          confirmar(photo.uri);
        } else {
          Alert.alert("Erro", "Não foi possível capturar a imagem. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao capturar foto:", error);
        Alert.alert("Erro de Câmera", "Ocorreu um erro ao disparar a foto.");
      } finally {
        setCapturando(false);
      }
    }
  };

  return (
    <ModalBase visivel={modalVisivel} aoFechar={cancelar}>
      {exibindoCamera ? (
        // PASSO 2: Câmera Ativa para Enquadramento e Foto
        <View style={styles.containerCamera}>
          <Text style={styles.tituloCamera}>Posicione seu rosto no centro</Text>
          
          <View style={styles.frameCamera}>
            <CameraView
              ref={cameraRef}
              facing="front"
              style={styles.cameraView}
            />
          </View>

          <View style={styles.botaoContainer}>
            <Pressable
              style={styles.botao}
              onPress={tirarFoto}
              disabled={capturando}
            >
              {capturando ? (
                <ActivityIndicator color={styles.textoBotao.color || "#FFF"} />
              ) : (
                <Text style={styles.textoBotao}>Capturar Foto</Text>
              )}
            </Pressable>
          </View>
        </View>
      ) : (
        // PASSO 1: Tela de Instruções e Confirmação
        <>
          <Image
            source={require("../../../../assets/imgs/Icone Biometria Facial.png")}
            style={styles.icone}
          />

          <View style={styles.texto}>
            <Text style={styles.titulo}>
              Precisamos Tirar Uma Foto Sua Para Validar o Registro
            </Text>
            <View style={styles.descricaoContainer}>
              <Text style={styles.descricao}>
                {"\u25CF"} Escolha um local bem iluminado;
              </Text>
              <Text style={styles.descricao}>
                {"\u25CF"} Evite cabelo no rosto, óculos ou boné;
              </Text>
              <Text style={styles.descricao}>
                {"\u25CF"} Escolha um fundo claro;
              </Text>
              <Text style={styles.descricao}>
                {"\u25CF"} Evite máscaras.
              </Text>
            </View>
          </View>

          <View style={styles.botaoContainer}>
            <Pressable style={styles.botao} onPress={iniciarCaptura}>
              <Text style={styles.textoBotao}>Abrir Câmera</Text>
            </Pressable>
          </View>
        </>
      )}
    </ModalBase>
  );
}