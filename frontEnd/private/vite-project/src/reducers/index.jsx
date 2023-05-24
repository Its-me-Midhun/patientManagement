import { combineReducers } from 'redux';

// ===================================================================
// COMMON REDUCER

const initialStateCommon = {
  isOpen: false,
  successMessage: null,
  errorMessage: null,
  loader: false,
};
const commonReducer = (state = initialStateCommon, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'RESET_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: null,
      };
    case 'RESET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: null,
      };
    case 'LOADER_TRUE':
      return {
        ...state,
        loader: true,
      };
    case 'LOADER_FALSE':
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};

const initialStateAuth = {
  islogin: localStorage.getItem('accessTocken')
    ? localStorage.getItem('accessTocken')
    : null,
  role: '',
};

const authReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case 'IS_LOGIN':
      return {
        ...state,
        islogin: localStorage.getItem('accessTocken'),
        role: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        role: null,
      };

    default:
      return state;
  }
};

// functionality reducers
const initialStateFunction = {
  dropdownDataConsultations: [],
  profile: [],
  allconsultations: [],
  consultationsById: [],
  success: null,
  consultationDataById: [],
  vaccinationDropdown: [],
  allvaccinations: [],
  vaccinationDataById: [],
  consultationsByLoginId: [],
  vaccinationsByLoginId: [],
};
const functionReducer = (state = initialStateFunction, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        dropdownDataConsultations: action.payload,
      };
    case 'PROFILE': {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case 'ALL_CONSULTATIONS': {
      return {
        ...state,
        allconsultations: action.payload,
      };
    }
    case 'CONSULTATIONS_BY_LOGIN_ID': {
      return {
        ...state,
        consultationsByLoginId: action.payload,
      };
    }
    case 'VACCINATION_BY_LOGIN_ID': {
      return {
        ...state,
        vaccinationsByLoginId: action.payload,
      };
    }
    case 'ALL_VACCINATIONS': {
      return {
        ...state,
        allvaccinations: action.payload,
      };
    }
    case 'CONSULTATIONS_BY_ID': {
      return {
        ...state,
        consultationsById: action.payload,
        success: action.successStatus,
        consultationDataById: action.consultationData,
      };
    }
    case 'VACCINATIONS_BY_ID': {
      return {
        ...state,
        vaccinationDataById: action.payload,
      };
    }
    case 'FETCH_DATA_VACCINATION': {
      return {
        ...state,
        vaccinationDropdown: action.payload,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  commonReducer,
  authReducer,
  functionReducer,
});
