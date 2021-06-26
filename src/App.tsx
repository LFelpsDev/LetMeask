import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {Home} from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { AdminRoom } from './pages/AdminRoom'

import { AuthContextProvider } from '../src/contexts/AuthContext'
import { Room } from './pages/Room';

function App() {
 
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Switch>
      <Route path="/" exact component={Home}  /> {/* esse exact quer dizer que a pagina so sera exibida quando estiver exatamente o mesmo caminho, colocado no path */}
      <Route path="/rooms/news"  component={NewRoom} />
      <Route path="/rooms/:id" component={Room} />
      <Route path="/admin/rooms/:id" component={AdminRoom} />
      </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}  

export default App;
