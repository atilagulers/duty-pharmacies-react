import {Table} from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import TableItem from './TableItem';
import {calculateDistance} from '../utils';
import {useDispatch, useSelector} from 'react-redux';
import {setPharmacies} from '../features/query/querySlice';

function PharmacyTable(props) {
  const dispatch = useDispatch();

  const sortedPharmacies = [...props.pharmacies].sort((a, b) => {
    // Calculate distances between user and pharmacies
    const distanceA = calculateDistance(
      props.userLocation.lat,
      props.userLocation.lng,
      a.latitude,
      a.longitude
    );
    const distanceB = calculateDistance(
      props.userLocation.lat,
      props.userLocation.lng,
      b.latitude,
      b.longitude
    );
    // Sort based on distance
    return distanceA - distanceB;
  });

  return (
    <Table bordered striped>
      <thead className="bg-custom-black text-light">
        <tr>
          <th>
            Eczaneler -{' '}
            {new Date().toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </th>
          <th>Konum</th>
        </tr>
      </thead>
      <tbody>
        {props.isFetching ? (
          <tr>
            <td colSpan="3">
              <LoadingSpinner />
            </td>
          </tr>
        ) : (
          props.pharmacies.map((pharmacy, i) => (
            <TableItem
              key={i}
              index={i}
              pharmacy={pharmacy}
              userLocation={props.userLocation}
              handleClickPharmacy={props.handleClickPharmacy}
            />
          ))
        )}
      </tbody>
    </Table>
  );
}

export default PharmacyTable;
