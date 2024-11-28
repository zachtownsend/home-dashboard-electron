const API_URL = 'https://v6.bvg.transport.rest';

export const getBusTimes = async (fromStopId: string, toStopId: string) => {
  const response = await fetch(
    `${API_URL}/journeys?from=${fromStopId}&to=${toStopId}&limit=5`,
  );
  const data = await response.json();
  console.log({ data });
  return data;
};
