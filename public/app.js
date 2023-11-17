document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and display gyms
    const fetchAndDisplayGyms = () => {
        fetch('/api/gyms')
            .then((response) => response.json())
            .then((gyms) => {
                const gymsContainer = document.getElementById('gyms-container');
                gymsContainer.innerHTML = '';

                gyms.forEach((gym) => {
                    const gymCard = document.createElement('div');
                    gymCard.className = 'gym-card';

                    const name = document.createElement('h2');
                    name.textContent = gym.name;

                    const city = document.createElement('p');
                    city.textContent = `City: ${gym.city}`;

                    const picture = document.createElement('img');
                    picture.src = gym.picture;
                    picture.alt = gym.name;

                    gymCard.appendChild(name);
                    gymCard.appendChild(city);
                    gymCard.appendChild(picture);

                    gymsContainer.appendChild(gymCard);
                });
            })
            .catch((error) => console.error('Error fetching gyms:', error));
    };

    // Fetch and display gyms on page load
    fetchAndDisplayGyms();

    // Event listener for the form submission
    const form = document.getElementById('add-gym-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const city = document.getElementById('city').value;
        const picture = document.getElementById('picture').value;

        // Reset the form fields
        form.reset();

        // Send a POST request to add a new gym
        fetch('/api/gyms/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, city, picture }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                // Fetch and display gyms again after adding a new gym
                fetchAndDisplayGyms();
            })
            .catch((error) => console.error('Error adding gym:', error));
    });
});
