import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';

function PharmacyTable(props) {
  return (
    <Table bordered striped hover size="lg" className=" rounded-5">
      <thead className="bg-custom-black text-light">
        <tr>
          <th>Eczane</th>
          <th>Adres</th>
          <th>Telefon</th>
        </tr>
      </thead>
      <tbody>
        {props.dutyPharmacies &&
          props.dutyPharmacies.map((pharmacy, i) => {
            return (
              <tr key={i}>
                <td className="col-2">{pharmacy.EczaneAdi}</td>
                <td className="col-6">{pharmacy.Adresi}</td>
                <td className="col-4">{pharmacy.Telefon}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default PharmacyTable;
