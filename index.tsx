import { View, Text, ActivityIndicator,StyleSheet, FlatList, ImageBackground } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { Stack } from 'expo-router'
const BASE_URL="https://api.openweathermap.org/data/2.5/weather?"
const OPEN_WEATHER_KEY='bdfa86343d892cbccc30a74b9430563b'
import * as Location from 'expo-location';
import ForecastItem from './ForecastItem'
import LottieView from 'lottie-react-native'
type Weather={
    name:string,
    main:MainWeather
}
type MainWeather={
        temp:number,
        feels_like:number,
        temp_min:number,
        temp_max:number,
        pressure:number,
        humidity:number,
        sea_level:number,
        grnd_level:number,

}
export type WeatherForecast={
    main:MainWeather,
    dt:number
}
const bgimage="https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722376/after_noon.png"
const WeatherScreen = () => {
    const [weather, setWeather] = useState<Weather>()
    const [forecast, setForecast] = useState<WeatherForecast[]>()

    const [errorMsg, setErrorMsg] = useState('')
    const [location, setlocation] = useState<Location.LocationObject>()

    useEffect(()=>{
        (async () => {
      
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            console.log('location',location);
            setlocation(location);
          })();
    },[])
    useEffect(()=>{
        fetchWeather()
        fetchForecast()
    },[location])
    const fetchWeather=async()=>{
        if(!location){
            return;
        }
        const lat=await location?.coords.latitude
        const long=await location?.coords.longitude
        const results= await fetch(
        `${BASE_URL}lat=${lat}&lon=${long}&appid=${OPEN_WEATHER_KEY}&units=metric`)
        const data=await results.json()
        console.log(JSON.stringify(data,null,2));
        setWeather(data)
        
    }
    const fetchForecast=async()=>{
        if(!location){
            return;
        }
        const lat=await location?.coords.latitude
        const long=await location?.coords.longitude
        const results= await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${OPEN_WEATHER_KEY}`)
        const data=await results.json()
        console.log(JSON.stringify(data,null,2));
        setForecast(data.list)
        
    }
    if(!weather){
        return <ActivityIndicator size='large'/>
    }
  return (
    <ImageBackground source={{uri:bgimage}} style={styles.container}>
      <View style={{...StyleSheet.absoluteFillObject ,backgroundColor:'rgba(0,0,0,0.5)'}}/>
    <Stack.Screen options={{title:"Weather",headerShown:false}}  />
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    <LottieView
      source={require('../../../../assets/cloud.json')}
      style={{width:200,aspectRatio:1}}
      loop={true}
      autoPlay={true}
      />
   
      <Text style={styles.location}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
      </View>
      <LottieView
      source={require('../../../../assets/sun.json')}
      style={{width:200,aspectRatio:1}}
      loop={true}
      autoPlay={true}
      />
      <FlatList 
      horizontal
      data={forecast}
      showsHorizontalScrollIndicator={false}
      style={{height:150,flexGrow:0,margin:10,marginBottom:50}}
      contentContainerStyle={{gap:10}}
      renderItem={({item})=><ForecastItem forecast={item}/>}
      />

    </ImageBackground>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'

    },
    location:{
        fontFamily:'Inter',
        fontSize:30,
        color:'lightgray'


    },
    temp:{
        fontFamily:"InterBlack",
        fontSize:70,
        color:'#FFFF',
        fontWeight:'bold'


    }

})
export default WeatherScreen