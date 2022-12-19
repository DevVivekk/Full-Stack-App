import axios from 'axios';

const api = '/'

export const singleFileUpload = async(data)=>{
    try{
      const res =   await axios.post(api+'postit',data)
      if(res.status===201){
        window.alert('Thanks for posting dear!')
       }
    }catch(e){
        window.alert('Something went wrong!')
    }
}

export const getSingle = async()=>{
    try{
        const {data} = await axios.get(api+'getit');
        return data;
    }catch(e){
        throw e
    }
}