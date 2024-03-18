import { TouchableHighlight, StyleSheet, Image, Text } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { View } from '@/components/Themed';
import { useState } from 'react';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { Link } from 'expo-router';

export default function RoutineScreen() {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skincare Routine</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={{ paddingHorizontal: 50 }}>
        <DateTimePicker mode='single' date={date} onChange={(params) => setDate(params?.date ?? new Date())} selectedItemColor='#3E5B20' />
      </View>
      <View style={styles.checklistContainer}>
        <TouchableHighlight style={styles.scanSkinButton}>
          <Text style={{ color: '#FFFFFF' }}>Scan Skin</Text>
        </TouchableHighlight>
        <View style={styles.checklistSection}>
          <Text style={{ fontWeight: 'bold' }}>Today</Text>
          <Link href="/(routine)/editRoutine" asChild>
            <TouchableHighlight style={{ width: 35, height: 35, backgroundColor: '#3E5B20', borderRadius: 10, alignItems: 'center', justifyContent:'center', display:'flex'}}>
              <Image source={require('../../assets/images/edit.png')}></Image>
            </TouchableHighlight>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 50,
    paddingLeft: 20
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
  },
  checklistContainer: {
    backgroundColor: '#E9F4E4',
    flex: 1,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center'
  },
  scanSkinButton: {
    backgroundColor: '#3E5B20',
    borderRadius: 20,
    width: 166,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  checklistSection: {
    justifyContent: 'space-between',
    backgroundColor: '#E9F4E4',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 50,
    paddingTop: 30
  }
});
