import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, TextInput, Button, View, SafeAreaView } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import moment from 'moment';

const App = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([

      { date: moment().format('LL'), amount: 2000 },
      { date: moment().subtract(1, 'days').format('LL'), amount: 2500 },
      { date: moment().subtract(1, 'days').format('LL'), amount: 3500 },
      { date: moment().subtract(1, 'days').format('LL'), amount: 3500 },
      { date: moment().subtract(1, 'days').format('LL'), amount: 3500 },
      { date: moment().subtract(7, 'days').format('LL'), amount: 3500 },
      { date: moment().subtract(6, 'days').format('LL'), amount: 3500 },
      { date: moment().subtract(5, 'days').format('LL'), amount: 3500 },
      { date: moment().subtract(4, 'days').format('LL'), amount: 3500 },
      { date: moment().subtract(3, 'days').format('LL'), amount: 4500 },
      { date: moment().subtract(2, 'days').format('LL'), amount: 5500 },
      { date: moment().subtract(2, 'days').format('LL'), amount: 5500 },
    ])
    const [transformedData, setTransformedData] = useState([]);

    useEffect(() => {
      setTransformedData(transformData(groupBy(data, 'date')));
    }, [data])

    const groupBy = (array, key) =>
       array.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});

    const [incomes, setIncomes] = useState([
      {
        description: 'My code projects for Google!',
        amount: 999.99,
        timestamp: new Date()
      }
    ]);

    const getDates = () => transformedData.map(pair => pair.date);
    const getAmounts = () => transformedData.map(pair => pair.amount);
    const transformData = (groupedData) => {
      const transformedArray = [];

      Object.entries(groupedData).forEach(entry => {
        const total = entry[1].reduce((total, pair) => total + pair.amount, 0)
        transformedArray.push({ date: moment(entry[0]).format('MM/DD'), amount: total })
      })

      const sortedArray = transformedArray.sort((a, b) => moment(a['date']).diff(moment(b['date'])))
      return sortedArray;
    }

    useEffect(() => {
     setTotal(incomes.reduce((total, incom) => total+Number(incom.amount), 0));
    }, [incomes])

    const addIncom = () => {
      setIncomes([...incomes, {
        description: description,
        amount: amount
      }]);

      setData([
        ...data,
        { 
         date: moment().format('LL'),
         amount: Number(amount)
        }
      ]);

      setDescription('');
      setAmount('');
    }

    return (
      <SafeAreaView>
        <View>
          <Text style={styles.titleText}>⚛INCOME TRACKER REACT NATIVE APP!⚛</Text>
        </View>
        <br />
        <View>
          <LineChart
            data={{
              labels: getDates(),
              datasets: [
                {
                  data: getAmounts()
                }
              ]
            }}
            width={Dimensions.get("window").width} 
            height={240}
            yAxisLabel="$"
            yAxisInterval={1} 
            chartConfig={{
              backgroundColor: "#4b93eb",
              backgroundGradientFrom: "#2a5d9c",
              backgroundGradientTo: "#406ba1",
              decimalPlaces: null, 
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "4",
                stroke: "#7624d4"
              }
            }}
            bezier
            style={{
              marginVertical: 10,
              borderRadius:20
            }}
          />
        </View>

        <Text>TOTAL INCOME➡ ${total} </Text>
        <TextInput 
          style={styles.input}
          value={description}
          placeholder='Enter description of amount here...'
          onChangeText={text => setDescription(text)} />
        <TextInput 
          style={styles.input}
          value={amount}
          placeholder='Enter your amount here...'
          keyboardType='numeric'
          onChangeText={text => setAmount(text)}/>
        <br />
        <Button disabled={!amount && !description} onPress={addIncom} title='ADD INCOME!'/>
        <br />
        {incomes.map(incom => (
          <View>
            <Text>{incom.description}</Text>
            <Text>${incom.amount}</Text>
          </View>
        ))}

      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 24,
    height: 45,
    borderColor: 'orange',
    borderWidth: 2
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: 'center',
    color: "#406ba1",
  }, 
});

export default App;