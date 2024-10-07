import {createBrowserRouter, RouterProvider} from "react-router-dom";


import NotFound from "./page/NotFound.jsx";
import Moviespage from "./page/Moviespage.jsx";
import Searchpage from "./page/Searchpage.jsx"; 
import Signuppage from "./page/Signuppage.jsx"; 
import Loginpage from "./page/Loginpage.jsx"; 
import RootLayout from "./layout/RootLayout.jsx";
import MoviesList from "./components/MoviesList.jsx";


const router = createBrowserRouter([
  {
      path: '/',
      element: <RootLayout/>,
      errorElement: <NotFound/>,
      children: [
          {

              index: true,
              element: <MoviesList/>
          },
          {
              path: 'movies',
              element: <Moviespage/>
          },
          {
            path: 'login',
            element: <Loginpage/>
          },
          {
            path: 'signup',
            element: <Signuppage/>
          },
          {
            path: 'search',
            element: <Searchpage/>
          }
      ]
  },

])

function App() {
  return <RouterProvider router={router}/>
}

export default App;