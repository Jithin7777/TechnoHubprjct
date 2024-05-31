import { Routes ,Route} from 'react-router-dom';
import './App.css';
import Home from './Pages/Homepage/Home';
import Login from './Pages/LoginPage/Login';
import Register from './Pages/Registerpage/Register';

function App() {
  return (
    <div className="App">

<Routes >
  <Route path='/' element={<Register></Register>} />
  <Route  path='/login' element={<Login></Login>}/>
  <Route path='/home' element={<Home></Home>}/>
</Routes>    
 </div>
  );
}

export default App;
