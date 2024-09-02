import Connexion from "./components/Connexion";
import Home from "./components/Home";
import DescSerie from "./components/DescSerie";
import Favorite from "./components/Favorite";
import './css/app.css';
import { Route, Routes } from "react-router-dom";
import './css/app.css'
import Error from "./components/Error";
import Members from "./components/Members";
import FriendsList from "./components/Friends";
import Friends from "./components/Friends";
import MemberBlock from "./components/memberBlock";
function App() {
    return (
        <Routes>  
          <Route path="/connexion" element={<Connexion />}></Route>
          <Route path="/favorite" element={<Favorite />}></Route>
          <Route path="/descSerie/:id" element={<DescSerie />}></Route>
          <Route path="/" element={ < Home />}></Route>
          <Route path="/error" element={ < Error />}></Route>
          <Route path="/members" element={ < Members />}></Route>
          <Route path="/friends" element={ < Friends />}></Route>
          <Route path="/blocks" element={ < MemberBlock />}></Route>
        </Routes>
    );
}

export default App;