import {View,Text,TouchableOpacity,ActivityIndicator, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "../../constants/theme";
import { styles } from "./detalhesRegistro";
import CardDetalhe from "../../components/cardDetalhes/cardDetalhes";
import { useDetalhesRegistro } from "../../hooks/useDetalhesRegistro";
import {Header} from "../../components/header/header"

export default function DetalhesRegistro() {
  const router = useRouter();
  // Recupera o parâmetro "historicoId" enviado pela tela anterior.
  // Esse id será utilizado pelo hook para localizar os registros daquele dia.
  const { historicoId } = useLocalSearchParams<{ historicoId: string }>();
  // Informações provindas do hook
  const { loading, error, detalhes, carregarDetalhesRegistro } =
    useDetalhesRegistro(historicoId);

  // ======================
  // ESTADO DE CARREGAMENTO
  // ======================
  // Enquanto os dados ainda estão sendo buscados/processados,
  // a tela exibe o cabeçalho e um indicador de carregamento.
  if (loading) {
    return (
      //Área segura para evitar sobreposição com status bar e outros elementos do sistema
      <SafeAreaView style={styles.safeArea}>
       <Header titulo="Detalhes" />
        {/* 
        Durante o carregamento, detalhes ainda pode ser null.
        Por isso usa "..." como valor temporário.
        */}
        <Text style={styles.titulo}>
          Detalhes {detalhes?.dataPontoEntrada ?? "..."}
        </Text>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.AzulBotao} />
          <Text style={styles.titulo}>Carregando informações...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==============
  // ESTADO DE ERRO
  // ==============
  // Executado quando:
  // - ocorreu algum erro na requisição/tratamento dos dados;
  // - não foi encontrado um registro para a data solicitada.
  if (error || !detalhes) {
    return (
      //Área segura para evitar sobreposição com status bar e outros elementos do sistema
      <SafeAreaView style={styles.safeArea}>
        <Header titulo="Detalhes" />

        <View style={styles.container}>
          <Text style={styles.titulo}>
            {error || "Registro não encontrado."}
          </Text>

          {/* 
          Permite executar novamente a função do hook
          para tentar buscar os dados.
          */}
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.botaoTentarNovamente}
              onPress={carregarDetalhesRegistro}
              activeOpacity={0.7}
            >
              <Text>Tente novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

// ============================
// PROCESSAMENTO DE INFORMAÇÕES
// ============================
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header titulo="Detalhes" />

      <Text style={styles.titulo}>Detalhes {detalhes.dataPontoEntrada}:</Text>

      <View style={styles.container}>
        {/* 
        O CardDetalhe recebe o objeto já tratado pelo hook.
        A responsabilidade do componente é somente apresentar
        os dados visualmente.
        */}
        <CardDetalhe detalhes={detalhes} />
      </View>
    </SafeAreaView>
  );
}
