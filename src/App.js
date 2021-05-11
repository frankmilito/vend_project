import Content from './components/Content';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Reciepts from './components/Reciepts';
import Home from './components/Home';

function App() {
  // const detail = JSON.parse(localStorage.getItem("power"))
  // return (
  //   <Router>
  //     <div className="container">
  //       {detail?.message === 'Successful' ? <Reciepts /> : <>
  //         <NavBar />
  //         <Content /> <Footer /></>}
  //     </div>
  //   </Router>
  // );


  return (
    <>
      <Router>
        <div className='container'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/reciepts' component={Reciepts} />
          </Switch>
        </div>
      </Router>
    </>
  )
}



export default App;
