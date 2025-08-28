// data load function
const fetchPhoneData = async(phoneName='iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await res.json();
    displayPhone(data.data, isShowAll);
}

// phone display function
const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone_container');
    
    // clear phone container cards before adding new cards
    //phoneContainer.innerHTML = '';
    //another process
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const morePhoneContainer = document.getElementById("more_phone_container");
    if(phones.length > 12 && !isShowAll){
        morePhoneContainer.classList.remove('hidden');
    }else{
        morePhoneContainer.classList.add('hidden');
    }

    // display first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    
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
            <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Details</button>
            </div>
        </div>
        `;
        phoneCard.classList = `card bg-gray-200 p-5 shadow-sm`

        phoneContainer.appendChild(phoneCard);
    }

    // hide loading spinner after load phones
    toggleLoadingSpinner(false);
}

// modal showing function
const showDetails = async(id) => {
    // console.log('clicked', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(phone);

    const showDetailsContainer = document.getElementById('show_details_container');
    showDetailsContainer.innerHTML = `
    <div class="flex justify-center">
        <img src="${phone.image}" alt="">
    </div>
    <div>
        <h1 class="text-3xl font-bold">${phone.name}</h1>
        <p>description</p>
        <p><span class="font-bold">Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold">Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">Chipset:</span>${phone?.mainFeatures?.chipSet}</p>
        <p><span class="font-bold">Memory:</span>${phone?.mainFeatures?.memory}</p>
        <p><span class="font-bold">Slug:</span>${phone.slug}</p>
        <p><span class="font-bold">Release date:</span>${phone.releaseDate}</p>
        <p><span class="font-bold">Brand:</span>${phone.brand}</p>
        <p><span class="font-bold">GPS:</span>${phone?.others?.GPS || 'No GPS Avaiable'}</p>
    </div>
    `

    show_detail_modal.showModal();
}

// phone search function
const searchPhoneWithName = (isShowAll) => {
    // display loading spinner when click
    toggleLoadingSpinner(true);

    const searchField = document.getElementById('search_field');
    const searchText = searchField.value;
    // console.log(searchText);
    fetchPhoneData(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoad) => {
    const loadSpinner = document.getElementById('loading_spinner');
    if(isLoad){
        loadSpinner.classList.remove('hidden');
    }else{
        loadSpinner.classList.add('hidden');
    }
}

// show all phone function
const showAllPhone = () => {
    searchPhoneWithName(true);
}

fetchPhoneData();