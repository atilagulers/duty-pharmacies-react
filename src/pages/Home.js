import React, {useEffect, useState} from 'react';
import {Form, Button, Container, Table} from 'react-bootstrap';
import axios from 'axios';
import SearchPharmacyForm from '../components/SearchPharmacyForm';

function Home() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/cities`
        );
        setCities(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCities();
  }, []);

  const handleChangeCity = async function (e) {
    console.log(e.target.value);
    const city = e.target.value;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}?city${city}`
      );
      setCities(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickSearch = function () {};

  return (
    <Container className="mt-5 d-flex justify-content-start">
      <SearchPharmacyForm cities={cities} handleChangeCity={handleChangeCity} />
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}

export default Home;
