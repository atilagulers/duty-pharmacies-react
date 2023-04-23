import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

function LoadingSpinner() {
  return (
    <Container
      className="d-flex justify-content-center align-items-start"
      style={{height: '100vh'}}
    >
      <div className="text-center">
        <Spinner className="mx-auto d-block" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </Container>
  );
}

export default LoadingSpinner;
