import * as React from 'react';
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

function DeleteButton(probs) {

  const isAll = () => {  };

  return (
    <TouchableOpacity {...probs} onPress={probs.onPress}>
        <Svg 
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 30 30"
            fill={probs.isAll ? '#f70d1a' : '#000'}
            fillOpacity="0.7"
            stroke="transparent"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            >
        <Path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />

        </Svg>
    </TouchableOpacity>
  );
}

export default DeleteButton;