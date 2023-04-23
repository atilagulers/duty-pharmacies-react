import React, {useEffect} from 'react';
import calculateDistance from '../utils/calculateDistance';

function TableItem(props) {
  return (
    <tr onClick={() => props.handleClickPharmacy(props.index)}>
      <td>{props.pharmacy.EczaneAdi}</td>
      <td className="">{props.pharmacy.Adresi}</td>
      <td>
        {props.userLocation
          ? `${calculateDistance(
              props.userLocation.lat,
              props.userLocation.lng,
              props.pharmacy.latitude,
              props.pharmacy.longitude
            ).toFixed(1)} KM`
          : '... KM'}
      </td>
      <td>{props.pharmacy.Telefon}</td>
    </tr>
  );
}

export default TableItem;
