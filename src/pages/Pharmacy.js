import React, {useEffect} from 'react';

import PharmacyDetails from '../components/PharmacyDetails';

function Pharmacy(props) {
  return <PharmacyDetails userLocation={props.userLocation} />;
}

export default Pharmacy;
