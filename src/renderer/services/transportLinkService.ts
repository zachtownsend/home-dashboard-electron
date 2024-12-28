/**
 * Service for fetching transport times from the BVG API.
 *
 * NOTES:
 * Check this for the journey response: https://github.com/public-transport/hafas-client/blob/6/docs/journeys.md
 * Check this for OpenAPI schema: https://petstore.swagger.io/?url=https%3A%2F%2Fv6.bvg.transport.rest%2F.well-known%2Fservice-desc%0A#/default/get_journeys
 *
 *
 */

const API_URL = 'https://v6.bvg.transport.rest';

type BVGJourneyLegMode =
  | 'bus'
  | 'express'
  | 'ferry'
  | 'regional'
  | 'suburban'
  | 'subway'
  | 'tram';

interface BVGJourneyLeg {
  arrival: string; // Date string
  arrivalDelay: number;
  arrivalPlatform: string | null;

  departure: string; // Date string
  departureDelay: number;
  departurePlatform: string | null;
  line: {
    id: string;
    mode: BVGJourneyLegMode;
    name: string;
    product: BVGJourneyLegMode;
    productName: string;
    type: 'line';
    public: boolean;
    occupancy: 'low' | 'normal' | 'high';
  };
}

type BVGJourney = {
  refreshToken: string;
  cycle: {
    min: number;
  };
  legs: BVGJourneyLeg[];
  type: 'journey';
};

interface BVGJourneyResponse {
  journeys: BVGJourney[];
  realtimeDataUpdatedAt: number;
  earlierRef: string;
  laterRef: string;
}

// eslint-disable-next-line import/prefer-default-export
export const getTransportTimes = async (
  fromStopId: string,
  toStopId: string,
) => {
  const response = await fetch(
    `${API_URL}/journeys?from=${fromStopId}&to=${toStopId}&results=5`,
  );
  const data = (await response.json()) as BVGJourneyResponse;
  console.log(data.journeys);
  return data.journeys;
};
