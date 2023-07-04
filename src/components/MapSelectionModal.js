import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';

function MapSelectionModal({
  showModal,
  setShowModal,
  openPharmacyInMaps,
  selectedPharmacy,
}) {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenGoogleMaps = () => {
    openPharmacyInMaps(selectedPharmacy, 'google');
    handleCloseModal();
  };

  const handleOpenAppleMaps = () => {
    openPharmacyInMaps(selectedPharmacy, 'apple');
    handleCloseModal();
  };

  const handleOpenYandexMaps = () => {
    openPharmacyInMaps(selectedPharmacy, 'yandex');
    handleCloseModal();
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>My Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This is the content of my modal.</p>
          <Button
            className="d-block mb-3"
            variant="primary"
            onClick={handleOpenGoogleMaps}
          >
            Google Haritalar ile aç
          </Button>
          <Button
            className="d-block mb-3"
            variant="primary"
            onClick={handleOpenAppleMaps}
          >
            Apple Haritalar ile aç
          </Button>
          <Button
            className="d-block mb-3"
            variant="primary"
            onClick={handleOpenYandexMaps}
          >
            Yandex Haritalar ile aç
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MapSelectionModal;
