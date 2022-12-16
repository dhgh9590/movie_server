import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { onLogin, onLogout, onUserStateChange } from '../../constants/firebase';
import { PATH } from '../../constants/path';
import { userData } from '../../context/user';
import axios from 'axios';
import { BASE_URL, URL } from '../../../src/constants/api';
import { searchText } from '../../context/search';

const Index = () => {
  const [active, setActive] = useState(false);
  const { searchValue, setSearchValue } = useContext(searchText);
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(userData);

  //로그인 함수
  const handleLogin = () => {
    onLogin();
  };

  const handleSearch = () => {
    axios
      .post(`${BASE_URL}/${URL.SEARCH}`, {
        search: searchValue,
      })
      .then(res => {
        localStorage.setItem(`search`, JSON.stringify(res.data.searchItem));
        setSearchValue('');
        router.push(`/${PATH.SEARCH}`);
        setActive(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //로그아웃 함수
  const handleLogout = () => {
    onLogout();
  };

  const handleRouter = path => {
    router.push(`/${path}`);
    setActive(false);
  };

  //사용자 정보 저장(새로고침 해도 기억됨)
  useEffect(() => {
    onUserStateChange(user => {
      setUserInfo(user);
    });
  }, [setUserInfo]);

  return (
    <nav className={styles.nav}>
      <div className={`${styles.container} ${active && styles.active}`}>
        <div>
          <div
            className={styles.logo}
            onClick={() => {
              router.push(PATH.HOME);
              setActive(false);
            }}
          >
            <img src="/images/logo.png" alt="" />
          </div>
          <div className={styles.menu_btn}>
            <div
              className={`${styles.btn} ${active && styles.close}`}
              onClick={() => {
                setActive(!active);
              }}
            >
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className={styles.user}>
          {!userInfo ? (
            <div className={styles.login} onClick={handleLogin}>
              <em>Login</em>
            </div>
          ) : (
            <div className={styles.logout} onClick={handleLogout}>
              <div className={styles.user_img}>
                <img src={userInfo.photoURL} alt="" />
              </div>
              <h4>{userInfo.displayName}</h4>
              <em>Logout</em>
            </div>
          )}
        </div>
      </div>
      <div className={`${styles.menu} ${active && styles.active}`}>
        <div className={styles.search}>
          <form>
            <input
              type="text"
              placeholder="Search"
              defaultValue={searchValue}
              value={searchValue || ''}
              onChange={e => {
                setSearchValue(e.target.value);
              }}
            />
            <button
              onClick={e => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <FontAwesomeIcon icon={faSearch} className={styles.icon} />
            </button>
          </form>
        </div>
        <div className={styles.genre}>
          <h2>GENRE</h2>
          <ul>
            <li
              onClick={() => {
                handleRouter(PATH.ACTION);
              }}
            >
              <em>Action Movie</em>
            </li>
            <li
              onClick={() => {
                handleRouter(PATH.FANTASY);
              }}
            >
              <em>Fantasy Movie</em>
            </li>
            <li
              onClick={() => {
                handleRouter(PATH.SF);
              }}
            >
              <em>SF Movie</em>
            </li>
            <li
              onClick={() => {
                handleRouter(PATH.THRILLER);
              }}
            >
              <em>Thriller Movie</em>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Index;
