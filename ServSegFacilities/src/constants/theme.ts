import { ViewStyle, TextStyle } from "react-native";

//?===============
//? 1. Paleta de Cores
//?===============
export const Colors = {
	AzulTexto: "#100146",
	AzulBotao: "#113E82",
	AzulHeader: "#4C99EB",
	AzulContainer: "#8FCFF8",
	AzulFundo: "#D9F7FF",
}

//?===============
//? 2. Tipografia
//?===============
export const Font = {
	regular: "StackSansNotch_400Regular",
	bold: "StackSansNotch_700Bold",
}

//?=====================
//? 3. "Components"
//?=====================
export const Container: ViewStyle = {
	paddingHorizontal: 10,
	alignItems: "center",
	backgroundColor: Colors.AzulContainer,
};

export const Input: TextStyle = {
	padding: 10,
	fontFamily: Font.regular,
	backgroundColor: Colors.AzulFundo,
	borderWidth: 5,
	borderRadius: 15,
	borderColor: Colors.AzulTexto,
};

export const Button: ViewStyle = {
	backgroundColor: Colors.AzulBotao,
	padding: 10,
	borderRadius: 15,
	alignItems: "center",
};

export const ButtonText: TextStyle = {
	fontSize: 20,
	color: Colors.AzulFundo,
	fontFamily: Font.bold,
};

export const H1: TextStyle = {
	fontSize: 28,
	fontFamily: Font.bold,
};

export const H2: TextStyle = {
	fontSize: 24,
	fontFamily: Font.bold,
};

export const P: TextStyle = {
	fontSize: 18,
	fontFamily: Font.regular,
};