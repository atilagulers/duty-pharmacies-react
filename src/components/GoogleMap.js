import React, {useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const GoogleMap = ({userLocation, selectedPharmacy}) => {
  useEffect(() => {
    async function findNearestPharmacy(lat, lng, radius, apiKey) {
      try {
        const url = `${process.env.REACT_APP_API_URL}/duty-pharmacies/nearest-pharmacy?lat=${selectedPharmacy.latitude}&lng=${selectedPharmacy.longitude}&radius=100`;
        const response = await axios.get(url);
        const pharmacy = response.data;
        openPharmacyInGoogleMaps(pharmacy);
      } catch (error) {
        console.error('API isteği sırasında bir hata oluştu:', error);
      }
    }
    findNearestPharmacy();
  }, [selectedPharmacy]);

  const openPharmacyInGoogleMaps = (pharmacy) => {
    const {formatted_address, geometry} = pharmacy;
    const {lat, lng} = geometry.location;
    const encodedAddress = encodeURIComponent(formatted_address);

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}&query_place_id=${pharmacy.place_id}`;
    const universalLink = `https://maps.apple.com/?q=${lat},${lng}&ll=${lat},${lng}`;

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

    if (isIOS) {
      window.open(universalLink, '_blank');
    } else {
      window.open(mapUrl, '_blank');
    }
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
