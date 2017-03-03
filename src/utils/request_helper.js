import fetch from 'isomorphic-fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.ok && response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function checkCommonDto(response){
    if(response.responseCommonDto.resultCode == 0){
      return response;
    }
    else{
      throw redata.responseCommonDto.message;
    }
}

export default function request(url, {
  body,
  mode = 'cors',
  cache = 'no-cache',
  method = 'GET',
  headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    // 设置请求头上的sessionKey
    'JW_DATA': 'd6e0b008-025c-45ab-955a-ca3c73d107f8'
  }
} = {}){
  if(GLOBALDATA){
    url=GLOBALDATA.ApiHost+url;
  }
  //设置请求头
  return fetch(url, {body, mode, cache, method, headers})
    .then(checkStatus)
    .then(parseJSON)
    .then(checkCommonDto)
    .then((data) => ({data}))
    .catch((err) => ({ err }));
}
