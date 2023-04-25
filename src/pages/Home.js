import React, {useEffect, useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {
  setCounties,
  setIsFetchingCounties,
  setPharmacies,
  setSelectedCity,
  setSelectedCounty,
  setSelectedPharmacy,
} from '../features/query/querySlice';
import {useDispatch, useSelector} from 'react-redux';

import SearchPharmacyForm from '../components/SearchPharmacyForm';
import PharmacyTable from '../components/PharmacyTable';

function Home(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {pharmacies, selectedCity, selectedCounty} = useSelector(
    (state) => state.query
  );

  const [isFetching, setIsFetching] = useState(false);

  //* update counties when select city
  useEffect(() => {
    dispatch(setIsFetchingCounties(true));
    const source = axios.CancelToken.source();
    const getCounties = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/counties?city=${selectedCity}`
        );

        dispatch(setCounties(response.data.data));
      } catch (error) {
        console.error(error);
      } finally {
        if (selectedCity) dispatch(setIsFetchingCounties(false));
      }
    };
    getCounties();

    return () => {
      source.cancel();
    };
  }, [dispatch, selectedCity]);

  const handleChangeCity = async function (e) {
    const city = e.target.value;

    dispatch(setSelectedCity(city));
  };

  const handleChangeCounty = async function (e) {
    const county = e.target.value;

    dispatch(setSelectedCounty(county));
  };

  const handleClickSearch = async function (e) {
    e.preventDefault();
    setIsFetching(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/duty-pharmacies?city=${selectedCity}&county=${selectedCounty}`
      );
      console.log(response);
      dispatch(setPharmacies(response.data.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleClickPharmacy = function (pharmacyIndex) {
    dispatch(setSelectedPharmacy(pharmacies[pharmacyIndex]));
    navigate('/nobetci-eczane');
  };

  return (
    <Container
      className="mt-5 d-flex flex-column flex-lg-row gap-4"
      style={{minHeight: '70vh'}}
    >
      <Container className="col-lg-3">
        <Row>
          <SearchPharmacyForm
            handleChangeCounty={handleChangeCounty}
            handleChangeCity={handleChangeCity}
            handleClickSearch={handleClickSearch}
            isFetching={isFetching}
          />
        </Row>
      </Container>
      <Container className="col-lg-9">
        <Row className="mb-2">
          {props.userLocation ? (
            <small></small>
          ) : (
            <small style={{color: 'red'}}>
              Konuma izin verilmediği için KM hesabı yapılamıyor.
            </small>
          )}
        </Row>
        <Row>
          <PharmacyTable
            pharmacies={pharmacies}
            isFetching={isFetching}
            handleClickPharmacy={handleClickPharmacy}
            userLocation={props.userLocation}
          />
        </Row>
      </Container>
    </Container>
  );
}

export default Home;

//* get cities
//useEffect(() => {
//  const source = axios.CancelToken.source();
//  const getCities = async () => {
//    try {
//      const response = await axios.get(
//        `${process.env.REACT_APP_API_URL}/cities`
//      );

//      console.log(response.data.data);
//      dispatch(setCities(response.data.data));
//    } catch (error) {
//      console.error(error);
//    }
//  };
//  getCities();

//  return () => {
//    source.cancel();
//  };
//}, [dispatch]);
