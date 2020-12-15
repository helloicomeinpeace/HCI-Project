import React, {Component} from 'react'
import { StyleSheet, Dimensions, View,TextInput, Text, TouchableOpacity, ScrollView } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group'
import auth from '@react-native-firebase/auth'
import TagInput from 'react-native-tags-input';
import database from '@react-native-firebase/database'


const mainColor = 'white';
export default class Profile extends Component {
    constructor(props){
         super(props);
         this.state={
            profileSet: false,
            displayName:'',
            dataSet: 0,
            jobTitle:'',
            gender: [
                        {
                            label: 'Male',
                            color: 'skyblue',
                        },
                        {
                            label: 'Female',
                            color: 'red',
                        },
                         {
                             label: 'Other',
                             color: 'pink',
                         }
                    ],
            age:'',
            aboutMe:'',
            writerTags: {
                    tagsArray: []
                  },
            bookTags: {
                    tagsArray: []
                  }
         }
        }
onPress = gender => this.setState({ gender });
saveData = () => {
      database()
                .ref('/favorite writers/' + auth().currentUser.uid + '/')
                .set({
                  tags: this.state.writerTags.tagsArray
                })
                .then(() => {
                database()
                  .ref('/favorite books/' + auth().currentUser.uid + '/')
                  .set({
                    tags: this.state.bookTags.tagsArray
                  })
                  .then(() => {
                  database()
                        .ref('/users/' + auth().currentUser.uid + '/')
                        .set({
                          displayName: this.state.displayName,
                          jobTitle: this.state.jobTitle,
                          age: this.state.age,
                          aboutMe: this.state.aboutMe,
                          profileSet: true
                        })
                        .then(() => {
                        this.setState({profileSet: true})
                        console.log('Data set.')
                        });
                  });
                  });

};

componentDidMount(){
database()
  .ref('/users/'+ auth().currentUser.uid + '/profileSet')
  .once('value')
  .then(snapshot => {
    this.setState({profileSet: snapshot.val(), dataSet:1})
  });

}
updateWriterTagState = (state) => {
      this.setState({
        writerTags: state
      })
    };
updateBookTags = (state) => {
      this.setState({
        bookTags: state
      })
    };
render(){
    let selectedGender = this.state.gender.find(e => e.selected == true);
    selectedGender = selectedGender ? selectedGender.value : this.state.gender[0].label;
    if (this.state.dataSet === 0)
        return null
    if (this.state.profileSet){
        return (
                <View>
                <Text>Profile Set!</Text>
                </View>
        )
    }
    else {
        return (
                <ScrollView>
                <View style={styles.container}>
                        <Text style={styles.header}>Welcome {this.state.displayName}</Text>
                        <Text style={styles.text}>You must complete your profile before you can start swiping!</Text>
                        <TextInput style={styles.inputBox}
                                            onChangeText={(displayName) => this.setState({displayName})}
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                            placeholder="display name"
                                            placeholderTextColor = "#002f6c"
                                            selectionColor="#fff"
                                            />
                        <TextInput style={styles.inputBox}
                                            onChangeText={(jobTitle) => this.setState({jobTitle})}
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                            placeholder="Job Title"
                                            placeholderTextColor = "#002f6c"
                                            selectionColor="#fff"
                                           />
                        <Text style={styles.genderHeader}>
                                            Your gender is? : {selectedGender}
                                        </Text>
                                        <View style={styles.radioView}>
                                        <RadioGroup style={{marginTop:50}} horizontal radioButtons={this.state.gender} onPress={this.onPress} />
                                        </View>
                        <TextInput style={styles.inputBox}
                                                            keyboardType="numeric"
                                                            onChangeText={(age) => this.setState({age})}
                                                            underlineColorAndroid='rgba(0,0,0,0)'
                                                            placeholder="Enter your age"
                                                            placeholderTextColor = "#002f6c"
                                                            selectionColor="#fff"
                                                           />
                        <TextInput style={styles.inputBox}
                                                                            multiline
                                                                            onChangeText={(aboutMe) => this.setState({aboutMe})}
                                                                            underlineColorAndroid='rgba(0,0,0,0)'
                                                                            placeholder="Describe yourself"
                                                                            placeholderTextColor = "#002f6c"
                                                                            selectionColor="#fff"
                                                                           />
                        <TagInput
                                  updateState={this.updateWriterTagState}
                                  tags={this.state.writerTags}
                                  placeholder="Enter writers"
                                    label='Who are your 5 favorite writers?'
                                    labelStyle={{color: 'black',marginLeft:10,fontSize:18,marginBottom:15}}
                                    //leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText}/>}
                                    //leftElementContainerStyle={{marginLeft: 3}}
                                    containerStyle={{width: (Dimensions.get('window').width - 110),backgroundColor:'skyblue', borderRadius:10,marginBottom:20}}
                                    //inputContainerStyle={[styles.textInput, {backgroundColor: this.state.tagsColor}]}
                                    //inputStyle={{color: this.state.tagsText}}
                                    onFocus={() => this.setState({tagsColor: '#fff', tagsText: 'black'})}
                                    onBlur={() => this.setState({tagsColor: mainColor, tagsText: '#fff'})}
                                    autoCorrect={false}
                                    tagStyle={styles.tag}
                                    tagTextStyle={styles.tagText}
                                    keysForTag={', '}
                                  />
                        <TagInput
                                  updateState={this.updateBookTags}
                                  tags={this.state.bookTags}
                                  placeholder="Enter books"
                                    label='What are your favorite books?'
                                    labelStyle={{color: 'black',marginLeft:10,fontSize:18,marginBottom:15}}
                                    //leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText}/>}
                                    //leftElementContainerStyle={{marginLeft: 3}}
                                    containerStyle={{width: (Dimensions.get('window').width - 110),backgroundColor:'skyblue', borderRadius:10}}
                                    //inputContainerStyle={[styles.textInput, {backgroundColor: this.state.tagsColor}]}
                                    //inputStyle={{color: this.state.tagsText}}
                                    onFocus={() => this.setState({tagsColor: '#fff', tagsText: 'black'})}
                                    onBlur={() => this.setState({tagsColor: mainColor, tagsText: '#fff'})}
                                    autoCorrect={false}
                                    tagStyle={styles.tag}
                                    tagTextStyle={styles.tagText}
                                    keysForTag={', '}
                                  />
                        <TouchableOpacity style={styles.button}>
                                                <Text style={styles.buttonText} onPress={this.saveData}>Save</Text>
                                            </TouchableOpacity>
                </View>
                </ScrollView>
              )
    }

}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80

   },
    tag: {
    backgroundColor:'skyblue'
    },
    genderHeader: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    radioView: {
            marginBottom: 20,
        },
  text: {
    color: '#101010',
    fontSize: 14,
    marginBottom: 30
  },
  inputBox: {
      width: 300,
      backgroundColor: 'white',
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#002f6c',
      marginBottom: 20
   },
  header: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
          width: 300,
          backgroundColor: '#4f83cc',
          borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 12
      },
  buttonText: {
            fontSize: 16,
            fontWeight: '500',
            color: '#ffffff',
            textAlign: 'center'
        }
})

