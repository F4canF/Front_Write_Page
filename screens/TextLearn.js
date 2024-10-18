import React, { useRef, useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Exit from './screens/Home.js';
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
  require('./WritingImg/Apple/apple10.jpg'),
  require('./WritingImg/Cat/cat11.jpg'),
  require('./WritingImg/Hanbok/hanbok15.jpg'),
  require('./WritingImg/Dog/dog12.jpg'),
  require('./WritingImg/Light/light9.jpg'),
  require('./WritingImg/Mir/mir11.jpg'),
  require('./WritingImg/Gaon/gaon9.jpg'),
  require('./WritingImg/Gyeolsim/gyeolsim17.jpg'),
  require('./WritingImg/Glasses/glasses11.jpg'),
  require('./WritingImg/Balloon/balloon13.jpg'),
];

// 단어 목록
const words = ["사과", "고양이", "한복", "강아지", "빛", "미르", "가온", "결심", "안경", "풍선"];

const App = () => {
  const [paths, setPaths] = useState([]); // 그린 경로들
  const [redoPaths, setRedoPaths] = useState([]); // undo 후 redo 가능한 경로들
  const [currentPath, setCurrentPath] = useState(''); // 현재 그리는 경로
  const [strokeColor, setStrokeColor] = useState('black'); // 선 색상
  const [strokeWidth, setStrokeWidth] = useState(4); // 선 굵기
  const [randomImage, setRandomImage] = useState(null); // 랜덤 이미지 상태
  const [randomWord, setRandomWord] = useState(''); // 랜덤 단어 상태

  useEffect(() => {
    // 무작위 이미지 선택
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);

    // 무작위 단어 선택
    const randomWordIndex = Math.floor(Math.random() * words.length);
    setRandomWord(words[randomWordIndex]);
  }, []);

  // PanResponder 설정
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { moveX, moveY } = gestureState;
        const newPath = `${currentPath} L ${moveX} ${moveY}`;
        setCurrentPath(newPath);
      },
      onPanResponderRelease: () => {
        // 현재 경로를 paths에 추가
        setPaths([...paths, { path: currentPath, strokeColor, strokeWidth }]);
        setCurrentPath(''); // 경로 초기화
        setRedoPaths([]); // redo 경로 초기화
      },
    })
  ).current;

  // 각 버튼의 기능
  const activatePen = () => {
    setStrokeColor('black');
    setStrokeWidth(4); // 볼펜
  };

  const activateFountainPen = () => {
    setStrokeColor('black');
    setStrokeWidth(2); // 만년필
  };

  const activatePencil = () => {
    setStrokeColor('black');
    setStrokeWidth(6); // 연필
  };

  const activateHighlighter = () => {
    setStrokeColor('yellow');
    setStrokeWidth(8); // 형광펜
  };

  const undo = () => {
    if (paths.length > 0) {
      const newPaths = [...paths];
      const lastPath = newPaths.pop(); // 마지막 경로 제거
      setRedoPaths([lastPath, ...redoPaths]); // redo 목록에 추가
      setPaths(newPaths); // 경로 업데이트
    }
  };

  const redo = () => {
    if (redoPaths.length > 0) {
      const newRedoPaths = [...redoPaths];
      const pathToRestore = newRedoPaths.shift(); // 첫 번째 redo 경로 가져오기
      setPaths([...paths, pathToRestore]); // 경로 업데이트
      setRedoPaths(newRedoPaths); // redo 목록 업데이트
    }
  };

  const goToOtherPage = () => {
    // 페이지 이동 기능. 여기서 원하는 페이지로 이동 설정
  };

  const goHome = () => {
    // 홈으로 나가는 기능
  };

  return (
    <View style={styles.container}>
      {/* 상단 중앙의 네모난 박스에 단어 표시 */}
      <View style={styles.wordBox}>
        <Text style={styles.wordText}>{randomWord}</Text>
      </View>

      {/* 무작위 이미지 영역 */}
      {randomImage && (
        <Image source={randomImage} style={styles.randomImage} />
      )}

      {/* 그림판 영역 */}
      <View {...panResponder.panHandlers} style={styles.canvas}>
        <Svg style={StyleSheet.absoluteFill}>
          {paths.map((p, index) => (
            <Path
              key={index}
              d={p.path}
              stroke={p.strokeColor}
              strokeWidth={p.strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          <Path
            d={currentPath}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      {/* 오른쪽 패널 */}
      <View style={styles.rightPanel}>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={activatePen}>
            <Image
              source={require("./image/icon1.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={activateFountainPen}>
            <Image
              source={require("./image/icon2.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={activatePencil}>
            <Image
              source={require("./image/icon3.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={activateHighlighter}>
            <Image
              source={require("./image/icon4.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={goToOtherPage}>
            <Image
              source={require("./image/icon6.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.undoRedoContainer}>
          <TouchableOpacity onPress={undo} >
            <Image
              source={require("./image/undo.png")}
              style={styles.undoRedoImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={redo}>
            <Image
              source={require("./image/redo.png")}
              style={styles.undoRedoImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 나가기 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Exit')}>
          <Text style={styles.buttonText}>나가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  wordBox: {
    position: 'absolute',
    top: 10,
    left: '30%',
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  wordText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
  },
  randomImage: {
    position: "absolute",
    top: height * 0.25,
    width: width * 0.6,
    height: height * 0.4,
    resizeMode: "contain",
  },
  canvas: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
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
    height: "80%",
  },
  iconButton: {
    width: width * 0.04,
    height: width * 0.04,
    marginVertical: height * 0.005,
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  undoRedoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.14,
    marginBottom: height * 0.005,
  },
  undoRedoImage: {
    width: width * 0.04,
    height: width * 0.04,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
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
    fontSize: 30,
  },
});

export default App;
