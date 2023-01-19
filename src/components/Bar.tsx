import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function Bar() {
   const coins = useSelector((state: RootState) => state.player.coins);

   function showShop() {
      // document.querySelector('#shop').style.display = 'block';
   }

   return (
      <div id='bar'>
         <div className='bar__coins'>
            <span />
            {coins}
         </div>

         <div className='bar__shop' onClick={showShop} />
      </div>
   )
}
