import React from 'react';
import {ScrollView} from 'react-native';
import {RadioButton, Modal, Portal} from 'react-native-paper';

function FilterComponent(props) {
  const {visible, selectedType, setSelectedType, listRadio, setVisible} = props;
  // console.log({listRadio});
  return (
    <Portal>
      <Modal
        containerStyle={styles.containerStyle}
        dismissable={true}
        visible={visible}
        onDismiss={() => setVisible(false)}>
        <ScrollView style={styles.wrapperContent}>
          {listRadio.map(({name}, key) => (
            <RadioButton.Item
              status={selectedType === name ? 'checked' : 'unchecked'}
              label={name.charAt(0).toUpperCase() + name.slice(1)}
              value={name}
              style={styles.radioButton}
              key={key}
              onPress={() => {
                if (selectedType === name) {
                  setSelectedType(null);
                } else {
                  setSelectedType(name);
                }
                setVisible(false);
              }}
            />
          ))}
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = {
  containerStyle: {
    width: '100%',
    height: '80%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperContent: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  radioButton: {
    textTransform: 'uppercase',
  },
};

export default FilterComponent;
