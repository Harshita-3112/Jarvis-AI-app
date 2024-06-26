import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, SPACING} from '../../theme/theme';

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.googleLogin}>
        <Text>Login with Google</Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.space_10,
    // backgroundColor: 'red',
  },
  googleLogin: {
    height: 50,
    width: 'auto',

    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: BORDERRADIUS.radius_10,
    marginTop: '160%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
