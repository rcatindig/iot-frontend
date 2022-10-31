// Constants for Action Types

// AUTH
export const LOGIN_REQUEST = "loginRequest";
export const LOGIN_REQUEST_SUCCESS = "loginRequestSuccess"
export const LOGIN_REQUEST_FAILURE = "loginRequestFailure"

export const LOGOUT_REQUEST = "logoutRequest";
export const LOGOUT_REQUEST_SUCCESS = "logoutRequestSuccess"
export const LOGOUT_REQUEST_FAILURE = "logoutRequestFailure"

export const CLEAR_ERRORS = "clearErrors";
export const TOKEN_EXPIRED = "tokenExpired";
export const PACKAGE_CONSUMED = "packageConsumed";
export const INCREMENT_LOGOUT_ATTEMPTS = "incrementLogoutAttempts";
 
// MISC
export const USER_AGREEMENT_REQUEST = "userAgreementRequest";
export const USER_AGREEMENT_REQUEST_SUCCESS = "userAgreementRequestSuccess"
export const USER_AGREEMENT_REQUEST_FAILURE = "userAgreementRequestFailure"

export const DEVICE_ID_REQUEST = "deviceIdRequest";
export const DEVICE_ID_REQUEST_SUCCESS = "deviceIdRequestSuccess"
export const DEVICE_ID_REQUEST_FAILURE = "deviceIdRequestFailure"

export const MODEL_TYPE_REQUEST = "modelTypeRequest";
export const MODEL_TYPE_REQUEST_SUCCESS = "modelTypeRequestSuccess"
export const MODEL_TYPE_REQUEST_FAILURE = "modelTypeRequestFailure"

export const ADVERTISEMENTS_REQUEST = "advertisementsRequest";
export const ADVERTISEMENTS_REQUEST_SUCCESS = "advertisementsRequestSuccess"
export const ADVERTISEMENTS_REQUEST_FAILURE = "advertisementsRequestFailure"

export const TIME_REMAINING_REQUEST = "timeRemainingRequest";
export const TIME_REMAINING_REQUEST_SUCCESS = "timeRemainingRequestSuccess"
export const TIME_REMAINING_REQUEST_FAILURE = "timeRemainingRequestFailure"

// MOVIES
export const MOVIES_REQUEST = "moviesRequest";
export const MOVIES_REQUEST_SUCCESS = "moviesRequestSuccess"
export const MOVIES_REQUEST_FAILURE = "moviesRequestFailure"

export const MOVIE_DETAILS_REQUEST = "movieDetailsRequest";
export const MOVIE_DETAILS_REQUEST_SUCCESS = "movieDetailsRequestSuccess"
export const MOVIE_DETAILS_REQUEST_FAILURE = "movieDetailsRequestFailure"

export const MOVIE_GENRES_REQUEST = "movieGenresRequest";
export const MOVIE_GENRES_REQUEST_SUCCESS = "movieGenresRequestSuccess"
export const MOVIE_GENRES_REQUEST_FAILURE = "movieGenresRequestFailure"

export const MOVIES_WITH_GENRE_REQUEST = "moviesWithGenresRequest";
export const MOVIES_WITH_GENRE_REQUEST_SUCCESS = "moviesWithGenresRequestSuccess"
export const MOVIES_WITH_GENRE_REQUEST_FAILURE = "moviesWithGenresRequestFailure"


// SERIES
export const SERIES_REQUEST = "seriesRequest";
export const SERIES_REQUEST_SUCCESS = "seriesRequestSuccess"
export const SERIES_REQUEST_FAILURE = "seriesRequestFailure"

export const SERIES_DETAILS_REQUEST = "seriesDetailsRequest";
export const SERIES_DETAILS_REQUEST_SUCCESS = "seriesDetailsRequestSuccess"
export const SERIES_DETAILS_REQUEST_FAILURE = "seriesDetailsRequestFailure"

export const SERIES_SEASONS_REQUEST = "seriesSeasonsRequest";
export const SERIES_SEASONS_REQUEST_SUCCESS = "seriesSeasonsRequestSuccess"
export const SERIES_SEASONS_REQUEST_FAILURE = "seriesSeasonsRequestFailure"

export const SERIES_EPISODES_REQUEST = "seriesEpisodesRequest";
export const SERIES_EPISODES_REQUEST_SUCCESS = "seriesEpisodesRequestSuccess"
export const SERIES_EPISODES_REQUEST_FAILURE = "seriesEpisodesRequestFailure"

export const SERIES_EPISODE_DETAILS_REQUEST = "seriesEpisodeDetailsRequest";
export const SERIES_EPISODE_DETAILS_REQUEST_SUCCESS = "seriesEpisodeDetailsRequestSuccess"
export const SERIES_EPISODE_DETAILS_REQUEST_FAILURE = "seriesEpisodeDetailsRequestFailure"

export const SERIES_GENRES_REQUEST = "seriesGenresRequest";
export const SERIES_GENRES_REQUEST_SUCCESS = "seriesGenresRequestSuccess"
export const SERIES_GENRES_REQUEST_FAILURE = "seriesGenresRequestFailure"

export const SERIES_WITH_GENRE_REQUEST = "seriesWithGenresRequest";
export const SERIES_WITH_GENRE_REQUEST_SUCCESS = "seriesWithGenresRequestSuccess"
export const SERIES_WITH_GENRE_REQUEST_FAILURE = "seriesWithGenresRequestFailure"

// EBOOKS
export const EBOOKS_REQUEST = "ebooksRequest";
export const EBOOKS_REQUEST_SUCCESS = "ebooksRequestSuccess"
export const EBOOKS_REQUEST_FAILURE = "ebooksRequestFailure"

export const EBOOK_DETAILS_REQUEST = "ebookDetailsRequest";
export const EBOOK_DETAILS_REQUEST_SUCCESS = "ebookDetailsRequestSuccess"
export const EBOOK_DETAILS_REQUEST_FAILURE = "ebookDetailsRequestFailure"

export const EBOOK_READ_REQUEST = "ebookReadRequest";
export const EBOOK_READ_REQUEST_SUCCESS = "ebookReadRequestSuccess";
export const EBOOK_READ_REQUEST_FAILURE = "ebookReadRequestFailure";

export const EBOOK_GENRES_REQUEST = "ebookGenresRequest";
export const EBOOK_GENRES_REQUEST_SUCCESS = "ebookGenresRequestSuccess"
export const EBOOK_GENRES_REQUEST_FAILURE = "ebookGenresRequestFailure"

export const EBOOKS_WITH_GENRE_REQUEST = "ebooksWithGenresRequest";
export const EBOOKS_WITH_GENRE_REQUEST_SUCCESS = "ebooksWithGenresRequestSuccess"
export const EBOOKS_WITH_GENRE_REQUEST_FAILURE = "ebooksWithGenresRequestFailure"

// AUDIOBOOKS
export const AUDIOBOOKS_REQUEST = "audiobooksRequest";
export const AUDIOBOOKS_REQUEST_SUCCESS = "audiobooksRequestSuccess"
export const AUDIOBOOKS_REQUEST_FAILURE = "audiobooksRequestFailure"

export const AUDIOBOOK_DETAILS_REQUEST = "audiobookDetailsRequest";
export const AUDIOBOOK_DETAILS_REQUEST_SUCCESS = "audiobookDetailsRequestSuccess"
export const AUDIOBOOK_DETAILS_REQUEST_FAILURE = "audiobookDetailsRequestFailure"

export const AUDIOBOOK_GENRES_REQUEST = "audiobookGenresRequest";
export const AUDIOBOOK_GENRES_REQUEST_SUCCESS = "audiobookGenresRequestSuccess"
export const AUDIOBOOK_GENRES_REQUEST_FAILURE = "audiobookGenresRequestFailure"

export const AUDIOBOOKS_WITH_GENRE_REQUEST = "audiobooksWithGenresRequest";
export const AUDIOBOOKS_WITH_GENRE_REQUEST_SUCCESS = "audiobooksWithGenresRequestSuccess"
export const AUDIOBOOKS_WITH_GENRE_REQUEST_FAILURE = "audiobooksWithGenresRequestFailure"

export const AUDIOBOOK_LISTEN_REQUEST = "audiobookListenRequest";
export const AUDIOBOOK_LISTEN_REQUEST_SUCCESS = "audiobookListenRequestSuccess"
export const AUDIOBOOK_LISTEN_REQUEST_FAILURE = "audiobookListenRequestFailure"

// TRAVEL GUIDES
export const TRAVELGUIDES_REQUEST = "travelGuidesRequest";
export const TRAVELGUIDES_REQUEST_SUCCESS = "travelGuidesRequestSuccess"
export const TRAVELGUIDES_REQUEST_FAILURE = "travelGuidesRequestFailure"

export const TRAVELGUIDE_DETAILS_REQUEST = "travelGuidesDetailsRequest";
export const TRAVELGUIDE_DETAILS_REQUEST_SUCCESS = "travelGuidesDetailsRequestSuccess"
export const TRAVELGUIDE_DETAILS_REQUEST_FAILURE = "travelGuidesDetailsRequestFailure"

export const COUNTRY_TRAVELGUIDES_REQUEST = "countryTravelGuidesRequest";
export const COUNTRY_TRAVELGUIDES_REQUEST_SUCCESS = "countryTravelGuidesRequestSuccess"
export const COUNTRY_TRAVELGUIDES_REQUEST_FAILURE = "countryTravelGuidesRequestFailure"

// FEEDBACK
export const FEEDBACK_REQUEST = "feedbackRequest";
export const FEEDBACK_REQUEST_SUCCESS = "feedbackRequestSuccess"
export const FEEDBACK_REQUEST_FAILURE = "feedbackRequestFailure"

export const SUBMIT_FEEDBACK_REQUEST = "submitFeedbackRequest";
export const SUBMIT_FEEDBACK_REQUEST_SUCCESS = "submitFeedbackRequestSuccess"
export const SUBMIT_FEEDBACK_REQUEST_FAILURE = "submitFeedbackRequestFailure"

// MUSIC
export const MUSICPLAYLIST_REQUEST = "musicPlaylistRequest";
export const MUSICPLAYLIST_REQUEST_SUCCESS = "musicPlaylistRequestSuccess"
export const MUSICPLAYLIST_REQUEST_FAILURE = "musicPlaylistRequestFailure"

export const MUSIC_REQUEST = "musicRequest";
export const MUSIC_REQUEST_SUCCESS = "musicRequestSuccess"
export const MUSIC_REQUEST_FAILURE = "musicRequestFailure"


// SEARCH
export const SEARCH_REQUEST = "searchRequest";
export const SEARCH_REQUEST_SUCCESS = "searchRequestSuccess"
export const SEARCH_REQUEST_FAILURE = "searchRequestFailure"