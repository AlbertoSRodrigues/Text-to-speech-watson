import './App.css';
import {useEffect, useState} from "react";
import Axios from 'axios';
import ReactAudioPlayer from "react-audio-player";
function App() {
  const [selectedAudio, setSelectedAudio] = useState("")
  const [comment, setComment] = useState("")

  const [commentList, setcommentList]= useState([]);
  const addComment = async()=>{
    if(comment.length>0)
    {
   await Axios.post('http://localhost:3001/create',{
      comment: comment
    })
    await createAudio()
    await getComments()
    setComment('')
    }
  };

  const getComments = async()=>{
    let res = await Axios.get('http://localhost:3001/printcomments');
    console.log(res)
    setcommentList(res.data)
  };
  
  const createAudio = async() =>{
    let res = await Axios.post('http://localhost:3001/play',{
      comment: comment})
      console.log(res)
  }
  
  const listenerAudio = (audio)=>{
    setSelectedAudio(audio)
    }

     
   useEffect(() => {
    getComments()
    },[])
   
  return (
    <div className="App">
      <ReactAudioPlayer
        src={process.env.PUBLIC_URL + `/audio/${selectedAudio}.wav`}
        autoPlay={selectedAudio !== '' ? true : false}
      />
      <div className="body">
        <div className="container start">
          <br></br>
          <br></br>
            <span>Coment&aacute;rio</span>
            <br></br>
            <textarea name="" id="" cols="30" rows="10" onChange={
              (event)=>{setComment(event.target.value)}
              }>
            </textarea>
            <button onClick={addComment}>Cadastrar</button>
                      
        </div>

        <div className="line"></div>

        <div className="container">
          <span>Coment&aacute;rios</span>
          <br></br>
          <div className="all-cards">
          
              
              {commentList.map((comment,index)=>{
                return <div className="card"  key={index}>
                          <div className="comment">
                          {comment.commentcontent} 
                          </div>
                          <div>
                          <button onClick={()=>listenerAudio(comment.commentcontent)} className="card-button">Ouvir</button>
                          </div>
                       </div>; 
              })}                          
            
          </div>
        </div>
      </div>
    </div>
    
  );
  
}

export default App;
