import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getBusTimes } from '../services/busService';

const FROM_STOP_ID = '900063202';
const TO_STOP_ID = '900062202';

export default function BusTimes() {
  useEffect(() => {
    getBusTimes(FROM_STOP_ID, TO_STOP_ID);
  }, []);
  return (
    <div>
      <h1>Bus Times Page</h1>
      <Link to="/">
        <button type="button">Back to Home</button>
      </Link>
    </div>
  );
}
