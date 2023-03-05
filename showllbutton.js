const showData = (searchText) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => allMobileInfo(data.data.dataLimit));
};

const allMobileInfo = (phones,dataLimit) => {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.innerHTML = "";
  const showAll=document.getElementById('show-all');

  if(dataLimit&& phones.length>10)
  {
    phones=phones.slice(0,10);
    showAll.classList.remove('d-none')
    
  }
  else{
    showAll.classList.add('d-none')
  }

  // Display no phone
  const noPhone = document.getElementById("no-phone-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  // Display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col", "px-5");
    phoneDiv.innerHTML = `
    <div class="card shadow-lg p-3 mb-5 bg-body-tertiary border border-5">
    <img src="${phone.image}" class="card-img-top p-5" alt="...">
    <div class="card-body text-center">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">${phone.slug}</p>
    </div>
  </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });

  //----------------stop spinner--------------
  toggleSpinner(false);
};

const shareResource=(dataLimit)=>{
  toggleSpinner(true);
  const phoneName = document.getElementById("phone-name").value;
  showData(phoneName,dataLimit);
}


document.getElementById("btn-search").addEventListener("click", function () {
 shareResource(10);
});

const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spin");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};


document.getElementById('btn-show-all').addEventListener('click',function()
{
shareResource();
})