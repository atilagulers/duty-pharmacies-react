import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import SearchPharmacyForm from '../components/SearchPharmacyForm';
import PharmacyTable from '../components/PharmacyTable';
import PharmacyDetails from '../components/PharmacyDetails';

function Home() {
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [dutyPharmacies, setDutyPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState({});
  const [isFetching, setIsFetching] = useState(false);

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
    setIsFetching(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/duty-pharmacies?city=${selectedCity}&county=${selectedCounty}`
      );
      console.log(response.data.data);
      setDutyPharmacies(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleClickPharmacy = function (pharmacyIndex) {
    setSelectedPharmacy(dutyPharmacies[pharmacyIndex]);
    navigate('/nobetci-eczane');
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
            isFetching={isFetching}
          />
        </Row>
      </Container>
      <Container className="col-lg-9">
        <Row>
          {/*<PharmacyDetails />*/}
          <PharmacyTable
            dutyPharmacies={dutyPharmacies}
            isFetching={isFetching}
            handleClickPharmacy={handleClickPharmacy}
          />
        </Row>
      </Container>
    </Container>
  );
}

export default Home;
