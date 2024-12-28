import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Home from './pages/Home';
import JourneyTimes from './pages/TransportLinks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bus-times" element={<JourneyTimes />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} /> {/* Development only */}
    </QueryClientProvider>
  );
}
