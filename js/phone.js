const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText }`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
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
    
    if(!isShowAll) {
        phones = phones.slice(0, 12);
    }

    // 1. Create Where to add
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';


    phones.forEach(phone => {
        // console.log(phone)

        //2. What will be added
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl  `;
        phoneCard.innerHTML = `
        <figure>
        <img src=${phone.image}
        alt="Phones" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        // 3. append your data

        phoneContainer.appendChild(phoneCard);

    });
    loadSpinner(false);


}

// loadPhone()

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