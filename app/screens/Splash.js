import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Spinner, Text } from 'native-base';
import { AsyncStorage, View, ScrollView, StyleSheet} from 'react-native';
import Login from './Login';


export default class Splash extends React.Component {
    
    componentDidMount() {
        AsyncStorage.getItem('Role').then((user) => {
         
            if (JSON.parse(user) === null) {
                // Actions.Login()
                Actions.reset("Login")
            } else {
                let role = JSON.parse(user).role;
                let id = JSON.parse(user)._id;
                Actions.reset("Main",{ id: id, role: role })
            }
        })
    }
   
   
    render() {
        return (

            <Container style={{ backgroundColor: 'orange' }} >
                <ScrollView>
                    <Content>
                        <View style={{ marginTop: '30%', marginBottom: '40%', justifyContent: 'center', alignItems: 'center' }} >
                            <View style={styles.imageView} >

                                <Text style={{ color: 'white', fontSize: 28, fontFamily: 'sans serif', fontWeight: 'bold' }}  >Connect Hear</Text>

                            </View>
                            <Spinner color='white' size={150} />
                        </View>
                    </Content>
                </ScrollView>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    imageView: {
        marginTop: '0%',
        marginBottom: '20%'
    },
    imageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    }

});
