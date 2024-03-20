
const urlParams = new URLSearchParams(window.location.search);
const sstrId = urlParams.get('id'); 

fetch('_data/sstr-techniques.json')
    .then(response => response.json())
    .then(data => {
        const detailsDiv = document.getElementById('technique-details');
        const item = data["SSTR Techniques"].find(tech => tech.sstr_id === sstrId || tech.sstr_technique === urlParams.get('name'));
        if (item) {
            detailsDiv.innerHTML = `
    <p><strong>sstr Technique ID:</strong> ${item.sstr_id}</p>
    <p><strong>sstr Technique:</strong> ${item.sstr_technique}</p>
    
    <p><strong>Tactic ID:</strong> ${item.tactics_id}</p>
    <p><strong>Tactic:</strong> ${item.tactics}</p>
    
    <p><strong>Techniques ID:</strong> ${item.techniques_id}</p>
    <p><strong>Technique:</strong> ${item.technique}</p>
    
    <p><strong>Sub Technique ID:</strong> ${item.sub_technique_id}</p>
    <p><strong>Sub Technique:</strong> ${item.sub_technique}</p>
    
    <p><strong>Platform:</strong> ${item.sstr_platform}</p>
    <p><strong>Privilege Required:</strong> ${item.privilege_required}</p>
    <p><strong>Description:</strong> ${item.sstr_description}</p>
    
    <p><strong>Detection:</strong> ${item.sstr_detection}</p>
    
    <p><strong>Entry Date:</strong> ${item.entry_date}</p>
    <p><strong>Contributor:</strong> ${item.contributor}</p>
    <p><strong>Reference Links:</strong> ${item.reference_links.map(link => `<br><a href="${link}" target="_blank">${link}</a>`).join(", ")}</p>
`;

            
            const downloadButton = document.getElementById('download-json');
            if (downloadButton) {
                downloadButton.onclick = () => downloadDetails(item);
            } else {
                console.error('Download button not found');
            }
        } else {
            detailsDiv.innerHTML = `<p>Details not found.</p>`;
        }
    })
    .catch(error => {
        console.error('Error loading technique details:', error);
    });

function downloadDetails(item) {
const fileName = `${item.sstr_id}_${item.sstr_technique}.json`;
    const jsonStr = JSON.stringify(item, null, 4);
    const blob = new Blob([jsonStr], {type: "application/json"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
