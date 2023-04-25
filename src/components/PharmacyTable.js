import React, {useState} from 'react';

import {Table} from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

import TableItem from './TableItem';

function PharmacyTable(props) {
  return (
    <Table bordered striped hover>
      <thead className="bg-custom-black text-light">
        <tr>
          <th>
            Eczaneler -{' '}
            {new Date().toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </th>
          <th>Konum</th>
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
              <TableItem
                key={i}
                index={i}
                pharmacy={pharmacy}
                userLocation={props.userLocation}
                handleClickPharmacy={props.handleClickPharmacy}
              />
            );
          })
        )}
      </tbody>
    </Table>
  );
}

export default PharmacyTable;
