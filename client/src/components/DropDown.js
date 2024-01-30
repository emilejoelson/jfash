import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function DropDown() {
  const navigate = useNavigate();
    const productData = useSelector((state) => state.product.productList);
    const categoryList = [...new Set(productData.map((el) => el.category))];

    const [hoveredCategory, setHoveredCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [hoveredSubCategory, setHoveredSubCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [hoveredSubCategory1, setHoveredSubCategory1] = useState("");
    const [selectedSubCategory1, setSelectedSubCategory1] = useState("");
  
    const [subCategories, setSubCategories] = useState([]);
    const [subCategories1, setSubCategories1] = useState([]);
    const [subCategories2, setSubCategories2] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const [dropDown1, setDropDown1] = useState(Array(subCategories.length).fill(false));
    const [dropDown2, setDropDown2] = useState(Array(subCategories1.length).fill(false));
    const [anchorEl, setAnchorEl] = useState(null);
    

    //Fonction for dropdown1
    const toggleDropDown = (index) => {
      const newDropDown1 = [...dropDown1];
      newDropDown1[index] = !newDropDown1[index];
      setDropDown1(newDropDown1);
    };
    //Fonction for dropdown2
    const toggleDropDown1 = (index) => {
      const newDropDown2 = [...dropDown2];
      newDropDown2[index] = !newDropDown2[index];
      setDropDown2(newDropDown2);
    };
    const handleCategoryHover = (event, category) => {
      setSelectedCategory(category);
      setHoveredCategory(category);
  
      const subCategories = productData
        .filter((el) =>  el.category && el.category.toLowerCase() === category.toLowerCase())
        .map((el) => el.subcategory);
  
      const uniqueSubCategories = [...new Set(subCategories)];
      setSubCategories(uniqueSubCategories);
      setSubCategories1([]);
      setAnchorEl(event.currentTarget);
    };
  
    const handleSubCategoryHover = (event, subCategory) => {
      setSelectedSubCategory(subCategory);
      setHoveredSubCategory(subCategory);
  
      const subCategories1 = productData
        .filter((el) => el.subcategory && el.subcategory.toLowerCase() === subCategory.toLowerCase())
        .map((el) => el.subcategory1);
      const uniqueSubCategories1 = [...new Set(subCategories1)];
      setSubCategories1(uniqueSubCategories1);
    };
  
    const handleSubCategory1Hover = (event, subCategory1) => {
      setSelectedSubCategory1(subCategory1);
      setHoveredSubCategory1(subCategory1);
    
      const subCategories2 = productData
        .filter((el) => el.subcategory1 && el.subcategory1.toLowerCase() === subCategory1.toLowerCase())
        .map((el) => el.subcategory2);
      const uniqueSubCategories2 = [...new Set(subCategories2)];
      setSubCategories2(uniqueSubCategories2);
    };
  
  
    const handleCategoryLeave = () => {
      setSelectedCategory("");
      setHoveredCategory("");
      setSubCategories([]);
      setSubCategories1([]);
    };
      const [dataFilter, setDataFilter] = useState([]);
      useEffect(() => {
        setDataFilter(productData);
      }, [productData]);

      const handleFilterProduct = (category) => {
        // Navigate to category page
      navigate(`${category}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      };

      const handleFiltersubProduct = (category,subCategory) => {
        // Navigate to subcategory page
        navigate(`${category}/${subCategory}`);
        setDropDown(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      };  
      
      const handleFiltersubProduct1 = (category,subCategory,subCategory1) => {
        // Navigate to subcategory page
        navigate(`${category}/${subCategory}/${subCategory1}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }; 
      const handleFiltersubProduct2 = (category,subCategory,subCategory1,subCategory2) => {
        // Navigate to subcategory page
        navigate(`${category}/${subCategory}/${subCategory1}/${subCategory2}`);
        setDropDown(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      };  

      const handleFitiDesignClick = () => {
        window.location.href = "https://www.jumia.ma/";
      };

      const isMobile = window.innerWidth < 768;
    
      return (
        <div>
           {
            isMobile?
            (<div className="bg-slate-800  h-[110px]  rounded-b-md shadow-sm">
               {
                categoryList[0]?(
                  categoryList.map((category,index) => (
                    <div
                    className="flex gap-4 font-sans justify-center cursor-pointer hover:text-teal-400"
                    key={index}
                    onMouseEnter={(event) => handleCategoryHover(event, category)}
                    onMouseLeave={handleCategoryLeave}
                    >
                       {category === "FitiDesign"?(
                         <div className="rounded w-full">
                            <button className="py-4 h-10" onClick={handleFitiDesignClick}>{category}</button>
                         </div>
                       ):(
                        <div className="rounded w-full relative">
                          <div
                            className="py-4 h-10 flex gap-10 ml-[120px] "
                          >
                              <div className="flex-1"  onClick={() => handleFilterProduct(category)}>
                                 {category}
                              </div>
                              <div className="flex-1">
                               <IoIosArrowDown
                                      size={20}
                                      className=" cursor-pointer"
                                      onClick={() => setDropDown(!dropDown)}
                                />
                               </div>
                          </div>
                          {dropDown ? 
                             (<div setDropDown={setDropDown}>
                          {(selectedCategory === category || hoveredCategory === category) && (
                          <div className="absolute   top-12 z-[1] w-full bg-slate-800 text-white p-4">
                            {subCategories.map((subCategory, index) => (
                              <div
                                key={index}
                                className="hover:text-teal-400"
                                onMouseEnter={(event) => handleSubCategoryHover(event, subCategory)}
                              >
                                <button  
                                className="py-4 h-3 flex gap-[40px] "
                                >
                                   <div className="flex-1" onClick={() => handleFiltersubProduct(category,subCategory)}>{subCategory}</div>
                                  <div className="flex-1">
                                    <IoIosArrowDown
                                          size={20}
                                          className=" cursor-pointer"
                                          onClick={() => toggleDropDown(index)}
                                    />
                                  </div>
                                </button>

                                {
                                  dropDown1[index] ?
                                   (
                                      <div>
                                        {(selectedSubCategory === subCategory || hoveredSubCategory === subCategory) && (
                                    <div className=" w-60 bg-slate-800 text-white flex text-left ml-5 p-4">
                                    {subCategories1.length > 0 && (
                                      <div>
                                        {subCategories1.map((subCategory1, index) => (
                                          (subCategory1 === "Homme" || subCategory1 === "Femme" || subCategory1 === "Enfant" ||
                                            subCategory1 === "Pédicure et manicure" || subCategory1 === "Produits de beauté" ||
                                            subCategory1 === "Accessoires") ? (
                                            <p
                                              key={index}
                                              className="hover:text-teal-400"
                                              onMouseEnter={(event) => handleSubCategory1Hover(event, subCategory1)}
                                            >
                                              <button
                                              className="py-2 h-5 "
                                              onClick={() => handleFiltersubProduct1(category,subCategory,subCategory1)}
                                              >
                                                <div className="flex gap-3">
                                                   <div>✓ </div>
                                                   <div>{subCategory1}</div>
                                                </div>
                                              
                                              </button>
                                            </p>
                                          ) : (
                                            <p
                                              key={index}
                                              className="hover:text-teal-400"
                                              onMouseEnter={(event) => handleSubCategory1Hover(event, subCategory1)}
                                            >
                                              <button  className="py-4  h-3 flex gap-[40px] ">
                                                <div className="" onClick={() => handleFiltersubProduct1(category,subCategory,subCategory1)}>
                                                        <div className="flex gap-3">
                                                                <div>✓ </div>
                                                                <div>{subCategory1}</div>
                                                           </div>
                                                </div>
                                                <div className="">
                                                    <IoIosArrowDown
                                                          size={20}
                                                          className=" cursor-pointer"
                                                          onClick={() => toggleDropDown1(index)}
                                                    />
                                                </div>
                                              </button>
                                              {dropDown2[index] ? <div>
                                                {(selectedSubCategory1 === subCategory1 || hoveredSubCategory1 === subCategory1) && (
                                                <div className=" w-[230px] ml-0 flex text-left  bg-slate-800 text-white p-4">
                                                  {subCategories2.length > 0 && (
                                                    <div>
                                                      {subCategories2.map((subCategory2, index) => (
                                                        <p key={index} className="hover:text-teal-400">
                                                          <button 
                                                            className="py-2 h-5"
                                                            onClick={() => handleFiltersubProduct2(category,subCategory,subCategory1,subCategory2)}
                                                          >
                                                              <div className="flex gap-3">
                                                                <div>✓ </div>
                                                                <div>{subCategory2}</div>
                                                              </div>
                                                          </button>
                                                        </p>
                                                      ))}
                                                    </div>
                                                  )}
                                                </div>
                                              )}
                                              </div> : null}
                                            </p>
                                          )
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                                      </div>
                                  ) 
                                  : 
                                     null
                                }
                                </div>
                            ))}
                          </div>
                          )}
                            </div>):null
                            
                            }

                        </div>
                       )}
                    </div>
                  ))
                  
                )
                :
                (
                  <div className="min-h-[150px] flex justify-center items-center">
                    <p>Chargement...</p>
                  </div>
                )
               }
            </div>)
             :
             (
            <div className="bg-slate-800 h-[110px] rounded-b-md shadow-sm">
              {categoryList[0] ? 
              (
                categoryList.map((category, index) => (
                  <div
                    className="flex gap-4 font-sans justify-center cursor-pointer hover:text-teal-400"
                    key={index}
                    onMouseEnter={(event) => handleCategoryHover(event, category)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    {category === "FitiDesign" ? (
                      <div className="rounded w-full">
                        <button className="py-4 h-10" onClick={handleFitiDesignClick}>{category}</button>
                      </div>
                    ) : (
                      <div className="rounded w-full relative">
                        <button
                          className="py-4 h-10"
                          onClick={() => handleFilterProduct(category)}
                        >
                          {category}
                        </button>
                        {(selectedCategory === category || hoveredCategory === category) && (
                          <div className="absolute left-36 top-4 w-[120px] bg-slate-700 text-white p-4">
                            {subCategories.map((subCategory, index) => (
                              <div
                                key={index}
                                className="hover:text-teal-400"
                                onMouseEnter={(event) => handleSubCategoryHover(event, subCategory)}
                              >
                                <button  
                                className="py-2 h-5"
                                onClick={() => handleFiltersubProduct(category,subCategory)}
                                >
                                  {subCategory}
                                </button>
                                {(selectedSubCategory === subCategory || hoveredSubCategory === subCategory) && (
                                  <div className="absolute ml-[76px] top-4 w-60 bg-slate-600 text-white p-4">
                                    {subCategories1.length > 0 && (
                                      <div>
                                        {subCategories1.map((subCategory1, index) => (
                                          (subCategory1 === "Homme" || subCategory1 === "Femme" || subCategory1 === "Enfant" ||
                                            subCategory1 === "Pédicure et manicure" || subCategory1 === "Produits de beauté" ||
                                            subCategory1 === "Accessoires") ? (
                                            <p
                                              key={index}
                                              className="hover:text-teal-400"
                                              onMouseEnter={(event) => handleSubCategory1Hover(event, subCategory1)}
                                            >
                                              <button
                                              className="py-2 h-5"
                                              onClick={() => handleFiltersubProduct1(category,subCategory,subCategory1)}
                                              >
                                                {subCategory1}
                                              
                                              </button>
                                            </p>
                                          ) : (
                                            <p
                                              key={index}
                                              className="hover:text-teal-400"
                                              onMouseEnter={(event) => handleSubCategory1Hover(event, subCategory1)}
                                            >
                                              <button>{subCategory1}</button>
                                              {(selectedSubCategory1 === subCategory1 || hoveredSubCategory1 === subCategory1) && (
                                                <div className="absolute ml-[200px] top-4 w-60 bg-slate-700 text-white p-4">
                                                  {subCategories2.length > 0 && (
                                                    <div>
                                                      {subCategories2.map((subCategory2, index) => (
                                                        <p key={index} className="hover:text-teal-400">
                                                          <button 
                                                            className="py-2 h-5"
                                                            onClick={() => handleFiltersubProduct2(category,subCategory,subCategory1,subCategory2)}
                                                          >
                                                              {subCategory2}
                                                          </button>
                                                        </p>
                                                      ))}
                                                    </div>
                                                  )}
                                                </div>
                                              )}
                                            </p>
                                          )
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="min-h-[150px] flex justify-center items-center">
                  <p>Chargement...</p>
                </div>
              )}
            </div>
             )
           }
        </div>
      );
}

export default DropDown;
