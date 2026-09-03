import { Text, Pressable, View, StyleSheet } from "react-native";
import { styles } from "./modalBiometria.styles";
import ModalBase from "../modalBase/modalBase";
import IconeBiometria from "../../../../assets/icons/Icone Biometria.svg";

// import Logo from '../../../assets/imgs/ServSeg Escuro.svg';

// <View style={styles.logo}>
//                 <Logo width={150} />
//                 <Text style={H1}>ServSeg Facilities</Text>
//             </View>

interface ModalBiometriaProps {
  visivel: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export default function ModalBiometria({
  visivel,
  onConfirmar,
  onCancelar,
}: ModalBiometriaProps) {
  return (
    <ModalBase visivel={visivel} aoFechar={onCancelar}>
      <IconeBiometria width={250} height={250} />
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
        <Pressable style={styles.botao} onPress={onCancelar}>
          <Text style={styles.textoBotao}>Agora Não</Text>
        </Pressable>
        <Pressable style={styles.botao} onPress={onConfirmar}>
          <Text style={styles.textoBotao}>Habilitar</Text>
        </Pressable>
      </View>
    </ModalBase>
  );
}
