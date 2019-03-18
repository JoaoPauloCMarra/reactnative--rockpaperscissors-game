import React from 'react';
import { View, TextInput } from 'react-native';

type Props = {
  value: String,
  onChange: SyntheticKeyboardEventElement,
  disabled?: Boolean,
  style?: Object,
};
const Input = ({ value, onChangeText, disabled, style = {} }): Props => {
  const containerStyle = [styles.container, style.container];
  const inputStyle = [styles.input, style.input];

  if (disabled) inputStyle.push({ opacity: 0.5 });

  return (
    <View style={containerStyle}>
      <TextInput
        editable={!disabled}
        selectTextOnFocus={!disabled}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0,
    marginVertical: 5,
    width: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
};

export default Input;
