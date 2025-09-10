// hooks/useMotivationalQuote.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Quote = {
  q: string; // Quote text
  a: string; // Author
};

export const useMotivationalQuote = () => {
  return useQuery<Quote>({
    queryKey: ['motivationalQuote'],
    queryFn: async () => {
      const response = await axios.get<Quote[]>('https://zenquotes.io/api/random');
      return response.data[0]; // Pegamos apenas o primeiro item
    },
  });
};
