import { BrowserRouter, Route } from 'react-router-dom';

import {Home} from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from '../src/contexts/AuthContext'

function App() {
 
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Route path="/" exact component={Home}  /> {/* esse exact quer dizer que a pagina so sera exibida quando estiver exatamente o mesmo caminho, colocado no path */}
      <Route path="/rooms/news" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}  

export default App;
