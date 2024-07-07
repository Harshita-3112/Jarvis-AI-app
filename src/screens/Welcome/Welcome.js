import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const Welcome = () => {
  const navigation = useNavigation();

  const handleGetStartedButton = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.text1}>Jarvis</Text>
        <Text style={styles.text2}>The Future is here,powered by AI.</Text>
      </View>


      <View style={{ top: scale(50) }}>
        <LottieView source={require('../../assets/icons/Animation3.json')} autoPlay loop style={{ height: scale(290), width: (290), alignSelf: 'center', }} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGetStartedButton}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f2f2f2',
    paddingHorizontal: SPACING.space_16,
  },
  text1: {
    color: COLORS.blackRGB10,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_30,
  },
  text2: {
    fontFamily: FONTFAMILY.poppins_medium,

  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    // backgroundColor: 'red',
    marginTop: scale(40),
  },
  button: {
    height: scale(44),
    width: 'auto',
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.green,
    marginTop: scale(190),
    alignItems: 'centers',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.whiteRGBA75,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: SPACING.space_18,
    alignSelf: 'center',
  },
});
