import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBus,
  faTrain,
  faShip,
  faTrainSubway,
  faTram,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import useTransportLinkTimes from '../hooks/useTransportLinkTimes';
import { BVGDeparture, BVGProduct } from '../services/transportLinkService';

// TODO: Make these dynamic
const FROM_STOP_ID = '900063202';
const REFRESH_INTERVAL = 60;

const getProductIcon = (product: BVGProduct): IconDefinition => {
  switch (product) {
    case 'bus':
      return faBus;
    case 'express':
      return faTrain;
    case 'ferry':
      return faShip;
    case 'regional':
      return faTrain;
    case 'suburban':
      return faTrain;
    case 'subway':
      return faTrainSubway;
    case 'tram':
      return faTram;
    default:
      return faBus;
  }
};

export default function JourneyTimes() {
  const {
    data: departures,
    // isLoading,
    // isError,
    // error,
    refetch,
  } = useTransportLinkTimes(FROM_STOP_ID);
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
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Transport Links</h1>
        <p className="text-muted-foreground">
          Refreshing in {refreshCount} seconds
        </p>
      </div>
      <div>
        {departures && departures.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]" />
                <TableHead>Line</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead className="text-right">Departure</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departures.map((departure: BVGDeparture) => {
                const departureDate = new Date(departure.when);
                const delayedDepartureMs =
                  departureDate.getTime() + departure.delay * 1000;
                const minutesUntilDeparture = Math.ceil(
                  (delayedDepartureMs - now.getTime()) / (1000 * 60),
                );
                return (
                  <TableRow key={departure.tripId}>
                    <TableCell>
                      <FontAwesomeIcon
                        icon={getProductIcon(departure.line.product)}
                        className="text-primary"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {departure.line.name}
                    </TableCell>
                    <TableCell>{departure.direction}</TableCell>
                    <TableCell className="text-right">
                      {minutesUntilDeparture} min
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground">No transport times found</p>
        )}
      </div>
      <Link to="/">
        <Button variant="outline">Back to Home</Button>
      </Link>
    </div>
  );
}
