import React from 'react';
import Fiti from "./Fiti.png";
const CardFiti = () => {

    const isMobile = window.innerWidth < 768;
  return (
    <div>
        { isMobile?
            (
            <div className="bg-slate-800 h-[150px] w-[110px] ml-2 flex items-center justify-center "
              style={{ borderRadius: "20px" }}
            >
                <img src={Fiti} alt="Chargement"/>
            </div>)
            :(
            <div className="bg-slate-800 h-[250px] flex items-center justify-center rounded">
                <img src={Fiti} alt="Chargement"/>
            </div>
            )
            
        }
        
    </div>
    
  );
}

export default CardFiti;
