import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';

const ActionSheet = ({ 
  placeholder,
  value,
  onOptionPress,
  optionValue,
  optionLabel,
  options,

}) => {
  const [selected_item, set_selected_item] = useState('');
  
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);

  useEffect( () => {
    handleValue()
  }, [])

  const handlePress = () => {
    setIsActionSheetVisible(!isActionSheetVisible);
  }

  const handleCancel = () => {
    setIsActionSheetVisible(!isActionSheetVisible);
  }
  const handleOptionPress = (item) => {
    if (onOptionPress) {
      setIsActionSheetVisible(!isActionSheetVisible);
      onOptionPress(item);
      set_selected_item(item[optionLabel])
    }
  };

  const handleValue = async () => {
    // const stringVal = JSON.stringify(value);
    // if ( stringVal ) {

    //   if ( optionValue ) {
    //      filteredOption = options.filter(option => option[optionValue].toLowerCase() == stringVal.toLowerCase() );
    //   } else {
    //   filteredOption = options.filter(option => option['value'].toLowerCase() == stringVal.toLowerCase() );
    //   }

    //   if ( filteredOption.length > 0 ) {
    //     set_selected_item(filteredOption[0][optionLabel])
    //   }
    // }
        const result = await handleFilteredOption();
        set_selected_item(result)

  }

  const handleFilteredOption = () => {
    const stringVal = JSON.stringify(value);
    if ( stringVal ) {

      if ( optionValue ) {
         filteredOption = options.filter(option => option[optionValue].toLowerCase() == stringVal.toLowerCase() );
      } else {
      filteredOption = options.filter(option => option['value'].toLowerCase() == stringVal.toLowerCase() );
      }

      if ( filteredOption.length > 0 ) {
        return filteredOption[0][optionLabel];
      } else {
        return '';
      }
    }
  }

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <Text>{selected_item?selected_item:placeholder}</Text>
      </TouchableOpacity>
      <Modal transparent animationType="slide" visible={isActionSheetVisible}>
        <View style={styles.overlay}>
              <View style={styles.actionSheet}>
                <View
                  style={[styles.option
                  ]}
                >
                  <Text
                    style={{ fontWeight: 'bold', textAlign: 'center'}}
                  >{placeholder}</Text>
                </View>
                <ScrollView >
                    
                  {options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleOptionPress(option)}
                      style={[styles.option,
                        {
                          backgroundColor: (option[optionLabel] == selected_item && 'coral'),
                        }
                      ]}
                    >
                      <Text
                        style={{
                          color: (option[optionLabel] == selected_item && 'white')
                        }}
                      >{option[optionLabel]}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  actionSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingBottom: 20,
    maxHeight: '50%',
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  cancelButton: {
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cancelText: {
    color: 'red',
  },
});

export default ActionSheet;
