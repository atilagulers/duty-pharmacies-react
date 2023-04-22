import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import SearchPharmacyForm from '../components/SearchPharmacyForm';
import PharmacyTable from '../components/PharmacyTable';
import e from 'cors';

function Home() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [dutyPharmacies, setDutyPharmacies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  //* get cities
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCities = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/cities`
        );

        setCities(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCities();

    return () => {
      source.cancel();
    };
  }, []);

  //* update counties when select city
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCounties = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/counties?city=${selectedCity}`
        );
        setCounties(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCounties();

    return () => {
      source.cancel();
    };
  }, [selectedCity]);

  const handleChangeCity = async function (e) {
    const city = e.target.value;
    setSelectedCity(city);
  };

  const handleChangeCounty = async function (e) {
    const county = e.target.value;
    setSelectedCounty(county);
  };

  const handleClickSearch = async function (e) {
    e.preventDefault();
    setIsSearching(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/duty-pharmacies?city=${selectedCity}&county=${selectedCounty}`
      );
      setDutyPharmacies(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Container className="mt-5 d-flex flex-column flex-lg-row gap-4">
      <Container className="col-lg-3">
        <Row>
          <SearchPharmacyForm
            cities={cities}
            selectedCity={selectedCity}
            counties={counties}
            handleChangeCounty={handleChangeCounty}
            handleChangeCity={handleChangeCity}
            handleClickSearch={handleClickSearch}
            isSearching={isSearching}
          />
        </Row>
      </Container>
      <Container className="col-lg-9">
        <Row>
          <PharmacyTable dutyPharmacies={dutyPharmacies} />
        </Row>
      </Container>
    </Container>
  );
}

export default Home;
