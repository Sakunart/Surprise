let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');
let videoSlider = document.querySelector('#video-slider');

let currentIndex = 0; 
let videoSources = []; 

window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () => {
   loginForm.classList.add('active');
});

formClose.addEventListener('click', () => {
    loginForm.classList.remove('active');
});

videoBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

// Get all video sources from the buttons
videoBtn.forEach((btn, index) => {
    videoSources.push(btn.getAttribute('data-src'));
});

// Function to switch videos automatically
function autoSlide() {
    currentIndex = (currentIndex + 1) % videoSources.length; 
    videoSlider.src = videoSources[currentIndex];

    // Update active button
    document.querySelector('.controls .active').classList.remove('active');
    videoBtn[currentIndex].classList.add('active');
}
setInterval(autoSlide, 10000);

// Document Ready Function for all initializations
document.addEventListener('DOMContentLoaded', function() {
    // Connect login icon to profile section
    const loginIcon = document.querySelector('.icons .fa-user');
    const loginFormContainer = document.querySelector('.login-form-container');
    
    // Check if user is already logged in (for demo purposes)
    let isLoggedIn = true; // Set to true to demonstrate already logged in behavior
    
    // If already logged in, redirect to profile instead of showing login form
    if (loginIcon) {
        loginIcon.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isLoggedIn) {
                // Navigate to profile section instead of showing login form
                document.getElementById('profile').scrollIntoView({ behavior: 'smooth' });
                
                // Add highlight effect to profile section
                const profileSection = document.getElementById('profile');
                profileSection.classList.add('highlight-section');
                setTimeout(() => {
                    profileSection.classList.remove('highlight-section');
                }, 1500);
            } else {
                // Show login form for non-logged in users
                loginFormContainer.classList.add('active');
            }
        });
    }
    
    // Handle login form submission to change logged in state
    const loginForm = document.querySelector('.login-form-container form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Simple validation
            if (!email || !password) {
                alert('Please enter your email and password.');
                return;
            }
            
            // Simulate successful login
            loginFormContainer.classList.remove('active');
            isLoggedIn = true;
            
            // Navigate to profile section
            document.getElementById('profile').scrollIntoView({ behavior: 'smooth' });
            
            // Add highlight effect to profile section
            const profileSection = document.getElementById('profile');
            profileSection.classList.add('highlight-section');
            setTimeout(() => {
                profileSection.classList.remove('highlight-section');
            }, 1500);
            
            // Update the login icon to show logged in state
            updateLoginIcon();
            
            // Show welcome message
            alert('Welcome back! You are now logged in.');
        });
    }
    
    // Function to update login icon appearance
    function updateLoginIcon() {
        if (loginIcon) {
            // Change icon appearance for logged in state
            if (isLoggedIn) {
                // Remove regular user icon class
                loginIcon.classList.remove('fa-user');
                
                // Add user circle icon to indicate logged in
                loginIcon.classList.add('fa-user-circle');
                
                // Add tooltip to show it's connected to profile
                loginIcon.setAttribute('title', 'View Profile');
                
                // Add logged-in class for styling
                loginIcon.classList.add('logged-in');
            } else {
                // Restore original icon appearance
                loginIcon.classList.remove('fa-user-circle', 'logged-in');
                loginIcon.classList.add('fa-user');
                loginIcon.setAttribute('title', 'Login');
            }
        }
    }
    
    // Initialize login icon state on page load
    updateLoginIcon();
    
    // Connect "Plan Now" buttons from both destinations and profile sections
    const allPlanNowButtons = document.querySelectorAll('.destinations .btn, .saved-destination-card .btn-small');
    
    allPlanNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get destination information based on where the button is located
            let destinationName;
            
            if (this.closest('.box')) {
                // From destinations section
                destinationName = this.closest('.box').querySelector('h3').textContent.trim().replace(/^.*\s/, '');
            } else if (this.closest('.saved-destination-card')) {
                // From saved destinations in profile
                destinationName = this.closest('.saved-destination-card').querySelector('h3').textContent.trim();
            }
            
            // Scroll to plan visit section
            document.getElementById('planvisit').scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill the destination in the form
            const whereToInput = document.querySelector('#planvisit .inputBox:first-child input');
            if (whereToInput && destinationName) {
                whereToInput.value = destinationName;
                
                // Add highlight effect
                whereToInput.classList.add('highlight-input');
                setTimeout(() => {
                    whereToInput.classList.remove('highlight-input');
                }, 1500);
            }
        });
    });
    
    // Handle form submission in Plan Visit section
    const planVisitForm = document.querySelector('#planvisit form');
    
    if (planVisitForm) {
        planVisitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const destination = this.querySelector('input[type="text"]').value;
            const guests = this.querySelector('input[type="number"]').value;
            const arrivalDate = new Date(this.querySelectorAll('input[type="date"]')[0].value);
            const departureDate = new Date(this.querySelectorAll('input[type="date"]')[1].value);
            
            // Validate form
            if (!destination || !guests || isNaN(arrivalDate.getTime()) || isNaN(departureDate.getTime())) {
                alert('Please fill in all fields correctly.');
                return;
            }
            
            // Format dates
            const formatDate = (date) => {
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            };
            
            // Create a new trip card
            const tripCard = document.createElement('div');
            tripCard.className = 'trip-card';
            
            // Find appropriate image
            let destinationImage = 'images/subli-image.jpg'; // Default image
            
            // Try to find matching image from destinations section
            document.querySelectorAll('.destinations .box').forEach(box => {
                const boxDestination = box.querySelector('h3').textContent.trim().replace(/^.*\s/, '');
                if (boxDestination.toLowerCase() === destination.toLowerCase()) {
                    destinationImage = box.querySelector('img').src;
                }
            });
            
            // Calculate trip month and day for the date badge
            const month = arrivalDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
            const day = arrivalDate.getDate();
            
            // Create trip card HTML - matching the existing format in the HTML
            tripCard.innerHTML = `
                <div class="trip-image">
                    <img src="${destinationImage}" alt="${destination}">
                    <div class="trip-date">
                        <span class="month">${month}</span>
                        <span class="day">${day}</span>
                    </div>
                </div>
                <div class="trip-details">
                    <h3>Weekend at ${destination}</h3>
                    <p class="trip-location"><i class="fas fa-map-marker-alt"></i> ${destination} Resort</p>
                    <p class="trip-duration"><i class="far fa-calendar-alt"></i> ${formatDate(arrivalDate)} - ${formatDate(departureDate)}</p>
                    <p class="trip-guests"><i class="fas fa-users"></i> ${guests} Guests</p>
                    <div class="trip-actions">
                        <a href="#" class="btn-small view-trip">View Details</a>
                        <a href="#" class="btn-small edit-trip">Edit Trip</a>
                        <a href="#" class="btn-small cancel-trip">Cancel Trip</a>
                    </div>
                </div>
            `;
            
            // Check if we're editing an existing trip
            const isEditing = planVisitForm.hasAttribute('data-editing');
            const plannedTripsContainer = document.querySelector('#planned-trips .trip-cards');
            
            if (isEditing && plannedTripsContainer) {
                // Get the index of the trip card we're editing
                const tripCardIndex = parseInt(planVisitForm.getAttribute('data-trip-card-index'));
                if (!isNaN(tripCardIndex) && tripCardIndex >= 0 && tripCardIndex < plannedTripsContainer.children.length) {
                    // Replace the existing trip card
                    plannedTripsContainer.replaceChild(tripCard, plannedTripsContainer.children[tripCardIndex]);
                    
                    // Reset form and attributes
                    planVisitForm.removeAttribute('data-editing');
                    planVisitForm.removeAttribute('data-trip-card-index');
                    planVisitForm.querySelector('input[type="submit"]').value = 'plan now';
                    
                    // Show confirmation
                    alert('Trip has been updated successfully!');
                }
            } else if (plannedTripsContainer) {
                // Add new trip card
                plannedTripsContainer.insertBefore(tripCard, plannedTripsContainer.firstChild);
                
                // Show confirmation
                alert('Trip has been planned successfully!');
            }
            
            // Reset the form
            planVisitForm.reset();
            
            // Switch to profile section
            document.getElementById('profile').scrollIntoView({ behavior: 'smooth' });
            
            // Ensure the planned trips tab is active
            document.querySelector('.profile-menu li[data-tab="planned-trips"]').click();
        });
    }
    
    // Load More Reviews Functionality
    const loadMoreBtn = document.getElementById('load-more-reviews');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const reviewContainer = document.querySelector('.review-container');
            
            // Create new review cards
            const newReviews = [
                {
                    name: "Carlos Mendoza",
                    date: "Visited February 2025",
                    text: "D'Coral Beach Resort was the perfect venue for our family reunion. The facilities were excellent and the staff went above and beyond to accommodate our large group. The beach area was clean and well-maintained.",
                    rating: 4,
                    avatar: "https://i.pravatar.cc/150?img=4"
                },
                {
                    name: "Elena Garcia",
                    date: "Visited January 2025",
                    text: "Playa Tropical Resort Hotel offers great value for money. The rooms were spacious and comfortable. The restaurant serves delicious local cuisine. My only suggestion would be to improve the WiFi connection in some areas.",
                    rating: 4.5,
                    avatar: "https://i.pravatar.cc/150?img=5"
                },
                {
                    name: "Ramon Lim",
                    date: "Visited March 2025",
                    text: "The Seawall Boulevard is a must-visit spot in Currimao! Perfect for evening walks and watching the sunset. There are plenty of food stalls nearby offering fresh seafood and local delicacies. The area is well-maintained and safe.",
                    rating: 5,
                    avatar: "https://i.pravatar.cc/150?img=6"
                }
            ];
            
            // Create and append new review cards
            newReviews.forEach(review => {
                const card = document.createElement('div');
                card.className = 'review-card';
                
                // Generate star HTML based on rating
                let starsHTML = '';
                const fullStars = Math.floor(review.rating);
                const hasHalfStar = review.rating % 1 !== 0;
                
                for (let i = 0; i < fullStars; i++) {
                    starsHTML += '<i class="fas fa-star"></i>';
                }
                
                if (hasHalfStar) {
                    starsHTML += '<i class="fas fa-star-half-alt"></i>';
                }
                
                card.innerHTML = `
                    <div class="user-info">
                        <img src="${review.avatar}" alt="User Avatar">
                        <div class="user-details">
                            <h3>${review.name}</h3>
                            <p>${review.date}</p>
                        </div>
                    </div>
                    <div class="review-text">
                        <p>${review.text}</p>
                    </div>
                    <div class="rating">
                        ${starsHTML}
                    </div>
                `;
                
                reviewContainer.appendChild(card);
            });
            
            // Hide the button after loading more reviews
            loadMoreBtn.style.display = 'none';
        });
    }
    
    // Add Review Functionality
    const addReviewBtn = document.getElementById('add-review-btn');
    const reviewFormContainer = document.querySelector('.add-review-container');
    const reviewFormClose = document.getElementById('review-form-close');
    const addReviewForm = document.getElementById('add-review-form');
    const starRating = document.querySelectorAll('.star-rating i');
    
    let selectedRating = 0;
    
    if (addReviewBtn && reviewFormContainer) {
        // Open review form
        addReviewBtn.addEventListener('click', function() {
            reviewFormContainer.classList.add('active');
        });
        
        // Close review form
        if (reviewFormClose) {
            reviewFormClose.addEventListener('click', function() {
                reviewFormContainer.classList.remove('active');
            });
        }
        
        // Star rating selection
        if (starRating.length) {
            starRating.forEach(star => {
                star.addEventListener('click', function() {
                    const rating = parseInt(this.getAttribute('data-rating'));
                    selectedRating = rating;
                    
                    // Reset all stars
                    starRating.forEach(s => {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    });
                    
                    // Fill stars up to selected rating
                    for (let i = 0; i < rating; i++) {
                        starRating[i].classList.remove('far');
                        starRating[i].classList.add('fas');
                    }
                });
            });
        }
        
        // Form submission
        if (addReviewForm) {
            addReviewForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('reviewer-name').value;
                const place = document.getElementById('visited-place').value;
                const text = document.getElementById('review-text').value;
                
                // Validate form
                if (!name || !place || !text || selectedRating === 0) {
                    alert('Please fill in all fields and select a rating.');
                    return;
                }
                
                // Create new review card
                const reviewContainer = document.querySelector('.review-container');
                const card = document.createElement('div');
                card.className = 'review-card';
                
                // Generate stars HTML
                let starsHTML = '';
                for (let i = 0; i < selectedRating; i++) {
                    starsHTML += '<i class="fas fa-star"></i>';
                }
                
                // Get current date
                const currentDate = new Date();
                const month = currentDate.toLocaleString('default', { month: 'long' });
                const year = currentDate.getFullYear();
                
                // Random avatar
                const avatarId = Math.floor(Math.random() * 70) + 1;
                const avatar = `https://i.pravatar.cc/150?img=${avatarId}`;
                
                card.innerHTML = `
                    <div class="user-info">
                        <img src="${avatar}" alt="User Avatar">
                        <div class="user-details">
                            <h3>${name}</h3>
                            <p>Visited ${month} ${year}</p>
                        </div>
                    </div>
                    <div class="review-text">
                        <p>${text}</p>
                    </div>
                    <div class="rating">
                        ${starsHTML}
                    </div>
                `;
                
                // Add the new card at the beginning of the container
                reviewContainer.insertBefore(card, reviewContainer.firstChild);
                
                // Reset form
                addReviewForm.reset();
                selectedRating = 0;
                starRating.forEach(s => {
                    s.classList.remove('fas');
                    s.classList.add('far');
                });
                
                // Close the form
                reviewFormContainer.classList.remove('active');
                
                // Show success message
                alert('Thank you for your review!');
            });
        }
    }
    
    // Profile tab switching
    const profileMenuItems = document.querySelectorAll('.profile-menu li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (profileMenuItems.length && tabContents.length) {
        profileMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all menu items
                profileMenuItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(tab => tab.classList.remove('active'));
                
                // Show selected tab content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Edit Profile Modal
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    const editProfileModal = document.querySelector('.edit-profile-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    
    if (editProfileBtn && editProfileModal && closeModalBtn) {
        editProfileBtn.addEventListener('click', function() {
            editProfileModal.classList.add('active');
        });
        
        closeModalBtn.addEventListener('click', function() {
            editProfileModal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === editProfileModal) {
                editProfileModal.classList.remove('active');
            }
        });
    }
    
    // Edit Settings Button
    const editSettingsBtn = document.querySelector('.edit-settings-btn');
    
    if (editSettingsBtn) {
        editSettingsBtn.addEventListener('click', function() {
            const settingsInputs = document.querySelectorAll('.settings-form input, .settings-form select');
            
            settingsInputs.forEach(input => {
                input.disabled = !input.disabled;
            });
            
            if (settingsInputs[0].disabled) {
                this.textContent = 'Edit Settings';
            } else {
                this.textContent = 'Save Settings';
            }
        });
    }
    
    // Profile Image Upload Preview
    const profileImageInput = document.getElementById('profile-image-input');
    const profileImage = document.querySelector('.profile-image-upload img');
    
    if (profileImageInput && profileImage) {
        profileImageInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImage.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Trip Actions using event delegation
    document.addEventListener('click', function(e) {
        // Edit Trip button clicked
        if (e.target.classList.contains('edit-trip') || e.target.parentElement.classList.contains('edit-trip')) {
            e.preventDefault();
            
            const tripCard = e.target.closest('.trip-card');
            if (!tripCard) return;
            
            // Get trip details
            const destination = tripCard.querySelector('.trip-location').textContent.replace(/^\s*\S+\s*/, '').trim();
            const durationText = tripCard.querySelector('.trip-duration').textContent.replace(/^\s*\S+\s*/, '').trim();
            const guestsText = tripCard.querySelector('.trip-guests').textContent.replace(/^\s*\S+\s*/, '').trim();
            
            // Scroll to plan visit form
            document.getElementById('planvisit').scrollIntoView({ behavior: 'smooth' });
            
            // Fill in the form with current values
            const planForm = document.querySelector('#planvisit form');
            planForm.querySelector('input[type="text"]').value = destination;
            
            // Extract guest count
            const guestCount = parseInt(guestsText);
            if (!isNaN(guestCount)) {
                planForm.querySelector('input[type="number"]').value = guestCount;
            }
            
            // Extract dates - this is simplified and might need adjustment based on actual date format
            const dateRegex = /(\w+ \d+, \d+) - (\w+ \d+, \d+)/;
            const dateMatch = durationText.match(dateRegex);
            
            if (dateMatch && dateMatch.length >= 3) {
                const arrivalDateStr = dateMatch[1];
                const departureDateStr = dateMatch[2];
                
                // Convert to YYYY-MM-DD format for date inputs
                const convertToInputDate = (dateStr) => {
                    const date = new Date(dateStr);
                    return date.toISOString().split('T')[0];
                };
                
                // Set date values in the form
                const dateInputs = planForm.querySelectorAll('input[type="date"]');
                if (dateInputs.length >= 2) {
                    dateInputs[0].value = convertToInputDate(arrivalDateStr);
                    dateInputs[1].value = convertToInputDate(departureDateStr);
                }
            }
            
            // Visually indicate we're editing
            planForm.querySelector('input[type="submit"]').value = 'Update Trip';
            
            // Store reference to edited card
            planForm.setAttribute('data-editing', 'true');
            planForm.setAttribute('data-trip-card-index', Array.from(tripCard.parentNode.children).indexOf(tripCard));
            
            // Add highlight effect to the form
            planForm.classList.add('editing-form');
            setTimeout(() => {
                planForm.classList.remove('editing-form');
            }, 1500);
        }
        
        // Cancel Trip button clicked
        if (e.target.classList.contains('cancel-trip') || e.target.parentElement.classList.contains('cancel-trip')) {
            e.preventDefault();
            
            const tripCard = e.target.closest('.trip-card');
            if (!tripCard) return;
            
            // Get trip details for confirmation
            const destination = tripCard.querySelector('.trip-location').textContent.replace(/^\s*\S+\s*/, '').trim();
            const duration = tripCard.querySelector('.trip-duration').textContent.replace(/^\s*\S+\s*/, '').trim();
            
            // Ask for confirmation
            if (confirm(`Are you sure you want to cancel your trip to ${destination} on ${duration}?`)) {
                // Add cancellation animation
                tripCard.classList.add('cancelling');
                
                // Remove the card after animation
                setTimeout(() => {
                    tripCard.remove();
                    
                    // Show empty state if no more trips
                    const tripContainer = document.querySelector('#planned-trips .trip-cards');
                    if (tripContainer && tripContainer.children.length === 0) {
                        tripContainer.innerHTML = `
                            <div class="empty-state">
                                <i class="fas fa-calendar-times"></i>
                                <p>You have no planned trips</p>
                                <a href="#destinations" class="btn">Explore Destinations</a>
                            </div>
                        `;
                    }
                }, 500);
                
                // Show confirmation to user
                setTimeout(() => {
                    alert('Your trip has been cancelled successfully.');
                }, 600);
            }
        }
        
        // View Trip button clicked
        if (e.target.classList.contains('view-trip') || e.target.parentElement.classList.contains('view-trip')) {
            e.preventDefault();
            
            const tripCard = e.target.closest('.trip-card');
            if (!tripCard) return;
            
            // Get trip details
            const destination = tripCard.querySelector('.trip-location').textContent.replace(/^\s*\S+\s*/, '').trim();
            const duration = tripCard.querySelector('.trip-duration').textContent.replace(/^\s*\S+\s*/, '').trim();
            const guests = tripCard.querySelector('.trip-guests').textContent.replace(/^\s*\S+\s*/, '').trim();
            
            // Create modal with trip details
            const tripDetailsModal = document.createElement('div');
            tripDetailsModal.className = 'trip-details-modal';
            
            // Find destination image
            const tripImage = tripCard.querySelector('.trip-image img').src;
            
            tripDetailsModal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Trip Details</h2>
                    <div class="trip-details-content">
                        <img src="${tripImage}" alt="${destination}">
                        <div class="trip-info">
                            <h3>${tripCard.querySelector('h3').textContent}</h3>
                            <p><strong>Destination:</strong> ${destination}</p>
                            <p><strong>Duration:</strong> ${duration}</p>
                            <p><strong>Party Size:</strong> ${guests}</p>
                            <div class="trip-actions modal-actions">
                                <a href="#" class="btn edit-from-modal">Edit Trip</a>
                                <a href="#" class="btn cancel-from-modal">Cancel Trip</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal to the page
            document.body.appendChild(tripDetailsModal);
            
            // Show the modal
            setTimeout(() => {
                tripDetailsModal.classList.add('active');
            }, 10);
            
            // Close modal when clicking the X
            tripDetailsModal.querySelector('.close-modal').addEventListener('click', function() {
                tripDetailsModal.classList.remove('active');
                setTimeout(() => {
                    tripDetailsModal.remove();
                }, 300);
            });
            
            // Close modal when clicking outside
            tripDetailsModal.addEventListener('click', function(e) {
                if (e.target === tripDetailsModal) {
                    tripDetailsModal.classList.remove('active');
                    setTimeout(() => {
                        tripDetailsModal.remove();
                    }, 300);
                }
            });
            
            // Edit from modal
            tripDetailsModal.querySelector('.edit-from-modal').addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close the modal
                tripDetailsModal.classList.remove('active');
                setTimeout(() => {
                    tripDetailsModal.remove();
                }, 300);
                
                // Trigger the edit action on the original card
                tripCard.querySelector('.edit-trip').click();
            });
            
            // Cancel from modal
            tripDetailsModal.querySelector('.cancel-from-modal').addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close the modal
                tripDetailsModal.classList.remove('active');
                setTimeout(() => {
                    tripDetailsModal.remove();
                }, 300);
                
                // Trigger the cancel action on the original card
                tripCard.querySelector('.cancel-trip').click();
            });
        }
    });
});