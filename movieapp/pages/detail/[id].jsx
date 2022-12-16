import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css';
import Star from './Star';
import { useRouter } from 'next/router';
import { movieData } from '../../src/context/data';
import { handlePlus } from '../../src/hooks/filter';

const Index = () => {
  const { movieList, handleData } = useContext(movieData);
  const router = useRouter();
  const { id } = router.query; //현재 페이지의 /이후의 주소값을 반환
  const [data, setData] = useState();

  function filter() {
    const copy = movieList && [...movieList];
    const data =
      copy &&
      copy.filter(item => {
        return item.id == id;
      });
    const newData = handlePlus(data);
    setData(newData && newData[0]);
  }

  useEffect(() => {
    filter();
  });

  return (
    <section className={styles.section}>
      <div className={styles.main_img}>
        <img src={data && data.main_img} alt="" />
      </div>
      <div className={styles.container}>
        <div className={styles.item_info}>
          <div className={styles.sub_img}>
            <img src={data && data.sub_img} alt="" />
          </div>
          <div className={styles.text}>
            <h2>{data && data.title}</h2>
            <div className={styles.age}>
              <span>{data && data.age}+</span>
            </div>
            <div className={styles.info}>
              <ul>
                <li>
                  {data &&
                    data.type.map((item, index) => {
                      return <em key={index}>{item},</em>;
                    })}
                </li>
                <li>
                  <em>{data && data.time}분</em>
                </li>
                <li>
                  <em>
                    {data && data.opening_time[0]}.
                    {data && data.opening_time[1]}.
                    {data && data.opening_time[2]}
                  </em>
                </li>
              </ul>
            </div>
            <p>{data && data.contents}</p>
            <div className={styles.actor}>
              <span>
                출연 :
                {data &&
                  data.actor.map((item, index) => {
                    return <em key={index}>{item},</em>;
                  })}
              </span>
            </div>
          </div>
          <div className={styles.grade}>
            <div className={styles.count}>
              <em>{parseFloat(data && data.grade).toFixed(1)}</em>
            </div>
            <Star id={id} handleData={handleData} data={data}></Star>
          </div>
        </div>
        <div className={styles.photo}>
          <div className={styles.trailer}>
            <h4>TRAILER</h4>
            <div className={styles.video}>
              <iframe
                width="100%"
                height="100%"
                src={data && data.trailer}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
          <div className={styles.stars}>
            <h4>STARTS</h4>
            <ul>
              <li>
                <img src={data && data.stars[0]} alt="" />
              </li>
              <li>
                <img src={data && data.stars[1]} alt="" />
              </li>
              <li>
                <img src={data && data.stars[2]} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
