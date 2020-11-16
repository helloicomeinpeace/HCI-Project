import React from 'react';
import styles from '../styles';

import {
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList
} from 'react-native';
import Message from './Message.js';
import Demo from './demo.js';

const Messages = () => {
  return (
    <ImageBackground
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
          <View style={styles.top}>
            <Text style={styles.title}>Messages</Text>
          </View>

          <FlatList
            data={Demo}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Message
                  image={item.image}
                  name={item.name}
                  lastMessage={item.message}
                />
              </TouchableOpacity>
            )}
          />
      </View>
    </ImageBackground>
  );
};

export default Messages;