import React, {useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const GoogleMap = ({userLocation, selectedPharmacy}) => {
  useEffect(() => {
    async function findNearestPharmacy(lat, lng, radius, apiKey) {
      try {
        const url = `${process.env.REACT_APP_API_URL}/duty-pharmacies/nearest-pharmacy?lat=${selectedPharmacy.latitude}&lng=${selectedPharmacy.longitude}&radius=10`;

        const response = await axios.get(url);
        const pharmacy = response.data.results[0];
        const pharmacyLocation = pharmacy.geometry.location;
        console.log(pharmacyLocation);
        console.log(pharmacy);

        openPharmacyInGoogleMaps(pharmacy);
      } catch (error) {
        console.error('API isteği sırasında bir hata oluştu:', error);
      }
    }
    findNearestPharmacy();
  }, [selectedPharmacy]);

  const openPharmacyInGoogleMaps = (pharmacy) => {
    //const {lat, lng} = pharmacy.geometry.location;
    const {formatted_address} = pharmacy;
    const encodedAddress = encodeURIComponent(formatted_address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}&query_place_id=${pharmacy.place_id}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{height: '400px', width: '100%'}}>
      {selectedPharmacy && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: '',
          }}
          defaultZoom={16}
          defaultCenter={{
            lat: selectedPharmacy.latitude,
            lng: selectedPharmacy.longitude,
          }}
        ></GoogleMapReact>
      )}
    </div>
  );
};

export default GoogleMap;

//import React, {useEffect} from 'react';
//import GoogleMapReact from 'google-map-react';

//const GoogleMap = ({userLocation, selectedPharmacy}) => {
//  useEffect(() => {
//    const replacedText = selectedPharmacy.EczaneAdi.replace(/\s/g, '+');
//    window.open(
//      `https://www.google.com.tr/search?hl=tr-tr&cs=1&output=search&q=${replacedText}`,
//      '_blank'
//    );
//  }, [selectedPharmacy]);

//  return (
//    <div style={{height: '400px', width: '100%'}}>
//      {selectedPharmacy && (
//        <GoogleMapReact
//          bootstrapURLKeys={{
//            key: '',
//          }}
//          defaultZoom={16}
//          defaultCenter={{
//            lat: selectedPharmacy.latitude,
//            lng: selectedPharmacy.longitude,
//          }}
//        ></GoogleMapReact>
//      )}
//    </div>
//  );
//};

//export default GoogleMap;
