function toggleForm() {
    let loginForm = document.getElementById("login-form");
    let signupForm = document.getElementById("signup-form");
    
    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}

function getNextUserId() {
    let lastUserId = localStorage.getItem("lastUserId") || 0;
    let newUserId = parseInt(lastUserId) + 1;
    localStorage.setItem("lastUserId", newUserId); //id
    return newUserId;
}

function getNextNgoId() {
    let lastNgoId = localStorage.getItem("lastNgoId") || 100;
    let newNgoId = parseInt(lastNgoId) + 1;
    localStorage.setItem("lastNgoId", newNgoId); // Save updated ID
    return newNgoId;
}

function setFixedAdminCredentials() {
    if (!localStorage.getItem("adminData")) {
        const fixedAdmin = {
            username: "admin",
            password: "admin123", // Set your desired password
            email: "admin@example.com"
        };
        localStorage.setItem("adminData", JSON.stringify(fixedAdmin));
    }
}

// Call function when the script loads
setFixedAdminCredentials();

function loginUser() {
    let username = document.getElementById("login-username").value.trim();
    let password = document.getElementById("login-password").value.trim();
    let role = document.getElementById("login-role").value;
    
    if (!email || !password) {
        alert("Please enter both email and password!");
        return;
    }

    if (role === "User") {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let foundUser = users.find(user => user.name === username && user.password === password);

        if (foundUser) {
            localStorage.setItem("loggedInUser", foundUser.name);
            alert("User Login Successful!");
            window.location.href = "/pages/user/Dashboard.html"; // Redirect to User Dashboard
            

        } else {
            alert("Invalid Email or Password for User!");
        }
    } else if (role === "NGO") {
        let ngos = JSON.parse(localStorage.getItem("NGO")) || [];
        let foundNgo = ngos.find(ngo => ngo.name === username && ngo.password === password);
        console.log(foundNgo.name);
        
        if (foundNgo) {
            localStorage.setItem("loggedInNgo", foundNgo.name);
            alert("NGO Login Successful!");
            window.location.href = "/pages/ngo/Dashboard.html"; // Redirect to NGO Dashboard
        } else {
            alert("Invalid Email or Password for NGO!");
        }
    } else if (role === "Admin") {
        let adminData = JSON.parse(localStorage.getItem("adminData"));

        if (adminData && adminData.username === username && adminData.password === password) {
            localStorage.setItem("loggedInAdmin", adminData.username);
            alert("Admin Login Successful!");
            window.location.href = "/pages/admin/admin.html"; // Redirect to Admin Dashboard
        } else {
            alert("Invalid Admin Credentials!");
        }
    }

}


function registerUser() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;
    let email = document.getElementById("email").value;
    let role = document.getElementById("signup-role").value;

    if (role === "User") {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let userId = getNextUserId();

        let newUser = {
            id: userId,
            name: username,
            email: email,
            password: password
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("User registered successfully with User ID: " + userId);
        window.location.href = "/pages/user/Dashboard.html";
        
    } else if (role === "NGO") {
        let NGOs = JSON.parse(localStorage.getItem("NGO")) || []; // Changed variable name to be more clear
        let ngoId = getNextNgoId();

        let newNgo = {
            id: ngoId,
            name: username,
            email: email,
            password: password
        };

        NGOs.push(newNgo);
        
        localStorage.setItem("NGO", JSON.stringify(NGOs));

        localStorage.setItem("loggedInNgo", newNgo.name);

        alert("NGO registered successfully with NGO ID: " + ngoId);
        localStorage.setItem("loggedInNgo", newNgo.name);

        window.location.href = "/pages/ngo/detailsngo.html";   
        } else {
        console.log("Invalid role selected:", role);
    }
    
}


