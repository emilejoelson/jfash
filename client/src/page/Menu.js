import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AllProduct from '../components/AllProduct';
import { addCartItem } from '../redux/productSlide';
import Footer from '../components/Footer';
import { GrNext } from 'react-icons/gr';
import { Typography } from '@mui/material';

const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);

  // Use local state to track loading status
  const [loading, setLoading] = useState(true);

  // Use local state to store product display data
  const [productDisplay, setProductDisplay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Find the product in productData based on filterby
        const foundProduct = productData.find((product) => product._id === filterby);

        if (foundProduct) {
          setProductDisplay(foundProduct);
        } else {
          setProductDisplay(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterby, productData]);

  const handleAddCartProduct = () => {
    dispatch(addCartItem(productDisplay));
  };

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate('/cart');
  };

  const handleRendezVous = () => {
    navigate('/rendez-vous');
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div>
      {loading ? (
        <Typography variant='h1'>
          <div className="font-great-vibes pt-20 " >
              Chargement ...
          </div>
      </Typography>
      ) : productDisplay ? (
        isMobile ? (
          <div  className="mt-[9em] ">
          <div className=" max-w-4xl m-auto md:flex bg-slate-100">
            <div className="max-w-sm  overflow-hidden flex items-center justify-center mt-10 ">
                <img src={productDisplay.image} className="hover:scale-105 transition-all h-full" />
            </div>
            <div>
            <div className="flex flex-col gap-1 mt-5">
            <h3 className="font-sans text-[#cfa756d8]  capitalize text-2xl md:text-4xl">
                {productDisplay.name}
              </h3>
              <p className=" text-slate-900  font-great-vibes text-2xl ">{productDisplay.category}</p>
              {typeof productDisplay.price === 'string' ? (
                  <span>
                    <span className="text-red-500 line-through font-italic">{parseFloat(productDisplay.price).toFixed(2)} dh </span>
                    <br/>
                    <span className="text-[#0A0A0A] font-bold font-script">{(parseFloat(productDisplay.price) * 0.8).toFixed(2)} dh </span>
                  </span>
                ) : (
                  <span>Price not available</span>
                )}
                <div className="py-4">
                    <button className="  bg-sky-900 py-1 hover:text-[#0A0A0A] mt-2 hover:bg-slate-100   min-w-[100px]">
                      <Link
                        to ={"/"}
                      onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
                      >
                          Retour 
                      </Link>
                      
                    </button>
                    {
                      productDisplay.subcategory.toLowerCase() !=="produits"?
                      (
                        <button  
                            className="  bg-yellow-500 hover:text-[#0A0A0A] hover:bg-slate-100 w-[120px] py-1 mt-2  "
                            onClick = {handleRendezVous }
                          >
                              <div className="flex gap-2   text-center">
                              <div
                              > 
                                    <div className="ml-3  text-[#0A0A0A ] ">Rendez_vous
                                    </div>
                              </div>
                                  
                                  <div className="h-5 flex items-center">
                                    <GrNext style={{ height: "100%" }} />
                                  </div>
                              </div>  
                          </button>
                      )
                        :
                        (
                        <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 hover:text-[#0A0A0A] hover:bg-slate-100   min-w-[100px]">
                          Acheter
                        </button>
                        )
                    }
                    
                </div>
                <div className="pb-[6em] ">
                    <p className="text-[#0A0A0A]  font-arial-narrow font-bold" style={{fontSize:"20px"}}>Description : </p>
                    <p className="font-palatino text-[#333333] ">{productDisplay.description}</p>
                  </div>
            </div>
            </div>
          </div>
          <div className="mt-[-2.5em] mb-[-2.5em] "> <AllProduct  heading={"PRODUITS ASSOCIES"}/> </div>
          <Footer/>
        </div>
        ) : (
          <div className="bg-white">
            <div className="p-2 md:p-4">
              <div className="w-1/2 max-w-4xl m-auto md:flex bg-slate-100">
                <div className="max-w-sm overflow-hidden w-[67%] p-5">
                  <img src={productDisplay.image} className="hover:scale-105 transition-all h-full" alt={productDisplay.name} />
                </div>
                <div>
                  <div className="flex flex-col gap-1 mt-5">
                    <h3 className="font-sans text-[#cfa756d8] capitalize text-2xl md:text-4xl">{productDisplay.name}</h3>
                    <p className="text-slate-900 font-great-vibes text-2xl ">{productDisplay.category}</p>
                    {typeof productDisplay.price === 'string' ? (
                      <span>
                        <span className="text-red-500 line-through font-italic">{parseFloat(productDisplay.price).toFixed(2)} dh </span>
                        <br/>
                        <span className="text-[#0A0A0A] font-bold font-script">{(parseFloat(productDisplay.price) * 0.8).toFixed(2)} dh </span>
                      </span>
                    ) : (
                      <span>Price not available</span>
                    )}
                    <div className="py-4">
                      <button className="bg-sky-900 py-1 hover:text-[#0A0A0A] mt-2 hover:bg-slate-100 min-w-[100px]">
                        <Link
                          to={"/"}
                          onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
                        >
                          Retour 
                        </Link>
                      </button>
                      {productDisplay.subcategory.toLowerCase() !== "produits" ? (
                        <button
                          className="bg-yellow-500 hover:text-[#0A0A0A] hover:bg-slate-100 w-[120px] py-1 mt-2"
                          onClick={handleRendezVous}
                        >
                          <div className="flex gap-2 text-center">
                            <div>
                              <div className="ml-3 text-[#0A0A0A ] ">Rendez-vous</div>
                            </div>
                            <div className="h-5 flex items-center">
                              <GrNext style={{ height: "100%" }} />
                            </div>
                          </div>
                        </button>
                      ) : (
                        <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 hover:text-[#0A0A0A] hover:bg-slate-100 min-w-[100px]">
                          Acheter
                        </button>
                      )}
                    </div>
                    <div className="pb-[6em]">
                      <p className="text-[#0A0A0A] font-arial-narrow font-bold" style={{ fontSize: "20px" }}>Description : </p>
                      <p className="font-palatino text-[#333333] ">{productDisplay.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <AllProduct heading={"PRODUITS ASSOCIES"} />
            </div>
            <Footer />
          </div>
        )
      ) : (
        <Typography variant='h1'>
        <div className="font-great-vibes pt-20 " >
             Produit non trouvé
        </div>
    </Typography>
      )}
    </div>
  );
};

export default Menu;
