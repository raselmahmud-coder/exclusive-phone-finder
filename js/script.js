const input = document.getElementById('search');
const formId = document.getElementById('form');
const container = document.getElementById('container');
const spinner = document.getElementById('spinner');
const error = document.getElementById('error');

formId.addEventListener('submit', (e) => {
    // spinner.classList.add('spinner');
    e.preventDefault();
    let letters = /[a-z]/i;
    const userQuery = input.value;
    if (userQuery === '' || !userQuery.match(letters)) {
        spinner.classList.remove('spinner');
        container.textContent = '';
        input.value = '';
        error.innerText = 'Please give a valid phone name';
        // alert('need a valid name');
    }
    else {
        spinner.classList.add('spinner');
        loadAPI(userQuery.toLowerCase());
        input.value = '';
        container.textContent = '';
        container.classList.remove('single-page');
        createDiv.textContent = '';
        error.textContent = '';
    }
});

// Load API for Search  
const loadAPI = (query) => {
    try {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${query}`)
            .then(response => response.json())
            .then(data => getSearchResult(data.data));
    } catch (error) {
        console.log(error);
        error.innerText = `${error}`;
    }
};
// display search result
const getSearchResult = (phones) => {
    // the array is defined and has no elements
    if (phones.length === 0) {
        spinner.classList.remove('spinner');
        error.innerText = 'did not founds any phone';
    }
    
    // const arrLength = phones.length;
    const firstPageResult = phones.slice(0, 6);
    firstPageResult.forEach(phone => {
            const createDiv = document.createElement('div');
            createDiv.classList.add('grid-item', 'animate-bottom');
            spinner.classList.remove('spinner');
            createDiv.innerHTML = `
        <img src="${phone.image}" alt="phone" class="avatar">
        <p>Phone Name: ${phone.phone_name}</p>
        <p>Brand: ${phone.brand}</p>
        <button class="details-btn" onclick="getDetailsAPI('${phone.slug}')">Details</button>
        `;
            container.appendChild(createDiv);

    });
    if (phones.length >= 7) {
        const showMoreBtn = document.getElementsByClassName('show-more');
        showMoreBtn[0].style.display = 'block';
        const showMoreResult = phones.slice(6, phones.length);
         showMoreBtn[0].addEventListener('click', () => {
            showMoreResult.forEach(phone => {
                const createDiv = document.createElement('div');
                createDiv.classList.add('grid-item', 'animate-bottom');
                spinner.classList.remove('spinner');
                createDiv.innerHTML = `
            <img src="${phone.image}" alt="phone" class="avatar">
            <p>Phone Name: ${phone.phone_name}</p>
            <p>Brand: ${phone.brand}</p>
            <button class="details-btn" onclick="getDetailsAPI('${phone.slug}')">Details</button>
            `;
                container.appendChild(createDiv);
    
            });
            showMoreBtn[0].style.display = 'none';
             console.log(showMoreResult);
         });
    }
};
// get details signle phone
const getDetailsAPI = (slug) => {
    // spinner add
    spinner.classList.add('spinner');
    try {
        fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(response => response.json())
        .then(data => getDetailsPhone(data.data));
    } catch (error) {
        console.log(error);
    }
    // previous UI empty
    container.textContent = '';
} 
// get details phone
const createDiv = document.createElement('div');
const getDetailsPhone = (phone) => {
    createDiv.classList.add('grid-item', 'animate-bottom');
    spinner.classList.remove('spinner');
    createDiv.innerHTML = `
<img src="${phone.image}" alt="phone" class="avatar">
<p>Phone Name: ${phone.name}</p>
<p>Brand: ${phone.brand}</p>
<p">Main Features: ${phone.mainFeatures.chipSet}</p>
`;
    container.appendChild(createDiv);
    container.classList.add('single-page');
    // container.textContent = '';
    console.log(phone);
} 
