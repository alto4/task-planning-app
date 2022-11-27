import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

export const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const useFetch = (key, endpoint, options, token) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      let res = await axios.get(endpoint, getConfig(token));

      return res;
    },
    ...options,
  });
};
