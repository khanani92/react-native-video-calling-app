import React from 'react';
import { StyleSheet, View, Image, ScrollView, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, Header, Card, CardItem, Body, } from 'native-base';
import StarRating from 'react-native-star-rating';
import OfflineNotice from './OfflineNotice'
import IconTwo from 'react-native-vector-icons/Entypo';

export default class Reviewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 3.5
        }
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    
    handleBackButton() {
        Actions.reset("Profile")
        return true;
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <IconTwo name="menu" size={30} color='white' onPress={() => Actions.Profile()} />
                    </Body>
                </Header>
                <ScrollView>
                    <Content>

                        <Card>

                            <CardItem>
                                <Body  >
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                        <Image source={require('../images/baby.jpg')} style={styles.imageStyle} />

                                        <View style={{ marginLeft: 5 }} >
                                            <Text style={{ fontWeight: 'bold', fontFamily: 'Arial', marginBottom: '3%', marginLeft: '2%', marginTop: '5%' }} >Muhammad Yousuf</Text>


                                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                                <Text style={{ paddingRight: '3%', fontFamily: 'Arial', fontSize: 13, marginLeft: 2 }} >{this.state.starCount}</Text>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={this.state.starCount}
                                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                    fullStarColor={'yellow'}
                                                    starSize={15}


                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={{ marginTop: '3%' }} >
                                        Designed to help both Spanish and English speakers locate information about tests in the Spanish language, this resource provides detailed descriptions of commercially available Spanish tests.
                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card>

                            <CardItem>
                                <Body>

                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                        <Image source={require('../images/baby2.jpg')} style={styles.imageStyle} />

                                        <View style={{ marginLeft: 5 }} >
                                            <Text style={{ fontWeight: 'bold', fontFamily: 'Arial', marginBottom: '3%', marginLeft: '2%', marginTop: '5%' }} >Muhammad Rafae</Text>


                                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                                <Text style={{ paddingRight: '3%', fontFamily: 'Arial', fontSize: 13, marginLeft: 2 }} >{this.state.starCount}</Text>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={this.state.starCount}
                                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                    fullStarColor={'yellow'}
                                                    starSize={15}


                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={{ marginTop: '3%' }}>Buros publishes authoritative reference materials that contain descriptions and candidly critical evaluations of commercially available tests, essential to professionals involved in the evaluation, selection, and use of tests. </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card>

                            <CardItem>
                                <Body>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                        <Image source={require('../images/baby3.jpg')} style={styles.imageStyle} />

                                        <View style={{ marginLeft: 5 }} >
                                            <Text style={{ fontWeight: 'bold', fontFamily: 'Arial', marginBottom: '3%', marginLeft: '2%', marginTop: '5%' }} >Muhammad Raza</Text>


                                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                                <Text style={{ paddingRight: '3%', fontFamily: 'Arial', fontSize: 13, marginLeft: 2 }} >{this.state.starCount}</Text>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={this.state.starCount}
                                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                    fullStarColor={'yellow'}
                                                    starSize={15}


                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={{ marginTop: '3%' }}>Test reviews are conducted for several mathematics courses and other courses throughout the term by Teaching Center tutors. The reviews are typically scheduled two nights prior to the examination. Review materials may also be published on the Teaching Center website</Text>

                                </Body>
                            </CardItem>

                        </Card>
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
    }

});