import { AsyncStorage } from 'react-native';

export function Emitter(keys,payload,methods) {
 
  socket.on("connecting", (data) => {
    console.log(data);
  })
  socket.emit(keys, payload)
  socket.emit('send-message', {a:"klish"})
  console.log('add', payload)
  console.log('This', socket)
  socket.on(methods, (data) => {
    console.log('Data recieved from server', data);
    if(keys === 'registerActiveInterpreter'){
    AsyncStorage.setItem('oldSocketID', JSON.stringify(socket.id));
    AsyncStorage.setItem('Active',JSON.stringify(true))
    AsyncStorage.getItem('Active').then((check)=>{
      console.log('check are', check)
    }).catch((err) =>{
      console.log('err are', err)
    })
    }
  }, err => console.log(err));
}
