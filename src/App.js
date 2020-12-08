import "tailwindcss/tailwind.css"
import './App.css';
import Login from './Login';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatRoom from './ChatRoom';

function App() {
  return (
    <div className="App">
     <Router>
    <div className="app">
     
     <Switch>
       <Route path="/chatroom">
        
       <ChatRoom/>
         
      </Route>
       
       
         
      
      {/* la ruta base o raiz siempre al final */}
      <Route path="/">
         
        <Login />
       </Route>
     </Switch>
    </div>
   </Router>
     {/*login */}
     {/*chat */}
    </div>
  );
}

<Login />
export default App;
