document.addEventListener('DOMContentLoaded', () => {
    let displayedGyms = 0;
    const gymsPerPage = 9; // Adjust the number of gyms per page as needed

    // Function to fetch and display gyms
    const fetchAndDisplayGyms = () => {
        fetch(`/api/gyms?limit=${gymsPerPage}&offset=${displayedGyms}`)
        .then((response) => response.json())
        .then((gyms) => {
            const gymsContainer = document.getElementById('gyms-container');

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

            displayedGyms += gyms.length;

            // Hide the "Load More" button if there are no more gyms to load
            if (gyms.length < gymsPerPage) {
                document.getElementById('load-more').style.display = 'none';
            }
        })
        .catch((error) => console.error('Error fetching gyms:', error));
    };

    // Fetch and display gyms on page load
    fetchAndDisplayGyms();

    // Event listener for the "Load More" button
    const loadMoreButton = document.getElementById('load-more');
    loadMoreButton.addEventListener('click', () => {
        fetchAndDisplayGyms();
    });
});
