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

const prepareUsersData = (data)=>{
    data.map(user => {
        let userInfo = {
            picture: user.picture.large,
            firstName: user.name.first,
            lastName: user.name.last,
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
                <span class="user__name">${user.firstName} ${user.lastName}</span>
                <span class="user__info">${user.gender}</span>
                <span class="user__info">${user.age} y.o.</span>
                <span class="user__info">${user.phone}</span>
                <span class="user__info">${user.email}</span>
            </div>`
        )
    })
};
const radioGender = document.querySelectorAll("input[name='search_by_gender']");

const filterByGender = (id, listOfUsers) => {
    let copyListOfUsers = [...listOfUsers];
    if (id === 'male'|| id === 'female'){
        copyListOfUsers = listOfUsers.filter(user=>user.gender === id);
    }else {
        copyListOfUsers = [...listOfUsers];
        radioGender.forEach(radio=> radio.checked = false)
    }
    renderUsers(copyListOfUsers);
};

const filterContainer = document.querySelector('.container__filter');

filterContainer.addEventListener("click", ({target})=>{
    const copyUsersData = [...usersData];
    filterByGender(target.id, copyUsersData);
    console.log(target)
});
