const contacts = [];
const contactList = document.getElementById('contact-body');

function addContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (name && phone && email) {
        const newContact = { name, phone, email };
        contacts.push(newContact);
        displayContacts();
        clearForm();
    } else {
        alert('Nama, Nomor Telepon, dan Email harus diisi.');
    }
}

function displayContacts() {
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>
                <button onclick="editContact(${index})">Edit</button>
                <button onclick="deleteContact(${index})">Hapus</button>
            </td>
        `;
        contactList.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value   
 = '';
}

function editContact(index) {
    // Implementasi untuk mengedit kontak
    console.log('Mengedit kontak ke-' + index);
    // Anda bisa menggunakan prompt atau modal untuk meminta input baru
    // lalu update data di array contacts
    displayContacts();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    displayContacts();
}

displayContacts();