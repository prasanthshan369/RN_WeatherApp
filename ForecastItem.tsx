import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { WeatherForecast } from '.'
import dayjs from 'dayjs'
import { BlurView } from 'expo-blur'

const ForecastItem = ({forecast}:{forecast:WeatherForecast}) => {
  return (

    <BlurView intensity={50} style={styles.container}>
      <Text style={styles.temp}>{Math.round(forecast.main.humidity)}° </Text>
      <Text style={styles.days}>{dayjs(forecast.dt*1000).format("ddd ha")}</Text>
    </BlurView>
  )
}
const styles=StyleSheet.create({
    container:{
        aspectRatio:9/16,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        padding:3,
        overflow:'hidden',
        borderColor:'white',
        borderWidth:StyleSheet.hairlineWidth

    },temp:{
        fontSize:30,
        fontFamily:"Inter",
        color:'white',
        width:'100%'
    },days:{
        fontWeight:'bold',
        color:'ghostwhite',
        fontSize:16

    }
})
export default ForecastItem