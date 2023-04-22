import React, {useEffect, useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import axios from 'axios';

function Home() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/cities`
        );
        setCities(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCities();
  }, []);

  return (
    <Container fluid>
      <Container>
        <h1>Nöbetçi Eczaneler</h1>
      </Container>
      <Container className="mt-5" style={{maxWidth: '20%'}}>
        <Form>
          <Form.Group className="mb-3" controlId="cityForm">
            <Form.Select aria-label="Select City">
              <option>İl Seçiniz</option>
              {cities &&
                cities.map((city, i) => (
                  <option value={city.SehirSlug} key={i}>
                    {city.SehirAd}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="countyForm">
            <Form.Select aria-label="Select County">
              <option>Tüm ilçeler</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Ara
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default Home;
