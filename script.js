// --- MOCK DATA ---
const mockItems = [
    { id: 1, title: 'Summer Floral Dress', category: 'Dresses', size: 'M', points: 120, uploader: 'Jane Doe', imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop', status: 'available', description: 'A beautiful floral dress, perfect for summer outings. Worn only a few times.'},
    { id: 2, title: 'Classic Blue Jeans', category: 'Bottoms', size: '32', points: 100, uploader: 'John Smith', imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1887&auto=format&fit=crop', status: 'available', description: 'Comfortable and stylish classic blue jeans. A wardrobe staple.'},
    { id: 3, title: 'Cozy Wool Sweater', category: 'Tops', size: 'L', points: 150, uploader: 'Emily White', imageUrl: 'https://images.unsplash.com/photo-1484512553900-8475545938b3?q=80&w=1887&auto=format&fit=crop', status: 'available', description: 'A very warm and cozy wool sweater for chilly days.'},
    { id: 4, title: 'Leather Biker Jacket', category: 'Outerwear', size: 'M', points: 250, uploader: 'Chris Green', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1887&auto=format&fit=crop', status: 'available', description: 'High-quality leather biker jacket with a timeless design.'},
    { id: 9, title: 'Pleated Midi Skirt', category: 'Bottoms', size: 'S', points: 110, uploader: 'Sarah Adams', imageUrl: 'https://images.unsplash.com/photo-1591326435479-6156543b8b59?q=80&w=1887&auto=format&fit=crop', status: 'available', description: 'A flowy and elegant pleated midi skirt, perfect for any season.'},
    { id: 10, title: 'Men\'s Oxford Shirt', category: 'Tops', size: 'M', points: 90, uploader: 'Mike Ross', imageUrl: 'https://images.unsplash.com/photo-1598032895397-b9472444bf23?q=80&w=1887&auto=format&fit=crop', status: 'available', description: 'A classic Oxford button-down shirt. Versatile and sharp.'},
    { id: 11, 'title': 'Running Sneakers', 'category': 'Shoes', 'size': '10', 'points': 180, 'uploader': 'Kevin Hart', 'imageUrl': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop', 'status': 'available', 'description': 'Lightweight and comfortable running sneakers, great for workouts.'},
    { id: 12, 'title': 'Tan Leather Handbag', 'category': 'Accessories', 'size': 'One Size', 'points': 220, 'uploader': 'Jessica Pearson', 'imageUrl': 'https://images.unsplash.com/photo-1590737233998-457335289253?q=80&w=1887&auto=format&fit=crop', 'status': 'available', 'description': 'A stylish and spacious leather handbag, perfect for everyday use.'}
];

const myMockItems = [
    { id: 5, title: 'Green Cargo Pants', category: 'Bottoms', size: 'L', imageUrl: 'https://images.unsplash.com/photo-1604176354204-926873782855?q=80&w=1887&auto=format&fit=crop', status: 'available' },
    { id: 6, title: 'Striped T-Shirt', category: 'Tops', size: 'L', imageUrl: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1887&auto=format&fit=crop', status: 'pending' },
    { id: 13, title: 'Stylish Fedora Hat', category: 'Accessories', size: 'M', imageUrl: 'https://images.unsplash.com/photo-1533055642133-2f6d2753a938?q=80&w=1887&auto=format&fit=crop', status: 'available'}
];

let pendingAdminItems = [
    { id: 7, title: 'Red Silk Scarf', uploaderId: 'user123', imageUrl: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1935&auto=format&fit=crop' },
    { id: 8, title: 'Vintage Sunglasses', uploaderId: 'user456', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780&auto=format&fit=crop' },
    { id: 14, title: 'Denim Shorts', uploaderId: 'user789', imageUrl: 'https://images.unsplash.com/photo-1605518216944-43639e1ef1b8?q=80&w=1887&auto=format&fit=crop'}
];


// --- AUTH SIMULATION ---
function checkLoginState() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function handleLogin(event) {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'dashboard.html';
}

function handleSignup(event) {
    event.preventDefault();
    // In a real app, you'd create a user here.
    // For the demo, we'll just log them in.
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'dashboard.html';
}

function handleSignOut(event) {
    event.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// --- NAVIGATION RENDERING ---
function renderNav() {
    const navContainer = document.getElementById('main-nav');
    if (!navContainer) return;

    const isLoggedIn = checkLoginState();
    let navLinks = `
        <a href="index.html#featured-items" class="text-lg text-primary/80 hover:text-accent-primary transition duration-300">Browse</a>
    `;

    if (isLoggedIn) {
        navLinks += `
            <a href="dashboard.html" class="text-lg text-primary/80 hover:text-accent-primary transition duration-300">Dashboard</a>
            <a href="admin.html" class="text-lg text-primary/80 hover:text-accent-primary transition duration-300">Admin</a>
            <a href="add-item.html" class="text-lg text-primary/80 hover:text-accent-primary transition duration-300">List Item</a>
            <a href="#" onclick="handleSignOut(event)" class="bg-accent-tertiary text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition duration-300 shadow-sm">Logout</a>
        `;
    } else {
        navLinks += `
            <a href="login.html" class="bg-accent-primary text-white px-5 py-2 rounded-full hover:bg-accent-primary-dark transition duration-300 shadow-sm">Login</a>
        `;
    }
    navContainer.innerHTML = navLinks;
}

// --- DYNAMIC CONTENT RENDERING ---
function renderFeaturedItems() {
    const container = document.getElementById('featured-items-container');
    if (!container) return; 

    container.innerHTML = '';
    mockItems.forEach(item => {
        const card = `
            <a href="item-detail.html?id=${item.id}" class="bg-white rounded-xl shadow-md overflow-hidden block transform hover:-translate-y-2 transition-transform duration-300 group">
                <div class="overflow-hidden h-64">
                    <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div class="p-5">
                    <h4 class="text-xl font-bold text-primary truncate">${item.title}</h4>
                    <p class="text-gray-500 mt-1">${item.category} - Size: ${item.size}</p>
                    <div class="mt-3 text-lg font-semibold text-accent-primary">${item.points} Points</div>
                </div>
            </a>
        `;
        container.innerHTML += card;
    });
}

function renderMyItems() {
    const container = document.getElementById('my-items-container');
    if (!container) return; 

    container.innerHTML = '';
    if (myMockItems.length === 0) {
        container.innerHTML = "<p class='col-span-3 text-center text-gray-500'>You haven't uploaded any items yet.</p>";
        return;
    }
    myMockItems.forEach(item => {
        const statusColor = item.status === 'available' ? 'text-accent-secondary' : 'text-amber-600';
        const statusBg = item.status === 'available' ? 'bg-accent-secondary/10' : 'bg-amber-500/10';
        const card = `
            <div class="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
                <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-48 object-cover rounded-md mb-3" />
                <h4 class="font-bold truncate">${item.title}</h4>
                <p class="text-sm text-gray-500 capitalize mt-2">Status: 
                    <span class="font-semibold px-2 py-1 rounded-full ${statusColor} ${statusBg}">${item.status}</span>
                </p>
            </div>
        `;
        container.innerHTML += card;
    });
}

function renderAdminItems() {
    const container = document.getElementById('admin-pending-items');
    if (!container) return;

    container.innerHTML = '';
    if (pendingAdminItems.length === 0) {
        container.innerHTML = "<p class='text-center text-gray-500'>No items are currently pending approval.</p>";
        return;
    }
    pendingAdminItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300';
        itemEl.innerHTML = `
            <div class="flex items-center gap-4">
                <img src="${item.imageUrl}" alt="${item.title}" class="w-20 h-20 object-cover rounded-md" />
                <div>
                    <h4 class="font-bold text-lg">${item.title || 'Untitled Item'}</h4>
                    <p class="text-sm text-gray-500">Uploader ID: ${item.uploaderId}</p>
                </div>
            </div>
            <div class="flex gap-3">
                <button class="approve-btn bg-accent-secondary/20 text-accent-secondary p-2 rounded-full hover:bg-accent-secondary/30 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </button>
                <button class="reject-btn bg-accent-tertiary/20 text-accent-tertiary p-2 rounded-full hover:bg-accent-tertiary/30 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        `;
        itemEl.querySelector('.approve-btn').onclick = () => handleApproval(item.id, true);
        itemEl.querySelector('.reject-btn').onclick = () => handleApproval(item.id, false);
        container.appendChild(itemEl);
    });
}

function renderItemDetail() {
    const container = document.getElementById('item-detail-container');
    if (!container) return;

    container.classList.add('md:items-start');

    const urlParams = new URLSearchParams(window.location.search);
    const itemId = parseInt(urlParams.get('id'));
    const item = mockItems.find(i => i.id === itemId);

    if (!item) {
        container.innerHTML = "<p>Item not found.</p>";
        return;
    }

    container.innerHTML = `
        <div class="w-full md:w-1/2">
            <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
        <div class="w-full md:w-1/2">
            <h2 class="text-4xl font-bold text-primary">${item.title}</h2>
            <div class="my-4">
                <span class="text-3xl font-bold text-accent-primary">${item.points} Points</span>
                <span class="ml-4 px-3 py-1 rounded-full text-sm font-semibold bg-accent-secondary/10 text-accent-secondary">${item.status}</span>
            </div>
            <p class="text-gray-700 leading-relaxed mb-6">${item.description}</p>
            <div class="grid grid-cols-2 gap-4 mb-6 text-lg">
                <div><strong>Category:</strong> ${item.category}</div>
                <div><strong>Size:</strong> ${item.size}</div>
            </div>
            <div class="bg-light-bg p-4 rounded-lg mb-6">
                <h4 class="font-bold">Uploader Information</h4>
                <p>${item.uploader}</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-4">
                <button onclick="alert('Swap request sent!')" class="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition flex-1">Request Swap</button>
                <button onclick="alert('Redeemed with ${item.points} points!')" class="bg-accent-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition flex-1">Redeem with Points</button>
            </div>
        </div>
    `;
}

function handleApproval(itemId, isApproved) {
    pendingAdminItems = pendingAdminItems.filter(item => item.id !== itemId);
    renderAdminItems();
    const action = isApproved ? 'approved' : 'rejected';
    alert(`Item ${itemId} has been ${action}.`);
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // This function runs on every page that includes this script
    renderNav();
    
    // Page-specific render functions
    renderFeaturedItems();
    renderMyItems();
    renderAdminItems();
    renderItemDetail();

    // Form-specific event listeners
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});
