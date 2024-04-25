let techniquesData = []; 


function filterTechniques() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();

    const filteredData = techniquesData.filter(item => {
        const sstrId = item.sstr_id?.toLowerCase() || "";
        const sstrTechnique = item.sstr_technique?.toLowerCase() || "";
        const tactics = item.tactics?.toLowerCase() || "";
        const techniques = item.techniques?.toLowerCase() || "";
        const subTechnique = item.sub_technique?.toLowerCase() || "";
        const sstrPlatform = item.sstr_platform?.toString().toLowerCase() || ""; 
        const privilegeRequired = item.privilege_required?.toLowerCase() || "";
        const sstrDescription = item.sstr_description?.toLowerCase() || "";
        const sstrDetection = item.sstr_detection?.toLowerCase() || "";
        const contributor = item.contributor?.toLowerCase() || "";
        const entryDate = item.entry_date || ""; 

        return sstrId.includes(searchQuery) ||
               sstrTechnique.includes(searchQuery) ||
               tactics.includes(searchQuery) ||
               techniques.includes(searchQuery) ||
               subTechnique.includes(searchQuery) ||
               sstrPlatform.includes(searchQuery) ||
               privilegeRequired.includes(searchQuery) ||
               sstrDescription.includes(searchQuery) ||
               sstrDetection.includes(searchQuery) ||
               contributor.includes(searchQuery) ||
               entryDate.includes(searchQuery);
    });

    displayTechniques(filteredData);
}




function displayTechniques(data) {
    const techniquesTableBody = document.getElementById('techniques-body');
    techniquesTableBody.innerHTML = ''; 
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="details.html?id=${item.sstr_id}">${item.sstr_id}</a></td>
            <td><a href="details.html?id=${item.sstr_id}">${item.sstr_technique}</a></td>
           
                <td>${item.tactics}</td>
               
                <td>${item.technique}</td>
                <td>${item.sub_technique}</td>
				<td>${item.sstr_platform}</td>
				<td>${item.entry_date}</td>
              
             
        `;
        techniquesTableBody.appendChild(row);
    });
}


fetch('_data/sstr-techniques.json')
    .then(response => response.json())
    .then(data => {
        techniquesData = data["SSTR Techniques"]; 
        
        techniquesData.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));
        displayTechniques(techniquesData); 
    })
    .catch(error => {
        console.error('Error loading techniques:', error);
    });
