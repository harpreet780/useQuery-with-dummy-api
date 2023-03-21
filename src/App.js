import Home from './page/home';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './page/products';
import ErrorPage from "./page/errorPage";

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
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
