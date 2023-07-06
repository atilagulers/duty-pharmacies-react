import React, {useEffect} from 'react';

const AdsComponent = (props) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{display: 'block'}}
        data-ad-client="ca-pub-3435885379042213"
        data-ad-slot={'8909558637'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default AdsComponent;
