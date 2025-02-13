
    document.addEventListener("DOMContentLoaded", function () {
      loadCharities();
      loadUsers();
      loadNgos();
    });

    // Charity Functions
    function loadCharities() {
      let charitiesData = JSON.parse(localStorage.getItem('charities')) || {};
      const ngoFilter = document.getElementById('ngoFilter');
      const charityList = document.getElementById('charityList');
      const charityNgo = document.getElementById('charityNgo');

      charityList.innerHTML = "";
      ngoFilter.innerHTML = '<option value="all">All NGOs</option>';
      charityNgo.innerHTML = '<option value="">Select NGO</option>';

      let NGOs = JSON.parse(localStorage.getItem('ngos')) || [];

      NGOs.forEach(ngo => {
        const option1 = document.createElement('option');
        option1.value = ngo.name;
        option1.textContent = ngo.name;
        ngoFilter.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = ngo.name;
        option2.textContent = ngo.name;
        charityNgo.appendChild(option2);
      });

      filterCharities();
    }

    function filterCharities() {
      const selectedNgo = document.getElementById('ngoFilter').value;
      let charitiesData = JSON.parse(localStorage.getItem('charities')) || {};
      const charityList = document.getElementById('charityList');
      charityList.innerHTML = '';

      let allCharities = charitiesData["null"] || [];

      let filteredCharities = allCharities;
      if (selectedNgo && selectedNgo !== 'all') {
        filteredCharities = allCharities.filter(charity => charity.ngoname === selectedNgo);
      }

      filteredCharities.forEach((charity, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.innerHTML = `
                    <div>
                        <strong>${charity.name}</strong> <br>
                        <small>${charity.description}</small> <br>
                        <small><strong>NGO:</strong> ${charity.ngoname || "Unknown"} | 
                        <strong>Goal:</strong> $${charity.goalAmount || "N/A"} | 
                        <strong>Expiry:</strong> ${charity.expiryDate || "N/A"}</small>
                    </div>
                    <div>
                        <button class="btn btn-info btn-sm mr-2" onclick="editCharity(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCharity('${charity.name}')">Delete</button>
                    </div>
                `;
        charityList.appendChild(listItem);
      });

      if (filteredCharities.length === 0) {
        charityList.innerHTML = "<p>No charities found for the selected NGO.</p>";
      }
    }

    function showAddCharityModal() {
      document.getElementById('charityModalTitle').textContent = 'Add Charity';
      document.getElementById('charityForm').reset();
      document.getElementById('charityModal').style.display = 'block';
    }

    function editCharity(index) {
      console.log(index)
      let charitiesData = JSON.parse(localStorage.getItem('charities')) || {};
      let charity = charitiesData["null"][index];

      document.getElementById('charityModalTitle').textContent = 'Edit Charity';
      document.getElementById('charityIndex').value = index;
      document.getElementById('charityName').value = charity.name;
      document.getElementById('charityDescription').value = charity.description;
      document.getElementById('charityNgo').value = charity.ngoname;
      document.getElementById('charityGoal').value = charity.goalAmount;
      document.getElementById('charityExpiry').value = charity.expiryDate;

      document.getElementById('charityModal').style.display = 'block';
      //saveCharity();
    }

    function closeCharityModal() {
      document.getElementById('charityModal').style.display = 'none';
    }

    function saveCharity() {
      const index = document.getElementById('charityIndex').value;
      const charity = {
        name: document.getElementById('charityName').value,
        description: document.getElementById('charityDescription').value,
        ngoname: document.getElementById('charityNgo').value,
        goalAmount: document.getElementById('charityGoal').value,
        expiryDate: document.getElementById('charityExpiry').value
      };

      let charitiesData = JSON.parse(localStorage.getItem('charities')) || {};
      if (!charitiesData["null"]) charitiesData["null"] = [];

      if (index === "") {
        charitiesData["null"].push(charity);
      } else {
        charitiesData["null"][index] = charity;
      }

      localStorage.setItem('charities', JSON.stringify(charitiesData));
      closeCharityModal();
      loadCharities();
    }

    function deleteCharity(charityName) {
      let charitiesData = JSON.parse(localStorage.getItem('charities')) || {};
      if (charitiesData["null"]) {
        charitiesData["null"] = charitiesData["null"].filter(c => c.name !== charityName);
        localStorage.setItem('charities', JSON.stringify(charitiesData));
      }
      loadCharities();
    }

    // NGO Functions
    function loadNgos() {
      let ngos = JSON.parse(localStorage.getItem('ngos')) || [];
      const ngoList = document.getElementById('ngoList');
      ngoList.innerHTML = '';

      ngos.forEach((ngo, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.innerHTML = `
                    <div><strong>${ngo.name}</strong> - ${ngo.description}</div>
                    <div>
                        <button class="btn btn-info btn-sm mr-2" onclick="editNgo(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteNgo(${index})">Delete</button>
                    </div>
                `;
        ngoList.appendChild(listItem);
      });
    }

    function showAddNgoModal() {
      document.getElementById('ngoModalTitle').textContent = 'Add NGO';
      document.getElementById('ngoForm').reset();
      document.getElementById('ngoModal').style.display = 'block';
    }

    function editNgo(index) {
      let ngos = JSON.parse(localStorage.getItem('ngos')) || [];
      let ngo = ngos[index];

      document.getElementById('ngoModalTitle').textContent = 'Edit NGO';
      document.getElementById('ngoIndex').value = index;
      document.getElementById('ngoName').value = ngo.name;
      document.getElementById('ngoDesc').value = ngo.description;

      document.getElementById('ngoModal').style.display = 'block';
    }

    function closeNgoModal() {
      document.getElementById('ngoModal').style.display = 'none';
    }

    function saveNgo() {
      const index = document.getElementById('ngoIndex').value;
      const ngo = {
        name: document.getElementById('ngoName').value,
        description: document.getElementById('ngoDesc').value
      };

      let ngos = JSON.parse(localStorage.getItem('ngos')) || [];

      if (index === "") {
        ngos.push(ngo);
      } else {
        ngos[index] = ngo;
      }

      localStorage.setItem('ngos', JSON.stringify(ngos));
      closeNgoModal();
      loadNgos();
      loadCharities(); // Reload charities to update NGO dropdown
    }

    function deleteNgo(index) {
      let ngos = JSON.parse(localStorage.getItem('ngos')) || [];
      ngos.splice(index, 1);
      localStorage.setItem('ngos', JSON.stringify(ngos));
      loadNgos();
      loadCharities(); // Reload charities to update NGO dropdown
    }

    // User Functions
    // User Functions
        function loadUsers() {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userList = document.getElementById('userList');
            userList.innerHTML = '';

            users.forEach((user, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-item';
                listItem.innerHTML = `
                    <div><strong>${user.name}</strong> - ${user.email}</div>
                    <div>
                        <button class="btn btn-info btn-sm mr-2" onclick="editUser(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
                    </div>
                `;
                userList.appendChild(listItem);
            });
        }

        function showAddUserModal() {
            document.getElementById('userModalTitle').textContent = 'Add User';
            document.getElementById('userForm').reset();
            document.getElementById('userModal').style.display = 'block';
        }

        function editUser(index) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let user = users[index];
            
            document.getElementById('userModalTitle').textContent = 'Edit User';
            document.getElementById('userIndex').value = index;
            document.getElementById('userName').value = user.name;
            document.getElementById('userEmail').value = user.email;
            
            document.getElementById('userModal').style.display = 'block';
        }

        function closeUserModal() {
            document.getElementById('userModal').style.display = 'none';
        }

        function saveUser() {
            const index = document.getElementById('userIndex').value;
            const user = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value
            };

            let users = JSON.parse(localStorage.getItem('users')) || [];

            if (index === "") {
                users.push(user);
            } else {
                users[index] = user;
            }

            localStorage.setItem('users', JSON.stringify(users));
            closeUserModal();
            loadUsers();
        }

        function deleteUser(index) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            loadUsers();
        }