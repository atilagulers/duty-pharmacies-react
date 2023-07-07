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
} from '../features/query/querySlice';
import {useDispatch, useSelector} from 'react-redux';

import SearchPharmacyForm from '../components/SearchPharmacyForm';
import PharmacyTable from '../components/PharmacyTable';
import data from '../data/data.json';
import MapSelectionModal from '../components/MapSelectionModal';
import AdsComponent from '../components/AdsComponent';

function Home(props) {
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState();

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
        `${
          process.env.REACT_APP_API_URL
        }/pharmacy?city=${selectedCity}&county=${selectedCounty}&lat=${
          props.userLocation.lat || ''
        }&lng=${props.userLocation.lng || ''}`
      );
      dispatch(setPharmacies(response.data.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleClickPharmacy = function (pharmacyIndex) {
    //dispatch(setSelectedPharmacy(pharmacies[pharmacyIndex]));

    findNearestPharmacy(pharmacies[pharmacyIndex]);
    //  navigate('/nobetci-eczane');
  };

  const findNearestPharmacy = async (_pharmacy) => {
    try {
      const pharmacyName = _pharmacy.EczaneAdi;
      const url = `${process.env.REACT_APP_API_URL}/pharmacy/nearest-pharmacy?lat=${_pharmacy.latitude}&lng=${_pharmacy.longitude}&radius=500&pharmacyName=${pharmacyName}`;
      const response = await axios.get(url);
      const pharmacy = response.data;
      if (!pharmacy) return console.log('ECZANE BULUNAMADI');
      setSelectedPharmacy(pharmacy);
      if (isMobile) {
        setShowModal(true);
      } else {
        openPharmacyInMaps(pharmacy, 'web');
      }
    } catch (error) {
      console.error('API isteği sırasında bir hata oluştu:', error);
    }
  };

  const openPharmacyInMaps = (pharmacy, mapService) => {
    const {geometry, place_id, name} = pharmacy;
    const {lat, lng} = geometry.location;

    if (isMobile) {
      const encodedQuery = encodeURIComponent(
        name + ' ' + pharmacy.formatted_address
      );
      let url = '';
      if (mapService === 'google') url = `comgooglemaps://?q=${encodedQuery}`;
      else if (mapService === 'apple') {
        url = `http://maps.apple.com/?q=${lat},${lng}`;
      } else if (mapService === 'yandex') {
        url = `yandexmaps://maps.yandex.com/?pt=${lng},${lat}&z=17`;
      }

      window.location.href = url;
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${place_id}`;
      window.open(url, '_blank');
    }
  };

  return (
    <Container className="mt-5 d-flex flex-column flex-lg-row gap-4">
      {/*<AdsComponent />*/}

      <MapSelectionModal
        selectedPharmacy={selectedPharmacy}
        openPharmacyInMaps={openPharmacyInMaps}
        showModal={showModal}
        setShowModal={setShowModal}
      />
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
