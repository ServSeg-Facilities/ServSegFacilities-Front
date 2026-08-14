import React from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { H1, H2, Input } from "../../constants/theme";

import Logo from '../../../assets/imgs/ServSeg Escuro.svg'

export default function Login () {
    return (
        <View style={{ flex: 1, position: 'relative'}}>
            <Image source={require('../../../assets/imgs/Mapa1.png')}
            style={{ width: '100%', height: 375, position: 'absolute' }} resizeMode="contain"/>
            <View style={styles.logo}>
                <Logo width={150} />
                <Text style={H1}>ServSeg Facilities</Text>
            </View>
            <View>
                <Text style={H2}>E-Mail</Text>
                <TextInput style={Input} placeholder="email@email.com" />
                <Text style={H2}>Senha</Text>
                <TextInput style={Input} placeholder="********" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 125
    }
})