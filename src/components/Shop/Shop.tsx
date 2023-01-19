import React, { useState } from 'react'
import buy from '../../scripts/buy';

export default function Shop() {
   const [isShowing, setShowing] = useState(false);
   const closeShop = () => setShowing(false);

   return (
      isShowing
         ?
         <div id='shop'>
            <div className="shop__bg" onClick={closeShop}></div>
            <div className="shop__content">
               <div className="shop__close" onClick={closeShop}></div>
               <h2 className="shop__title font-effect-neon">Магизин Бена</h2>
               <img src="../assets/img/ben.png" className="shop__img" alt="Зомби Бен" />
               <div className='shop__text'>
                  <div className="shop__description font-effect-neon">
                     <div>
                        Просто введи что-нибудь не совсем законное...
                     </div>
                     <div>
                        То, что ты хочешь ╰(▔∀▔)╯
                     </div>
                  </div>
                  <form id="shop__from" onSubmit={buy}>
                     <input type="text" className="shop__input" />
                     <input type="submit" className="shop__btn" value='Купить' />
                  </form>
               </div>
            </div>
         </div>
         :
         null
   )
}
