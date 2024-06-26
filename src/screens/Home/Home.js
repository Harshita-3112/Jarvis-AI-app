import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { apiCall, chatGenerater, voiceGenerater } from '../../api/openAI.js';

const Home = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(true);
  const [result, setResult] = useState('');



  const speechStartHandler = e => {
    console.log('speech start handler');

  }
  const speechEndHandler = e => {
    setRecording(false)

    console.log('speech end handler');
  }
  const speechResultsHandler = e => {
    console.log(' e', e);
    const text = e.value[0];
    setResult(text);
    fetchResponse(text)
  }
  const speechErrorHandler = e => {

    console.log('speech error handler', e);
  }

  // start recording function

  const startRecording = async () => {

    setRecording(true)
    try {
      await Voice.start('en-GB'); // en-US
    } catch (error) {
      console.log('error here', error);
    }
  }


  // stop recording function

  const stopRecording = async () => {
    console.log('called');
    try {
      await Voice.stop();
      setRecording(false)
      //fetch response
      fetchResponse()
    } catch (error) {
      console.log('error here', error);
    }
  }

  const fetchResponse = (text) => {
    console.log('1', text);
    if (text?.trim().length > 0) {
      console.log('2');

      let newMessages = [...messages]
      messages.push({ role: 'user', content: text.trim() })
      setMessages([...newMessages])

      apiCall(text.trim(), messages).then(res => {
        // let latestData = [...newMessages]
        // console.log("latest Data", latestData);
        // messages.push({ role: "user", content: text.trim() })
        // setMessages([...latestData])
        console.log('got api data', res.data);

      }).catch((e) => {
        console.log('e', e);
      })


    }
  }



  const handleClear = () => {
    setMessages([])
  }
  const stopSpeaking = () => {
    setSpeaking(false)
  }

  useEffect(() => {
    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }

  }, [])







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
              <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {messages.map((item, index) => {
                  if (item.role == 'assistant') {
                    if (item.content?.includes('https')) {
                      // AI image
                      return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                          <View style={{ padding: 2, borderRadius: BORDERRADIUS.radius_15, backgroundColor: COLORS.emeraldgreen, borderTopLeftRadius: 0 }}>
                            <Image source={{ uri: item.content }} style={{ resizeMode: 'cover', height: 160, width: 160, borderRadius: BORDERRADIUS.radius_10 }} />
                          </View>

                        </View>
                      )
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
                            // marginTop: scale(12)
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


        {
          recording ? (
            <TouchableOpacity onPress={stopRecording}>

              {/* recording stop button */}

              <Image source={require('../../assets/images/image.png')} style={{ height: scale(60), width: scale(60), borderRadius: BORDERRADIUS.radius_25 + 5 }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>

              {/* recording start button */}

              <Image source={require('../../assets/icons/mic.jpg')} style={{ height: scale(60), width: scale(60), borderRadius: BORDERRADIUS.radius_25 + 5 }} />
            </TouchableOpacity>
          )
        }





        {
          messages.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={{ backgroundColor: '#a3a3a3', padding: 4, position: "absolute", borderRadius: BORDERRADIUS.radius_15, right: 10 }} >
              <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, color: COLORS.whiteRGBA75, fontSize: FONTSIZE.size_12 }} >Clear</Text>
            </TouchableOpacity>
          )
        }

        {
          speaking && (
            <TouchableOpacity onPress={stopSpeaking} style={{ backgroundColor: 'red', padding: 4, position: "absolute", borderRadius: BORDERRADIUS.radius_15, left: 10 }} >
              <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, color: COLORS.whiteRGBA75, fontSize: FONTSIZE.size_12 }} >Stop</Text>
            </TouchableOpacity>
          )
        }

      </View>



    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.space_16,
    // backgroundColor: 'blue',
  },
  messageContainer: {
    flex: 1,
    marginTop: scale(16),
  },
  assistant: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.grey,
    // color: '#36454F',
  },
  box: {
    height: scale(360),
    width: 'auto',
    borderRadius: BORDERRADIUS.radius_15,
    backgroundColor: COLORS.lightgrey,
    padding: SPACING.space_8,
  },
});
