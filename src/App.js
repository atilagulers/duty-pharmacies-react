import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Pharmacy from './pages/Pharmacy';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/nobetci-eczane" element={<Pharmacy />} />
            <Route component={<h1>Hellow</h1>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
