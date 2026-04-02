// Initial data
const defaultItems = [
    { id: 'nasigoreng', name: 'Nasi Goreng', votes: 0 },
    { id: 'rendang', name: 'Rendang', votes: 0 },
    { id: 'sotoayam', name: 'Soto Ayam', votes: 0 }
];

// key for localStorage
const STORAGE_KEY = 'makanan_favorit_votes';

// Get data from localStorage or use default
function getItems() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return defaultItems;
}

// Save data to localStorage
function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Render the list
function render() {
    const items = getItems();
    const listContainer = document.getElementById('votingList');
    listContainer.innerHTML = '';

    items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'vote-item';

        itemEl.innerHTML = `
            <div class="item-info">
                <span class="item-name">${item.name}</span>
                <span class="vote-count">Suara: <span id="count-${item.id}">${item.votes}</span></span>
            </div>
            <button class="vote-btn" onclick="vote('${item.id}')">Vote</button>
        `;

        listContainer.appendChild(itemEl);
    });
}

// Handle vote action
window.vote = function (id) {
    const items = getItems();
    const itemIndex = items.findIndex(i => i.id === id);

    if (itemIndex !== -1) {
        items[itemIndex].votes += 1;
        saveItems(items);

        // Update DOM directly for better performance/animation
        const countEl = document.getElementById(`count-${id}`);
        if (countEl) {
            countEl.innerText = items[itemIndex].votes;

            // Add animation class
            countEl.classList.remove('pop-anim');
            void countEl.offsetWidth; // trigger reflow
            countEl.classList.add('pop-anim');
        }
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', render);
