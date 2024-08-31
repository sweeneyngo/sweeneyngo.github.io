function convertDate(date: string) {
    return new Date(date).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }) + " (PST)";
}

async function getLastCommit() {
    const result = await fetch('https://api.github.com/repos/sweeneyngo/home/commits')
        .then(response => response.json())
        .then(data => convertDate(data[0].commit.author.date.toString()))
        .catch(error => console.error(error));
    return result;
}

function getAge() {
    var today = new Date();
    var birthDate = new Date("2002-08-28");
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export { getLastCommit, getAge }
