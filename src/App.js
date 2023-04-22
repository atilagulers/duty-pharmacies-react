import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<h1>about</h1>} />
            <Route path="/contact" element={<h1>contact</h1>} />
            <Route component={<h1>Hellow</h1>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
