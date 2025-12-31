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
import ConsultationHistory from "./pages/ConsultationHistory"
import { DoctorsAndPatientsRoute, PatientsOnlyRoute } from "./services/Guard"

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
                <Route path="/profile" element={<PatientsOnlyRoute element={<Profile />} />} />
                <Route path="/update-profile" element={<PatientsOnlyRoute element={<UpdateProfile />} />} />
                <Route path="/book-appointment" element={<PatientsOnlyRoute element={<BookAppointment />} />} />
                <Route path="/my-appointments" element={<PatientsOnlyRoute element={<MyAppointments />} />} />
                <Route path="/consultation-history" element={<PatientsOnlyRoute element={<ConsultationHistory />} />} />

                {/* 환자 & 의사 라우터 */}
                <Route path="/update-password" element={<DoctorsAndPatientsRoute element={<UpdatePassword />} />} />

                {/* 의사용 라우터 */}

                {/* 모두 접근 가능한 라우터 */}
                <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
