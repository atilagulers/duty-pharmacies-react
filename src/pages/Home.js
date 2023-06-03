import React, {useEffect, useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import axios from 'axios';
//import {useNavigate} from 'react-router-dom';

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
import data from '../data/data.json';

function Home(props) {
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  const {pharmacies, selectedCity, selectedCounty, selectedPharmacy} =
    useSelector((state) => state.query);

  const [isFetching, setIsFetching] = useState(false);

  //* update counties when select city
  useEffect(() => {
    dispatch(setIsFetchingCounties(true));
    const source = axios.CancelToken.source();
    const getCounties = async () => {
      dispatch(setCounties(data[selectedCity]?.Ilceler));

      if (selectedCity) dispatch(setIsFetchingCounties(false));
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
      dispatch(setPharmacies(response.data.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleClickPharmacy = function (pharmacyIndex) {
    dispatch(setSelectedPharmacy(pharmacies[pharmacyIndex]));

    findNearestPharmacy();
    //  navigate('/nobetci-eczane');
  };

  const findNearestPharmacy = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/duty-pharmacies/nearest-pharmacy?lat=${selectedPharmacy.latitude}&lng=${selectedPharmacy.longitude}&radius=100`;
      const response = await axios.get(url);
      const pharmacy = response.data;
      openPharmacyInGoogleMaps(pharmacy);
    } catch (error) {
      console.error('API isteği sırasında bir hata oluştu:', error);
    }
  };

  const openPharmacyInGoogleMaps = (pharmacy) => {
    const {formatted_address, geometry} = pharmacy;
    const {lat, lng} = geometry.location;
    const encodedAddress = encodeURIComponent(formatted_address);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}&query_place_id=${pharmacy.place_id}`;
    const iosUrl = `maps://maps.apple.com/?q=${lat},${lng}&ll=${lat},${lng}`;
    const androidUrl = `geo:${lat},${lng}?q=${encodedAddress}&z=16`;

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

    if (isIOS) {
      window.open(iosUrl, '_blank');
    } else if (/Android/.test(userAgent)) {
      window.open(androidUrl, '_blank');
    } else {
      window.open(mapUrl, '_blank');
    }
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
