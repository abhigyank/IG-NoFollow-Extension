function getListElement(text) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = "https://instagram.com/" + text;
    a.setAttribute("target", "_blank");
    let strong = document.createElement('strong');
    strong.textContent = text;
    a.appendChild(strong);
    li.appendChild(a);
    return li;
}

let data = JSON.parse(localStorage.sharedData);

let followers = data.followers;
let following = data.following;

let nonFollowBack = [];

for (let index = 0; index < following.length; index++) {
    if (!followers.includes(following[index])) {
        nonFollowBack.push(following[index]);
    }
}
const list = document.querySelector("#nonFollowBack");

nonFollowBack.forEach(element => {
    list.appendChild(getListElement(element));
});

const followersList = document.querySelector("#followers");

followers.forEach(element => {
    followersList.appendChild(getListElement(element));
});

const followingList = document.querySelector("#following");

following.forEach(element => {
    followingList.appendChild(getListElement(element));
});