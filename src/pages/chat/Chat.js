import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllMessagesServices  } from '../../services/chatServices'

import Navbar from '../../components/navBar/Navbar'
import io from "socket.io-client"

import Swal from 'sweetalert2'
import './chat.css'

let socket

const Chat = () => {
    
    const [ allMessages, setAllMessages ] = useState([])
    const [ text, setText ] = useState("")
    const { chatId } = useParams()
  
    useEffect(()=>{
      getAllMessages()
      socketConnection()
      
    },[])

    const getAllMessages = async () =>{

      try {
        const response = await getAllMessagesServices(chatId)
        console.log(response.data)
        setAllMessages(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    const socketConnection = () =>{
      
      const storedToken = localStorage.getItem("authToken")
      
      socket = io.connect("http://localhost:5005", {
        extraHeaders:{ Authorization: `Bearer ${storedToken}` }
      })

      socket.emit("join_chat", chatId)

      socket.on('receive_message', (newMessage) =>{
        setAllMessages(previousState => {
          const newState = [...previousState, newMessage]
          return newState
        })
      })
    }
        
    const handleChange = (e) => setText(e.target.value)
    
    const sendMessage = () => {
      console.log("trying to send a message!")
      const messageObj = { text, chatId }
      socket.emit("send_message",messageObj)
      setText("")
    }

  return (
    <div className="containerChat">
      <div className="containerChat--navBar">
        <Navbar />
      </div>
			<h3>Chat Page</h3>
      <div>
      {
        allMessages && allMessages.map((eachMessage) =>{
          return (
            <div className="containerTexto" key={eachMessage._id}>
              {eachMessage.sender.name}: {eachMessage.text}
            </div>
          )
        })
      }
      </div>

      <input 
        type="text" 
        placeholder='Message'
        name="text"  
        value={text} 
        onChange={handleChange} 
        />
        <button onClick={sendMessage}>Send</button>
		</div>
  )
}

export default Chat