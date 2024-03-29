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

function Dissubcategory1() {
  const { subCategory1 } = useParams(); // Retrieve the subcategory from the URL parameter
  const loadingArrayFeature = new Array(10).fill(null);
  const productData = useSelector((state) => state.product.productList);
  const filteredProducts = productData.filter(
    (product) =>
      product.subcategory1.toLowerCase() === subCategory1.toLowerCase()
  );
  const isMobile = window.innerWidth < 768;
  return (
    <div  className="bg-yellow-600 ">
      {
        isMobile?
        (

        <div className="pt-[350px]  ">
          {filteredProducts.length > 0 && (
            <Typography variant='h2' className="mb-5">{filteredProducts[0].subcategory1}</Typography>
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
            {filteredProducts[0] ? (
              filteredProducts.map((el) => {
                return (
                  <SwiperSlide key={el._id} className=" flex justify-center w-[17%]">
                    <div className="">
                      {(subCategory1 === "Prêt à porter" || subCategory1 === "Accessoires" 
                      || subCategory1 ==="Produits de beauté" ) ?
                       (<CardFeature
                        id={el._id}
                        image={el.image}
                        subcategory1={el.subcategory1}
                        name={el.name}
                        price={el.price}
                      />) : 
                      (
                        <CardFeaturerdv 
                        id={el._id}
                        image={el.image}
                        subcategory1={el.subcategory1}
                        name={el.name}
                        price={el.price}
                       />
                      )
                      }
                      
                    </div>
                  </SwiperSlide>
                );
              })
            ) : (
              loadingArrayFeature.map((el, index) => (
                <SwiperSlide key={index + "allProduct"} className="w-[13%]">
                  <CardFeature loading="Chargement..." />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
        <Footer />
      </div>)
         :
         (<div className=" justify-center">
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
             {filteredProducts[0] ? (
               filteredProducts.map((el) => {
                 return (
                   <SwiperSlide key={el._id} className=" flex justify-center w-[17%]">
                     <div className="ml-[30%]">
                       {(subCategory1 === "Prêt à porter" || subCategory1 === "Accessoires" 
                       || subCategory1 ==="Produits de beauté" ) ?
                        (<CardFeature
                         id={el._id}
                         image={el.image}
                         subcategory1={el.subcategory1}
                         name={el.name}
                         price={el.price}
                       />) : 
                       (
                         <CardFeaturerdv 
                         id={el._id}
                         image={el.image}
                         subcategory1={el.subcategory1}
                         name={el.name}
                         price={el.price}
                        />
                       )
                       }
                       
                     </div>
                   </SwiperSlide>
                 );
               })
             ) : (
               loadingArrayFeature.map((el, index) => (
                 <SwiperSlide key={index + "allProduct"} className="w-[13%]">
                   <CardFeature loading="Chargement..." />
                 </SwiperSlide>
               ))
             )}
           </Swiper>
         </div>
         <Footer />
       </div>)
      }
    </div>
    
  );
}

export default Dissubcategory1;
