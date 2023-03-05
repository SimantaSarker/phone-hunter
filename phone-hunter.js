const showData = (searchText, dataLimit) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => allMobileInfo(data.data, dataLimit));
};

const allMobileInfo = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.innerHTML = "";

  // Slice phones
  if (dataLimit && phones.length > 3) {
    phones = phones.slice(0, 3);
    document.getElementById("show-all").classList.remove("d-none");
  } else {
    document.getElementById("show-all").classList.add("d-none");
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
        <div class="text-center">
        <a href="#" class="btn btn-primary w-50" onclick="phoneDetails('${phone.slug}')"  data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</a>
        </div>
  </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });

  //----------------stop spinner--------------
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const phoneName = document.getElementById("search-field").value;
  showData(phoneName, dataLimit);
};

// document.getElementById("btn-search").addEventListener("click", function () {
// processSearch(3);
// });

// input field Enter event handler
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      processSearch(3);
    }
  });

const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spin");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// not the best way to show all data

document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
  document.getElementById("search-field").value = "";
});

// -----------------Phone details after each phone button clicked...-----------
const phoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((phoneId) => displayPhoneDetail(phoneId));
};

const displayPhoneDetail = (phoneId) => {
  console.log(phoneId.data.releaseDate);
  const div = document.createElement("div");
  div.classList.add("modal-dialog");
  const phoneModal = document.getElementById("phoneModal");
  phoneModal.innerHTML = "";
  div.innerHTML = `
  <div class="modal-content">
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="phoneModal">${phoneId.data.name}</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
  <img src="${phoneId.data.image}" alt="" class="img-fluid w-100 p-5">
  </div>
<p class="font-bold"> ${
    phoneId.data.releaseDate ? phoneId.data.releaseDate : "Not released yet.."
  }
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  </div>
</div>
  `;
  phoneModal.appendChild(div);
};

showData("samsung");
