import { FormEvent, useState } from 'react';
import cx from 'classnames'
import {  useAuth   } from '../hooks/useAuth'
import { useHistory } from 'react-router-dom';


import illustrationImg from '../assets/images/illustration.svg'
import  logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { database } from '../services/firebase';
// WebPack (snowpack,vite,....)

export function Home(){

  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');


  async function  handleCreateRoom()  {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/news')
   
    } 
    
    async function handleJoinRoom(event: FormEvent ) {
      event.preventDefault();


      if (roomCode.trim() === '') {
        return;
      }

      const roomRef = await database.ref(`rooms/${roomCode}`).get();

      if (!roomRef.exists()){
        alert('Room Does not Exists');
        return;
      }
      
      if (roomRef.val().endedAt){
        alert('Room Already closed');
        return;
      }

      history.push(`/rooms/${roomCode}`)
    }

  return (
   <div id="page-auth">
     <aside>
        <img src={illustrationImg} alt="Ilustração Simbolizando Perguntas e Respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo Real</p>
     </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeask"/>
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua Sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
            type="text"
            placeholder="Digite o Codigo da Sala"
            onChange={(event) => setRoomCode(event.target.value)}
            value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
   </div>
  )  
}