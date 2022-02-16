import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

const App = () => {
  const [display, setDisplay] = useState(initialState);

  const addDigit = n => {
    
    const clearDisplay = display.displayValue === '0' || display.clearDisplay;

    if(n === '.' && !clearDisplay && display.displayValue.includes('.')) {
      return;
    }

    const currentValue = clearDisplay ? '' : display.displayValue;
    const dValue = currentValue + n;
    setDisplay({...display, displayValue: dValue, clearDisplay: false});

    if(n !== '.') {
      const newValue = parseFloat(dValue);
      const values = [...display.values];
      values[display.current] = newValue;
      setDisplay({...display, values, displayValue: dValue, clearDisplay: false});
    }
  }

  const clearMemory = () => {
    setDisplay({ ...initialState });
  }

  const setOperation = operation => {
    if(display.current === 0) {
      setDisplay({ ...display, operation, current: 1, clearDisplay: true});
    } else {
      const equals = operation === '=';
      const values = [...display.values];
      try {
        values[0] = eval(`${values[0]} ${display.operation} ${values[1]}`);
      } catch (e) {
        values[0] = display.values[0];
      }
      values[1] = 0;
      setDisplay({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Display value={display.displayValue}/>
      <View>
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={clearMemory} />
          <Button label='/' operation onClick={setOperation} />
          <Button label='7' onClick={addDigit} />
          <Button label='8' onClick={addDigit} />
          <Button label='9' onClick={addDigit} />
          <Button label='*' operation onClick={setOperation}/>
          <Button label='4' onClick={addDigit} />
          <Button label='5' onClick={addDigit} />
          <Button label='6' onClick={addDigit} />
          <Button label='-' operation onClick={setOperation}/>
          <Button label='1' onClick={addDigit} />
          <Button label='2' onClick={addDigit} />
          <Button label='3' onClick={addDigit} />
          <Button label='+' operation onClick={setOperation}/>
          <Button label='0' double onClick={addDigit} />
          <Button label='.' onClick={addDigit} />
          <Button label='=' operation onClick={setOperation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

export default App;