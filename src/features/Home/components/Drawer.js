import {
  View,
  Text,
  StyleSheet,
  DrawerLayoutAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Drawer() {
  const drawer = useRef(null);

  const drawerLayout = (
    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
      <TouchableOpacity onPress={() => drawer.current?.closeDrawer()}>
        <Icon name={'account'} size={23} color={'black'} />
      </TouchableOpacity>
      <Text>INI Drawer</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={270}
        drawerPosition="left"
        renderNavigationView={() => drawerLayout}
        style={{flex: 1}}>
        <View
          style={{
            height: '100%',
            width: '100%',
            // backgroundColor: 'yellow',
          }}>
          <TouchableOpacity
            style={styles.ContentSetting}
            onPress={() => drawer.current?.openDrawer()}>
            <Icon name={'account'} size={23} color={'black'} />
          </TouchableOpacity>
          <Text>Drawer</Text>
        </View>
      </DrawerLayoutAndroid>
    </View>
  );
}
const styles = StyleSheet.create({});
