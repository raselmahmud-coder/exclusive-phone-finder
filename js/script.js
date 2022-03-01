const input = document.getElementById('search');
const form = document.getElementById('form');
const container = document.getElementById('container');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userQuery = input.value;
    if (userQuery) {
        loadAPI(userQuery);
        input.value = '';
    }
});
const loadAPI = (query) => {
    try {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${query}`)
            .then(response => response.json())
            .then(data => getSearchResult(data.data));
    } catch (error) {
        console.log(error);
    }
};
// display search result
const getSearchResult = (phones) => {
    phones.forEach(phone => {
        const createDiv = document.createElement('div');
        createDiv.classList.add('grid-item');
        createDiv.innerHTML = `
    <img src="${phone.image}" alt="phone" class="avatar">
    <p>Phone Name: ${phone.phone_name}</p>
    <p>Brand: ${phone.brand}</p>
    <button class="details-btn" onclick="getDetailsAPI('${phone.slug}')">Details</button>
    `;
        container.appendChild(createDiv);
        // console.log(phone);
    });
};
// get details signle phone
const getDetailsAPI = (slug) => {
    // previous ui empty
    try {
        fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(response => response.json())
        .then(data => getDetailsPhone(data.data));
    } catch (error) {
        console.log(error);
    }
    container.textContent = '';
} 
// get details phone
const getDetailsPhone = (phone) => {
    const createDiv = document.createElement('div');
    createDiv.classList.add('grid-item');
    createDiv.innerHTML = `
<img src="${phone.image}" alt="phone" class="avatar">
<p>Phone Name: ${phone.mainFeatures.name}</p>
<p>Brand: ${phone.brand}</p>
<p">Main Features: ${phone.mainFeatures.chipSet}</p>
`;
    container.appendChild(createDiv);
    container.classList.add('single-page');
    console.log(phone);
} 
