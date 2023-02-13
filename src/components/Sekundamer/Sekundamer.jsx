import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'


const Sekundamer = (props) => {
    const [sekund, setSekund] = useState(0)
    let a = 0

    useEffect(() => {
       setInterval(() => {
        setSekund(prev => prev += 1)
      }, 1000);
    }, [])

    useEffect(() => {
        a = sekund
        props.SekundAdd(a)
        // console.log("aaaaa", a);
    }, [sekund])

    // useEffect(() => {
    //     return () => {
    //         console.log("tugadi");
    //       }
    //   }, [])
    


  return (
    <View style={{display:"flex", flexDirection:"row"}}>
        <Text>{sekund / 60 < 1 ? "00" :   Math.round(sekund / 60) < 10 ? "0" + Math.round(sekund / 60) : Math.round(sekund / 60)}</Text>
          <Text>:</Text>
        <Text>{Math.round(sekund % 60) < 10 ? "0" + Math.round(sekund % 60) : Math.round(sekund % 60)}</Text>
    </View>
  )
}

export default memo(Sekundamer)

const styles = StyleSheet.create({})