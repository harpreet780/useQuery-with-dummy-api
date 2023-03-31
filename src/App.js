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
import Cart from './page/cart';
import { Provider } from 'react-redux';
import store from './page/redux/store/store';
import AddressForm from './page/addressForm';
import Order from './page/order';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/product",
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
        <Products />
      </QueryClientProvider>,
    errorElement: <ErrorPage />,
  },
  {
    path: "product/wishlist",
    element:
      <QueryClientProvider client={queryClient}>
        <Wishlist />
      </QueryClientProvider>,
    errorElement: <ErrorPage />,
  },
  {
    path: "product/cart",
    element:
      <QueryClientProvider client={queryClient}>
        <Cart />
      </QueryClientProvider>,
    errorElement: <ErrorPage />,
  },
  {
    path: "product/address",
    element:
      <QueryClientProvider client={queryClient}>
        <AddressForm />
      </QueryClientProvider>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product/order",
    element:
      <QueryClientProvider client={queryClient}>
        <Order />
      </QueryClientProvider>,
    errorElement: <ErrorPage/>,
  },
])

function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
