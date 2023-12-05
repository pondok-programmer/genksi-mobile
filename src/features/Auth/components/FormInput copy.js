import {
  StyleSheet,
  TextInput,
  View,
  TouchableNativeFeedback,
  PermissionsAndroid,
  Alert,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../utils/constant';

export default function FormInput({
  iconName = 'gmail',
  password,
  autoCapitalize,
  placeholder = 'Placeholder',
  onChangeText,
  type = 'text',
  pickerItem,
}) {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <Icon name={iconName} color={'black'} size={25} />
      <TextInput
        style={{flex: 1, color: 'black', paddingHorizontal: 10}}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        secureTextEntry={secureText && password}
        autoCapitalize={autoCapitalize}
        onChangeText={onChangeText}
      />
      {password && (
        <TouchableNativeFeedback
          onPress={() => setSecureText(!secureText)}
          useForeground
          background={TouchableNativeFeedback.Ripple('#1e90ff45')}>
          <View style={styles.btnEye}>
            <Icon name={'eye-outline'} color={'black'} size={25} />
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnEye: {
    overflow: 'hidden',
    borderRadius: 50 / 2,
  },
  container: {
    borderWidth: 1,
    borderColor: 'dodgerblue',
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'white',
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    width: '80%',
  },
  containerPicker: {
    flex: 1,
    height: 50,
    overflow: 'hidden',
    paddingTop: -10,
  },
});
