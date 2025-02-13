function loadNgos() {
            
    // Changed from 'NGO' to 'ngos'
    const ngos = JSON.parse(localStorage.getItem('ngos')) || [];
    const charities = JSON.parse(localStorage.getItem('charities')) || {};
    const allCharities = charities["null"] || [];
    const container = document.getElementById('ngoCardsContainer');

    // Group charities by NGO
    const ngoCharities = {};
    allCharities.forEach(charity => {
      if (!ngoCharities[charity.ngoname]) {
        ngoCharities[charity.ngoname] = [];
      }
      ngoCharities[charity.ngoname].push(charity);
    });


    // Create cards for each NGO
    ngos.forEach((ngo) => {
      const ngoCharityList = ngoCharities[ngo.name] || [];

      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4';
      card.innerHTML = `
                  <div class="card">
                      <div class="card-body">
                          <h4 class="card-title text-primary">${ngo.name}</h4>
                          <p class="card-text text-muted mb-4">${ngo.email}</p>
                          
                          <h5 class="mb-3">Active Charities</h5>
                          <div class="charity-list">
                              ${ngoCharityList.length > 0 ?
          ngoCharityList.map(charity => `
                                      <div class="charity-item">
                                          <h6 class="mb-2">${charity.name}</h6>
                                          <p class="small mb-2">${charity.description}</p>
                                          <div class="d-flex justify-content-between">
                                              <span class="charity-goal">Goal: $${charity.goalAmount}</span>
                                              <small class="text-muted">Expires: ${charity.expiryDate}</small>
                                          </div>
                                      </div>
                                  `).join('') :
          '<p class="text-muted">No active charities</p>'
        }
                          </div>
                      </div>
                  </div>
              `;
      container.appendChild(card);
    });

    // Show message if no NGOs exist
    if (ngos.length === 0) {
      container.innerHTML = `
                  <div class="col-12 text-center">
                      <h3 class="text-muted">No NGOs registered yet</h3>
                  </div>
              `;
    }
  }

  // Load NGOs when page loads
  window.onload = loadNgos;