 // Get logged-in user details
 const loggedInUser = localStorage.getItem("loggedInUser");
 const userDisplayName = localStorage.getItem("userDisplayName");

 function loadCharities() {
    let selectedNgo = localStorage.getItem('selectedNgo').replace(/"/g, '');
    if (!selectedNgo) {
        document.getElementById('charityList').innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-triangle"></i> No NGO selected. Please go back and select an NGO.
                </div>
            </div>
        `;
        return;
    }

    document.getElementById('ngoName').textContent = selectedNgo;

    // Get charities from localStorage and handle the 'null' key
    const charitiesData = JSON.parse(localStorage.getItem('charities')) || {};
    let allCharities = charitiesData['null'] || []; // Direct access to the array under 'null' key

    // Filter charities where `ngoname` matches `selectedNgo`
    let selectedNgoCharities = allCharities.filter(charity =>
        charity.ngoname === selectedNgo
    );

    console.log("Selected NGO:", selectedNgo);
    console.log("All Charities:", allCharities);
    console.log("Filtered Charities:", selectedNgoCharities);

     const charityList = document.getElementById('charityList');
     charityList.innerHTML = ''; // Clear previous content
     //console.log(selectedNgo);
     
     if (selectedNgoCharities.length === 0) {
         charityList.innerHTML = `
             <div class="col-12">
                 <div class="alert alert-info" role="alert">
                     <i class="fas fa-info-circle"></i> No active charity campaigns available for ${selectedNgo}.
                 </div>
             </div>
         `;
         return;
     }

     // Create and append charity cards for the selected NGO
     selectedNgoCharities.forEach(charity => {
         const expiryDate = new Date(charity.expiryDate);
         const currentDate = new Date();
         const daysLeft = Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24));

         // Initialize raisedAmount if it doesn't exist
         charity.raisedAmount = charity.raisedAmount || 0;

         // Calculate progress percentage
         const progressPercentage = ((charity.raisedAmount / charity.goalAmount) * 100).toFixed(1);

         const card = document.createElement('div');
         card.className = 'col-md-6 mb-4';
         card.innerHTML = `
             <div class="card h-100">
                 <div class="card-body">
                     <h5 class="card-title">
                         <i class="fas fa-heart text-danger"></i> ${charity.name}
                     </h5>
                     <p class="card-text">${charity.description}</p>
                     <div class="charity-details">
                         <div class="row mb-2">
                             <div class="col-6">
                                 <strong><i class="fas fa-bullseye"></i> Goal Amount:</strong>
                                 <div>₹${Number(charity.goalAmount).toLocaleString()}</div>
                             </div>
                             <div class="col-6">
                                 <strong><i class="fas fa-hand-holding-heart"></i> Raised Amount:</strong>
                                 <div>₹${Number(charity.raisedAmount).toLocaleString()}</div>
                             </div>
                         </div>
                         <div class="row mb-2">
                             <div class="col-6">
                                 <strong><i class="fas fa-clock"></i> Days Left:</strong>
                                 <div class="badge badge-${daysLeft > 30 ? 'success' : 'warning'}">
                                     ${daysLeft} days
                                 </div>
                             </div>
                             <div class="col-6">
                                 <strong><i class="fas fa-coins"></i> Remaining:</strong>
                                 <div>₹${Number(charity.goalAmount - charity.raisedAmount).toLocaleString()}</div>
                             </div>
                         </div>
                         <div class="progress mt-2">
                             <div class="progress-bar bg-success" role="progressbar" 
                                 style="width: ${progressPercentage}%" 
                                 aria-valuenow="${progressPercentage}" 
                                 aria-valuemin="0"
                                 aria-valuemax="100">
                                 ${progressPercentage}%
                             </div>
                         </div>
                         <div class="mt-3">
                             <strong><i class="fas fa-calendar-alt"></i> Expiry Date:</strong>
                             <span>${expiryDate.toLocaleDateString()}</span>
                         </div>
                     </div>
                 </div>
                 <div class="card-footer text-center">
                     <button class="btn btn-primary ${charity.raisedAmount >= charity.goalAmount ? 'disabled' : ''}" 
                         onclick="donate('${charity.name}', ${charity.goalAmount}, ${charity.raisedAmount})"
                         ${charity.raisedAmount >= charity.goalAmount ? 'disabled' : ''}>
                         <i class="fas fa-hand-holding-heart"></i> 
                         ${charity.raisedAmount >= charity.goalAmount ? 'Goal Reached!' : 'Donate Now'}
                     </button>
                 </div>
             </div>
         `;
         charityList.appendChild(card);
     });
 }

 function donate(charityName, goalAmount, raisedAmount) {
     const remainingAmount = goalAmount - raisedAmount;
     const amount = prompt(`Enter donation amount for ${charityName}\nGoal: ₹${goalAmount.toLocaleString()}\nRemaining: ₹${remainingAmount.toLocaleString()}`);

     if (amount) {
         const donationAmount = Number(amount);

         // Validate donation amount
         if (isNaN(donationAmount) || donationAmount <= 0) {
             alert('Please enter a valid amount.');
             return;
         }

         if (donationAmount > remainingAmount) {
             alert(`Maximum donation amount allowed is ₹${remainingAmount.toLocaleString()}`);
             return;
         }

         // Update charity data in localStorage
         const charitiesData = JSON.parse(localStorage.getItem('charities')) || {};

         // Find and update the specific charity
         Object.keys(charitiesData).forEach(key => {
             charitiesData[key] = charitiesData[key].map(charity => {
                 if (charity.name === charityName) {
                     charity.raisedAmount = (charity.raisedAmount || 0) + donationAmount;
                 }
                 return charity;
             });
         });

         // Save updated data back to localStorage
         localStorage.setItem('charities', JSON.stringify(charitiesData));

         // Show success message
         alert(`Thank you for your generous donation of ₹${donationAmount.toLocaleString()} to ${charityName}!`);

         // Reload the charities to update the display
         loadCharities();
     }
 }

 function goToMyCharities() {
     window.location.href = "Dashboard.html";
 }

 function logout() {
     localStorage.removeItem("loggedInNgo");
     localStorage.removeItem("ngoDisplayName");
     window.location.href = "../landing.html";
 }

 // Load charities when the page loads
 window.onload = loadCharities;