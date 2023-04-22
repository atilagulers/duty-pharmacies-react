import React, {useEffect} from 'react';
import {Form, Container, Button} from 'react-bootstrap';

function SearchPharmacyForm(props) {
  return (
    <Form className="p-4 me-3 shadow">
      <Form.Group className="mb-4" controlId="cityForm">
        <Form.Select onChange={props.handleChangeCity} aria-label="Select City">
          <option>İl Seçiniz</option>
          {props.cities &&
            props.cities.map((city, i) => (
              <option value={city.SehirSlug} key={i}>
                {city.SehirAd}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4" controlId="countyForm">
        <Form.Select aria-label="Select County">
          <option>Tüm ilçeler</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Form.Group>

      <Container className="d-grid px-0">
        <Button
          //onClick={handleClickSearch}
          className="btn-block"
          variant="dark"
          type="submit"
        >
          Ara
        </Button>
      </Container>
    </Form>
  );
}

export default SearchPharmacyForm;
