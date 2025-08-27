const fetchPhoneData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    // console.log(data);
    displayPhoneData(data.data);
}

const displayPhoneData = phones => {
    const phoneContainer = document.getElementById('phone_container');
    for(const phone of phones){
        console.log(phone);
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

fetchPhoneData();