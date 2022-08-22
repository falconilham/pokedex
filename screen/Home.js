import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, ActivityIndicator, Modal, TextInput} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Filter, Preview} from '../component';
import {
  getAllPokemon,
  getAlltype,
  getAllPokemonByType,
} from '../helper/request';
import {getColorTypePokemon} from '../helper';
import {addData, changeData} from '../redux/slices/pokemon';

function Home() {
  const myPokemon = useSelector(state =>
    state.map(({id, image, name, types}) => ({id, image, name, types})),
  );
  const [searchPokemon, setSearchPokemon] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [listType, setListType] = useState([]);
  const dispatch = useDispatch();

  const getDataPokemon = async () => {
    setLoading(true);
    const data = await getAllPokemon();
    dispatch(changeData(data));
    setLoading(false);
  };

  const getMorePokemon = async () => {
    setLoading(true);
    const data = await getAllPokemon(myPokemon.length);
    dispatch(addData(data));
    setLoading(false);
  };

  const getType = async () => {
    const data = await getAlltype();
    setListType(data.results);
  };

  useEffect(() => {
    getDataPokemon();
    getType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedType !== null) {
      setLoading(true);
      getAllPokemonByType(selectedType)
        .then(data => {
          dispatch(changeData(data));
          setLoading(false);
        })
        .catch(err => console.log(err));
    } else {
      getDataPokemon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  const usedData =
    searchPokemon.length > 0
      ? myPokemon.filter(({name}) => name.includes(searchPokemon.toLowerCase()))
      : myPokemon;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          label={'Search Pokemon'}
          onChangeText={text => setSearchPokemon(text)}
          value={searchPokemon}
          type="flat"
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.wrapperFilter}
          onPress={() => setVisibleFilter(true)}>
          <Text style={styles.textFilter}>Filter</Text>
        </TouchableOpacity>
        {selectedType && (
          <View
            style={{
              backgroundColor: getColorTypePokemon(selectedType),
              ...styles.wrapperType,
            }}>
            <Text style={styles.textType}>
              {selectedType.toLocaleUpperCase()}
            </Text>
          </View>
        )}
      </View>
      <FlatList
        data={usedData}
        columnWrapperStyle={styles.wrapperContent}
        numColumns={2}
        keyExtractor={(_, key) => key}
        renderItem={({item}, key) => (
          <TouchableOpacity
            style={styles.content}
            key={key}
            onPress={() => setSelectedPokemon(item)}>
            <Card item={item} setSelectedPokemon={setSelectedPokemon} />
            <Text numberOfLines={1} variant="titleMedium" style={styles.text}>
              {item.name}
            </Text>
            <View style={styles.containerType}>
              {item.types.map(({type}, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor: getColorTypePokemon(type.name),
                    ...styles.wrapperType,
                  }}>
                  <Text style={styles.textType}>
                    {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        )}
        onEndReached={!selectedType && getMorePokemon}
        onEndReachedThreshold={0.5}
      />
      <Preview
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      <Filter
        visible={visibleFilter}
        listRadio={listType}
        setVisible={setVisibleFilter}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {loading && (
        <Modal visible={loading} style={styles.modal}>
          <ActivityIndicator color="white" size="large" animating={true} />
          <Text style={styles.modalText} variant="titleMedium">
            Loading ....
          </Text>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: 'solid 1px #e0e0e0',
    borderBottomWidth: 1,
    width: '100%',
    flexWrap: 'wrap',
    // position: 'absolute',
    backgroundColor: 'white',
    zIndex: 1,
  },
  textType: {
    color: 'white',
  },
  wrapperContent: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 10,
  },
  content: {
    width: '50%',
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
  text: {
    // textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  modal: {
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
  },
  textInput: {
    backgroundColor: '#fff',
    width: '80%',
    marginBottom: 10,
  },
  containerType: {
    flexDirection: 'row',
  },
  wrapperType: {
    padding: 5,
    marginRight: 2,
    color: 'white',
  },
  wrapperFilter: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  textFilter: {
    textAlign: 'center',
  },
  bottomCard: {
    flexDirection: 'column',
    marginTop: 10,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  bottomCardTextPreview: {
    // paddingVertical: 1,
    alignContent: 'flex-start',
    // backgroundColor: 'green',
    width: 'auto',
    marginBottom: 20,
    border: 'solid 1px #e0e0e0',
  },
  bottomCardTextDetail: {
    // paddingVertical: 1,
    alignContent: 'flex-start',
    backgroundColor: '#A040A0',
    color: 'white',
    width: 'auto',
  },
  textButton: {
    color: 'white',
  },
});

export default Home;
