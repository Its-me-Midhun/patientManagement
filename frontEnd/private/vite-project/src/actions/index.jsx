// ===================================================================
// COMMON ACTIONS

import { getData, setData } from '../api/service';

// toaster for success messsage
export const setSuccessMessage = (data) => (dispatch) => {
  dispatch({
    type: 'SUCCESS_MESSAGE',
    payload: data,
  });
};

// toaster for error message
export const setErrorMessage = (data) => (dispatch) => {
  dispatch({
    type: 'ERROR_MESSAGE',
    payload: data,
  });
};

// reset  success message toaster
export const resetSuccessMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_SUCCESS_MESSAGE',
  });
};

// reset error message toaster
export const resetErrorMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_ERROR_MESSAGE',
  });
};

export const loaderTrue = () => (dispatch) => {
  dispatch({
    type: 'LOADER_TRUE',
  });
};

export const loaderFalse = () => (dispatch) => {
  dispatch({
    type: 'LOADER_FALSE',
  });
};

// ===================================================================
// AUTH ACTIONS

// action for login
export const islogin = (loginData) => async (dispatch) => {
  console.log('loginData', loginData);
  let { data } = await setData('/auth/login', loginData);
  console.log('dastasibn', data);
  if (data.success) {
    localStorage.setItem('accessTocken', data?.data?.accessToken);
    localStorage.setItem('Role', data?.data?.role);
    dispatch({
      type: 'IS_LOGIN',
      payload: data.data.role,
    });
    dispatch(setSuccessMessage('Login success'));
  } else {
    dispatch(setErrorMessage(data?.message));
  }
};

export const signUp = (Formdata, navigate) => async (dispatch) => {
  let { data } = await setData('auth/signup', Formdata);
  if (data.success) {
    dispatch({
      type: 'SIGNUPDATA',
      payload: Formdata,
    });
    dispatch(setSuccessMessage('Details Added Successfully'));
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/payment_details');
};

export const changePassword = (Formdata, navigate) => async (dispatch) => {
  let { data } = await setData('auth/changePassword', Formdata);
  if (data.success) {
    dispatch(setSuccessMessage(data.msg));
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  navigate('/dashboard');
};

export const getDepartmentHospitalDoctor = (navigate) => async (dispatch) => {
  let { data } = await getData('/consultation');
  console.log('data', data);
  if (data.success) {
    dispatch({
      type: 'FETCH_DATA',
      payload: data.data,
    });
    dispatch(setSuccessMessage('Data retrieval success'));
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/login');
};

export const setConsultationData = (Formdata, navigate) => async (dispatch) => {
  console.log('Formdata', Formdata);
  let { data } = await setData('/consultation', Formdata);
  console.log('data', data);
  if (data.success) {
    dispatch(setSuccessMessage(data.msg));
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/');
};
export const getProfile = (Formdata) => async (dispatch) => {
  let { data } = await getData('auth/profile');
  console.log('data', data);
  if (data.success) {
    dispatch({
      type: 'PROFILE',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/');
};

export const setMedicalInfoData = (Formdata, navigate) => async (dispatch) => {
  console.log('Formdata', Formdata);
  let { data } = await setData('/medicalInfo', Formdata);
  console.log('data', data);
  if (data.success) {
    dispatch(setSuccessMessage(data.msg));
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/');
};

export const getAllConsultations = (navigate) => async (dispatch) => {
  let { data } = await getData('/consultation/list');
  console.log('dfgsdhiuhdfsiughiduhxfiuhdfhgiyeiu', data);
  if (data.success) {
    dispatch({
      type: 'ALL_CONSULTATIONS',
      payload: data.data1,
    });
    dispatch(setSuccessMessage(data.msg));
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/');
};

export const getPatientByID = (id, navigate) => async (dispatch) => {
  let { data } = await getData(`/consultation/list/${id}`);
  console.log('datagetPatientByID', data);
  if (data.success) {
    dispatch({
      type: 'CONSULTATIONS_BY_ID',
      payload: data.data,
      successStatus: data.success,
      doctorData: data.doctorDataById,
      consultationData: data.consultationById,
    });
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/');
};

export const setconsultationCertificate =
  (formData, navigate) => async (dispatch) => {
    let { data } = await setData('/consultation/certificate', formData);
    console.log('setconsultationCertificate', data);
    // if (data.success) {
    //   dispatch({
    //     type: 'CONSULTATIONS_BY_ID',
    //     payload: data.data,
    //     successStatus: data.success,
    //     doctorData: data.doctorDataById,
    //     consultationData: data.consultationById,
    //   });
    // } else {
    //   dispatch(setErrorMessage(data.msg));
    // }

    // navigate('/');
  };

export const getVaccinationListingDropdown = (navigate) => async (dispatch) => {
  let { data } = await getData('/vaccination/data');
  console.log('data', data);
  if (data.success) {
    dispatch({
      type: 'FETCH_DATA_VACCINATION',
      payload: data.data,
    });
    dispatch(setSuccessMessage('Data retrieval success'));
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/login');
};

export const setVaccination = (formdata, navigate) => async (dispatch) => {
  let { data } = await setData('/vaccination', formdata);
  console.log('data', data);
  if (data.success) {
    dispatch(setSuccessMessage(data.msg));
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/login');
};

export const getAllVaccinations = (navigate) => async (dispatch) => {
  let { data } = await getData('/vaccination');
  console.log('getAllVaccinations', data);
  if (data.success) {
    dispatch({
      type: 'ALL_VACCINATIONS',
      payload: data.data,
    });
    dispatch(setSuccessMessage(data.msg));
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/');
};

export const getVaccinationsByID = (id, navigate) => async (dispatch) => {
  let { data } = await getData(`/vaccination/list/${id}`);
  console.log('datagetPatientByID', data);
  if (data.success) {
    dispatch({
      type: 'VACCINATIONS_BY_ID',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/');
};

export const setvaccinationCertificate =
  (formData, navigate) => async (dispatch) => {
    let { data } = await setData('/vaccination/certificate', formData);
    console.log('setconsultationCertificate', data);
    if (data.success) {
      dispatch({
        type: 'VACCINATIONS_BY_ID',
        payload: data.data,
      });
      dispatch(setSuccessMessage(data.msg));
    } else {
      dispatch(setErrorMessage(data.msg));
    }

    // navigate('/');
  };

export const getConsultationsWithLogin = (navigate) => async (dispatch) => {
  let { data } = await getData('/consultation/loginData');
  console.log('getConsultationsWithLogin', data);
  if (data.success) {
    dispatch({
      type: 'CONSULTATIONS_BY_LOGIN_ID',
      payload: data.data,
    });
    dispatch(setSuccessMessage(data.msg));
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/');
};

export const getVaccinationWithLogin = (navigate) => async (dispatch) => {
  let { data } = await getData('/vaccination/logindata');
  console.log('getVaccinationWithLogin', data);
  if (data.success) {
    dispatch({
      type: 'VACCINATION_BY_LOGIN_ID',
      payload: data.data,
    });
    dispatch(setSuccessMessage(data.msg));
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  // navigate('/');
};

export const Logout = (navigate) => async (dispatch) => {
  localStorage.removeItem('Role');
  localStorage.removeItem('accessTocken');
};
