import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cities: [],
  selectedCity: '',
  counties: [],
  selectedCounty: '',
  pharmacies: [],
  selectedPharmacy: {},
  isLoading: true,
  error: null,
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    setCounties: (state, action) => {
      state.counties = action.payload;
    },
    setSelectedCounty: (state, action) => {
      state.selectedCounty = action.payload;
    },
    setPharmacies: (state, action) => {
      state.pharmacies = action.payload;
    },
    setSelectedPharmacy: (state, action) => {
      state.selectedPharmacy = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCities,
  setSelectedCity,
  setCounties,
  setSelectedCounty,
  setPharmacies,
  setSelectedPharmacy,
  setIsLoading,
  setError,
} = querySlice.actions;

export default querySlice.reducer;
