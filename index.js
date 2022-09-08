const URL = 'https://randomuser.me/api/?results=5&inc=picture,name,gender,name,dob,phone,email';

const userCardParentELement = document.querySelector('.container__user__card');
userCardParentELement.insertAdjacentHTML('beforeend',
    `<div class="loading">
        <img src="assets/image/loading.png" width="170" height="190" alt="">
    </div>`
);

const loading = document.querySelector('.loading');

const loadingPage = () =>{
    loading.innerHTML = '';
    loading.classList.remove("loading");
    loading.classList.add("error__message");
    loading.innerHTML = "Oops, something went wrong! Try again...";
}

const getUsersData = async (url) => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        renderUsers(result.results);
    } catch (err) {
        loadingPage();
    }
};

getUsersData(URL);

const renderUsers = (listOfUsers) => {
    userCardParentELement.removeChild(loading);
    listOfUsers.map((user) => {
        userCardParentELement.insertAdjacentHTML('beforeend',
            `<div class="user__card">
            <img src="${user.picture.large}" alt="user photo" class="user__photo">
            <span class="user__name">${user.name.first} ${user.name.last}</span>
            <span class="user__info">${user.gender}</span>
            <span class="user__info">${user.dob.age} y.o.</span>
            <span class="user__info">${user.phone}</span>
            <span class="user__info">${user.email}</span>
        </div>`
        )
    })
};

