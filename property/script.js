// Mock property data
const properties = [
    {
        id: 1,
        title: "Modern Family Home",
        price: "$500,000",
        address: "123 Main St, Springfield",
        specs: "3 Beds, 2 Baths, 2000 sqft",
        description: "A spacious family home with modern amenities and a large backyard.",
        images: [
            "https://via.placeholder.com/800x400?text=Property+1+Image+1",
            "https://via.placeholder.com/800x400?text=Property+1+Image+2",
            "https://via.placeholder.com/800x400?text=Property+1+Image+3"
        ],
        type: "house"
    },
    {
        id: 2,
        title: "Downtown Apartment",
        price: "$300,000",
        address: "456 Oak Ave, Downtown",
        specs: "2 Beds, 1 Bath, 1200 sqft",
        description: "A cozy apartment in the heart of the city with great views.",
        images: [
            "https://via.placeholder.com/800x400?text=Property+2+Image+1",
            "https://via.placeholder.com/800x400?text=Property+2+Image+2"
        ],
        type: "apartment"
    }
];

// Populate listings
function displayProperties(filteredProperties = properties) {
    const grid = document.getElementById("property-grid");
    grid.innerHTML = "";
    filteredProperties.forEach(property => {
        const card = document.createElement("div");
        card.className = "property-card";
        card.innerHTML = `
            <img src="${property.images[0]}" alt="${property.title}">
            <h3>${property.title}</h3>
            <p>${property.price}</p>
            <p>${property.address}</p>
            <p>${property.specs}</p>
        `;
        card.onclick = () => showDetails(property.id);
        grid.appendChild(card);
    });
}

// Show property details
let currentImageIndex = 0;
function showDetails(id) {
    const property = properties.find(p => p.id === id);
    if (!property) return;

    document.getElementById("home").classList.add("hidden");
    document.getElementById("listings").classList.add("hidden");
    document.getElementById("contact").classList.add("hidden");
    const detailsSection = document.getElementById("details");
    detailsSection.classList.remove("hidden");
    detailsSection.classList.add("active");

    document.getElementById("details-title").textContent = property.title;
    document.getElementById("details-price").textContent = property.price;
    document.getElementById("details-address").textContent = property.address;
    document.getElementById("details-specs").textContent = property.specs;
    document.getElementById("details-description").textContent = property.description;
    currentImageIndex = 0;
    updateCarousel(property);
}

// Carousel navigation
function changeImage(direction) {
    const property = properties.find(p => p.title === document.getElementById("details-title").textContent);
    currentImageIndex = (currentImageIndex + direction + property.images.length) % property.images.length;
    updateCarousel(property);
}

function updateCarousel(property) {
    document.getElementById("carousel-image").src = property.images[currentImageIndex];
}

// Search properties (simulated)
function searchProperties() {
    const type = document.getElementById("property-type").value;
    const location = document.getElementById("location").value.toLowerCase();
    const price = parseInt(document.getElementById("price").value) || Infinity;

    const filteredProperties = properties.filter(property => {
        return (
            (!type || property.type === type) &&
            (!location || property.address.toLowerCase().includes(location)) &&
            (parseInt(property.price.replace("$", "").replace(",", "")) <= price)
        );
    });

    displayProperties(filteredProperties);
}

// Form submission
function handleFormSubmit(event) {
    event.preventDefault();
    alert("Message sent! (This is a prototype simulation)");
    event.target.reset();
}

// Hamburger menu
document.querySelector(".hamburger").onclick = () => {
    document.querySelector(".nav-links").style.display = 
        document.querySelector(".nav-links").style.display === "flex" ? "none" : "flex";
};

// Initialize
displayProperties();