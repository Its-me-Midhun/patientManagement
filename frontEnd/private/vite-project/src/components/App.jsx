import { useEffect, useState } from 'react';
import Login from './login/login';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Navbar from './navbar/navbar';
import SignupPage from './signUp/signUp';
import HomePage from './Home/Home';
import Footer from './Footer/Footer';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, resetErrorMessage, resetSuccessMessage } from '../actions';
import Dashboard from './Dashboard/Dashboard';
import MedicalInfoForm from './Medicalinfo/Medicalinfo';
import ConsultationForm from './Consultations/Consultations';
import VaccinationForm from './Vaccinations/Vaccinations';
import ViewProfilePage from './Profile/Profile';
import ChangePasswordPage from './changePassword/changePassword';
import PatientForm from './Patientform/Patientform';
import { setData } from '../api/service';
import NotFound from './404/404';
import ConsultationsPage from './consultationsListing/consultationsListing';
import VaccinationsPage from './vaccinationListing/vaccinationListing';

function App() {
  const navigate = useNavigate();
  const [checkToken, setcheckToken] = useState(false);
  const dispatch = useDispatch();
  const { successMessage, errorMessage, loader, designations } = useSelector(
    (state) => state.commonReducer
  );
  const { pathname } = useLocation();
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        style: {
          border: '0.01rem solid #6c63ff',
          padding: '16px',
          backgroundColor: 'black',
          color: 'white',
        },
        iconTheme: {
          primary: '#6c63ff',
          secondary: '#FFFAEE',
        },
      });
      dispatch(resetSuccessMessage());
    } else if (errorMessage) {
      toast.error(errorMessage, {
        style: {
          border: '0.01rem solid red',
          padding: '16px',
          backgroundColor: 'black',
          color: 'white',
        },
        iconTheme: {
          primary: 'red',
          secondary: '#FFFAEE',
        },
      });
      dispatch(resetErrorMessage());
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const GetProfile = async () => {
    if (localStorage.getItem('accessTocken') === null) {
      navigate('/');
    } else {
      const { data } = await setData('/auth/GetProfile', {
        token: localStorage.getItem('accessTocken'),
      });
      console.log('data.success', data.success);

      setcheckToken(data.success);
      if (data.success) {
        if (
          pathname === '/' ||
          pathname === '/login' ||
          pathname === '/signUp'
        ) {
          navigate('/dashboard');
        } else {
          navigate(pathname);
        }
      } else {
        navigate('/');
      }
    }
  };
  useEffect(() => {
    GetProfile();
  }, [localStorage.getItem('accessTocken')]);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <Navbar checkToken={checkToken} />
      </div>
      <div>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/signUp" element={<SignupPage />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          {/* <Route exact path="/healthinfo" element={<MedicalInfoForm />}></Route> */}
          <Route exact path="/vaccine" element={<VaccinationForm />}></Route>
          <Route exact path="/profile" element={<ViewProfilePage />}></Route>
          <Route
            exact
            path="/patientform/:id"
            element={<PatientForm />}
          ></Route>

          <Route
            exact
            path="/changePassword"
            element={<ChangePasswordPage />}
          ></Route>

          <Route
            exact
            path="/consultations"
            element={<ConsultationForm />}
          ></Route>
          <Route path="/*" element={<NotFound />}></Route>
          <Route
            path="/consultationsList"
            element={<ConsultationsPage />}
          ></Route>
          <Route
            path="/vaccinationsList"
            element={<VaccinationsPage />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
