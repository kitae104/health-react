import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import DoctorRegister from "./pages/DoctorRegister"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Profile from "./pages/Profile"
import UpdateProfile from "./pages/UpdateProfile"
import UpdatePassword from "./pages/UpdatePassword"
import BookAppointment from "./pages/BookAppointment"
import MyAppointments from "./pages/MyAppointments"

function App() {

    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                {/* 일반 라우터 */}
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />

                <Route path="/register" element={<Register />} />
                <Route path="/register-doctor" element={<DoctorRegister />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* 환자용 라우터 */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/my-appointments" element={<MyAppointments />} />


                {/* 환자 & 의사 라우터 */}
                <Route path="/update-password" element={<UpdatePassword />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
