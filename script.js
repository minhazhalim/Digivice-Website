function showModal(id){
	const modal = document.getElementById(id);
	if(!modal) return;
	if(window.bootstrap && typeof window.bootstrap.Modal === 'function'){
		window.bootstrap.Modal.getOrCreateInstance(modal).show();
		return;
	}
	modal.classList.add('show');
	modal.style.display = 'block';
	modal.setAttribute('aria-hidden','false');
	document.body.classList.add('modal-open');
	if(!document.querySelector('.modal-backdrop')){
		const backdrop = document.createElement('div');
		backdrop.className = 'modal-backdrop fade show';
		document.body.appendChild(backdrop);
	}
}
function displayDigimonDetails(digimon){
     document.getElementById('digimonImage').src = digimon.img;
     document.getElementById('digimonName').textContent = digimon.name;
     document.getElementById('digimonLevel').textContent = `Level: ${digimon.level}`;
     showModal('digimonModal');
}
function fetchDigimonByNameAndDisplayModal(name){
     fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
     .then(response => response.json())
     .then(data => {
          if(data.length > 0){
               const digimon = data[0];
               displayDigimonDetails(digimon);
          }else alert('Digimon Not Found');
     })
     .catch(error => {
          console.log('Error:',error);
     });
}
function displayDigimonList(digimonList,sorted = true){
     const digimonListContainer = document.getElementById('digimonList');
     digimonListContainer.innerHTML = "";
     if(sorted){
          digimonList = [...digimonList].sort((a,b) => a.name.localeCompare(b.name));
     }
     digimonList.forEach(digimon => {
          const li = document.createElement('li');
          const button = document.createElement('button');
          li.className = 'list-group-item btn digimon-button';
          li.appendChild(button);
          li.textContent = digimon.name;
          li.addEventListener('click',() => {
               displayDigimonDetails(digimon);
          });
          digimonListContainer.appendChild(li);
     });
}
function fetchDigimon(){
     fetch('https://digimon-api.vercel.app/api/digimon')
     .then(response => {
          if(!response.ok) throw new Error('Network Response Was Not Ok');
          return response.json();
     })
     .then(data => {
          displayDigimonList(data);
     })
     .catch(error => {
          console.log('Error:',error);
     });
}
fetchDigimon();
document.getElementById('searchButton').addEventListener('click',function(){
     const name = document.getElementById('search').value.trim();
     if(name !== "") fetchDigimonByNameAndDisplayModal(name);
});
document.getElementById('search').addEventListener('keydown',function(event){
     if(event.key === 'Enter'){
          event.preventDefault();
          const name = document.getElementById('search').value.trim();
          if(name !== "") fetchDigimonByNameAndDisplayModal(name);
     }
});