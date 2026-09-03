import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../constants/theme';

interface AnimatedSplashScreenProps {
  onAnimationEnd: () => void;
}

export default function AnimatedSplashScreen({ onAnimationEnd }: AnimatedSplashScreenProps) {
  const scale = useRef(new Animated.Value(0.3)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animação da Logo (Entrada)
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Fade-out da tela inteira
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 400,
        delay: 300,
        useNativeDriver: true,
      }).start(() => {
        onAnimationEnd();
      });
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
      <Animated.Image
        source={require('../assets/images/react-logo.png')} // Ajuste para o caminho da sua logo
        style={[
          styles.logo,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.AzulFundo, // Usando a mesma cor de fundo do seu tema
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // Garante que fica por cima de tudo
  },
  logo: {
    width: 140,
    height: 140,
  },
});