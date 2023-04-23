import React from 'react';

import {Table} from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import calculateDistance from '../utils/calculateDistance';

function PharmacyTable(props) {
  return (
    <Table bordered striped hover size="lg">
      <thead className="bg-custom-black text-light">
        <tr>
          <th>Eczane</th>
          <th>Adres</th>
          <th>Mesafe</th>
          <th>Telefon</th>
        </tr>
      </thead>

      <tbody>
        {props.isFetching ? (
          <tr>
            <td colSpan="3">
              <LoadingSpinner />
            </td>
          </tr>
        ) : (
          props.pharmacies &&
          props.pharmacies.map((pharmacy, i) => {
            return (
              <tr key={i} onClick={() => props.handleClickPharmacy(i)}>
                <td className="col-2">{pharmacy.EczaneAdi}</td>
                <td className="col-6">{pharmacy.Adresi}</td>
                <td className="col-1">
                  {props.userLocation
                    ? `${calculateDistance(
                        props.userLocation.lat,
                        props.userLocation.lng,
                        pharmacy.latitude,
                        pharmacy.longitude
                      ).toFixed(1)} KM`
                    : '...'}
                </td>
                <td className="col-4">{pharmacy.Telefon}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
}

export default PharmacyTable;
