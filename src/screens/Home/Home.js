import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { scale } from 'react-native-size-matters';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import Feature from '../../components/Feature.js';
import { dummyMessages } from '../../constants/index.js';
import Voice from '@react-native-community/voice';
import { apiCall } from '../../api/openAI.js';
import LottieView from 'lottie-react-native';
import Tts from 'react-native-tts';

const Home = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const ScrollViewRef = useRef();

  const speechStartHandler = e => {
    console.log('speech start handler');
  };

  const speechEndHandler = e => {
    setRecording(false);
    console.log('speech end handler');
  };

  const speechResultsHandler = e => {
    console.log(' e', e);
    const text = e.value[0];
    setResult(text);
    fetchResponse(text);
  };

  const speechErrorHandler = e => {
    console.log('speech error handler', e);
  };

  const startRecording = async () => {
    setRecording(true);
    Tts.stop();
    try {
      await Voice.start('en-GB');
    } catch (error) {
      console.log('error here', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
    } catch (error) {
      console.log('error here', error);
    }
  };

  const fetchResponse = async (text) => {
    if (text?.trim().length > 0) {
      const newMessages = [...messages, { role: 'user', content: text.trim() }];
      setMessages(newMessages);
      updateScrollView();
      setLoading(true);
      try {
        const res = await apiCall(text.trim(), newMessages);
        setMessages([...newMessages, ...res.data]);
        updateScrollView();
        setLoading(false);
        startTextToSpeech(res.data[res.data.length - 1]);
      } catch (e) {
        console.log('e', e);
        setLoading(false);
      }
    }
  };

  const startTextToSpeech = message => {
    if (!message.content?.includes('https')) {
      setSpeaking(true);
      Tts.speak(message.content, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      ScrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  const handleClear = () => {
    setMessages([]);
    Tts.stop();
    setSpeaking(false);
  };

  const stopSpeaking = () => {
    Tts.stop();
    setSpeaking(false);
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    Tts.addEventListener('tts-start', (event) => console.log("start", event));
    Tts.addEventListener('tts-progress', (event) => console.log("progress", event));
    Tts.addEventListener('tts-finish', (event) => {
      console.log("finish", event);
      setSpeaking(false);
    });
    Tts.addEventListener('tts-cancel', (event) => {
      console.log("cancel", event);
      setSpeaking(false);
    });

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      Tts.removeAllListeners('tts-start');
      Tts.removeAllListeners('tts-progress');
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-cancel');
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 8, overflow: 'hidden' }}>
        <Image
          source={require('../../assets/images/photo5.jpeg')}
          style={{
            height: 150,
            width: 'auto',
            resizeMode: 'cover',
            backgroundColor: 'green',
            borderRadius: scale(12),
            marginTop: scale(40),
          }}
        />

        {/* features || messages */}
        {messages.length > 0 ? (
          <View style={styles.messageContainer}>
            <Text style={styles.assistant}>Assistant</Text>
            <View style={styles.box}>
              <ScrollView ref={ScrollViewRef} bounces={false} showsVerticalScrollIndicator={false}>
                {messages.map((item, index) => {
                  if (item.role === 'assistant') {
                    if (item.content?.includes('https')) {
                      // AI image
                      return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                          <View style={{ padding: 2, borderRadius: BORDERRADIUS.radius_15, backgroundColor: COLORS.emeraldgreen, borderTopLeftRadius: 0 }}>
                            <Image source={{ uri: item.content }} style={{ resizeMode: 'cover', height: 160, width: 160, borderRadius: BORDERRADIUS.radius_10 }} />
                          </View>
                        </View>
                      );
                    } else {
                      // text response
                      return (
                        <View
                          key={index}
                          style={{
                            width: '70%',
                            backgroundColor: COLORS.emeraldgreen,
                            borderRadius: BORDERRADIUS.radius_4 + 2,
                            borderTopLeftRadius: 0,
                            padding: SPACING.space_4 + 2,
                          }}>
                          <Text>{item.content}</Text>
                        </View>
                      );
                    }
                  } else {
                    // user input
                    return (
                      <View
                        key={index}
                        style={{
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                          marginVertical: scale(12),
                        }}>
                        <View
                          style={{
                            width: '70%',
                            backgroundColor: COLORS.white,
                            borderRadius: BORDERRADIUS.radius_4 + 2,
                            padding: SPACING.space_4 + 2,
                            borderTopRightRadius: 0
                          }}>
                          <Text>{item.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Feature />
        )}
      </View>

      {/* recording, clear and stop buttons */}
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        {loading ? (
          <LottieView source={require('../../assets/icons/Animation5.json')} autoPlay loop style={{ height: scale(90), width: scale(90) }} />
        ) : recording ? (
          <TouchableOpacity onPress={stopRecording}>
            {/* recording stop button */}
            <LottieView source={require('../../assets/icons/recording.json')} autoPlay loop style={{ height: scale(70), width: scale(70) }} />

          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording}>
            {/* recording start button */}
            <Image source={require('../../assets/icons/mic.jpg')} style={{ height: scale(60), width: scale(60), borderRadius: BORDERRADIUS.radius_25 + 5 }} />
          </TouchableOpacity>
        )}

        {messages.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={{ backgroundColor: '#a3a3a3', padding: 4, position: "absolute", borderRadius: BORDERRADIUS.radius_15, right: 10 }} >
            <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, color: COLORS.whiteRGBA75, fontSize: FONTSIZE.size_12 }} >Clear</Text>
          </TouchableOpacity>
        )}

        {speaking && (
          <TouchableOpacity onPress={stopSpeaking} style={{ backgroundColor: 'red', padding: 4, position: "absolute", borderRadius: BORDERRADIUS.radius_15, left: 10 }} >
            <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, color: COLORS.whiteRGBA75, fontSize: FONTSIZE.size_12 }} >Stop</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.space_16,
  },
  messageContainer: {
    flex: 1,
    marginTop: scale(16),
  },
  assistant: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.grey,
  },
  box: {
    height: scale(360),
    width: 'auto',
    borderRadius: BORDERRADIUS.radius_15,
    backgroundColor: COLORS.lightgrey,
    padding: SPACING.space_8,
  },
});
