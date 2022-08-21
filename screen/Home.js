import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, ActivityIndicator, Modal, TextInput} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Filter} from '../component';
import {
  getAllPokemon,
  getAlltype,
  getAllPokemonByType,
} from '../helper/request';
import {getColorTypePokemon} from '../helper/typePokemon';
import {addData, changeData} from '../redux/slices/pokemon';

function Home() {
  const myPokemon = useSelector(state =>
    state.map(({id, image, name, types}) => ({id, image, name, types})),
  );
  const [searchPokemon, setSearchPokemon] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [listType, setListType] = useState([]);
  const openPreview = myPokemon.find(({id}) => id === preview);
  const dispatch = useDispatch();
  const getDataPokemon = async () => {
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
    if (selectedType) {
      getAllPokemonByType(selectedType).then(data =>
        dispatch(changeData(data)),
      );
    }
  }),
    [selectedType, getAllPokemonByType];

  const usedData =
    searchPokemon.length > 0
      ? myPokemon.filter(({name}) => name.includes(searchPokemon.toLowerCase()))
      : myPokemon;
  return (
    <View>
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
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.content}>
            <Card image={item.image} id={item.id} setPreview={setPreview} />
            <Text variant="titleMedium" style={styles.text}>
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
          </View>
        )}
        onEndReached={getDataPokemon}
        onEndReachedThreshold={0.5}
      />
      <Modal visible={Boolean(openPreview)} onDismiss={() => setPreview(null)}>
        <View style={styles.wrapperImageModal}>
          <View style={styles.closeButton}>
            <Text onPress={() => setPreview(null)}>X</Text>
          </View>
          <Image source={{uri: openPreview?.image}} style={styles.image} />
        </View>
      </Modal>
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
  header: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: 'solid 1px #e0e0e0',
    borderBottomWidth: 1,
    width: '100%',
    flexWrap: 'wrap',
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
  wrapperImageModal: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '80%',
    width: '80%',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
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
});

export default Home;
