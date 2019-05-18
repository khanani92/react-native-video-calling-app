
const baseURL = 'http://142.93.9.81/api';
export default async function callback(payload,methods, url) {
  try {
    if(methods === "post"){
    let response = await fetch(
      baseURL + `${url}`,
      {
        method: methods,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
    
    return response
    }
    else if(methods === "get"){
      let response = await fetch(
        baseURL + `${url}`,
        {
          method: methods,
        })
      
      return response

    }
    
  }
  catch (error) {
    console.error(error);
  }
}
