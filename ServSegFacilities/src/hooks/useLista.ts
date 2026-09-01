import { useEffect, useState } from "react";
import { Lista } from "../@types/lista";
import { listaService } from "../services/listaService";

export function useLista() {
  const [lista, setLista] = useState<Lista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function carregarLista() {
    try {
      setLoading(true);
      setError(null);

      const dados = await listaService.listar();

      setLista(dados);
    } catch (erro) {
      setError("Não foi possível carregar os registros.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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