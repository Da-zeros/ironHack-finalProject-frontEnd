import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getAllMessagesServices, getAllConversationsServices, startChatServices } from '../../services/chatServices'

import Navbar from '../../components/navBar/Navbar'
import io from "socket.io-client"

import Swal from 'sweetalert2'
import './chat.css'

let socket

const Chat = () => {
    
  const [ allChats, setAllchats ] = useState([])
  const [ allMessages, setAllMessages ] = useState([])
  const [ text, setText ] = useState("")
  const [ chatRoomState, setChatRoomState ] = useState()

  const { chatId } = useParams()


  let socketConnection = () =>{
      
    let storedToken = localStorage.getItem("authToken")
    
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

  const handleStartConversation = async (value) =>{
    
    const response = await startChatServices( value )
    const chatRoom = response.data._id
    setChatRoomState(chatRoom)

    let socketConnection = () =>{
      
      let storedToken = localStorage.getItem("authToken")
      
      socket = io.connect("http://localhost:5005", {
        extraHeaders:{ Authorization: `Bearer ${storedToken}` }
      })
  
      socket.emit("join_chat", chatRoomState)
  
      socket.on('receive_message', (newMessage) =>{
        setAllMessages(previousState => {
          const newState = [...previousState, newMessage]
          return newState
        })
      })
    }

    socketConnection()
  }

  const getAllConversations = async () => {

    try {

      const allConversationsResponse = await getAllConversationsServices()
      const data = allConversationsResponse.data
      data.forEach(d => {
        let chatName = d.participants[1]
        setAllchats (previousState => {
          const newState = [...previousState, chatName]
          return newState
          })
        
      });
    } catch (err) {
      console.log(err)
    }
  }

  const getAllMessages = async () =>{

    try {
      const response = await getAllMessagesServices(chatId)
      console.log(response.data)
      setAllMessages(response.data)
    } catch (err) {
      console.log(err)
    }
  } 

  const handleChange = (e) => setText(e.target.value)
  
  const sendMessage = () => {
    console.log("trying to send a message!")
    const messageObj = { text, chatId }
    socket.emit("send_message",messageObj)
    setText("")
  }

  useEffect(()=>{
    socketConnection()
    getAllConversations()
    getAllMessages()
  },[])
  
  return (
    <div className="containerChatPage">
      <div className="containerChatPage--nav">
        <Navbar/>
      </div>
      <div className="containerChatPage--chat">
        <div className="chat--container">
          <div className="chat--conversations">
            {
            allChats&& allChats.map((chats) =>{
              return (
                <div  onClick={()=>handleStartConversation(chats._id)} key={chats._id} className= "conversation--div">
                  <div className="div--img">
                    <img src="icons/user.png"/>
                  </div>
                  <p className="div--name">{chats.name}</p>
                </div>)
            })
            }  
          </div>
          <div className="chat--screen">
            <div className="chat--display">
              {
                allMessages && allMessages.map( (eachMessage) =>{
                  return (
                    <div  className="containerTexto" key={eachMessage._id}>
                      {eachMessage.sender.name}: {eachMessage.text}
                    </div>
                    )
                  })
              }
            </div>
            <div className="chat--input">
              <input 
                type="text" 
                placeholder='Message'
                name="text"  
                value={text} 
                onChange={handleChange} 
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
        </div>
      </div>
  )
}

export default Chat