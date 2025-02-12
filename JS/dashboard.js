function loadNgos() {
    const ngos = JSON.parse(localStorage.getItem('ngos')) || [];
    const container = document.getElementById('ngoCardsContainer')
    ngos.forEach((ngo, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${ngo.name}</h5>
                    <p class="card-text">${ngo.description}</p>
                    <p class="card-text"><strong>Charities:</strong> ${ngo.charities.join(', ')}</p>
                    <a href="charity.html?ngoIndex=${index}" class="btn btn-primary">View Charities</a>
                </div>
            </div>`;
        container.appendChild(card);
    });

// Load NGOs when the page is loaded
window.onload = loadNgos;
  }