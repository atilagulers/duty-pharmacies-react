import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const Marker = ({text, onClick}) => (
  <div className="marker" onClick={onClick}>
    <h1>{text}</h1>
  </div>
);

const GoogleMap = ({userLocation, selectedPharmacy}) => {
  const [nearestPharmacy, setNearestPharmacy] = useState(null);

  useEffect(() => {
    const findNearestPharmacy = async () => {
      //try {
      //  console.log(selectedPharmacy);
      //  const response = await axios.get(
      //    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${selectedPharmacy.latitude},${selectedPharmacy.longitude}&radius=1000&type=pharmacy&key=AIzaSyBsbjUi2u8qPgzs3zY2H0aF6TAG-xJeLCI`
      //  );
      //  const nearest = response.data.results[0];
      //  setNearestPharmacy(nearest);
      //} catch (error) {
      //  console.error('Error finding nearest pharmacy:', error);
      //}
    };
    handleMarkerClick();
    findNearestPharmacy();
  }, [selectedPharmacy]);

  const handleMarkerClick = () => {
    const replacedText = selectedPharmacy.EczaneAdi.replace(/\s/g, '+');
    window.open(
      `https://www.google.com.tr/search?hl=tr-tr&cs=1&output=search&q=${replacedText}`,
      '_blank'
    );
  };

  return (
    <div style={{height: '400px', width: '100%'}}>
      {selectedPharmacy && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyD0RqaaqIthEDt4_YoaR_568kKpOTHtNag',
          }}
          defaultZoom={16}
          defaultCenter={{
            lat: selectedPharmacy.latitude,
            lng: selectedPharmacy.longitude,
          }}
        >
          <Marker
            position={{
              lat: selectedPharmacy.latitude,
              lng: selectedPharmacy.longitude,
            }}
            onClick={handleMarkerClick}
          />
        </GoogleMapReact>
      )}
    </div>
  );
};

export default GoogleMap;

//AIzaSyBsbjUi2u8qPgzs3zY2H0aF6TAG-xJeLCI
//AIzaSyD0RqaaqIthEDt4_YoaR_568kKpOTHtNag
