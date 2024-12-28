import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import useTransportLinkTimes from '../hooks/useTransportLinkTimes';

// TODO: Make these dynamic
const FROM_STOP_ID = '900063202';
const TO_STOP_ID = '900062202';
const REFRESH_INTERVAL = 60;

export default function JourneyTimes() {
  const {
    data: transportTimes,
    // isLoading,
    // isError,
    // error,
    refetch,
  } = useTransportLinkTimes(FROM_STOP_ID, TO_STOP_ID);
  const now = new Date();
  const [refreshCount, setRefreshCount] = useState(REFRESH_INTERVAL);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount((prev) => prev - 1);
    }, 1000);

    if (refreshCount === 0) {
      refetch();
      setRefreshCount(REFRESH_INTERVAL);
    }
    return () => clearInterval(interval);
  }, [refetch, refreshCount]);

  return (
    <div>
      <h1>Transport Links Page</h1>
      <div>Refreshing in {refreshCount} seconds</div>
      <div>
        {transportTimes ? (
          <ul>
            {transportTimes?.map((transportTime: any) => {
              const leg = transportTime.legs[0];
              const departureDate = new Date(leg.departure);
              const delayedDepartureMs =
                departureDate.getTime() + leg.departureDelay * 1000;
              const minutesUntilDeparture = Math.ceil(
                (delayedDepartureMs - now.getTime()) / (1000 * 60),
              );
              return (
                <li
                  key={transportTime.refreshToken}
                  className="flex align-center"
                >
                  <FontAwesomeIcon icon={faBus} />
                  <p className="ml-2">{leg.line.name}</p>
                  <p className="ml-2">{minutesUntilDeparture} minutes</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No transport times found</p>
        )}
      </div>
      <Link to="/">
        <button type="button">Back to Home</button>
      </Link>
    </div>
  );
}
