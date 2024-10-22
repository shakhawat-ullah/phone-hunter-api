const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {

    // console.log(phones);

    // Show all Button added
    const showAllButton = document.getElementById('show-all-btn');
    showAllButton.classList.remove('hidden');



    if (phones.length > 12 && !isShowAll) {
        showAllButton.classList.remove('hidden');
    }
    else {
        showAllButton.classList.add('hidden');
    }
    // Display only first 12 phones if not show All

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    // 1. Create Where to add
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';


    phones.forEach(phone => {
        // console.log(phone)

        //2. What will be added
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl `;
        phoneCard.innerHTML = `
        <figure>
        <img src=${phone.image}
        alt="Phones" />
        </figure>
        <div class="card-body space-y-2">
            <h2 class="text-xl font-bold text-center">${phone.phone_name}</h2>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        // 3. append your data

        phoneContainer.appendChild(phoneCard);

    });
    loadSpinner(false);


}

const handleShowDetails = async (id) => {
    // console.log('clicked show details', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    const modalDetailsContainer = document.getElementById('modal-details-container');

    phoneName.innerText = `${phone.name}`;

    modalDetailsContainer.innerHTML = `
    <div class=" flex justify-center">
        <img src= ${phone.image} alt="">
    </div>
    <p><b>Storage: </b><span>${phone?.mainFeatures?.storage}</span></p>
    <p><b>GPS: </b><span>${phone?.others?.GPS}</span></p>
    `

    // Show the Modal
    show_details_modal.showModal();
}

// Handle Search 

const handleSearch = (isShowAll) => {
    loadSpinner(true);
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    loadPhone(searchText, isShowAll);

}

// Handle Search recap
// const handleSearch2 = () => {
//     loadSpinner(true);
//     const inputField2 = document.getElementById('input-field2');
//     const searchText = inputField2.value;
//     loadPhone(searchText);
// }

// Load Spinner

const loadSpinner = (isLoading) => {
    const loadingContainer = document.getElementById('loading-spinner');

    if (isLoading) {
        loadingContainer.classList.remove('hidden');
    }
    else {
        loadingContainer.classList.add('hidden');
    }
}


// Handle Show All

const handleShowAll = () => {
    handleSearch(true);

}