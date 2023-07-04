import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error(error)
      );
    }
  }, []);

  return (
    <div className="App" style={{minHeight: '80vh'}}>
      <Router>
        <Header />
        <Routes>
          <Route>
            <Route
              exact
              path="/"
              element={<Home userLocation={userLocation} />}
            />

            <Route component={<h1>Hellow</h1>} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
