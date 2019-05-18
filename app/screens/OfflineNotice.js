import React, { Component } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import { Footer } from 'native-base';

const { width } = Dimensions.get('window');



class OfflineNotice extends Component {
  state = {
    isConnected: true
  };


  componentDidMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log(connectionInfo);
      if(connectionInfo.type === "none"){
        this.setState({isConnected:false})
      }


    });
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);

  }

  handleConnectivityChange = isConnected => {
    console.log(isConnected)
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  render() {
    if (!this.state.isConnected) {
  
      return(
        <Footer style={{backgroundColor:"#FFF", height:30 }}>
        <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
      </Footer>
      )
    }
    return null;
  }
}

const styles = StyleSheet.create({
    offlineContainer: {
      backgroundColor: '#b52424',
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width,
      position: 'absolute',
      top: 0
    },
    offlineText: { 
      color: '#fff'
    }
  });
  export default OfflineNotice;