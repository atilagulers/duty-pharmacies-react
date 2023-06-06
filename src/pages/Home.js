import React, {useEffect, useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import axios from 'axios';
//import {useNavigate} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
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

  const {pharmacies, selectedCity, selectedCounty} = useSelector(
    (state) => state.query
  );

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

    findNearestPharmacy(pharmacies[pharmacyIndex]);
    //  navigate('/nobetci-eczane');
  };

  const findNearestPharmacy = async (_pharmacy) => {
    try {
      const pharmacyName = _pharmacy.EczaneAdi;
      const url = `${process.env.REACT_APP_API_URL}/duty-pharmacies/nearest-pharmacy?lat=${_pharmacy.latitude}&lng=${_pharmacy.longitude}&radius=1000&pharmacyName=${pharmacyName}`;
      const response = await axios.get(url);
      const pharmacy = response.data;
      if (!pharmacy) return console.log('ECZANE BULUNAMADI');
      console.log(pharmacy);
      openPharmacyInGoogleMaps(pharmacy);
    } catch (error) {
      console.error('API isteği sırasında bir hata oluştu:', error);
    }
  };

  const openPharmacyInGoogleMaps = (pharmacy) => {
    const {geometry, place_id} = pharmacy;
    const {lat, lng} = geometry.location;

    if (isMobile) {
      const encodedName = encodeURIComponent(pharmacy.name);
      const encodedQuery = encodeURIComponent(`${lat},${lng}`);
      const encodedPlaceId = encodeURIComponent(place_id);
      const url = `https://www.google.com/maps/search/?api=1&query=${encodedName}&query_place_id=${encodedPlaceId}&query=${encodedQuery}`;

      if (window.confirm('Haritaları açmak istiyor musunuz?')) {
        window.location.href = url;
      }
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${place_id}`;
      window.open(url, '_blank');
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
