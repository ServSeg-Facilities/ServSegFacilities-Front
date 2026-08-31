import * as LocalAuthentication from 'expo-local-authentication';

export function useBiomet() {
    async function ativarBiometria() {
        const compativel = await LocalAuthentication.hasHardwareAsync();
        if (!compativel) {
            console.log("Não tem compatibilidade!")
            return;
        }
        
        // const temLogin = await LocalAuthentication.isEnrolledAsync();
        // if (!temLogin) {
        //     console.log("Não tem login!")
        //     return;
        // };

        const resposta = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Confirme sua identidade',

            //? FallBack --- Segunda opção de verificação
            //? Pin, Senha ou demais formas que nao sejam a biometria, faceId ou a facial
            disableDeviceFallback: true,
        });

        if (resposta.success) {
            console.log("Autenticacao concluída com sucesso!")
        } else {
            console.log("Falha na autenticação:", resposta.error)
        }
    }

    return { ativarBiometria };
}
