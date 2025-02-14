
    // const ngoId = new URLSearchParams(window.location.search).get('id');
    // const loggedInNgo = localStorage.getItem("loggedInNgo");
    // const ngoDisplayName = localStorage.getItem("ngoDisplayName");

    // // Update the NGO Name in Dashboard
    // document.getElementById('ngoName').textContent = "Welcome, " + ngoDisplayName; //ngo title name 

    // function goToMyCharities() {
    //   window.location.href = "Dashboard.html";
    // }

    // function logout() {
    //   localStorage.removeItem("loggedInNgo");
    //   localStorage.removeItem("ngoDisplayName");
    //   window.location.href = "../landing.html";
    // }

    // // Load all charities
    // function loadCharities() {
    //   const charitiesData = JSON.parse(localStorage.getItem('charities')) || {};
    //   const charityList = document.getElementById('charityList');
    //   charityList.innerHTML = '';

    //   // Get all charities
    //   let allCharities = charitiesData["null"] || [];

    //   if (allCharities.length === 0) {
    //     charityList.innerHTML = '<p class="text-center text-muted">No charities available.</p>';
    //     return;
    //   }

    //   // Group charities by NGO
    //   const groupedCharities = {};
    //   allCharities.forEach(charity => {
    //     if (!groupedCharities[charity.ngoname]) {
    //       groupedCharities[charity.ngoname] = [];
    //     }
    //     groupedCharities[charity.ngoname].push(charity);
    //   });

    //   // Display charities grouped by NGO
    //   for (const [ngoName, charities] of Object.entries(groupedCharities)) {
    //     const ngoSection = document.createElement('div');
    //     ngoSection.className = 'mb-4';
    //     // console.log(charities);
    //     let charitiesAll = JSON.parse(localStorage.getItem('charities'));
    //     charitiesAll = ngoName["null"] || [] ;
    //     console.log(charitiesAll.ngoname);
        

    //     ngoSection.innerHTML = `<h3 class="mb-3">${ngoName.ngoname }</h3>`;
        
        
    //     charities.forEach(charity => {
    //       const charityItem = document.createElement('div');
    //       charityItem.className = 'charity-item';
    //       charityItem.innerHTML = `
    //                     <div class="charity-details">
    //                         <strong>${charity.name}</strong> <br>
    //                         <small>${charity.description}</small> <br>
    //                         <small>
    //                             <strong>Goal:</strong> $${charity.goalAmount} | 
    //                             <strong>Expiry:</strong> ${charity.expiryDate}
    //                         </small>
    //                     </div>
    //                 `;
    //       ngoSection.appendChild(charityItem);
    //     });

    //     charityList.appendChild(ngoSection);
    //   }
    // }

    // // Initial load
    // loadCharities();



const ngoId = new URLSearchParams(window.location.search).get('id');
const loggedInNgo = localStorage.getItem("loggedInNgo");
const ngoDisplayName = localStorage.getItem("ngoDisplayName");

// Update the NGO Name in Dashboard
document.getElementById('ngoName').textContent = "Welcome, " + loggedInNgo; // NGO title name 

function goToMyCharities() {
  window.location.href = "Dashboard.html";
}

function logout() {
  localStorage.removeItem("loggedInNgo");
  localStorage.removeItem("ngoDisplayName");
  window.location.href = "../landing.html";
}

// Load all charities
function loadCharities() {
  const charitiesData = JSON.parse(localStorage.getItem('charities')) || {};
  const charityList = document.getElementById('charityList');
  charityList.innerHTML = '';

  console.log("Stored charity data:", charitiesData); 

  // Get all charities
  let allCharities = charitiesData["null"] || [];

  if (allCharities.length === 0) {
    charityList.innerHTML = '<p class="text-center text-muted">No charities available.</p>';
    return;
  }

  console.log("All charities:", allCharities); // Debugging: Log charity list

  // Group charities by NGO name
  const groupedCharities = {};
  allCharities.forEach(charity => {
    if (!charity.ngoname) {
      console.warn("Missing ngoname in:", charity); // Debugging: Check missing NGO names
      return;
    }
    
    if (!groupedCharities[charity.ngoname]) {
      groupedCharities[charity.ngoname] = [];
    }
    groupedCharities[charity.ngoname].push(charity);
  });

  console.log("Grouped charities:", groupedCharities); // Debugging: Log grouped data

  // Display charities grouped by NGO
  for (const [ngoName, charities] of Object.entries(groupedCharities)) {
    const ngoSection = document.createElement('div');
    ngoSection.className = 'mb-4';

    // Display NGO name correctly
    ngoSection.innerHTML = `<h3 class="mb-3">${ngoName || "Unknown NGO"}</h3>`;

    charities.forEach(charity => {
      const charityItem = document.createElement('div');
      charityItem.className = 'charity-item';
      charityItem.innerHTML = `
        <div class="charity-details">
          <strong>${charity.name}</strong> <br>
          <small>${charity.description}</small> <br>
          <small>
            <strong>Goal:</strong> $${charity.goalAmount} | 
            <strong>Expiry:</strong> ${charity.expiryDate}
          </small>
        </div>
      `;
      ngoSection.appendChild(charityItem);
    });

    charityList.appendChild(ngoSection);
  }
}

// Initial load
loadCharities();
