import React from 'react';
import { StyleSheet, View, Image,TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, CardItem, Body, Card, Text, Right  } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
var baby = require('../images/baby.jpg');
var baby2 = require('../images/baby2.jpg');
var baby3 = require('../images/baby3.jpg');

export default class ChatList extends React.Component {
    render() {
        return (
            <Container>
               <Content>
               <Card  >
                      
                      <CardItem >
                          <Body  >
                          <View style={{flexDirection:'row', flexWrap:'wrap',}}  >
                          <Image source={baby} style={styles.imageStyle}   /> 
                         
                          <TouchableOpacity onPress={() => Actions.Chat()} style={{marginLeft:5}} >
                          <Text  style={{fontWeight:'bold',fontFamily:'Arial', marginBottom:'3%',marginLeft:'2%',marginTop:'5%'}} >Muhammad Yousuf</Text>
                          
                              
                              <View style={{flexDirection:'row', flexWrap:'wrap', }}>
                              <Text style={{paddingRight:'3%', fontFamily:'Arial', fontSize:13,marginLeft:2 }} >30 minutes ago</Text>
                            
                              </View>
                              </TouchableOpacity>
                              <Right>
                                <Icon name="chat" size={30} color="#01a699" onPress={() => Actions.Chat()}  />
                            </Right>
                              </View>
                          </Body>
                      </CardItem>
                  </Card>
                  <Card>
                      
                      <CardItem>
                          <Body  >
                          <View style={{flexDirection:'row', flexWrap:'wrap',}}>
                          <Image source={baby2} style={styles.imageStyle}  />
                          
                          <View style={{marginLeft:5}} >
                          <Text style={{fontWeight:'bold',fontFamily:'Arial', marginBottom:'3%',marginLeft:'2%',marginTop:'5%'}} >Syed Musharraf Alam</Text>
                          
                              
                              <View style={{flexDirection:'row', flexWrap:'wrap', }}>
                              <Text style={{paddingRight:'3%', fontFamily:'Arial', fontSize:13,marginLeft:2 }} >yesterday 2 pm</Text>
                            
                              </View>
                              </View>
                              <Right>
                                <Icon name="chat" size={30} color="#01a699" />
                            </Right>
                              </View>
                          </Body>
                      </CardItem>
                  </Card>
                  <Card>
                      
                      <CardItem>
                          <Body  >
                          <View style={{flexDirection:'row', flexWrap:'wrap',}}>
                          <Image source={baby3} style={styles.imageStyle}  />
                          
                          <View style={{marginLeft:5}} >
                          <Text style={{fontWeight:'bold',fontFamily:'Arial', marginBottom:'3%',marginLeft:'2%',marginTop:'5%'}} >Muhammad Rafae</Text>
                          
                              
                              <View style={{flexDirection:'row', flexWrap:'wrap', }}>
                              <Text style={{paddingRight:'3%', fontFamily:'Arial', fontSize:13,marginLeft:2 }} >12 November 12 pm</Text>
                            
                              </View>
                              </View>
                              <Right>
                                <Icon name="chat" size={30} color="#01a699"  />
                            </Right>
                              </View>
                          </Body>
                      </CardItem>
                  </Card>
                  <Card>
                      
                      <CardItem>
                          <Body  >
                          <View style={{flexDirection:'row', flexWrap:'wrap',}}>
                          <Image source={baby} style={styles.imageStyle}  />
                          
                          <View style={{marginLeft:5}} >
                          <Text style={{fontWeight:'bold',fontFamily:'Arial', marginBottom:'3%',marginLeft:'2%',marginTop:'5%'}} >Muhammad Yousuf</Text>
                          
                              
                              <View style={{flexDirection:'row', flexWrap:'wrap', }}>
                              <Text style={{paddingRight:'3%', fontFamily:'Arial', fontSize:13,marginLeft:2 }} >3 November 4 pm</Text>
                            
                              </View>
                              </View>
                              <Right>
                                <Icon name="chat" size={30} color="#01a699" />
                            </Right>
                              </View>
                          </Body>
                      </CardItem>
                  </Card>
                  <Card>
                      
                      <CardItem>
                          <Body  >
                          <View style={{flexDirection:'row', flexWrap:'wrap',}}>
                          <Image source={baby3} style={styles.imageStyle}  />
                          
                          <View style={{marginLeft:5}} >
                          <Text style={{fontWeight:'bold',fontFamily:'Arial', marginBottom:'3%',marginLeft:'2%',marginTop:'5%'}} >Muhammad Rafae</Text>
                          
                              
                              <View style={{flexDirection:'row', flexWrap:'wrap', }}>
                              <Text style={{paddingRight:'3%', fontFamily:'Arial', fontSize:13,marginLeft:2 }} >18 October 7 am</Text>
                            
                              </View>
                              </View>
                              <Right>
                                <Icon name="chat" size={30} color="#01a699" />
                            </Right>
                              </View>
                          </Body>
                      </CardItem>
                  </Card>
                  <Card>
                      
                      <CardItem>
                          <Body  >
                          <View style={{flexDirection:'row', flexWrap:'wrap',}}>
                          <Image source={baby2} style={styles.imageStyle}  />
                          
                          <View style={{marginLeft:5}} >
                          <Text style={{fontWeight:'bold',fontFamily:'Arial', marginBottom:'3%',marginLeft:'2%',marginTop:'5%'}} >Syed Musharraf Alam</Text>
                          
                              
                              <View style={{flexDirection:'row', flexWrap:'wrap', }}>
                              <Text style={{paddingRight:'3%', fontFamily:'Arial', fontSize:13,marginLeft:2 }} >15 September 9 pm</Text>
                            
                              </View>
                              </View>
                              <Right>
                                <Icon name="chat" size={30} color="#01a699" />
                            </Right>
                              </View>
                          </Body>
                      </CardItem>
                  </Card>
               </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
   
    imageStyle: {
        

        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 1,
    }

});