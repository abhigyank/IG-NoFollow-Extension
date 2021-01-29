function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// tentative number of accounts instagram loads on each scroll
const instagramLoadCount = 12;

selectors = {
    modalTrigger: "main section ul li a",
    userLi: "[role=dialog] ul div",
    ulElement: "[role=dialog] ul",
    usernames: "[role=dialog] ul li span a",
    modalDiv: "[role=dialog] ul li div"
}

var port = chrome.runtime.connect({ name: "InstagramExtensionData" });

const followersElement = document.querySelectorAll(selectors.modalTrigger)[0];
const followersCount = Number(followersElement.children[0].innerText.split(",").join(""));
const followingElement = document.querySelectorAll(selectors.modalTrigger)[1];
const followingCount = Number(followingElement.children[0].innerText.split(",").join(""));

var followers = [];
var following = []


const checkElement = async selector => {
    while (document.querySelector(selector) == null) {
        await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
}

async function scrollElement(elem, maxCount) {
    const listElement = document.querySelector(selectors.userLi);
    let listLoadedCount = listElement.childElementCount;
    let limit = (maxCount - (maxCount % instagramLoadCount));
    if ((maxCount % 12)) limit++;
    while (listLoadedCount < limit) {
        elem.scrollTop = elem.scrollHeight;

        while (listElement.childElementCount == listLoadedCount) {
            await new Promise(resolve => requestAnimationFrame(resolve));
        }
        await sleep(150);
        listLoadedCount = listElement.childElementCount;
        console.log(listLoadedCount + " " + maxCount + " " + limit);
    }
}
async function execute() {
    // Getting Followers Data
    followersElement.click();
    let listLoadedCount = 0;
    await checkElement(selectors.modalDiv);

    let ulElement = document.querySelector(selectors.ulElement);
    let divElement = ulElement.parentElement;

    await scrollElement(divElement, followersCount);

    const followerElements = document.querySelectorAll(selectors.usernames);
    followerElements.forEach(element => {
        followers.push(element.innerHTML);
    });
    console.log(followers);

    // Getting Following Data
    followingElement.click();
    listLoadedCount = 0;

    await checkElement(selectors.modalDiv);

    ulElement = document.querySelector(selectors.ulElement);
    divElement = ulElement.parentElement;

    await scrollElement(divElement, followingCount);

    const followingElements = document.querySelectorAll(selectors.usernames);
    followingElements.forEach(element => {
        following.push(element.innerHTML);
    });
    console.log(following);

    port.postMessage({ followers: followers, following: following });

}

execute();

