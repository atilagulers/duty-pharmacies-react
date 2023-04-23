import React, {useEffect} from 'react';
import {Form, Container, Button} from 'react-bootstrap';

import {useSelector} from 'react-redux';

function SearchPharmacyForm(props) {
  const {cities, counties, selectedCity, selectedCounty} = useSelector(
    (state) => state.query
  );

  return (
    <Form className="p-4 me-3 shadow rounded-3">
      <Form.Group className="mb-4" controlId="cityForm">
        <Form.Select
          onChange={props.handleChangeCity}
          defaultValue={selectedCity}
          aria-label="Select City"
        >
          <option value={''} disabled={true}>
            İl Seçiniz
          </option>
          {cities &&
            cities.map((city, i) => (
              <option value={city.SehirSlug} key={i}>
                {city.SehirAd}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      {selectedCity && (
        <Form.Group className="mb-4" controlId="countyForm">
          <Form.Select
            onChange={props.handleChangeCounty}
            aria-label="Select County"
            defaultValue={selectedCounty}
          >
            <option value={''}>Tüm ilçeler</option>
            {counties &&
              counties.map((county, i) => (
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
          disabled={props.isFetching}
        >
          Ara
        </Button>
      </Container>
    </Form>
  );
}

export default SearchPharmacyForm;
