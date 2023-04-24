import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Table, Row, Button} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import calculateDistance from '../utils/calculateDistance';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHouseMedical,
  faLocationDot,
  faRoad,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

function PharmacyDetails(props) {
  const navigate = useNavigate();
  const {selectedPharmacy} = useSelector((state) => state.query);

  useEffect(() => {
    if (!selectedPharmacy) {
      navigate('/', {replace: true});
    }
  }, [navigate, selectedPharmacy]);

  return (
    selectedPharmacy && (
      <Container className="mt-5">
        <Button variant="link" onClick={() => navigate('/')}>
          Sonuçlara Dön
        </Button>
        <Container className="mt-2">
          <h1 className="mb-3">
            {selectedPharmacy.EczaneAdi} - {selectedPharmacy.Semt} (
            {selectedPharmacy.Sehir})
          </h1>
          <Row>
            <Table bordered striped hover>
              <thead className="bg-custom-black text-light">
                <tr>
                  <th>
                    <FontAwesomeIcon
                      className="me-2 "
                      icon={faHouseMedical}
                      style={{color: 'white'}}
                    />
                    Eczane
                  </th>
                  <th>
                    {' '}
                    <FontAwesomeIcon
                      className="me-2"
                      icon={faLocationDot}
                      style={{color: 'white'}}
                    />
                    Adres
                  </th>
                  <th>
                    {' '}
                    <FontAwesomeIcon
                      className="me-2"
                      icon={faRoad}
                      style={{color: 'white'}}
                    />
                    Mesafe
                  </th>
                  <th>
                    {' '}
                    <FontAwesomeIcon
                      className="me-2"
                      icon={faPhone}
                      style={{color: 'white'}}
                    />
                    Telefon
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedPharmacy.EczaneAdi}</td>
                  <td>{selectedPharmacy.Adresi}</td>
                  <td>
                    {props.userLocation
                      ? `${calculateDistance(
                          props.userLocation.lat,
                          props.userLocation.lng,
                          selectedPharmacy.latitude,
                          selectedPharmacy.longitude
                        ).toFixed(1)} KM`
                      : '... KM'}
                  </td>
                  <td>{selectedPharmacy.Telefon}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row>
            <iframe
              title={selectedPharmacy.name}
              src={`https://maps.google.com/maps?q=${selectedPharmacy.latitude}, ${selectedPharmacy.longitude}&z=20&output=embed`}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              style={{width: '100%', height: '60vh', border: '0'}}
            ></iframe>
          </Row>
        </Container>
      </Container>
    )
  );
}

export default PharmacyDetails;

//<p>{selectedPharmacy.Adresi}</p>
//<p>{selectedPharmacy.EczaneAdi}</p>
//<p>{selectedPharmacy.Sehir}</p>
//<p>{selectedPharmacy.Semt}</p>
//<p>{selectedPharmacy.Telefon}</p>
//<p>{selectedPharmacy.Telefon2}</p>
//<p>{selectedPharmacy.YolTarifi}</p>
//<p>{selectedPharmacy.ilce}</p>
//<p>{selectedPharmacy.latitude}</p>
//<p>{selectedPharmacy.longitude}</p>
