import React from 'react';
import Footer from '../../components/Footer';
import db from "../../assest/images/cesthetique.jpg";
import dbpedicure from  "../../assest/images/dbpedicure.jpg";
import dbmanicure from  "../../assest/images/dbmanicure.jpg";
import "./Menuproduct.css";
import chomme from "../../assest/images/chomme.jpg";
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { useSelector } from 'react-redux';
import CardCoutures from '../../components/CardCoutures';

// Initialize Swiper modules
SwiperCore.use([EffectCoverflow, Navigation, Pagination]);



function Menuesthetique() {
  const productData = useSelector(state => state.product.productList);
const esthetiqueServices = productData.filter(product => product.subcategory && product.subcategory.toLowerCase() === 'esthétique');
const isMobile = window.innerWidth < 768;

  return (
    <div>
      {
        isMobile?
        (
        <div className="mt-[9em] bg-white h-full ">
            <div className=" bg-slate-100 mt-10  " style={{border:"10px solid #C49A45"}}>
                <img src={db} alt="Image product" style={{all:"unset", width:"100%"}} className="imgdb" />
            </div>
            <div className=" bg-gray-100  mt-10">
              <div className="pt-3 pb-3 font-[700] text-[#0A0A0A]  font-sans text-xl select-none rounded-t-md">Esthetique - Femme </div>
            </div>
            <div className=" bg-gray-100  ">
              <div className="flex gap-2  ">
                <div  className="rounded flex-1 ml-2  hover:scale-105 relative w-[27px] mt-2 hover-filter cursor-pointer">
                  <img src ={dbpedicure} alt="cfeme" style ={{borderRadius:"20px",width:"581px"}} />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-2 text-white">
                    <div>
                      <p className="text-lg text-orange-600 font-sans font-bold pt-[15px] ">PEDICURE</p>
                    </div>         
                  </div>
                </div>
                <div className="rounded flex-1  mr-2 mb-2  hover:scale-105 relative w-[27px] mt-2 hover-filter cursor-pointer">
                  <img src ={dbmanicure} alt="cfemme" style ={{borderRadius:"20px",width:"581px"}} />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-2 text-white">
                    <div>
                      <p className="text-lg text-orange-600 font-sans font-bold pt-[15px] ">MANICURE</p>
                    </div>
                  </div>
                </div>
                <div className="rounded flex-1  mr-2 mb-2  hover:scale-105 relative w-[27px] mt-2 hover-filter cursor-pointer">
                  <img src ={chomme} alt="cfemme" style ={{borderRadius:"20px",width:"581px"}} />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-2 text-white">
                    <div>
                      <p className="text-lg text-orange-600 font-sans font-bold pt-[15px] ">NAPPY</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Toutes les esthetique*/}
          <div className="mt-10  mb-10 pb-3 pl-1 pr-1 grid grid-cols-2  gap-2">
              {esthetiqueServices.map(el => (
                <div key={el._id} className="w-full"> 
                  <CardCoutures
                    id = {el._id}
                    name={el.name}
                    description={el.description}
                    price={el.price}
                    image={el.image}
                  />
                </div>
              ))}
          </div>
          <Footer/>
        </div>)
         :
         (
          <div className="bg-white h-full">
    <div className="">
        .
    </div>
     <div className="ml-[10em] bg-slate-100 mt-10 h-[250px] mr-[10em]" style={{borderRadius:"12px",border:"10px solid #C49A45"}}>
        <img src={db} alt="Image produact" style={{all:"unset", width:"100%"}} className="imgdb" />
     </div>
       
     <div className="rounded bg-gray-200 ml-20 mr-20 mt-10">
        <div className="pt-3 pb-3 font-[700] text-[#0A0A0A]  font-sans text-xl select-none rounded-t-md">Esthetique - Femme </div>
      </div>
      <div className="rounded bg-[#cfa756d8] ml-[6%] pb-2 mr-[6%] ">
        <div className="flex gap-2">
          <div className="rounded flex-1 ml-2   hover:scale-105 relative w-[27px] mt-2 hover-filter cursor-pointer">
            <img src ={dbpedicure} alt="cfemme" style ={{borderRadius:"20px",width:"581px"}} />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-2 text-white">
              <div>
                <p className="text-lg text-orange-600 font-sans font-bold pt-[75px] ">PEDICURE</p>
              </div>
    
            </div>
          </div>
          <div className="rounded flex-1  hover:scale-105 relative w-[27px] mt-2  hover-filter cursor-pointer">
            <img src ={dbmanicure} alt="cfemme" style ={{borderRadius:"20px",width:"581px"}} />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-2 text-white">
              <div>
                <p className="text-lg text-orange-600 font-sans font-bold pt-[75px] ">MANICURE</p>
              </div>
    
            </div>
          </div>
          <div className="rounded flex-1 mr-2  hover:scale-105 relative w-[27px] mt-2 hover-filter cursor-pointer">
          <img src ={chomme} alt="cfemme" style ={{borderRadius:"20px",width:"581px"}} />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-2 text-white">
              <div>
                <p className="text-lg text-orange-600 font-sans font-bold pt-[75px] ">NAPPY</p>
              </div>
    
            </div>
          </div>

        </div>
      </div>
        
        {/* Toutes les ésthetiques*/}
        <div className="mt-10 ml-[6%] mb-10 pb-3 mr-[6%] grid grid-cols-5  gap-4">
              {esthetiqueServices.map(el => (
                <div key={el._id} className="w-full"> 
                  <CardCoutures
                    id = {el._id}
                    name={el.name}
                    description={el.description}
                    price={el.price}
                    image={el.image}
                  />
                </div>
              ))}
          </div>
     <Footer/>
    </div>
         )
      }
    </div>
  );
}

export default Menuesthetique;
