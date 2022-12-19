import axios from 'axios';
export const singleFileUpload = async(data)=>{
    try{
      const res =   await axios.post('/postit',data)
      if(res.status===201){
        window.alert('Thanks for posting dear!')
       }
    }catch(e){
        window.alert('Something went wrong!')
    }
}

export const getSingle = async()=>{
    try{
        const {data} = await axios.get('/getit');
        return data;
    }catch(e){
        throw e
    }
}