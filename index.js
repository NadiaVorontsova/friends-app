const URL = 'https://randomuser.me/api/?results=5&inc=picture,name,gender,name,dob,phone,email';

const userCardParentELement = document.querySelector('.container__user__card');
userCardParentELement.insertAdjacentHTML('beforeend',
    `<div class="loading">
        <img src="assets/image/loading.png" width="170" height="190" alt="">
    </div>`
);

const loading = document.querySelector('.loading');
const loadingPage = () => {
    loading.innerHTML = '';
    loading.classList.remove("loading");
    loading.classList.add("error__message");
    loading.innerHTML = "Oops, something went wrong! Try again...";
}

let usersData = [];

const getUsersData = async (url) => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        prepareUsersData(result.results);
    } catch (err) {
        loadingPage();
    }
};

getUsersData(URL);

const prepareUsersData = (data) => {
    data.map(user => {
        let userInfo = {
            picture: user.picture.large,
            fullName: user.name.first + ' ' + user.name.last,
            gender: user.gender,
            age: user.dob.age,
            phone: user.phone,
            email: user.email
        }
        usersData = [...usersData, userInfo];
    });
    userCardParentELement.removeChild(loading);
    renderUsers(usersData);
};

const renderUsers = (listOfUsers) => {
    userCardParentELement.innerHTML = "";
    listOfUsers.forEach((user) => {
        userCardParentELement.insertAdjacentHTML('beforeend',
            `<div class="user__card">
                <img src="${user.picture}" alt="user photo" class="user__photo">
                <span class="user__name">${user.fullName}</span>
                <span class="user__info">${user.gender}</span>
                <span class="user__info">${user.age} y.o.</span>
                <span class="user__info">${user.phone}</span>
                <span class="user__info">${user.email}</span>
            </div>`
        )
    })
};

const radioGender = document.querySelectorAll("input[name='search_by_gender']");
const radioAge = document.querySelectorAll("input[name='search_age']");
const radioAlphabet = document.querySelectorAll("input[name='search_by_alphabet']");

const searchInput = document.querySelector(".input__search__name");
const resetBtn = document.querySelector(".reset__button");

let copyListOfUsers = [];

let searchValue;
let idgender;

const sortUsers = (id, listOfUsers) => {
    copyListOfUsers = [...listOfUsers];

    if (id === 'search_age_up') { copyListOfUsers = listOfUsers.sort((first, next) => compareAge(first, next)) }
    if (id === 'search_age_down') { copyListOfUsers = listOfUsers.sort((first, next) => compareAge(next, first)) }

    if (id === 'search_by_alphabet_up') { copyListOfUsers = listOfUsers.sort((first, next) => compareName(first, next)) }
    if (id === 'search_by_alphabet_down') { copyListOfUsers = listOfUsers.sort((first, next) => compareName(next, first)) }

    if (id === 'male' || id === 'female') {
        idgender = id;
    }
    if (idgender) {
        copyListOfUsers = listOfUsers.filter(
            (user) => user.gender === idgender
        );
    }

    if (id === 'search_name' || searchValue) {
        copyListOfUsers = listOfUsers.filter((user) => {
            return user.fullName
            .toLowerCase()
            .search(searchValue) > -1
        });
    }

    renderUsers(copyListOfUsers);
};

const compareAge = (firstUser, nextUser) => {
    return firstUser.age - nextUser.age;
};

const compareName = (firstUser, nextUser) => {
    first = firstUser.fullName.toLowerCase();
    next = nextUser.fullName.toLowerCase();
    return first < next ? -1 : 1;
};

const filterContainer = document.querySelector('.container__filter');
filterContainer.addEventListener("click", ({ target }) => {
    if(target.closest(".input__search__name")) return;
    const copyUsersData = [...usersData];
    sortUsers(target.id, copyUsersData);
});

searchInput.addEventListener("input", ({target})=>{
    searchValue = target.value.toLowerCase();
    const copyUsersData = [...usersData];
    sortUsers(target.id, copyUsersData);
});

const reset = () => {
    /*searchInput.value = '';
    radioAge.forEach(radio => radio.checked = false);
    radioAlphabet.forEach(radio => radio.checked = false);
    radioGender.forEach(radio => radio.checked = false);
    */
    renderUsers(usersData);
    copyListOfUsers = [...usersData];
    filterContainer.reset();
};
resetBtn.addEventListener("click", reset);
