import React, { Component } from 'react';
import io from 'socket.io-client';
import api  from '../services/api';

import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';
more
export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('New')}>
        <Image source={camera} />
      </TouchableOpacity>
    )
  })

  state = {
    feed: [],
  };

  async componentDidMount() {
      this.registerToSocket();

      const response = await api.get('posts');

      console.log(response.data);

      this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const socket = io('http://192.169.1.35:3333');

    // post, like - CHAMADAS/REQUISIÇÕES
    socket.on('post', newPost => {
        this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on('like', likedPost => {
        this.setState({ 
            feed: this.state.feed.map(post => 
                post._id === likedPost._id ? likedPost : post 
            )
        });
    });  
  }

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  } 


  render() {
    return (
      <View styles={styles.container}>
        <FlatList
          data={this.state.feed}
          keyExtractor={post => post._id}
          renderItem={({item}) => (
            <View style={styles.feedItem}>
                <View style={styles.feedItemHeader}>
                  <View style={styles.userInfo}>
                    <Text style={style.name}>{item.author}</Text>
                    <Text style={style.place}>{item.place}</Text>
                  </View>

                  <Image source={more} />
                </View>

                <Image style={styles.feedImage} source={{ uri: `http://192.168.1.35:3333/files/${item.image}` }} />

                <View syle={styles.feedOtemFooter}>
                  <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={() => {this.handleLike(item._id)}}>
                      <Image source={like} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                      <Image source={comment} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                      <Image source={send} />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.likes}> {item.likes} </Text>
                  <Text style={styles.description}> {item.description} </Text>
                  <Text style={styles.hashtags}> {item.hashtags} </Text>
                </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  feedItem: {
    marginTop: 20
  },

  feedItemHeader: {
    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',  
      
  },

  name: {
    fontSize: 14,
    color: '#000'
  },

  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },

  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15
  },

  feddItemFooter: {
    paddingHorizontal: 15,
  },

  actions: {
    flexDirection: 'row'    
  },

  action: {
    marginRight: 0
  },

  like: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  description: {
    lineHeight: 10,
    color: '#000'
  },

  hashtags: {
    color: '#7159c1'
  }
});