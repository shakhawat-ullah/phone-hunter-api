const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {

    // console.log(phones);
    // 1. Create Where to add
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    phones.forEach(phone => {
        console.log(phone)

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

    })


}

// loadPhone()

// Handle Search 

const handleSearch = () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    loadPhone(searchText);

}

const handleSearch2 = () => {
    const inputField2 = document.getElementById('input-field2');
    const searchText = inputField2.value;
    loadPhone(searchText);
}