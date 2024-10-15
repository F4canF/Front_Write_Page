import React, { useRef, useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Exit from './screens/home.js';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { PanResponder } from "react-native";

const { width, height } = Dimensions.get("window");
const Stack = createStackNavigator();

// 이미지 목록 (RandImage 폴더에서 이미지를 가져옴)
const images = [
  require('./RandImage/image1.jpg'),
  require('./RandImage/image2.png'),
  require('./RandImage/image3.png'),
  require('./RandImage/image4.jpg'),
  require('./RandImage/image5.jpg'),
  require('./RandImage/image6.png'),
  require('./RandImage/image7.png'),
  require('./RandImage/image8.png'),
  require('./RandImage/image9.png'),
  require('./RandImage/image10.jpg'),
];

// 단어 목록
const words = ["사과", "바나나", "체리", "대추", "무화과", "포도", "키위", "레몬", "망고", "오렌지"];

const App = () => {
  const [randomWord, setRandomWord] = useState(''); // 랜덤 단어 상태

  useEffect(() => {
    // 컴포넌트가 렌더링될 때 무작위 단어 선택
    const randomWordIndex = Math.floor(Math.random() * words.length);
    setRandomWord(words[randomWordIndex]);
  }, []);

  return (
    <View style={styles.container}>
      {/* 상단 중앙의 네모난 박스에 단어 표시 */}
      <View style={styles.wordBox}>
        <Text style={styles.wordText}>{randomWord}</Text>
      </View>

      {/* 메인 텍스트 박스 */}
      <View style={styles.mainTextBox}>
        <Text style={styles.mainText}>
          축하합니다.{'\n'}
          '{randomWord}'는 과일입니다.
        </Text>
      </View>

      {/* 오른쪽 패널 */}
      <View style={styles.rightPanel}>
        {/* 아이콘 버튼 영역 (펜, 지우개 등) */}
        <View style={styles.iconButton}>
          <TouchableOpacity>
            <Image
              source={require("./image/icon1.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity>
            <Image
              source={require("./image/icon2.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity>
            <Image
              source={require("./image/icon3.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity>
            <Image
              source={require("./image/icon4.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 나가기 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>나가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  wordBox: {
    position: 'absolute',
    top: 30,
    left: '30%',
    width: '40%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0c541',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  wordText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  mainTextBox: {
    position: 'absolute',
    top: 150,
    left: '10%',
    width: '80%',
    height: 200,
    backgroundColor: '#d4f5c3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 20,
  },
  mainText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  rightPanel: {
    position: "absolute",
    right: 10,
    top: height * 0.1,
    width: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0c541",
    padding: 10,
    borderRadius: 10,
    height: "70%",
  },
  iconButton: {
    width: width * 0.04,
    height: width * 0.04,
    marginVertical: 10,
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#f0c541",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 24,
  },
});

export default App;
