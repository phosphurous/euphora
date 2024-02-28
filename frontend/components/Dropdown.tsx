import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = ({options, onSelect}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    // const renderLabel = () => {
    //   if (value || isFocus) {
    //     return (
    //     );
    //   }
    //   return null;
    // };
    return (
        <View style={styles.container}>
          {/* {renderLabel()} */}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={options}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
              onSelect(item.value);
            }}
          />
        </View>
      );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  dropdown: {
    height: 30,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});