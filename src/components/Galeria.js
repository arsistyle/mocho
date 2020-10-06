import React from 'react';
import Image from './Image';
import SwiperCore, { Pagination, HashNavigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
SwiperCore.use([Pagination, HashNavigation]);

const Galeria = ({ data, className, slug }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        hashNavigation={{ watchState: true, changeState: false }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        className={className || null}>
        {data.map((x, i) => {
          return (
            <SwiperSlide key={i} data-hash={`${slug}${i + 1}`}>
              <Image src={x} alt='x' fallback={null} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Galeria;
