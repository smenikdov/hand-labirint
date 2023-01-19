export default function buy(e) {
   e.preventDefault();
   console.log('BUY!')

   const API_KEY = '563492ad6f917000010000012ca0e6a45a414a84ae89eb124993a4e9';
   const query = document.querySelector('.shop__input').value + '+png';
   const orientation = 'square';
   const page = 1;
   const per_page = 1;
   console.log(query);

   fetch(`https://api.pexels.com/v1/search?query=${query}&orientation=${orientation}&page=${page}&per_page=${per_page}`, {
      headers: {
         Authorization: API_KEY
      }
   })
      .then(resp => {
         return resp.json()
      })
      .then(data => {
         let url = data.photos[0].src.small;
         document.querySelector('#player').style.background = `url(${url})`
      })

}

