import { useEffect, useState } from "react";
import { Lista } from "../@types/lista";
import { listaService } from "../services/listaService";
import { api } from "../services/api";
import { Alert } from "react-native";

export function useLista(){
    const [lista, setLista] = useState<Lista[]>([]);

    async function listarLista(){
        try{
            const dados = await listaService.listar();
            setLista(dados);
        } catch(error){
            Alert.alert("Falha de Exibição.", 
                        "Os pontos não foram carregados corretamente.")
        }
    }

    useEffect(() => {
        listarLista();
    }, [])

    return{
        lista,
        listarLista
    };
}