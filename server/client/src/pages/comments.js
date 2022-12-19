import React, { useState,useEffect } from 'react'
import Send from '../images/send.png'
function Comments() {
  const [send,setSend] = useState({comment:""})
  const [mess,setMess] = useState([])



  const callabout = async()=>{
    try{
        const res = await fetch('/home',{
            method:"GET",
            credentials:"include",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        setMess(data);
        console.log(mess);
        if(res.status!==200){
            const error = new Error(res.error);
            throw error;
        }
    }catch(e){
        console.log(e);
    }
}

useEffect(()=>{
    callabout();
},[])






  const handleChange = (e)=>{
    const name= e.target.name;
    const value = e.target.value;
    setSend({...send,[name]:value})
    }
    const postComment = async(e)=>{
      e.preventDefault();
      const {comment} = send;
      const res = await fetch('/postcomm',{
        method:"POST",
        credentials:"include",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify({comment})
      });
      if(res.status===201){
        window.alert("Comment added!")
        setSend({...send,comment:""})
      }else{
        console.log('Unable to send comment.')
      }
    }

  return (
    <div className='comments' style={{"backgroundColor":"whitesmoke","minWidth":"35rem","minHeight":"40rem","borderRadius":"3rem","position":"absolute","top":"0","left":"0","right":"0","bottom":"0"}}>
    <div style={{"marginTop":"4rem","height":"28rem","overflow":"auto","width":"32rem"}}>
      {/* {
        mess.map((item,index)=>{
          return(
            <div>
            <h2>{item.comments}</h2>
            </div>
          )
        })
      } */}
    </div>
    <div style={{"display":"flex","flexDirection":"row","justifyContent":"space-evenly"}}>
    <form  method='POST'>
      <input id="comm" name='comment' value={send.comment} onChange={handleChange} style={{"marginBottom":"3rem","marginLeft":"-4rem","width":"18rem","height":"3rem"}} type='text' placeholder="Type your comment" />
  <img src={Send} type='submit' onClick={postComment} style={{"width":"3.3rem","height":"3.3rem","marginLeft":"2rem","marginBottom":"-1rem"}} alt='send' />
  </form>
    </div>
    </div>
  )
}

export default Comments