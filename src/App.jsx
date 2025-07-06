import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AuthService } from './appwrite/auth'
import { Footer, FullPageLoader, Header, Loading, LoadingSplash } from "./components"
import { login, logout } from "./store/authSlice"
import { Outlet } from "react-router-dom"
import { setPostLoading, setPosts } from "./store/postSlice"
import service from "./appwrite/config"
import { toast } from "react-toastify"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authService = new AuthService();
  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    }).finally(async () => {
      setLoading(false);
      dispatch(setPostLoading(true));
      service.getPosts().then((posts) => {
        toast("Posts Fetched", 200)
        dispatch(setPosts(posts.documents))
      }).catch((err) => toast("Error While Fetching the Posts"))
    })
  }, [])
  return !loading ? (
    <div className="min-h-screen flex flex-col theme-bg-primary transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <>
      <Loading props={{
        appName: "BlogVerse",
        tagline: "Unleash your words",
        color: "text-orange-500"
      }} />
    </>
  )
}
export default App 