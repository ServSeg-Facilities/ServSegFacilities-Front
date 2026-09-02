import * as ImagePicker from "expo-image-picker"
import { useState } from "react";
import { ImagemUpload } from "../@types";

export function useCam() {
    async function pedirPermissao(): Promise<boolean> {
        // Pede autorização ao usuário para acessar a câmera física do aparelho.
        // A propriedade 'granted' retorna 'true' se o usuário aceitou ou 'false' se recusou.
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        return granted;
    }

    // 1. Função para abrir a CÂMERA
    async function tirarFoto(): Promise<ImagemUpload | null> {
        const permissao = await pedirPermissao();
        if (!permissao) {
            console.log("permissão necessária! permita o acesso à câmera para prosseguir.")
            return null;
        }

        // Abre a interface nativa da câmera para o usuário tirar a foto
        const resultado = await ImagePicker.launchCameraAsync({
            allowsEditing: false,// Permite que o usuário corte ou ajuste a foto após o clique
            quality: 0.7, // Reduz a qualidade da imagem (70%) para não sobrecarregar o upload/banco
        });

        // Verifica se o usuário concluiu a foto (não cancelou) e se a imagem foi capturada com sucesso
        if (!resultado.canceled && resultado.assets[0]) {
            // Pega a foto que acabou de ser tirada
            const foto = resultado.assets[0];
            // Atualiza o estado 'imagem' com os dados necessários para o envio (FormData/API)
            const novaImagem: ImagemUpload = ({
                uri: foto.uri,
                name: foto.fileName || `foto_${Date.now()}.jpg`,
                mimeType: foto.mimeType || "image/jpeg",
            });

            return novaImagem;
        }

        return null;
    }

    return { pedirPermissao, tirarFoto };
}
