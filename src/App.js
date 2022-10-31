import React from 'react';
import { Redirect, Route, HashRouter } from 'react-router-dom';

import NavigationBar from './components/NavigationBar/NavigationBar';

import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Home from './pages/Home/Home';
import Ebooks from './pages/Ebook/Ebooks';
import EbookDetail from './pages/Ebook/EbookDetail';
import EbookGenre from './pages/Ebook/EbookGenre';
import EbookRead from './pages/Ebook/EbookRead';
import AudioBooks from './pages/AudioBook/AudioBooks';
import AudioBookDetail from './pages/AudioBook/AudioBookDetail';
import AudioBooksGenre from './pages/AudioBook/AudioBooksGenre';
import AudioBookListen from './pages/AudioBook/AudioBookListen';
import Movies from './pages/Movies/Movies';
import MovieDetail from './pages/Movies/MovieDetail';
import MoviePlayer from './pages/Movies/MoviePlayer';
import MovieGenre from './pages/Movies/MovieGenre';
import Series from './pages/Series/Series';
import SeriesDetail from './pages/Series/SeriesDetail';
import SeriesGenre from './pages/Series/SeriesGenre';
import News from './pages/News/News';
import NewsDetails from './pages/News/NewsDetails';
import TravelGuides from './pages/TravelGuide/TravelGuides';
import TravelGuideCountry from './pages/TravelGuide/TravelGuideCountry';
import TravelGuideDetail from './pages/TravelGuide/TravelGuideDetail';
import Feedback from './pages/Feedback/Feedback';
import ThankYouRedirect from './pages/Feedback/ThankYouRedirect';

import MusicPlaylist from './pages/Musics/MusicPlaylist';
import Musics from './pages/Musics/Musics';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import SeriesSeason from './pages/Series/SeriesSeason';
import SeriesEpisode from './pages/Series/SeriesEpisode';
import SeriesPlayer from './pages/Series/SeriesPlayer';

function App() {


  return (
    <HashRouter>
      <React.StrictMode>
        <div className="App">

          {/* TODO, check if user is logged in, and hide navbar if not */}
          <NavigationBar />

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

          <UnauthenticatedRoute path="/login" exact component={Login} />

          <AuthenticatedRoute path="/search" exact component={Search} />

          <AuthenticatedRoute path="/home" exact component={Home} />

          <AuthenticatedRoute path="/movies" exact component={Movies} />

          <AuthenticatedRoute path="/movies/:id" exact component={MovieDetail} />

          <AuthenticatedRoute path="/movies/player/:id" exact component={MoviePlayer} />

          <AuthenticatedRoute path="/movies/genre/:genre" component={MovieGenre} />

          <AuthenticatedRoute path="/series" exact component={Series} />

          <AuthenticatedRoute path="/series/:id" exact component={SeriesDetail} />

          <AuthenticatedRoute path="/series/genre/:genre" exact component={SeriesGenre} />

          <AuthenticatedRoute path="/series/:genre/:series" exact component={SeriesSeason} />

          <AuthenticatedRoute path="/series/:genre/:series/:season" exact component={SeriesEpisode} />

          <AuthenticatedRoute path="/series/:genre/:series/:season/:episode" exact component={SeriesPlayer} />

          <AuthenticatedRoute path="/musics/:playlist" exact component={MusicPlaylist} />

          <AuthenticatedRoute path="/musics" exact component={Musics} />

          <AuthenticatedRoute path="/ebooks" exact component={Ebooks} />

          <AuthenticatedRoute path="/ebooks/:id" exact component={EbookDetail} />

          <AuthenticatedRoute path="/ebooks/read/:id" exact component={EbookRead} />

          <AuthenticatedRoute path="/ebooks/genre/:genre" component={EbookGenre} />

          <AuthenticatedRoute path="/audiobooks" exact component={AudioBooks} />

          <AuthenticatedRoute path="/audiobooks/:id" exact component={AudioBookDetail} />

          <AuthenticatedRoute path="/audiobooks/genre/:genre" component={AudioBooksGenre} />

          <AuthenticatedRoute path="/audiobooks/listen/:id" component={AudioBookListen} />

          <AuthenticatedRoute path="/travelguides" exact component={TravelGuides} />

          <AuthenticatedRoute path="/travelguides/:country" exact component={TravelGuideCountry} />

          <AuthenticatedRoute path="/travelguides/view/:id" exact component={TravelGuideDetail} />

          <AuthenticatedRoute path="/news" exact component={News} />

          <AuthenticatedRoute path="/news/:id" component={NewsDetails} />

          <Route path="/feedback" component={Feedback} />

          <Route path="/thankyou" component={ThankYouRedirect} />

        </div>
      </React.StrictMode>
    </HashRouter>
  );
}

export default App;