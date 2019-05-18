import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Icon , Textarea} from 'native-base';
import OfflineNotice from './OfflineNotice';
import { View,  ScrollView } from 'react-native';

import CheckBox from 'react-native-check-box'



export default class Interpreter extends Component {
    constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      notes:''
    };
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  render() {
    return (
      <Container>
        <Header />
        <ScrollView>
        <Content>
          <Form>
          
            <Item picker style={{ marginLeft: '5%', marginRight: '6%',border:'none' }} >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined, color:"#124CC0",  }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                
                <Picker.Item label="Shoping" value="key0" />
                <Picker.Item label="Purchase" value="key1" />
                <Picker.Item label="Buy" value="key2" />
                <Picker.Item label="Home Work" value="key3" />
                <Picker.Item label="Delivery" value="key4" />
              </Picker>
            </Item>
            <View style={{marginTop:'5%'}}>
            <Textarea rowSpan={10} bordered placeholder="Notes" onChangeText={(text) => this.setState({notes:text})} style={{ marginLeft: '4%', marginRight: '4%', borderRadius: 10 }} />
            </View>                    
            <View style={{marginTop:'4%', marginBottom:'10%', marginLeft:'3%'}} >
            <CheckBox
    style={{padding: 5, marginRight:'3%' }}
    onClick={()=>{
      this.setState({
          isChecked:!this.state.isChecked
      })
    }}
    isChecked={this.state.isChecked}
    checkBoxColor="#124CC0"
    rightText={"Flag User"}
    rightTextStyle={{color:"#124CC0", fontSize:16, fontFamily:'Times', marginLeft:'2%',  }}
/>

            </View>
          </Form>
        </Content>
        </ScrollView>
        <OfflineNotice />
      </Container>
    );
  }
}