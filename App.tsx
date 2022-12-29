import React, {type PropsWithChildren} from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Provider } from 'react-redux';
import { store } from './src/app/store'
import Counter from './src/components/Counter';
import ButtonRedux from './src/components/ButtonRedux';
import PokemonList from './src/components/PokemonList';

const App = () => {


  return (
    <Provider store={store}>
      <View>
        <PokemonList/>
      </View>
    </Provider>
  );
};


export default App;



// TUTORIAL: https://www.youtube.com/watch?v=r-r56cojVLA&t=47s 