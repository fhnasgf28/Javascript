const url = "https://kttx1ae.hashmicro.com/api/v1/check/modules";

const headers = {
    "Content-Type": "application/json"
};

const payload = {
    "ModulesName": "<p>Hash Core Package for Following Modules: </p> <ul> <li> <p>Manufacture Management</p></li> <li> <p>CRM Sales Management<p><li><li><p>Inventory Management</p></li><li> <p>Accounting Management</p></li><li><p>Purchase Management</p></li> <li><p>Implementation Service</p></li><li> <p>Cloud Server &amp; Storage</p></li></ul>",
    "ModulesList": ["Manufacturing", "CRM Module", "Sales Module", "Purchase Module", "Construction Module", "Inventory Module", "HRM"]
};

fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload)  // Mengubah objek ke JSON string
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log("AI Response:", data);
})
.catch(error => {
    console.error("Error:", error.message);
});
