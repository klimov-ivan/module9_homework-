
//Задание 4.


   //Функция-обертка над XMLHttpRequest
 
   function useRequest1(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	
	xhr.onload = function() {
	  if (xhr.status != 200) {
		console.log('Статус ответа: ', xhr.status);
	  } else {
		const result = JSON.parse(xhr.response);
		
		if (callback) {
		  callback(result);
		}
	  }
	  
	};
	
	xhr.onerror = function() {
	  console.log('Ошибка! Статус ответа: ', xhr.status);
	};
	
	xhr.send();
  }; 
  
  // Ищем ноду для вставки результата запроса
  const resultNode1 = document.querySelector('.error1');
  const resultNode2 = document.querySelector('.error2');
  const resultNode3 = document.querySelector('.error3');
  // Ищем кнопку, по нажатии на которую будет запрос
  const btnNode1 = document.querySelector('.btn-request1');
  const input1 = document.querySelector('.input1');
  const input2 = document.querySelector('.input2');
  
  
  
  
	// Функция обработки полученного результата
	// apiData - объект с результатом запроса
	
   function displayResult1(apiData) {
	let cards = '';
	// console.log('start cards', cards);
	

	if( ! Number(input1.value) || Number(input1.value)  > 500 || Number(input1.value) < 100 ) {
		
		resultNode1.innerHTML = 'Число вне диапазона от 100 до 500';
		setTimeout(() => {
			resultNode1.innerHTML = ' ';
		}, 3000);
	
	}else if(! Number(input2.value) || Number(input2.value)  > 500 || Number(input2.value) < 100) {	
		    
		resultNode2.innerHTML = 'Число вне диапазона от 100 до 500';
		setTimeout(() => {
			resultNode2.innerHTML = ' ';
		}, 3000);
	
	}else {
		apiData.forEach(item => {
		const cardBlock = `
			  <div class="card">
				<img
				  src="${item.file}"
				  class="card-image"
				/>
			  </div>
			`;
			cards = cards + cardBlock;
		});
		  
		  resultNode3.innerHTML = cards;
	};
  }
  
  // Вешаем обработчик на кнопку для запроса
  btnNode1.addEventListener('click', () => {
	useRequest1(`https://loremflickr.com/json/g/${input1.value}/${input2.value}/all`, displayResult1);
  });
 
