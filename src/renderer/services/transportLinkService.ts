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

type BVGProduct =
  | 'bus'
  | 'express'
  | 'ferry'
  | 'regional'
  | 'suburban'
  | 'subway'
  | 'tram';

export type BVGDeparture = {
  tripId: string;
  stop: {
    name: string;
    products: {
      suburban: boolean;
      subway: boolean;
      tram: boolean;
      bus: boolean;
      ferry: boolean;
      express: boolean;
      regional: boolean;
    };
  };
  when: string;
  plannedWhen: string;
  delay: number;
  direction: string;
  occupancy: string;
  line: {
    name: string;
    product: BVGProduct;
    productName: string;
    public: boolean;
    occupancy: 'low' | 'normal' | 'high';
  };
};

interface BVGDeparturesResponse {
  departures: BVGDeparture[];
  realtimeDataUpdatedAt: number;
}

// eslint-disable-next-line import/prefer-default-export
export const getTransportTimes = async (fromStopId: string) => {
  const response = await fetch(`${API_URL}/stops/${fromStopId}/departures`);
  const data = (await response.json()) as BVGDeparturesResponse;
  const sortedDepartures = data.departures.sort(
    (a, b) => new Date(a.when).getTime() - new Date(b.when).getTime(),
  );
  console.log(sortedDepartures);
  return sortedDepartures;
};
