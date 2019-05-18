import React from 'react';
import { StyleSheet, View, ScrollView, Image, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Card, CardItem, Body, Text, Right, Textarea, Form } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';
import OfflineNotice from './OfflineNotice';
import Route from '../api/route';


export default class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            comment:'',
        }
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    _reviews(){
        if(this.state.starCount === 0  && this.state.comment === ""){
            ToastAndroid.show('Please Select Rating and Fill Comment Box', ToastAndroid.LONG);
        }else
        if(this.state.starCount === 0 ){ 
            ToastAndroid.show('Please Select Rating', ToastAndroid.LONG);
        }else if(this.state.comment === ""){
            ToastAndroid.show('Please Fill commit Box', ToastAndroid.LONG);
        }
        else{
            let record = {}
            record.starCount = this.state.starCount;
            record.comment = this.state.comment;
            console.log(record);
            Route(record, "POST", "/films").then(response => response.json()).then((json) => {
                console.log('json', json)
                ToastAndroid.show('success', ToastAndroid.LONG)
                Actions.Main();
        
              }).catch((err) => {
                ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)
              })
        }
    }
    render() {
        return (
            <Container>
                <Header />
                <ScrollView>
                    <Content  >
                        <Card>

                            <CardItem>
                                <Body  >
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                        <Image source={require('../images/baby.jpg')} style={styles.imageStyle} />

                                        <View style={{ marginLeft: 5 }} >
                                            <Text style={{ fontWeight: 'bold', fontFamily: 'Arial', marginBottom: '3%', marginLeft: '2%', marginTop: '5%' }} >Muhammad Yousuf</Text>



                                        </View>
                                        <Right>
                                            <Text style={{ paddingRight: '0%', fontFamily: 'Arial', fontSize: 13, marginLeft: '30%' }} >Time: 14.21</Text>
                                        </Right>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: '3%', justifyContent: 'center', alignItems: 'center' }}>

                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor={'yellow'}
                                starSize={35}
                            />

                        </View>
                        <View  >
                            <Form style={{ paddingTop: '2%' }} >
                                <Textarea rowSpan={6} bordered placeholder="Comment" onChangeText={(text) => this.setState({comment:text})} style={{ marginLeft: '4%', marginRight: '4%', borderRadius: 10 }} />
                                <View style={styles.loginStyle} >

                                    <Icon.Button name="rate-review" style={styles.buttonIcon} backgroundColor="green" onPress={this._reviews.bind(this)} >
                                        Review
</Icon.Button>
                                </View>
                            </Form>
                        </View>

                    </Content>
                </ScrollView>
       
                    <OfflineNotice />
               
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
    },
    loginStyle: {
        width: '60%',
        justifyContent: 'center',
        flex: 1,
        height: 100,
        marginLeft: '20%',
        alignContent: 'center',
        paddingTop: '1%',
        marginBottom: '6%'

    }, buttonIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },

});