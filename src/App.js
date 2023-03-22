import Home from './page/home';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './page/products';
import ErrorPage from "./page/errorPage";
import Wishlist from './page/wishlist';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "product/:productId",
    element:
      <QueryClientProvider client={queryClient}>
        <Products />,
      </QueryClientProvider>,
    errorElement: <ErrorPage />,
  },
  {
    path: "product/wishlist",
    element:
      <QueryClientProvider client={queryClient}>
        <Wishlist />,
      </QueryClientProvider>,
    errorElement: <ErrorPage />,
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
