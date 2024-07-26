import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

import { ThemedText } from '@/src/components/ThemedText';

export function Temperatura() {
  const rotationAnimation = useSharedValue(0);
  

  rotationAnimation.value = withRepeat(
    withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
    4 
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>🌡️</ThemedText>
    </Animated.View>
  );
}
export function Umidade() {
  const rotationAnimation = useSharedValue(0);
  

  rotationAnimation.value = withRepeat(
    withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
    4 
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>💧</ThemedText>
    </Animated.View>
  );
}
export function Vento() {
  const rotationAnimation = useSharedValue(0);
  rotationAnimation.value = withRepeat(
    withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
    4 
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>💨</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: 20,
    position: 'relative',
  },
});
