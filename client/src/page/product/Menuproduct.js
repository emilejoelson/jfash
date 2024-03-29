import React, { useState } from 'react';
import Footer from '../../components/Footer';
import db from "../../assest/images/offrespecialle.jpg";
import db1 from  "../../assest/images/dbsearch01.png";
import "./Menuproduct.css";
import modehome1 from "../../assest/images/accessa.jpg";
import modefemme1 from "../../assest/images/accessc.jpg";
import pm1 from "../../assest/images/accesse.jpg";
import c1 from "../../assest/images/couture.gif";
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { useSelector } from 'react-redux';
import CardProducts from '../../components/CardProducts';
import { useNavigate } from 'react-router-dom';

// Initialize Swiper modules
SwiperCore.use([EffectCoverflow, Navigation, Pagination]);

function Menuproduct() {
  const [currentGifHomeMode, setCurrentGifHomeMode] = useState(modehome1);
  const [currentGifFemmeMode, setCurrentGifFemmeMode] = useState(modefemme1);
  const [currentGifpm, setCurrentGifpm] = useState(pm1);
  const [currentGifcouture, setCurrentGifcouture] = useState(c1);
  const productData = useSelector(state => state.product.productList);
  const productDataOnWeekAgo = useSelector(state => state.product.productListOnWeekAgo);

  const accessoires = productData.filter(product => product.subcategory1 && product.subcategory1.toLowerCase() === 'accessoires');
  const produitDeBeauty = productData.filter(product => product.subcategory1 && product.subcategory1.toLowerCase() === 'produits de beauté');
  const pretPorter= productData.filter(product => product.subcategory1 && product.subcategory1.toLowerCase() === 'prêt à porter');
  

  const nouvelArrivageAccessoire = productDataOnWeekAgo.filter(el => el.subcategory1 && el.subcategory1.toLowerCase() === 'accessoires');
  const nouvelArrivageProduitBeauty= productDataOnWeekAgo.filter(el => el.subcategory1 && el.subcategory1.toLowerCase() === 'produits de beauté');
  const nouvelArrivagePretPorter= productDataOnWeekAgo.filter(el => el.subcategory1 && el.subcategory1.toLowerCase() === 'prêt à porter');
  const isMobile = window.innerWidth < 768;
  
  const navigate = useNavigate();
  const redirectToMenu = (id) => {
    // Use the 'id' parameter to construct the desired URL or perform other actions
   navigate (`/menu/${id}`);
   window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  return (
    <div>
      {
        isMobile ?
        (
          <div className="mt-[9em] bg-white h-full ">
            <div className=" bg-slate-100 mt-5  " style={{border:"10px solid black"}}>
                <img src={db} alt="Image product" style={{all:"unset", width:"100%"}} className="imgdb" />
            </div>
            <div className=" bg-black mt-5">
                <div className="pt-3 pb-3 font-[700] text-[#C49A45]  font-sans text-xl select-none rounded-t-md">Les meilleurs offres</div>
            </div>
            <div className=" pl-3 bg-slate-100  pb-3 ">
              <div className="flex">
                <div className=" flex-1  hover:scale-110 relative w-[27px] mt-3 h-[200px] hover-filter cursor-pointer">
                  <img src={currentGifHomeMode} alt="Service A" style={{borderRadius:"15px",width:"150px",height:"200px"}} className="imag w-full h-full transition-all duration-300" />
                  <div className="absolute top-3 left-[-1.5em] w-full h-full flex flex-col justify-between p-4 text-white">
                    <div>
                      <p className="text-lg text-orange-600 font-sans font-bold pt-[65px] ">MODE HOMME</p>
                    </div>
                    <div className="bg-orange-600 text-black px-2 py-1 text-sm font-bold rounded-md">
                      Prix: 50€ (Réduction: 20%)
                    </div>
                  </div>
                </div>

                <div className=" flex-1  hover:scale-110 relative w-[27px] mt-3 h-[200px] hover-filter cursor-pointer">
                  <img src={currentGifFemmeMode} alt="Service B" style={{borderRadius:"15px",width:"150px",height:"200px"}} className="imag w-full h-full transition-all duration-300" />
                  <div className="absolute top-3 left-[-1.5em] w-full h-full flex flex-col justify-between p-4 text-white">
                    <div>
                      <p className="text-lg text-orange-600 font-sans font-bold pt-[65px] ">MODE FEMME</p>
                    </div>
                    <div className="bg-orange-600 text-black px-2 py-1 text-sm font-bold rounded-md">
                      Prix: 60€ (Réduction: 15%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 mt-5  mb-5 " style={{border:"10px solid black"}}>
               <img src={db1} alt="Image productA" style={{all:"unset", width:"100%"}} className="imgdb" />
            </div>
            <div className=" bg-black mt-5">
              <div className="pt-3 pb-3 font-[700] text-slate-100  font-sans text-xl select-none rounded-t-md">Accessoires</div>
            </div>
            <div className="mt-1 ml-1 mb-5 pb-2 mr-1 grid grid-cols-2  gap-2">
              {accessoires.map(el => (
                <div key={el._id} className="w-full"> 
                  <CardProducts
                    id = {el._id}
                    name={el.name}
                    description={el.description}
                    price={el.price}
                    image={el.image}
                  />
                </div>
              ))}
            </div>
            {/**Accessoires */}
            <div className=" bg-slate-100  mt-5 text-left pl-10 pr-10 ">
              <div className="pt-3 pb-3 font-[700] text-[#C49A45]  font-sans text-black text-xl select-none rounded-t-md">Produit Officiel-Accessoire | Nouvel arrivage</div>
            </div>
             <div className="cat1 bg-slate-100 ml-1 pb-3 mr-1 mb-5 pb-10">
                <Swiper
                  slidesPerView={3}
                  centeredSlides={true}
                  spaceBetween={10}
                  loop={true}
                  navigation={true}
                >
                  {nouvelArrivageAccessoire.map((product, index) => (
                    <SwiperSlide key={index}>
                       {product ? (
                        <img
                          className="img-fluid"
                          src={product.image}
                          alt={product.name}
                          style={{ borderRadius: '12px', height: '160px', cursor: 'pointer' }}
                          onClick={() => redirectToMenu(product._id)}
                        />
                      ) : (
                        <p>Product not available</p>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

            {/*Produits de Beauté */}
            <div className=" bg-black ">
              <div className="pt-3 pb-3 font-[700] text-slate-100  font-sans text-xl select-none rounded-t-md">Produit de Beauté</div>
            </div>
            <div className="mt-1 ml-1 mb-5 pb-2 mr-1 grid grid-cols-2  gap-2">
              {produitDeBeauty.map(el => (
                <div key={el._id} className="w-full"> 
                  <CardProducts
                    id = {el._id}
                    name={el.name}
                    description={el.description}
                    price={el.price}
                    image={el.image}
                  />
                </div>
              ))}
            </div>

             {/*Produits de Beauté */}
             <div className=" bg-slate-100  mt-5  pl-10 pr-10">
              <div className="pt-3 pb-3 font-[700] text-[#C49A45]  font-sans text-black text-xl select-none rounded-t-md">Produit Officiel-Produit de Beauté | Nouvel arrivage</div>
            </div>
             <div className="cat1 bg-slate-100 ml-1 pb-3 mr-1 mb-5 pb-10">
                <Swiper
                  slidesPerView={3}
                  centeredSlides={true}
                  spaceBetween={10}
                  loop={true}
                  navigation={true}
                >
                  {nouvelArrivageProduitBeauty.map((product, index) => (
                    <SwiperSlide key={index}>
                      {product ? (
                        <img
                          className="img-fluid"
                          src={product.image}
                          alt={product.name}
                          style={{ borderRadius: '12px', height: '160px', cursor: 'pointer' }}
                          onClick={() => redirectToMenu(product._id)}
                        />
                      ) : (
                        <p>Product not available</p>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/*Produits de Beauté */}
            <div className=" bg-black ">
              <div className="pt-3 pb-3 font-[700] text-slate-100  font-sans text-xl select-none rounded-t-md">Prêt à porter</div>
            </div>
            <div className="mt-1 ml-1 mb-5 pb-2 mr-1 grid grid-cols-2  gap-2">
              {pretPorter.map(el => (
                <div key={el._id} className="w-full"> 
                  <CardProducts
                    id = {el._id}
                    name={el.name}
                    description={el.description}
                    price={el.price}
                    image={el.image}
                  />
                </div>
              ))}
            </div>

             {/*Produits de Beauté */}
             <div className=" bg-slate-100  mt-5  pl-10 pr-10">
              <div className="pt-3 pb-3 font-[700] text-[#C49A45]  font-sans text-black text-xl select-none rounded-t-md">Produit Officiel-Pret à porter| Nouvel arrivage</div>
            </div>
             <div className="cat1 bg-slate-100 ml-1 pb-3 mr-1 mb-5 pb-10">
                <Swiper
                  slidesPerView={3}
                  centeredSlides={true}
                  spaceBetween={10}
                  loop={true}
                  navigation={true}
                >
                  {nouvelArrivagePretPorter.map((product, index) => (
                    <SwiperSlide key={index}>
                      <img
                        className="img-fluid"
                        src={product.image} // Assuming you have an 'image' property in your product object
                        alt={product.name} // Assuming you have a 'name' property in your product object
                        style={{ borderRadius: '12px',height:"160px" }}
                      />{product ? (
                        <img
                          className="img-fluid"
                          src={product.image}
                          alt={product.name}
                          style={{ borderRadius: '12px', height: '160px', cursor: 'pointer' }}
                          onClick={() => redirectToMenu(product._id)}
                        />
                      ) : (
                        <p>Product not available</p>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <Footer/>
          </div>
        )
         :
         (
          <div className="bg-white h-full">
            <div className="">
                .
            </div>
            <div className="ml-[10em] bg-slate-100 mt-10 h-[230px] mr-[10em]" style={{borderRadius:"12px",border:"10px solid black"}}>
                <img src={db} alt="Image productB" style={{all:"unset", width:"100%"}} className="imgdb" />
            </div>
         
            <div className="cat bg-black ml-20 mr-20 mt-10">
                <div className="pt-3 pb-3 font-[700] text-[#C49A45]  font-sans text-xl select-none rounded-t-md">Les meilleurs offres</div>
              </div>
            <div className="cat1 bg-slate-100 ml-[6%] pb-3 mr-[6%]">
              <div className="flex">
                <div className="category flex-1 ml-4 hover:scale-110 relative w-[27px] mt-3 h-[200px] hover-filter cursor-pointer">
                  <img src={currentGifHomeMode} alt="Service AA" style={{all:"unset",width:"180px",height:"200px"}} className="imag w-full h-full transition-all duration-300" />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-2 text-white">
                    <div>
                      <p className="text-lg text-orange-600 font-sans font-bold pt-[75px] ">MODE HOME</p>
                    </div>
                    <div className="bg-orange-600 text-black px-2 py-1 text-sm font-bold rounded-md">
                      Prix: 50€ (Réduction: 20%)
                    </div>
                  </div>
                </div>

                <div className="category flex-1 ml-4 hover:scale-110 relative w-[27px] mt-3 h-[200px] hover-filter cursor-pointer">
                  <img src={currentGifFemmeMode} alt="Service B" style={{all:"unset",width:"180px",height:"200px"}} className="imag w-full h-full transition-all duration-300" />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-2 text-white">
                    <div>
                      <p className="text-lg text-orange-600 font-sans font-bold pt-[75px] ">MODE FEMME</p>
                    </div>
                    <div className="bg-orange-600 text-black px-2 py-1 text-sm font-bold rounded-md">
                      Prix: 60€ (Réduction: 15%)
                    </div>
                  </div>
                </div>

                <div className="category flex-1 ml-4 hover:scale-110 relative w-[27px] mt-3 h-[200px] hover-filter cursor-pointer">
                  <img src={currentGifpm} alt="Service AC" style={{all:"unset",width:"180px",height:"200px"}} className="imag w-full h-full transition-all duration-300" />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-2 text-white">
                    <div>
                      <p className="text-lg text-orange-600 font-sans font-bold pt-[75px] ">MANICURE & PEDICURE</p>
                    </div>
                    <div className="bg-orange-600 text-black px-2 py-1 text-sm font-bold rounded-md">
                      Prix: 40€ (Réduction: 10%)
                    </div>
                  </div>
                </div>

                <div className="category flex-1 ml-4 hover:scale-110 relative w-[27px] mt-3 h-[200px] hover-filter bg-slate-900 cursor-pointer">
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-2 text-white">
                    <div>
                      <p className="text-lg text-orange-600 font-sans font-bold pt-[75px] ">NAPPY</p>
                    </div>
                    <div className="bg-orange-600 text-black px-2 py-1 text-sm font-bold rounded-md">
                      Prix: 35€ (Réduction: 25%)
                    </div>
                  </div>
                </div>

                <div className="category flex-1 ml-4 mr-4 hover:scale-110 relative w-[27px] mt-3 h-[200px] hover-filter cursor-pointer">
                  <img src={currentGifcouture} alt="Service D" style={{all:"unset",width:"180px",height:"200px"}} className="imag w-full h-full transition-all duration-300" />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-2 text-white">
                    <div> 
                      <p className="text-lg text-orange-600 font-sans font-bold pt-[75px] ">COUTURE</p>
                    </div>
                    <div className="bg-orange-600 text-black px-2 py-1 text-sm font-bold rounded-md">
                      Prix: 55€ (Réduction: 30%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
        <div className="bg-slate-100 ml-20 mr-20 mt-10 h-[250px] mb-10 " style={{borderRadius:"12px",border:"10px solid black"}}>
        <img src={db1} alt="Image productA" style={{all:"unset", width:"100%"}} className="imgdb" />
        </div>

             {/* Accessoires */}
        <div className="cat bg-black ml-20 mr-20 mt-10">
          <div className="pt-3 pb-3 font-[700] text-slate-100  font-sans text-xl select-none rounded-t-md">Accessoires</div>
        </div>
        <div className="mt-10 ml-[6%] mb-10 pb-3 mr-[6%] grid grid-cols-5  gap-4">
              {accessoires.map(el => (
                <div key={el._id} className="w-full"> 
                  <CardProducts
                    id = {el._id}
                    name={el.name}
                    description={el.description}
                    price={el.price}
                    image={el.image}
                  />
                </div>
              ))}
        </div>
        <div className="cat bg-slate-100 ml-20 mr-20 mt-10 text-left pl-10 ">
          <div className="pt-3 pb-3 font-[700] text-[#C49A45]  font-sans text-black text-xl select-none rounded-t-md">Produit Officiel-Accessoire | Nouvel arrivage</div>
        </div>
       
        <div className="cat1 bg-slate-100 ml-[6%] pb-3 mr-[6%] mb-20 pb-20">
          <Swiper
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={10}
            loop={true}
            navigation={true}
          >
            {nouvelArrivageAccessoire.map((product, index) => (
              <SwiperSlide key={index}>
                {product ? (
                    <img
                      className="img-fluid"
                      src={product.image}
                      alt={product.name}
                      style={{ borderRadius: '12px', height: '360px', cursor: 'pointer' }}
                      onClick={() => redirectToMenu(product._id)}
                    />
                  ) : (
                    <p>Product not available</p>
                  )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

             {/* Produits de beauté */}
             <div className="cat bg-black ml-20 mr-20 mt-10">
              <div className="pt-3 pb-3 font-[700] text-slate-100  font-sans text-xl select-none rounded-t-md">Produit de beauté</div>
            </div>
        <div className="mt-10 ml-[6%] mb-10 pb-3 mr-[6%] grid grid-cols-5  gap-4">
              {produitDeBeauty.map(el => (
                <div key={el._id} className="w-full"> 
                  <CardProducts
                    id = {el._id}
                    name={el.name}
                    description={el.description}
                    price={el.price}
                    image={el.image}
                  />
                </div>
              ))}
        </div>
        <div className="cat bg-slate-100 ml-20 mr-20 mt-10 text-left pl-10 ">
          <div className="pt-3 pb-3 font-[700] text-[#C49A45]  font-sans text-black text-xl select-none rounded-t-md">Produit Officiel-Beauté | Nouvel arrivage</div>
        </div>
       
        <div className="cat1 bg-slate-100 ml-[6%] pb-3 mr-[6%] mb-20 pb-20">
            <Swiper
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={10}
                loop={true}
                navigation={true}
              >
                {nouvelArrivageProduitBeauty.map((product, index) => (
                  <SwiperSlide key={index}>
                    {product ? (
                    <img
                      className="img-fluid"
                      src={product.image}
                      alt={product.name}
                      style={{ borderRadius: '12px', height: '360px', cursor: 'pointer' }}
                      onClick={() => redirectToMenu(product._id)}
                    />
                  ) : (
                    <p>Product not available</p>
                  )}
                  </SwiperSlide>
                ))}
              </Swiper>
        </div>




        
             {/* Pret à porter */}
             <div className="cat bg-black ml-20 mr-20 mt-10">
          <div className="pt-3 pb-3 font-[700] text-slate-100  font-sans text-xl select-none rounded-t-md">Pret à porter</div>
        </div>
        <div className="mt-10 ml-[6%] mb-10 pb-3 mr-[6%] grid grid-cols-5  gap-4">
              {pretPorter.map(el => (
                <div key={el._id} className="w-full"> 
                  <CardProducts
                    id = {el._id}
                    name={el.name}
                    description={el.description}
                    price={el.price}
                    image={el.image}
                  />
                </div>
              ))}
        </div>
        <div className="cat bg-slate-100 ml-20 mr-20 mt-10 text-left pl-10 ">
          <div className="pt-3 pb-3 font-[700] text-[#C49A45]  font-sans text-black text-xl select-none rounded-t-md">Produit Officiel-Pret à porter | Nouvel arrivage</div>
        </div>
       
        <div className="cat1 bg-slate-100 ml-[6%] pb-3 mr-[6%] mb-20 pb-20">
        <Swiper
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={10}
            loop={true}
            navigation={true}
          >
            {nouvelArrivagePretPorter.map((product, index) => (
              <SwiperSlide key={index}>
                 {product ? (
                    <img
                      className="img-fluid"
                      src={product.image}
                      alt={product.name}
                      style={{ borderRadius: '12px', height: '360px', cursor: 'pointer' }}
                      onClick={() => redirectToMenu(product._id)}
                    />
                  ) : (
                    <p>Product not available</p>
                  )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
            {/* Produit de beauté */}
       <Footer/>
    </div>
         )
      }
    </div>
    
  );
}

export default Menuproduct;
