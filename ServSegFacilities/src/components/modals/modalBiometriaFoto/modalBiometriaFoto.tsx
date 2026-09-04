import { Text, Pressable, View, Image } from "react-native";
import { styles } from "./modalBiometriaFoto.styles";
import ModalBase from "../modalBase/modalBase";
import IconeBiometriaFoto from "../../../../assets/icons/Icone Biometria Facial.svg";

interface ModalBiometriaProps {
  visivel: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export default function ModalBiometriaFoto({
  visivel,
  onConfirmar,
  onCancelar,
}: ModalBiometriaProps) {
  return (
    <ModalBase visivel={visivel} aoFechar={onCancelar}>
      <Image
        source={require("../../../../assets/imgs/Icone Biometria Facial.png")}
        style={styles.icone}
      />
      {/* // <IconeBiometriaFoto width={250} height={250} /> */}
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
            {"\u25CF"} Escola fundo claro e sem estampas;
          </Text>
          <Text style={styles.descricao}>{"\u25CF"} Evite máscaras.</Text>
        </View>
      </View>
      <View style={styles.botaoContainer}>
        <Pressable style={styles.botao} onPress={onConfirmar}>
          <Text style={styles.textoBotao}>Tirar Foto</Text>
        </Pressable>
      </View>
    </ModalBase>
  );
}
