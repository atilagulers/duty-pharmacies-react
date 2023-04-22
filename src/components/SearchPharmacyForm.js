import React, {useEffect} from 'react';
import {Form, Container, Button} from 'react-bootstrap';

function SearchPharmacyForm(props) {
  return (
    <Form className="p-4 me-3 shadow rounded-3">
      <Form.Group className="mb-4" controlId="cityForm">
        <Form.Select
          onChange={props.handleChangeCity}
          defaultValue={''}
          aria-label="Select City"
        >
          <option value={''} disabled={true}>
            İl Seçiniz
          </option>
          {props.cities &&
            props.cities.map((city, i) => (
              <option value={city.SehirSlug} key={i}>
                {city.SehirAd}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      {props.selectedCity && (
        <Form.Group className="mb-4" controlId="countyForm">
          <Form.Select
            onChange={props.handleChangeCounty}
            aria-label="Select County"
            defaultValue={'123'}
          >
            <option value={''}>Tüm ilçeler</option>
            {props.counties &&
              props.counties.map((county, i) => (
                <option value={county.ilceSlug} key={i}>
                  {county.ilceAd}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      )}

      <Container className="d-grid px-0">
        <Button
          onClick={props.handleClickSearch}
          className="btn-block"
          variant="success"
          type="submit"
          disabled={props.isSearching}
        >
          Ara
        </Button>
      </Container>
    </Form>
  );
}

export default SearchPharmacyForm;
