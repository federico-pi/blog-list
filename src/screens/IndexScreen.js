import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.id}
                renderItem={({ item }) => {
                    return (
                    <TouchableOpacity onPress={() => navigation.navigate('Blog', {id: item.id})}>
                        <View style={styles.row}>
                                <Text style={styles.title}>{item.title}</Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <Feather name="trash" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name="plus" size={30} />
          </TouchableOpacity>
        )
      };
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        paddingHorizontal: 7,
        flex: 1
    },
    row: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 12
    },
    icon: {
        fontSize: 24
    }
});

export default IndexScreen;

