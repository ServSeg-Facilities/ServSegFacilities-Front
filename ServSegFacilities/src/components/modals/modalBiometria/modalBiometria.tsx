import { Text, Pressable, View, ScrollView } from "react-native";
import { styles } from "./modalBiometria.styles";
import ModalBase from "../modalBase/modalBase";
import IconeBiometria from "../../../../assets/icons/Icone Biometria.svg";

interface ModalBiometriaProps {
  modalVisivel: boolean;
  aceitarPermissão: () =>  void | Promise<void>;
  negarPermissão: () =>  void | Promise<void>;
}

export default function ModalBiometria({
  modalVisivel,
  aceitarPermissão,
  negarPermissão,
}: ModalBiometriaProps) {
  return (
    <ModalBase visivel={modalVisivel} aoFechar={negarPermissão}>
      <IconeBiometria width={225} height={225}/>
      <View style={styles.texto}>
        <Text style={styles.titulo}>
          Habilitar Biometria e Biometria Facial?
        </Text>
        <Text style={styles.descricao}>
          Sua foto e biometria serão usadas para identificação e autenticação
          nos sistemas do ServSeg.
        </Text>
      </View>
      <View style={styles.botoesContainer}>
        <Pressable style={styles.botao} onPress={negarPermissão}>
          <Text style={styles.textoBotao}>Agora Não</Text>
        </Pressable>
        <Pressable style={styles.botao} onPress={aceitarPermissão}>
          <Text style={styles.textoBotao}>Habilitar</Text>
        </Pressable>
      </View>
    </ModalBase>
  );
}
