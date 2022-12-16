import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { PATH } from '../../src/constants/path';
import { searchText } from '../../src/context/search';
import styles from './style.module.css';

const Index = () => {
  const [data, setData] = useState();
  const { searchValue } = useContext(searchText);
  const router = useRouter();

  useEffect(() => {
    let getItem = localStorage.getItem('search');
    getItem = JSON.parse(getItem);
    setData(getItem);
  }, [searchValue]);
  return (
    <section className={styles.section}>
      <h2>Search</h2>
      {data && data.length == 0 && <em>검색 결과가 없습니다</em>}
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
