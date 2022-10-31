// All Reducers must be registered/imported here and should be 
// added to the combineReducers

import authReducer from './authReducer';
import miscReducer from './miscReducer';
import movieReducer from './movieReducer';
import ebooksReducer from './ebooksReducer';
import audiobooksReducer from './audiobooksReducer';
import travelGuideReducer from './travelGuideReducer';
import feedbackReducer from './feedbackReducer';
import musicReducer from './musicReducer';
import countryTravelGuide from './countryTravelGuideReducer.js';
import seriesReducer from './seriesReducer.js';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["auth", "misc", "movie",  "ebook", "audiobook", "travelGuide", "countryTravelGuide", "feedback", "series"]
}

const allReducers = combineReducers({
    auth: authReducer,
    misc: miscReducer,
    movie: movieReducer,
    ebook: ebooksReducer,
    audiobook: audiobooksReducer,
    travelGuide: travelGuideReducer,
    feedback: feedbackReducer,
    music: musicReducer,
    countryTravelGuide: countryTravelGuide,
    series: seriesReducer
})

export default persistReducer(persistConfig, allReducers);