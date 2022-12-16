import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dataFilter from '../../../../src/hooks/filter';
import styles from '../style.module.css';
import { PATH } from '../../../../src/constants/path';

const Index = ({ movieList }) => {
  const [data, setData] = useState(); //필터 데이터 저장
  const router = useRouter();

  useEffect(() => {
    const copy = movieList && [...movieList];
    let data = dataFilter(copy, 8); //데이터 필터 함수
    data =
      data &&
      data.sort(function (a, b) {
        return b.grade - a.grade;
      });
    data = data && data.slice(0, 5);
    setData(data);
  }, [movieList]);

  return (
    <div className={styles.movie_wrap}>
      <h2>SF Movie</h2>
      {data && (
        <ul>
          {data &&
            data.map(item => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    router.push(`${PATH.DETAIL}/${item.id}`);
                  }}
                >
                  <div className={styles.movie}>
                    <div className={styles.img_box}>
                      <img src={item.main_img} alt="이미지" />
                    </div>
                    <div className={styles.text_box}>
                      <em>
                        <strong>{parseFloat(item.grade).toFixed(1)}</strong>/5
                      </em>
                      <h4>{item.title}</h4>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

Index.propTypes = {
  movieList: PropTypes.array,
};

export default Index;
