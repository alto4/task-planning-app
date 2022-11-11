import { useQuery, useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
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
      console.log('data');
      return res;
    },
    ...options,
  });
};
