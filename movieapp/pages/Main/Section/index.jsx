import PropTypes from 'prop-types';
import React from 'react';
import styles from './style.module.css';
import Action from './Action';
import Fantasy from './Fantasy';
import Sf from './Sf';
import Thriller from './Thriller';

const Index = ({ movieList }) => {
  return (
    <section className={styles.section}>
      <Action movieList={movieList}></Action>
      <Fantasy movieList={movieList}></Fantasy>
      <Sf movieList={movieList}></Sf>
      <Thriller movieList={movieList}></Thriller>
    </section>
  );
};

Index.propTypes = {
  movieList: PropTypes.array,
};

export default Index;
