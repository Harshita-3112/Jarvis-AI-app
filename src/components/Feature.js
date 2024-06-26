import {Image, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const Feature = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.container2}>Feature</Text>
      <View style={styles.container3}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/images/photo5.jpeg')}
            style={{
              height: scale(20),
              width: scale(20),
              resizeMode: 'contain',
            }}
          />
          <Text style={styles.text2}>ChatGPT</Text>
        </View>

        <Text style={styles.text}>
          ChatGPT can provide you with instant and knowledgeable
          responses,assist you with creative ideas on wide range of topics.
        </Text>
      </View>

      {/* 2nd */}
      <View style={styles.container4}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/images/photo5.jpeg')}
            style={{
              height: scale(20),
              width: scale(20),
              resizeMode: 'contain',
            }}
          />
          <Text style={styles.text2}>Dall-E</Text>
        </View>

        <Text style={styles.text}>
          Dall-E can generate imaginative and diverse images from textual
          descriptions,expanding the boundaries of visual creativity.
        </Text>
      </View>

      {/* 3rd */}
      <View style={styles.container5}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/images/photo5.jpeg')}
            style={{
              height: scale(20),
              width: scale(20),
              resizeMode: 'contain',
            }}
          />
          <Text style={styles.text2}>Smart AI</Text>
        </View>

        <Text style={styles.text}>
          A powerful voice assistant with the abilities of ChatGPT and
          Dall-E,providing you the best of both worlds.
        </Text>
      </View>
    </View>
  );
};

export default Feature;

const styles = StyleSheet.create({
  container: {
    padding: scale(10),
  },
  container2: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.black,
    fontFamily: FONTFAMILY.poppins_semibold,
    // marginBottom: scale(10),
    marginTop: scale(10),
  },
  container3: {
    backgroundColor: COLORS.lightGreen,
    borderRadius: BORDERRADIUS.radius_10,
    padding: scale(10),
    // marginBottom: scale(12),
    marginTop: scale(6),
  },
  container4: {
    backgroundColor: COLORS.purple,
    borderRadius: BORDERRADIUS.radius_10,
    padding: scale(10),
    // marginBottom: scale(12),
    marginTop: scale(10),
  },
  container5: {
    backgroundColor: COLORS.cyan,
    borderRadius: BORDERRADIUS.radius_10,
    padding: scale(10),
    // marginBottom: scale(12),
    marginTop: scale(10),
  },
  text: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.blackRGB10,
  },
  text2: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.blackRGB10,
    marginLeft: scale(10),
  },
});
