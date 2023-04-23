import React, {useEffect} from 'react';
import {Container, Table} from 'react-bootstrap';
import {useSelector} from 'react-redux';

function PharmacyDetails(props) {
  const {selectedPharmacy} = useSelector((state) => state.query);

  return (
    <Container className="mt-5">
      <h1 className="mb-3">
        {selectedPharmacy.EczaneAdi} - {selectedPharmacy.Semt} (
        {selectedPharmacy.Sehir})
      </h1>
      <Table>
        <thead className="bg-custom-black text-light">
          <tr>
            <th>Eczane</th>
            <th>Adres</th>
            <th>Telefon</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="col-2">{selectedPharmacy.EczaneAdi}</td>
            <td className="col-6">{selectedPharmacy.Adresi}</td>
            <td className="col-4">{selectedPharmacy.Telefon}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
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
