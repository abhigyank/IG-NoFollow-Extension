function getListElement(text) {
	const li = document.createElement('li');
	const a = document.createElement('a');
	a.href = 'https://instagram.com/' + text;
	a.setAttribute('target', '_blank');
	const strong = document.createElement('strong');
	strong.textContent = text;
	a.append(strong);
	li.append(a);
	return li;
}

const data = JSON.parse(localStorage.sharedData);

const {followers} = data;
const {following} = data;

const nonFollowBack = [];

for (let index = 0; index < following.length; index++) {
	if (!followers.includes(following[index])) {
		nonFollowBack.push(following[index]);
	}
}

const list = document.querySelector('#nonFollowBack');

nonFollowBack.forEach(element => {
	list.append(getListElement(element));
});

const followersList = document.querySelector('#followers');

followers.forEach(element => {
	followersList.append(getListElement(element));
});

const followingList = document.querySelector('#following');

following.forEach(element => {
	followingList.append(getListElement(element));
});
