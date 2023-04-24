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
