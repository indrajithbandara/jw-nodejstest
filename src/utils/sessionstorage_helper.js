/**
 * 根据Key获取本地存储数据
 * @type {string}
 */
export const GetSessionItem = (localDataKey) => {
  let _tmData;
  try{
    _tmData = sessionStorage.getItem(localDataKey);
    _tmData=JSON.parse(_tmData);
  }catch(el){
    console.error('GetSessionItem',el);
    _tmData={}
  }
  return _tmData;
}

/**
 * 根据Key设置本地存储数据
 * @type {string}
 * @type {object}
 */
export const SetSessionItem = (localDataKey, data) => {
  let _tmData;
  try{
    sessionStorage.setItem(localDataKey, JSON.stringify(data));
    _tmData=true;
  }catch(el){
    console.error('SetSessionItem',el);
    _tmData=false
  }
  return _tmData;
}
