import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';

import { Provider } from 'react-redux';
import { store } from './src/app/store'
import Counter from './src/components/Counter';
import ButtonRedux from './src/components/ButtonRedux';
 
const App = () => {


  return (
    <Provider store={store}>
      <SafeAreaView>
        <Counter/>
        <ButtonRedux/>
      </SafeAreaView>
    </Provider>
  );
};


export default App;



// TUTORIAL: https://www.youtube.com/watch?v=r-r56cojVLA&t=47s 