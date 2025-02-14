
    // Get logged in NGO information
    const loggedInNgo = localStorage.getItem("loggedInNgo");

    // Display NGO information
    document.getElementById('ngoInfo').innerHTML = `
            <strong>Logged in as:</strong> ${loggedInNgo}
        `;

    // Redirect to charity.html
    function goToCharity() {
      window.location.href = 'charity.html';
    }

    // Load existing charities for the current NGO
    function loadCharities() {
      const charitiesData = JSON.parse(localStorage.getItem('charities')) || {};
      const charityList = document.getElementById('charityList');
      charityList.innerHTML = '';

      // Get all charities
      let allCharities = charitiesData["null"] || [];

      // Filter charities for current NGO
      let ngoCharities = allCharities.filter(charity => charity.ngoname === loggedInNgo);

      if (ngoCharities.length === 0) {
        charityList.innerHTML = '<p class="text-muted">No charities added yet.</p>';
        return;
      }

      ngoCharities.forEach((charity, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'charity-item';
        listItem.innerHTML = `
                    <div class="charity-details">
                        <strong>${charity.name}</strong> <br>
                        <small>${charity.description}</small> <br>
                        <small><strong>Goal:</strong> $${charity.goalAmount} | <strong>Expiry:</strong> ${charity.expiryDate}</small>
                    </div>
                    <div class="charity-actions">
                        <button class="btn btn-warning btn-sm" onclick="editCharity('${charity.name}')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCharity('${charity.name}')">Delete</button>
                    </div>
                `;
        charityList.appendChild(listItem);
      });
    }
    const ngoDisplayName = localStorage.getItem('ngoDisplayName');
    console.log(ngoDisplayName);
    

    // Add new charity
    document.getElementById('charityForm').addEventListener('submit', function (event) {
      event.preventDefault();

      const charityData = {
        name: document.getElementById('charityName').value,
        description: document.getElementById('charityDescription').value,
        goalAmount: document.getElementById('goalAmount').value,
        expiryDate: document.getElementById('expiryDate').value,
        ngoname: loggedInNgo
      };

      let charitiesData = JSON.parse(localStorage.getItem('charities')) || {};
      if (!charitiesData["null"]) {
        charitiesData["null"] = [];
      }

      // Add new charity to the array
      charitiesData["null"].push(charityData);
      localStorage.setItem('charities', JSON.stringify(charitiesData));

      // Reset form and reload charities
      document.getElementById('charityForm').reset();
      loadCharities();
    });

    // Edit charity
    function editCharity(charityName) {
      let charitiesData = JSON.parse(localStorage.getItem('charities')) || {};
      let allCharities = charitiesData["null"] || [];

      // Find charity index
      const charityIndex = allCharities.findIndex(c =>
        c.name === charityName && c.ngoname === loggedInNgo
      );

      if (charityIndex !== -1) {
        const charity = allCharities[charityIndex];

        // Populate form
        document.getElementById('charityName').value = charity.name;
        document.getElementById('charityDescription').value = charity.description;
        document.getElementById('goalAmount').value = charity.goalAmount;
        document.getElementById('expiryDate').value = charity.expiryDate;

        // Remove charity for editing
        allCharities.splice(charityIndex, 1);
        charitiesData["null"] = allCharities;
        localStorage.setItem('charities', JSON.stringify(charitiesData));

        loadCharities();
      }
    }

    // Delete charity
    function deleteCharity(charityName) {
      let charitiesData = JSON.parse(localStorage.getItem('charities')) || {};
      let allCharities = charitiesData["null"] || [];

      // Filter out the charity to delete
      charitiesData["null"] = allCharities.filter(charity =>
        !(charity.name === charityName && charity.ngoname === loggedInNgo)
      );

      localStorage.setItem('charities', JSON.stringify(charitiesData));
      loadCharities();
    }

    // Initial load
    loadCharities();
