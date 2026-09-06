import { ReactNode } from "react";
import { BlurView } from 'expo-blur';
import { Modal, View } from "react-native";
import { styles } from "./modalBase.styles";
import { SafeAreaView } from "react-native-safe-area-context";


interface ModalBaseProps {
  visivel: boolean;
  aoFechar: () => void;
  children: ReactNode;
}
export default function ModalBase({ visivel, aoFechar, children }: ModalBaseProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visivel} onRequestClose={aoFechar}>
      <BlurView intensity={180} style={styles.overlay}>
        <SafeAreaView style={styles.cardModal}>
          <View style={styles.puxador} />
          {children}
        </SafeAreaView>
      </BlurView>
    </Modal>
  );
}   