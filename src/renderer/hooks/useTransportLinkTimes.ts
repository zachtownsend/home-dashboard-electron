import { useQuery } from '@tanstack/react-query';
import { getTransportTimes } from '../services/transportLinkService';

const useTransportLinkTimes = (fromStopId: string) => {
  return useQuery({
    queryKey: ['transportTimes', fromStopId],
    queryFn: () => getTransportTimes(fromStopId),
  });
};

export default useTransportLinkTimes;
