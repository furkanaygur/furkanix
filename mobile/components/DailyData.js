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
        width={width-40} // from react-native
        height={255}
        withInnerLines={false}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#aaa',
          backgroundGradientTo: '#aaa',
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
          style: {
            borderRadius: 25,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke:'#fff',
          },
        }}
        bezier
        style={{
          borderRadius: 25,
          alignSelf:'center',
          paddingBottom:50,
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