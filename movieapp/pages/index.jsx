import React, { useContext } from 'react';
import styles from '../styles/Home.module.css';
import Banner from '../pages/Main/Banner';
import Section from '../pages/Main/Section';
import { movieData } from '../src/context/data';
/* prop 타입체크 */
// import PropTypes from 'prop-types';

/* 폰트어썸 */
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const { movieList } = useContext(movieData);
  return (
    <main className={styles.main}>
      <section className={styles.banner}>
        <Banner movieList={movieList}></Banner>
      </section>
      <Section movieList={movieList}></Section>
    </main>
  );
};

/*
Index.propTypes = {
  prop이름: PropTypes.array,
};
*/

export default Home;
