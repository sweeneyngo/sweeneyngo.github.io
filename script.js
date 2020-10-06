const selectElement = (s) => document.querySelector(s);


// Toggle navigation bar
selectElement('.open').addEventListener('click', () => {
    selectElement('.nav-list').classList.add('active');
})

selectElement('.close').addEventListener('click', () => {
    selectElement('.nav-list').classList.remove('active');
})