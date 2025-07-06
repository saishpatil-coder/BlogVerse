import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { store } from './store/store.js'
import { Protected } from './components'
import {Home , LoginPage , SignUpPage , AddPost , EditPost , Post, Profile, AuthorPage, Verify, AboutMe} from "./pages"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <LoginPage />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignUpPage />
          </Protected>
        ),
      },
     
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            {" "}
            <AddPost />
          </Protected>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            {" "}
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/profile",
        element: (
          <Protected authentication>
            <Profile />
          </Protected>
        ),
      },
      {
        path: "/author/:userId",
        element: <AuthorPage />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/about",
        element: <AboutMe />,
      },
    ],
  },
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    <RouterProvider router={router}/>
  </Provider>
)
