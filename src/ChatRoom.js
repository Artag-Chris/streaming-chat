import React, { useEffect, useState, useRef } from 'react'
import { auth, db } from './firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from "firebase";
import ReactPlayer from 'react-player/youtube'
import "tailwindcss/tailwind.css"



function ChatRoom() {
  const dummy = useRef();
  const messagesRef = db.collection('messages');
  const query = messagesRef.orderBy('createdAt', 'asc').limitToLast(25);

  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('');

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { displayName, uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      user: displayName,
      body: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      photoURL: photoURL
    })
    .then(() => {
    console.log('Done')
    })
    .catch(error => {
    console.error(error)
})

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

    return (
    <div className="chat-bg w-16 sm:w-12 lg:w-48 p-2 rounded" >
      <div className="overflow-y-auto h-screen-90">

        <ReactPlayer url="https://www.youtube.com/watch?v=fhEApybCjJ4" playing controls width="100%" height="100%"/>
      </div>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </div>
      <form onSubmit={sendMessage} className="pt-3 w-16 sm:w-12 lg:w-48 inline-flex">
        <input className="rounded-3xl px-3 w-16 sm:w-12 lg:w-48 py-1 outline-none focus:shadow" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Escribe algo" />
        <button className={`material-icons p-2 mx-2 bg-white rounded-semi transition-all duration-75 ease-in-out text-xl ${!formValue || 'text-pink-700 hover:text-pink-900'}`} type="submit" disabled={!formValue}>send</button>
      </form>
    </div>
  )
}
      function ChatMessage(props) {
      const { user, body, uid, photoURL, createdAt } = props.message;
      
    
      const messageClass = uid === auth.currentUser.uid ? 'flex-row-reverse' : 'flex-row';
      const messageBodyClass = uid === auth.currentUser.uid ? 'sent-message-bg text-right' : 'received-message-bg';
      const imageClass = uid === auth.currentUser.uid ? 'ml-2' : 'mr-2';
    
        return (
          <div className={`px-3 py-2 flex no-wrap items-start ${messageClass}`}>
            <div>
              <img className={`block rounded-full object-cover w-10 ${imageClass}`} src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt="{user}'s pfp" />
            </div>
            <div className={`block w-80 break-words p-2 rounded-md ${messageBodyClass}`}>
              <p className="text-xs">{user}</p>
              <p>{body}</p>
            </div>
          </div>
      )
}


export default ChatRoom
