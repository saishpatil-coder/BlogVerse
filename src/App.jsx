import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AuthService } from './appwrite/auth'
import { Footer, FullPageLoader, Header, Loading, LoadingSplash } from "./components"
import { login, logout } from "./store/authSlice"
import { Outlet } from "react-router-dom"
function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const authService = new AuthService();
  useEffect(()=>{
    authService.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    }).finally(()=>{
      setLoading(false);
    })
  },[])
  return !loading ? (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  ) : (
    <>
   <Loading props={{appName : "BlogVerse",
  tagline : "Unleash your words",
  color : "text-orange-500"}} />
    </>
  )
}
export default App 