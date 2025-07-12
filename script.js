// --- MOCK DATA ---
const mockItems = [
    { id: 1, title: 'Summer Floral Dress', category: 'Dresses', size: 'M', points: 120, uploader: 'Jane Doe', imageUrl: 'https://images.unsplash.com/photo-1595534522071-259a4309e451?q=80&w=1887&auto=format&fit=crop', status: 'available', description: 'A beautiful floral dress, perfect for summer outings. Worn only a few times.'},
    { id: 2, title: 'Classic Blue Jeans', category: 'Bottoms', size: '32', points: 100, uploader: 'John Smith', imageUrl: 'https://images.unsplash.com/photo-1602293589930-4535a9a7464b?q=80&w=1887&auto=format&fit=crop', status: 'available', description: 'Comfortable and stylish classic blue jeans. A wardrobe staple.'},
    { id: 3, title: 'Cozy Wool Sweater', category: 'Tops', size: 'L', points: 150, uploader: 'Emily White', imageUrl: 'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?q=80&w=1887&auto=format&fit=crop', status: 'available', description: 'A very warm and cozy wool sweater for chilly days.'},
    { id: 4, title: 'Leather Biker Jacket', category: 'Outerwear', size: 'M', points: 250, uploader: 'Chris Green', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1887&auto=format&fit=crop', status: 'available', description: 'High-quality leather biker jacket with a timeless design.'},
];

const myMockItems = [
    { id: 5, title: 'Green Cargo Pants', category: 'Bottoms', size: 'L', imageUrl: 'https://images.unsplash.com/photo-1604176354204-926873782855?q=80&w=1887&auto=format&fit=crop', status: 'available' },
    { id: 6, title: 'Striped T-Shirt', category: 'Tops', size: 'L', imageUrl: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1887&auto=format&fit=crop', status: 'pending' },
];

let pendingAdminItems = [
    { id: 7, title: 'Red Silk Scarf', uploaderId: 'user123', imageUrl: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1935&auto=format&fit=crop' },
    { id: 8, title: 'Vintage Sunglasses', uploaderId: 'user456', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780&auto=format&fit=crop' },
];

// --- APP STATE ---
let appState = {
    isLoggedIn: false,
};

// --- DOM Elements ---
const pages = document.querySelectorAll('.page');
const navLoggedIn = document.getElementById('nav-logged-in');
const navLoggedOut = document.getElementById('nav-logged-out');

// --- PAGE NAVIGATION ---
function navigateTo(pageId, data = null) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    window.scrollTo(0, 0);

    // Handle page-specific rendering
    if (pageId === 'itemDetail' && data) {
        renderItemDetail(data);
    }
}

// --- AUTH SIMULATION ---
function handleSignIn() {
    appState.isLoggedIn = true;
    updateNav();
    navigateTo('dashboard');
}

function handleSignOut(event) {
    event.preventDefault();
    appState.isLoggedIn = false;
    updateNav();
    navigateTo('landing');
}

function updateNav() {
    if (appState.isLoggedIn) {
        navLoggedIn.style.display = 'flex';
        navLoggedOut.style.display = 'none';
    } else {
        navLoggedIn.style.display = 'none';
        navLoggedOut.style.display = 'flex';
    }
}

// --- DYNAMIC CONTENT RENDERING ---
function renderFeaturedItems() {
    const container = document.getElementById('featured-items-container');
    container.innerHTML = '';
    mockItems.forEach(item => {
        const card = `
            <div onclick="navigateTo('itemDetail', ${JSON.stringify(item).replace(/"/g, '&quot;')})" class="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-transform duration-300">
                <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-64 object-cover" />
                <div class="p-4">
                    <h4 class="text-xl font-bold text-primary truncate">${item.title}</h4>
                    <p class="text-gray-600 mt-1">${item.category} - Size: ${item.size}</p>
                    <div class="mt-2 text-lg font-semibold text-accent">${item.points} Points</div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

function renderMyItems() {
    const container = document.getElementById('my-items-container');
    container.innerHTML = '';
    if (myMockItems.length === 0) {
        container.innerHTML = "<p>You haven't uploaded any items yet.</p>";
        return;
    }
    myMockItems.forEach(item => {
        const statusColor = item.status === 'available' ? 'text-green-600' : 'text-yellow-600';
        const card = `
            <div class="border rounded-lg p-4 shadow-sm">
                <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-48 object-cover rounded-md mb-2" />
                <h4 class="font-bold truncate">${item.title}</h4>
                <p class="text-sm text-gray-500 capitalize">Status: <span class="${statusColor}">${item.status}</span></p>
            </div>
        `;
        container.innerHTML += card;
    });
}

function renderItemDetail(item) {
    const container = document.getElementById('item-detail-content');
    container.innerHTML = `
        <div class="w-full md:w-1/2">
            <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div class="w-full md:w-1/2">
            <h2 class="text-4xl font-bold text-primary">${item.title}</h2>
            <div class="my-4">
                <span class="text-3xl font-bold text-accent">${item.points} Points</span>
                <span class="ml-4 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">${item.status}</span>
            </div>
            <p class="text-gray-700 leading-relaxed mb-6">${item.description}</p>
            <div class="grid grid-cols-2 gap-4 mb-6 text-lg">
                <div><strong>Category:</strong> ${item.category}</div>
                <div><strong>Size:</strong> ${item.size}</div>
            </div>
            <div class="bg-gray-100 p-4 rounded-lg mb-6">
                <h4 class="font-bold">Uploader Information</h4>
                <p>${item.uploader}</p>
            </div>
            <div class="flex space-x-4">
                <button onclick="alert('Swap request functionality is a premium feature!')" class="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition flex-1">Request Swap</button>
                <button onclick="alert('Redeeming is a premium feature!')" class="bg-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-dark transition flex-1">Redeem with Points</button>
            </div>
        </div>
    `;
}

function renderAdminItems() {
    const container = document.getElementById('admin-pending-items');
    container.innerHTML = '';
    if (pendingAdminItems.length === 0) {
        container.innerHTML = "<p>No items are currently pending approval.</p>";
        return;
    }
    pendingAdminItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'flex items-center justify-between p-4 border rounded-lg';
        itemEl.innerHTML = `
            <div class="flex items-center gap-4">
                <img src="${item.imageUrl}" alt="${item.title}" class="w-20 h-20 object-cover rounded-md" />
                <div>
                    <h4 class="font-bold">${item.title}</h4>
                    <p class="text-sm text-gray-500">Uploader ID: ${item.uploaderId}</p>
                </div>
            </div>
            <div class="flex gap-2">
                <button class="approve-btn bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
                <button class="reject-btn bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </div>
        `;
        itemEl.querySelector('.approve-btn').onclick = () => handleApproval(item.id, true);
        itemEl.querySelector('.reject-btn').onclick = () => handleApproval(item.id, false);
        container.appendChild(itemEl);
    });
}

function handleApproval(itemId, isApproved) {
    pendingAdminItems = pendingAdminItems.filter(item => item.id !== itemId);
    renderAdminItems();
    const action = isApproved ? 'approved' : 'rejected';
    alert(`Item ${itemId} has been ${action}.`);
}

// --- EVENT LISTENERS ---
document.getElementById('add-item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Item listed successfully! (This is a demo)');
    myMockItems.push({ id: Date.now(), title: 'New Submitted Item', category: 'Tops', size: 'M', imageUrl: 'https://placehold.co/300x300/F5F5DC/556B2F?text=New', status: 'pending' });
    renderMyItems();
    navigateTo('dashboard');
});

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    updateNav();
    renderFeaturedItems();
    renderMyItems();
    renderAdminItems();
    navigateTo('landing'); // Start on the landing page
});
