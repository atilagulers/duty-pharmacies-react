import React, {useEffect} from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({userLocation, selectedPharmacy}) => {
  useEffect(() => {
    const replacedText = selectedPharmacy.EczaneAdi.replace(/\s/g, '+');
    window.open(
      `https://www.google.com.tr/search?hl=tr-tr&cs=1&output=search&q=${replacedText}`,
      '_blank'
    );
  }, [selectedPharmacy]);

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
        ></GoogleMapReact>
      )}
    </div>
  );
};

export default GoogleMap;

//AIzaSyBsbjUi2u8qPgzs3zY2H0aF6TAG-xJeLCI
//AIzaSyD0RqaaqIthEDt4_YoaR_568kKpOTHtNag
