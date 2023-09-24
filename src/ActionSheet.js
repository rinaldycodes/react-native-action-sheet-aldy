import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';

const ActionSheet = ({ 
  placeholder,
  value,
  onOptionPress,
  optionValue,
  optionLabel,
  options,
  textStyle,
  textLoadStyle,
}) => {
  const [selected_item, set_selected_item] = useState('');
  
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState(15);
  const [loading, set_loading] = useState(false);

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
    const result = await handleFilteredOption();
    set_selected_item(result)

  }

  const handleFilteredOption = () => {
    const stringVal = JSON.stringify(value);
    if ( stringVal ) {


      if ( optionValue ) {
         filteredOption = options.filter(option => {
          String(option[optionValue]).toLowerCase() == stringVal.toLowerCase()
         } );
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

  const handleLoadMoreOptions = () => {
    set_loading(true);
    setVisibleOptions(prevVisibleOptions => prevVisibleOptions + 5);  // Menambah 5 opsi setiap kali dipanggil
    setTimeout(() => {
      set_loading(false);
    }, 1000);
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <Text style={textStyle}>{selected_item?selected_item:placeholder}</Text>
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
                <ScrollView 
                  onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                      handleLoadMoreOptions();
                    }
                  }}
                >
                    
                  {options.slice(0, visibleOptions).map((option, index) => {
                          return (
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
                          )
                  })}
                </ScrollView>
                    {
                      loading &&
                    < Text style={[ {textAlign: 'center'}, textLoadStyle]}>Load more data...</Text>
                    }
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
        </View>
      </Modal>
    </>
  );
};

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
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
