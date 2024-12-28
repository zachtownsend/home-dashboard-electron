import { useQuery } from '@tanstack/react-query';
import { getTransportTimes } from '../services/transportLinkService';

const useTransportLinkTimes = (fromStopId: string, toStopId: string) => {
  return useQuery({
    queryKey: ['transportTimes', fromStopId, toStopId],
    queryFn: () => getTransportTimes(fromStopId, toStopId),
  });
};

export default useTransportLinkTimes;
