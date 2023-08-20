import { useLocation  } from 'react-router-dom';
import Calendar from './Calendar';

const LocationComponent = props => {
    const location = useLocation()
    return <Calendar location={location} />
}

export default LocationComponent;