import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './style.module.css';
import { Navigation, Pagination } from 'swiper';
import dataFilter from '../../../src/hooks/filter';
import { PATH } from '../../../src/constants/path';

export default function App({ movieList }) {
  const [data, setData] = useState(); //필터 데이터 저장
  const router = useRouter();

  useEffect(() => {
    const copy = movieList && [...movieList];
    const data = dataFilter(copy, 0); //데이터 필터 함수
    setData(data);
  }, [movieList]);

  return (
    <div className={`${styles.container} slide1`}>
      <div className={styles.slider_wrap}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={true}
          slidesPerView={1}
          speed={1500}
          initialSlide={1}
          loop={true}
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          <div className={styles.slider}>
            {data && (
              <ul>
                {data.map(item => {
                  return (
                    <li key={item._id}>
                      <SwiperSlide key={item._id}>
                        <div className={`${styles.slide} slide`}>
                          <div className={styles.img}>
                            <img src={item.main_img} alt="" />
                          </div>
                          <div className={`${styles.grade} grade`}>
                            <em>
                              Grade :{' '}
                              <strong>
                                {parseFloat(item.grade).toFixed(1)}
                              </strong>
                              /5
                            </em>
                          </div>
                          <h2>{item.title}</h2>
                          <div className={`${styles.age} age`}>
                            <span>{item.age}+</span>
                          </div>
                          <div className={`${styles.info} info`}>
                            <ul>
                              <li>
                                {item.type.map((type, index) => {
                                  return <em key={index}>{type},</em>;
                                })}
                              </li>
                              <li>
                                <em>{item.time}분</em>
                              </li>
                              <li>
                                <em>
                                  {item.opening_time[0]}.{item.opening_time[1]}.
                                  {item.opening_time[2]}
                                </em>
                              </li>
                            </ul>
                          </div>
                          <p>{item.contents}</p>
                          <div className={`${styles.actor} actor`}>
                            {item.actor.map((actor, index) => {
                              return <em key={index}>{actor},</em>;
                            })}
                          </div>
                          <div className={`${styles.btn} btn`}>
                            <button
                              onClick={() => {
                                router.push(`${PATH.DETAIL}/${item.id}`);
                              }}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </SwiperSlide>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Swiper>
      </div>
    </div>
  );
}

App.propTypes = {
  movieList: PropTypes.array,
};
