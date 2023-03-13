import Home from './page/home';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </div>
  );
}

export default App;
