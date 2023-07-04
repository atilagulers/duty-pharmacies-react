import React from 'react';
import {Button, Container} from 'react-bootstrap';
import {calculateDistance} from '../utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHouseMedical,
  faLocationDot,
  faRoad,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

function TableItem(props) {
  return (
    <tr style={{cursor: 'pointer'}}>
      <td>
        <Container className="d-flex gap-2 mb-1">
          <FontAwesomeIcon icon={faHouseMedical} />
          <p>{props.pharmacy.EczaneAdi}</p>
        </Container>

        <Container className="d-flex gap-2 mb-1">
          <FontAwesomeIcon icon={faLocationDot} />
          <p>{props.pharmacy.Adresi}</p>
        </Container>

        <Container className="d-flex gap-2 mb-1">
          <FontAwesomeIcon icon={faRoad}></FontAwesomeIcon>
          <p>
            {props.userLocation
              ? `${calculateDistance(
                  props.userLocation.lat,
                  props.userLocation.lng,
                  props.pharmacy.latitude,
                  props.pharmacy.longitude
                ).toFixed(1)} KM`
              : '... KM'}
          </p>
        </Container>

        <Container className="d-flex gap-2">
          <FontAwesomeIcon icon={faPhone} />
          <p>{props.pharmacy.Telefon}</p>
        </Container>
      </td>

      <td>
        <Button
          onClick={() => props.handleClickPharmacy(props.index)}
          variant="info"
          style={{height: '100%'}}
        >
          Haritada Göster
        </Button>
      </td>
    </tr>
  );
}

export default TableItem;
