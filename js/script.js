const fetchPhoneData = async(phoneName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await res.json();
    // console.log(data);
    displayPhone(data.data);
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone_container');
    
    // clear phone container cards before adding new cards
    //phoneContainer.innerHTML = '';
    //another process
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const morePhoneContainer = document.getElementById("more_phone_container");
    if(phones.length > 12){
        morePhoneContainer.classList.remove('hidden');
    }else{
        morePhoneContainer.classList.add('hidden');
    }

    // display first 12 phones
    phones = phones.slice(0,12);
    
    // add phone card one by one
    for(const phone of phones){
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.innerHTML = `
        <figure>
                <img src="${phone.image}" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        phoneCard.classList = `card bg-gray-200 p-5 shadow-sm`

        phoneContainer.appendChild(phoneCard);
    }
}

const searchPhoneWithName = () => {
    const searchField = document.getElementById('search_field');
    const searchText = searchField.value;
    searchField.value = '';
    // console.log(searchText);
    fetchPhoneData(searchText);
}

//fetchPhoneData();