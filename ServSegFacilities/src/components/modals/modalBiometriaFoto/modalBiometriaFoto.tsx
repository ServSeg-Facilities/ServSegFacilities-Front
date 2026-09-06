import { Text, Pressable, View, Image } from "react-native";
import { styles } from "./modalBiometriaFoto.styles";
import ModalBase from "../modalBase/modalBase";
import IconeBiometriaFoto from "../../../../assets/icons/Icone Biometria Facial.svg";

interface ModalBiometriaFotoProps {
  modalVisivel: boolean;
  confirmar: () => void;
  cancelar: () => void;
}

export default function ModalBiometriaFoto({
  modalVisivel,
  confirmar,
  cancelar,
}: ModalBiometriaFotoProps) {
  return (
    <ModalBase visivel={modalVisivel} aoFechar={cancelar}>
      <Image
        source={require("../../../../assets/imgs/Icone Biometria Facial.png")}
        style={styles.icone}
      />
      <View style={styles.texto}>
        <Text style={styles.titulo}>
          Precisamos Tirar Uma Foto Sua Para Validar o Registro
        </Text>
        <View style={styles.descricao}>
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
            {"\u25CF"} Evite máscaras.</Text>
        </View>
      </View>
      <View style={styles.botaoContainer}>
        <Pressable style={styles.botao} onPress={confirmar}> 
          <Text style={styles.textoBotao}>Tirar Foto</Text>
        </Pressable>
      </View>
    </ModalBase>
  );
}
