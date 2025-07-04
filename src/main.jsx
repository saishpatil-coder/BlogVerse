import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { store } from './store/store.js'
import { Protected } from './components'
import {Home , LoginPage , SignUpPage , AddPost , EditPost , Post, Profile, AuthorPage, Verify} from "./pages"
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
    ],
  },
])
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
)
