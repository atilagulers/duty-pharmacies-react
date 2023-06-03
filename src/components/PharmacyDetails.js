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
import Map from './GoogleMap';

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
        <Button
          variant="link"
          style={{textDecoration: 'none'}}
          onClick={() => navigate('/')}
        >
          &#60; Sonuçlara Dön
        </Button>
        <Container className="mt-2">
          <Row>
            <Table bordered striped hover>
              <thead className="bg-custom-black text-light">
                <tr>
                  <td colSpan="3">
                    <Container className="d-flex gap-2 align-items-center m-1">
                      <FontAwesomeIcon size="2x" icon={faHouseMedical} />
                      <h3 className="m-0">{selectedPharmacy.EczaneAdi}</h3>
                    </Container>
                  </td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <Container className="d-flex gap-2">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p>{selectedPharmacy.Adresi}</p>
                    </Container>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Container className="d-flex gap-2">
                      <FontAwesomeIcon icon={faRoad}></FontAwesomeIcon>
                      <p>
                        {props.userLocation
                          ? `${calculateDistance(
                              props.userLocation.lat,
                              props.userLocation.lng,
                              selectedPharmacy.latitude,
                              selectedPharmacy.longitude
                            ).toFixed(1)} KM`
                          : '... KM'}
                      </p>
                    </Container>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Container className="d-flex gap-2">
                      <FontAwesomeIcon icon={faPhone} />
                      <p>{selectedPharmacy.Telefon}</p>
                    </Container>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row>
            <Map
              userLocation={props.userLocation}
              selectedPharmacy={selectedPharmacy}
            />
          </Row>
        </Container>
      </Container>
    )
  );
}

export default PharmacyDetails;
