import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { PATH } from '../../src/constants/path';
import { movieData } from '../../src/context/data';
import dataFilter from '../../src/hooks/filter';
import styles from './style.module.css';

const Index = () => {
  const { movieList } = useContext(movieData);
  const [data, setData] = useState(); //필터 데이터 저장
  const router = useRouter();

  useEffect(() => {
    const copy = movieList && [...movieList];
    const data = dataFilter(copy, 5); //데이터 필터 함수
    setData(data);
  }, [movieList]);

  return (
    <section className={styles.section}>
      <h2>Thriller Movie</h2>
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
                  <div className={styles.img}>
                    <img src={item.main_img} alt="이미지" />
                  </div>
                  <div className={styles.text}>
                    <em>
                      <strong>{parseFloat(item.grade).toFixed(1)}</strong> / 5
                    </em>
                    <h2>{item.title}</h2>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </section>
  );
};

export default Index;
