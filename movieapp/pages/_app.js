import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/reset.css';
import '../styles/globals.css';
import NavBar from '../src/components/NavBar';
import axios from 'axios';
import { movieData } from '../src/context/data';
import { BASE_URL, URL } from '../src/constants/api';
import { userData } from '../src/context/user';
import { searchText } from '../src/context/search';
function MyApp({ Component, pageProps }) {
  const [movieList, setMovieList] = useState();
  const [userInfo, setUserInfo] = useState();
  const [searchValue, setSearchValue] = useState(); //검색어 저장

  const handleData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${URL.LIST}`);
      setMovieList(res.data.movie);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleData();
  }, []);
  return (
    <div className="container">
      <searchText.Provider value={{ searchValue, setSearchValue }}>
        <userData.Provider value={{ userInfo, setUserInfo }}>
          <NavBar></NavBar>
          <movieData.Provider value={{ movieList, setMovieList, handleData }}>
            <Component {...pageProps} />
          </movieData.Provider>
        </userData.Provider>
      </searchText.Provider>
    </div>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default MyApp;
