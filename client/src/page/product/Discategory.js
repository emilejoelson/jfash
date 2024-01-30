import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import CardFeature from '../../components/CardFeature';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper';
import CardFeaturerdv from '../../components/CardFeaturerdv';
import { Typography } from '@mui/material';
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

function Discategory() {
  const { category } = useParams(); // Retrieve the category from the URL parameter
  const productData = useSelector((state) => state.product.productList);

  const filteredProductsProduits = productData.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase() && product.subcategory.toLowerCase() === "produits"
  );

  const filteredProductsNotProduits = productData.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase() && product.subcategory.toLowerCase() !== "produits"
  );
  const isMobile = window.innerWidth < 768;
  return (
    <div className="bg-yellow-600 ">
      {
        isMobile?
        (
          <div className="pt-[15em] ">
             {filteredProductsNotProduits.length > 0 && filteredProductsProduits.length>0 && (
            <Typography variant='h2' className="mb-5">{filteredProductsProduits[0].category || filteredProductsNotProduits[0].category}</Typography>
          )}
         <div className="bg-slate-100">
           <Swiper
             effect="coverflow"
             slidesPerView={3}
             centeredSlides={true}
             loop={true}
             coverflowEffect={{
               rotate: 50,
               stretch: 0,
               depth: 100,
               modifier: 1,
               slideShadows: true,
             }}
             pagination={{ clickable: true }}
             navigation={true}
             className="my-4"
           >
             {filteredProductsProduits.map((el) => (
               <SwiperSlide key={el._id} className=" flex justify-center w-[17%]">
                 <div className="">
                   <CardFeature
                     id={el._id}
                     image={el.image}
                     category={el.category}
                     name={el.name}
                     price={el.price}
                   />
                 </div>
               </SwiperSlide>
             ))}
   
             {filteredProductsNotProduits.map((el) => (
               <SwiperSlide key={el._id} className=" flex justify-center w-[17%]">
                 <div className="ml-[30%]">
                   <CardFeaturerdv 
                    id={el._id}
                    image={el.image}
                    category={el.category}
                    name={el.name}
                    price={el.price}
                   />
                 </div>
               </SwiperSlide>
             ))}
           </Swiper>
         </div>
         <Footer />
         </div>
        )
         :
         (
         <div className=" justify-center">
         <div className="bg-slate-100">
           <Swiper
             effect="coverflow"
             slidesPerView={3}
             centeredSlides={true}
             loop={true}
             coverflowEffect={{
               rotate: 50,
               stretch: 0,
               depth: 100,
               modifier: 1,
               slideShadows: true,
             }}
             pagination={{ clickable: true }}
             navigation={true}
             className="my-4"
           >
             {filteredProductsProduits.map((el) => (
               <SwiperSlide key={el._id} className=" flex justify-center w-[17%]">
                 <div className="ml-[30%]">
                   <CardFeature
                     id={el._id}
                     image={el.image}
                     category={el.category}
                     name={el.name}
                     price={el.price}
                   />
                 </div>
               </SwiperSlide>
             ))}
   
             {filteredProductsNotProduits.map((el) => (
               <SwiperSlide key={el._id} className=" flex justify-center w-[17%]">
                 <div className="ml-[30%]">
                   <CardFeaturerdv 
                    id={el._id}
                    image={el.image}
                    category={el.category}
                    name={el.name}
                    price={el.price}
                   />
                 </div>
               </SwiperSlide>
             ))}
           </Swiper>
         </div>
         <Footer />
         </div>)
      }
    </div>
    
  );
}

export default Discategory;
