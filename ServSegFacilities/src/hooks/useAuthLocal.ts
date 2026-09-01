//? Lib que vai ultilizar da autenticacaoLocal para fazer login
import * as LocalAuthentication from 'expo-local-authentication';

//? Lib que vai salvar os dados do usuario para login com autenticacao local
import * as SecureStore from 'expo-secure-store'
import { api } from '../services/api';
import Login from '../app/login';
import { useAuth } from '../contexts/AuthContext';

export function useAutLocal() {
    const { login } = useAuth();

    //? Função que vai fazer a verificação e acionar a pergunta se o usuario quer ativar a biometria
    async function verificarPrimeiroLogin(email: string): Promise<boolean> {
        const emailSalvo = SecureStore.getItemAsync('UsuarioEmail');

        //? Se não tiver nenhum email salvo
        if (!emailSalvo)
            return true;

        //? 1. Converte o emailSalvo em string
        //? 2. Se o email salvo for igual o email 
        //? 3. Se o email salvo for diferente do email
        return String(emailSalvo) === email ? false : true
    }

    async function adiarAutenticacaoLocal() {
        //? Pega a data atual
        const dataAtual = new Date();

        //? Gera uma nova data para o aviso depois de 3 didas
        const dataNovoAviso = dataAtual.setDate(dataAtual.getDate() + 3)

        SecureStore.setItemAsync('dataAvisoAutenticacaoLocal', String(dataNovoAviso))
    }

    //? Função que salva os dados do usuario no LocalStore
    async function salvarDados(email: string, senha: string) {
        if (!email || !senha) {
            console.log("Dados inválido!");
            return;
        }

        await SecureStore.setItemAsync('UsuarioEmail', email);
        await SecureStore.setItemAsync('UsuarioSenha', senha);
    }

    //? Função que resgata os dados de login no LocalStore
    async function pegarDados() {
        const email = await SecureStore.getItemAsync('UsuarioEmail');
        if (!email) {
            console.log("Nenhum email encontrado");
            return;
        }

        const senha = await SecureStore.getItemAsync('UsuarioSenha');

        console.log(`O email é: \n ${email} \nA senha é: \n ${senha}`)
        return { email, senha };
    }

    async function verificarCompatibilidade() {
        //? Compatibilidade do usuario com o recurso
        const compatibiliade = await LocalAuthentication.hasHardwareAsync();
        if (!compatibiliade) {
            console.log("Não tem compatibilidade!")
            return;
        }
    }

    //? Função que ativa a biometria na tela para autenticar o usuário
    async function autenticar() {
        //? Compatibilidade do usuario com o recurso
        if (!verificarCompatibilidade) {
            console.log("Não tem compatibilidade!")
            return;
        }

        //? Resposta da verificação digital ou facial
        const resposta = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Confirme sua identidade',

            //? FallBack --- Segunda opção de verificação
            //? Pin, Senha ou demais formas que nao sejam a biometria, faceId ou a facial
            disableDeviceFallback: true,
        });

        if (resposta.success) {
            console.log("Autenticacao concluída com sucesso!")
            const dados = await pegarDados();
            console.log(`aqui na funcao certa \n- O email é: ${dados?.email} \n- A senha é ${dados?.senha}`)


            const email: string = dados?.email == null ? "" : dados.email
            const senha: string = dados?.senha == null ? "" : dados.senha

            await login({ email: email, senha: senha })
        } else {
            console.log("Falha na autenticação:", resposta.error)
            return null;
        }
    }

    return { verificarPrimeiroLogin, verificarCompatibilidade, adiarAutenticacaoLocal, autenticar, salvarDados };
}