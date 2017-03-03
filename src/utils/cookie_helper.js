import cookies from 'js-cookie';

export const SetCookie = async (name, value, {
  expires,
  secure,
  path= '',
  domain= ''
}={}) => {
  return await cookies.set(name,value,{expires,path,domain});

}

export const GetCookie = async (name)=>{
  return await cookies.get(name);

}

export const RemoveCookie= async (name)=>{
  return await cookies.remove(name);

}
