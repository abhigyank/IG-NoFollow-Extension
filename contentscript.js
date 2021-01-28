function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


var port = chrome.runtime.connect({ name: "InstagramExtensionData" });

const followersElement = document.querySelectorAll("main section ul li a")[0];
const followersCount = Number(followersElement.children[0].innerText.split(",").join(""));
const followingElement = document.querySelectorAll("main section ul li a")[1];
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
    const listElement = document.querySelector("[role=dialog] ul div");
    let listLoadedCount = listElement.childElementCount;
    let limit = (maxCount - (maxCount % 12));
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
    await checkElement("[role=dialog] ul li div");

    let ulElement = document.querySelector("[role=dialog] ul");
    let divElement = ulElement.parentElement;

    await scrollElement(divElement, followersCount);

    const followerElements = document.querySelectorAll("[role=dialog] ul li span a");
    followerElements.forEach(element => {
        followers.push(element.innerHTML);
    });
    console.log(followers);

    // Getting Following Data

    followingElement.click();
    listLoadedCount = 0;

    await checkElement("[role=dialog] ul li div");

    ulElement = document.querySelector("[role=dialog] ul");
    divElement = ulElement.parentElement;

    await scrollElement(divElement, followingCount);

    const followingElements = document.querySelectorAll("[role=dialog] ul li span a");
    followingElements.forEach(element => {
        following.push(element.innerHTML);
    });
    console.log(following);

    port.postMessage({ followers: followers, following: following });

}

execute();

