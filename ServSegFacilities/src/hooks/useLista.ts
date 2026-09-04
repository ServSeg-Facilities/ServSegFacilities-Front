import { useEffect, useState } from "react";
<<<<<<< HEAD
import { Lista } from "../@types/lista";
import { listaService } from "../services/listaService";

export function useLista() {
  const [lista, setLista] = useState<Lista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function carregarLista() {
=======
import { Lista} from "../@types/detalhesRegistro";
import { ListaService } from "../services/listaService";

export function useListaRegistroPonto() {
  const [registros, setRegistros] = useState<Lista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function carregarRegistros() {
>>>>>>> origin/merging
    try {
      setLoading(true);
      setError(null);

<<<<<<< HEAD
      const dados = await listaService.listar();

      setLista(dados);
    } catch (erro) {
      setError("Não foi possível carregar os registros.");
=======
      const historico = await ListaService.buscarHistorico();

      setRegistros(historico);
    } catch (error: any) {
      const mensagem =
        error.response?.data?.message ??
        error.response?.data ??
        "Não foi possível carregar os registros de ponto.";

      setError(
        typeof mensagem === "string"
          ? mensagem
          : JSON.stringify(mensagem)
      );
>>>>>>> origin/merging
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
<<<<<<< HEAD
    carregarLista();
  }, []);

  return {
    lista,
    loading,
    error,
    carregarLista,
  };
}

// import { useEffect, useState } from "react";
// import { Lista } from "../@types/lista";
// import { listaService } from "../services/listaService";
// import { api } from "../services/api";
// import { Alert } from "react-native";

// export function useLista(){
//     const [lista, setLista] = useState<Lista[]>([]);

//     async function listarLista(){
//         try{
//             const dados = await listaService.listar();
//             setLista(dados);
//         } catch(error){
//             Alert.alert("Falha de Exibição.", 
//                         "Os pontos não foram carregados corretamente.")
//         }
//     }

//     useEffect(() => {
//         listarLista();
//     }, [])

//     return{
//         lista,
//         listarLista
//     };
// }
=======
    carregarRegistros();
  }, []);

  return {
    registros,
    loading,
    error,
    carregarRegistros,
  };
}
>>>>>>> origin/merging
