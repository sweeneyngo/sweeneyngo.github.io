// Fetch github last commit

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

export { getLastCommit }
