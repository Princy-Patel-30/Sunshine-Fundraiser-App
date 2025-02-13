
    document.getElementById('ngoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        let loggedInNgo = localStorage.getItem("loggedInNgo");
        const ngoName = document.getElementById('ngoName').value;
        const ngoDescription = document.getElementById('ngoDescription').value;
        
        
        if (!loggedInNgo) {
            alert("No NGO is logged in!");
            window.location.href = "index.html";
            return;
        }

        // localStorage.setItem("loggedInNgo", .name);

        let ngos = JSON.parse(localStorage.getItem("ngos")) || [];
        let ngo = ngos.find(n => n.name === loggedInNgo);

       const ngoData = {
            name: ngoName,
            username : loggedInNgo,
            description: ngoDescription,
        };

        // Store the NGO data in local storage
        let ngoes = JSON.parse(localStorage.getItem('ngos')) || [];
        ngoes.push(ngoData);
        localStorage.setItem('ngos', JSON.stringify(ngoes));

        localStorage.setItem("ngoDisplayName", ngoName);
        console.log(ngoName);
        

        // Redirect to the dashboard
        window.location.href = './Dashboard.html';
    });
