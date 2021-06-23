import {  useAuth   } from '../hooks/useAuth'
import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import  logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'


import { Button } from '../components/Button';

import '../styles/auth.scss';



// WebPack (snowpack,vite,....)


export function Home(){

  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()


  async function  handleCreateRoom()  {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/news')
   
    }  
  return (
   <div id="page-auth">
     <aside>
        <img src={illustrationImg} alt="Ilustração Simbolizando Perguntas e Respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo Real</p>
     </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeask"/>
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua Sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
            type="text"
            placeholder="Digite o Codigo da Sala"
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