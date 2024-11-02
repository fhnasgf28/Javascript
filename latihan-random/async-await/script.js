document.getElementById('fetchData').addEventListener('click', fetchUserData);

async function fetchUserData() {
    const userDataDiv = document.getElementById('userData');
    userDataDiv.innerHTML = 'Mengambil data...';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Gagal mengambil data');
        }
        const users = await response.json();
        displayUserData(users);
    } catch (error) {
        console.error(error);
        userDataDiv.innerHTML = `Terjadi kesalahan saat mengambil data ${error.message}`;
    }
}

function displayUserData(users) {
    const userDataDiv = document.getElementById('userData');
    userDataDiv.innerHTML = '';

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `
            <h2>${user.name}</h2>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
        `
    })
}