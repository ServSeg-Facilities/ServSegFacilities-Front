//? Lib que vai utilizar da autenticacaoLocal para fazer login
import * as LocalAuthentication from 'expo-local-authentication';

//? Lib que vai salvar os dados do usuario para login com autenticacao local
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../contexts/AuthContext';

export function useAutLocal() {
    const { login } = useAuth();

    //? Função que vai fazer a verificação e acionar a pergunta se o usuario quer ativar a biometria
    async function verificarPrimeiroLogin(email: string): Promise<boolean> {
        const emailSalvo = await SecureStore.getItemAsync('UsuarioEmail');

        //? Se não tiver nenhum email salvo
        if (!emailSalvo) return true;

        return String(emailSalvo) !== email;
    }

    async function adiarAutenticacaoLocal() {
        const dataAtual = new Date();
        const dataNovoAviso = dataAtual.setDate(dataAtual.getDate() + 3);

        await SecureStore.setItemAsync('dataAvisoAutenticacaoLocal', String(dataNovoAviso));
    }

    //? Função que salva os dados do usuario no LocalStore
    async function salvarDados(email: string, senha: string) {
        if (!email || !senha) {
            console.log("Dados inválidos!");
            return;
        }

        await SecureStore.setItemAsync('UsuarioEmail', email);
        await SecureStore.setItemAsync('UsuarioSenha', senha);
    }

    //? Função que resgata os dados de login no LocalStore
    async function pegarDados() {
        const email = await SecureStore.getItemAsync('UsuarioEmail');
        const senha = await SecureStore.getItemAsync('UsuarioSenha');

        //? Se for o usuário mock e não houver nada no SecureStore ainda, retorna o mock
        if (!email && !senha) {
            return { email: "mock@mock", senha: "mock" };
        }

        if (!email || !senha) {
            console.log("Nenhum dado completo encontrado no SecureStore.");
            return null;
        }

        return { email, senha };
    }

    async function verificarCompatibilidade(): Promise<boolean> {
        const compatibilidade = await LocalAuthentication.hasHardwareAsync();
        const possuiBiometriaCadastrada = await LocalAuthentication.isEnrolledAsync();

        if (!compatibilidade || !possuiBiometriaCadastrada) {
            console.log("Não tem compatibilidade ou biometria cadastrada!");
            return false;
        }

        return true;
    }

    //? Função que ativa a biometria na tela para autenticar o usuário
    async function autenticar() {
        const eCompativel = await verificarCompatibilidade();
        if (!eCompativel) return;

        const resposta = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Confirme sua identidade',
            disableDeviceFallback: true,
        });

        if (resposta.success) {
            console.log("Autenticação concluída com sucesso!");
            const dados = await pegarDados();

            if (!dados) {
                console.log("Falha ao obter credenciais salvas.");
                return;
            }

            console.log(`Dados resgatados:\n- E-mail: ${dados.email}\n- Senha: ${dados.senha}`);

            await login({ email: dados.email, senha: dados.senha });
        } else {
            console.log("Falha na autenticação:", resposta.error);
            return null;
        }
    }

    //? Função para verificar se a biometria já foi ativada/configurada.
    async function isBiometriaAtiva(): Promise<boolean> {
        const eCompativel = await verificarCompatibilidade();
        if (!eCompativel) return false;

        const email = await SecureStore.getItemAsync('UsuarioEmail');
        const senha = await SecureStore.getItemAsync('UsuarioSenha');
        return Boolean(email && senha);
    }

    return {
        verificarPrimeiroLogin,
        verificarCompatibilidade,
        adiarAutenticacaoLocal,
        autenticar,
        salvarDados,
        isBiometriaAtiva
    };
}