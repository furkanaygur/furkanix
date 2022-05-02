import * as React from 'react';
import Svg, {Path, Rect, Ellipse} from 'react-native-svg';

function Empty(props) {
  return (
    <Svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="map-marker-alt"
      className=""
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={175}
      height={175}
      fill="none"
      {...props}>
      <Rect width={48} height={48} rx={24} fill="#fff" fillOpacity={0.01} />
      <Ellipse cx={24} cy={11} rx={20} ry={6} fillOpacity={0.01} stroke='black' strokeWidth={4} strokeLinecap='round' strokeLinejoin='round' />
      <Path d="M10.7709 15.5C6.61878 16.5994 4 18.208 4 20C4 23.3137 12.9543 26 24 26C35.0457 26 44 23.3137 44 20C44 18.208 41.3812 16.5994 37.2291 15.5"
       strokeWidth={4}
       stroke='black'
       strokeLinecap="round"
       strokeLinejoin='round'
       />

      <Path d="M10.7709 24.5C6.61878 25.5994 4 27.208 4 29C4 32.3137 12.9543 35 24 35C35.0457 35 44 32.3137 44 29C44 27.208 41.3812 25.5994 37.2291 24.5"
       strokeWidth={4}
       strokeLinecap="round"
       strokeLinejoin='round'
       stroke='black'
       />

      <Path d="M10.7709 33.5C6.61878 34.5994 4 36.208 4 38C4 41.3137 12.9543 44 24 44C35.0457 44 44 41.3137 44 38C44 36.208 41.3812 34.5994 37.2291 33.5"
       strokeWidth={4}
       strokeLinecap="round"
       strokeLinejoin='round'
       stroke='black'
       />

    </Svg>
  );
}

export default Empty;
