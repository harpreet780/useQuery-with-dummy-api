import Home from './page/home';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './page/products';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
  },
  {
    path: "product/:productId",
    element:
      <QueryClientProvider client={queryClient}>
        <Products />,
      </QueryClientProvider>
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
