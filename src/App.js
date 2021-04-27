import Content from './components/Content';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
      <NavBar />
      <Content />
      <Footer />
    </div>

  );
}

export default App;
