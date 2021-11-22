import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import { Provider } from './src/context/BlogContext';
import BlogPostScreen from './src/screens/BlogPostScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EdiScreen';

const navigator = createStackNavigator({
  Index: IndexScreen,
  Blog: BlogPostScreen,
  Create: CreateScreen,
  Edit: EditScreen
}, {
  initialRouteName: 'Index',
  defaultNavigationOptions: {
    title: 'Blog List'
  }
});

const App = createAppContainer(navigator);

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  )
};
