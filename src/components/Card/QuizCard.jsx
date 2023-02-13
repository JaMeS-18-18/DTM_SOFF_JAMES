import React, {memo, useState} from 'react';
import {SafeAreaView, View, StyleSheet, Text , Dimensions} from 'react-native';
import {RadioButton} from 'react-native-paper';
import offlineQuiz from '../../Utils/offlineQuiz';
import Image from 'react-native-image-auto-height';


const QuizCard = props => {
  const [checked, setChecked] = useState(props.CorrAnswer);
  const [img, setImg] = useState(props.img);
  const [CorrAnswer, setCorrAnswer] = useState([]);
  const [InCorrAnswer, setInCorrAnswer] = useState([]);
  // const [hatojavob, setHatojavob] = useState("styles.MyCard")
  let mass = []
  
  async function AddCard(index,item) {
    let object = {
      id: props.id,
      answer: item.category
    }

    props.tekshir({ ...object })

    object = {}
    setChecked(item.category)
  }

  
  const option = [
    {
      category: 'A',
    },
    {
      category: 'B',
    },
    {
      category: 'C',
    },
    {
      category: 'D',
    },
  ];
  return (
    <View style={props.javobstatus == true ? styles.MyCard : styles.MyErorCard}>
        <Image resizeMode='contain' style={styles.img} source={{ uri: props.img }}/>
      <View style={styles.RadioButtons}>
        {option.map((item, index) => {
          return (
            <View key={index} style={styles.Radio}>
              <Text style={styles.RadioText}>{item.category}</Text>
              <RadioButton
                value={item.category}
                status={checked == item.category ? 'checked' : 'unchecked'}
                onPress={() => AddCard(index, item)}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MyCard: {
    width: '95%',
    flexDirection: 'column',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 6,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomColor: '#11111115',
    borderLeftColor: '#11111110',
    borderRightColor: '#11111110',
    borderTopWidth: 2,
    borderTopColor: '#11111110',
    backgroundColor:"#fff",
  },
  MyErorCard: {
    width: '95%',
    flexDirection: 'column',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // borderBottomWidth: 6,
    // borderLeftWidth: 2,
    // borderRightWidth: 4,
    // borderBottomColor: '#FF101880',
    // borderLeftColor: '#FF101880',
    // borderRightColor: '#FF101880',
    // borderTopWidth: 2,
    // borderTopColor: '#FF101880',
    borderWidth:6,
    borderColor:"#ff000080",
    borderRadius:16,
    backgroundColor: "#fff",

  },
  img: {
    width:Dimensions.get("window").width*0.90,
    height:"auto",
    resizeMode:"contain",
  },
  RadioButtons: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  RadioText: {
    color: 'black',
    fontSize: 25,
  },
  Radio: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default (QuizCard);