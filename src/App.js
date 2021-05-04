import Content from './components/Content';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Reciepts from './components/Reciepts';

function App() {
  const detail = JSON.parse(localStorage.getItem("power"))
  return (
    <Router>
      <div className="container">
        {detail?.message === 'Successful' ? <Route path='/reciepts' component={Reciepts} /> : <>
          <NavBar />
          <Content /> <Footer /></>}
      </div>
    </Router>
  );
}

export default App;
