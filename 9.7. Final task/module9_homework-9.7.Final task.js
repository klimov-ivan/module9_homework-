//Задание 5.

const width = document.querySelector('.width');
const height = document.querySelector('.height');
const textW = document.querySelector('.text-w');
const textH = document.querySelector('.text-h');
const btn = document.querySelector('.j-btn');
const content = document.querySelector('.content');

// Функция, которая возвращаем fetch
const useRequest = (url) => {
	
	return fetch(url)
	  .then((response) => {
		console.log('response', response);
		return response.json();
	  })
	  .then((json) => { return json; })
	  .catch(() => { console.log('error') });

	  
  }
  

const displayResult = (apiData) => {
	let cards = '';
	
    if( ! +width.value || width.value  > 500 || width.value < 100 ) {
		
		textW.innerHTML = 'Число вне диапазона от 100 до 500';
		setTimeout(() => {
			textW.innerHTML = ' ';
		}, 3000);
	
	}else if(! +height.value || height.value  > 500 || height.value < 100) {	
		    
		textH.innerHTML = 'Число вне диапазона от 100 до 500';
		setTimeout(() => {
			textH.innerHTML = ' ';
		}, 3000);
	
	}else {
		apiData.forEach(item => {
		let cardBlock = `
			  <div class="card">
				<img
				  src="${item.download_url}"
				  class="card-image" style='width:${width.value}px; height:${height.value}px;' 
				/>
			  </div>
			`;
			cards = cards + cardBlock;
		});
		content.innerHTML = cards;
	};
  }

 
  
  const randomNum = Math.floor(Math.random() * 30);
 
  btn.addEventListener('click', async () => {
	
	let requestResult = await useRequest(`https://picsum.photos/v2/list?page=${randomNum}&limit=${randomNum}`);

	let displayR = await displayResult(requestResult );
    let requsJ = JSON.stringify(requestResult);
	let strJson = localStorage.setItem('myJSON',requsJ);
  });

  document.addEventListener("DOMContentLoaded", async () => {

	let myJSON = localStorage.getItem('myJSON');
	let obiJ = JSON.parse(myJSON);
	
	console.log(obiJ);
	let cards = '';
		obiJ.forEach(item => {
			let cardBlock = `
				  <div class="card">
					<img
					  src="${item.download_url}"
					  class="card-image" style='width: 30vw; height: auto;' 
					/>
				  </div>
				`;
				cards = cards + cardBlock;
				
			});
		content.innerHTML = cards;
	});
