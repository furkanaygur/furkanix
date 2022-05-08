import React from 'react';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
const { width } = Dimensions.get("window");

const DailyData = ({dayData,tempData}) => {
  return (
    <View style={styles.main}>
      <LineChart
        data={{
          labels: dayData,
          datasets: [
            {
              data: tempData,
            },
          ],
        }}
        width={width-40}
        height={255}
        yAxisSuffix=" °C"
        withInnerLines={false}
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 15,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke:'#fff',
          },
        }}
        bezier
        style={{
          borderRadius: 15,
          alignSelf:'center',
          paddingVertical:20,
          paddingHorizontal:20,
          backgroundColor: 'rgba(0, 42, 231, .8)',
          height:'100%',
          width:'100%',
        }}
      />
    </View>
  );
};


export default DailyData;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginHorizontal:'auto',
    marginTop:20
  },

});