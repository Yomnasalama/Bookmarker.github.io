//na2s 7war search -> lma b3ml search w 23ml update aw delete by3rd kolo 3shan bnady 3al displaySites fy 254

var site_name = document.getElementById('bookmarkName');
var site_url = document.getElementById('websiteURL');
var table = document.getElementById('tableContent');
var search_input = document.getElementById('search');
var url_regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
var name_regex = /^[a-zA-Z]{3,}$/

allSites = [];
var updated_index = -1;

if (localStorage.getItem("allSites") != null) {
    allSites = JSON.parse(localStorage.getItem("allSites"));
    displaySites();
}


function addWebsite() {
    if (vaildateInput(site_name.value, site_url.value)) {
        var site = {
            name: site_name.value,
            url: site_url.value
        }

        allSites.push(site);

        localStorage.setItem('allSites', JSON.stringify(allSites));

        displaySites();
        clearForm();
    } 
}

function deleteWesite(index) {
    allSites.splice(index, 1);
    localStorage.setItem('allSites', JSON.stringify(allSites));
    displaySites();
}

function addOrUpdateButton() {
    if (document.getElementById('submitBtn').innerHTML == 'Update') {
        updateInArray();
        document.getElementById('submitBtn').innerHTML = 'Submit';
        clearForm();
    } else {
        addWebsite();
    }
    
}

function updateInArray() {
    if (updated_index == -1) return;
    allSites[updated_index].name = site_name.value;
    allSites[updated_index].url = site_url.url;
    updated_index = -1;
    localStorage.setItem('allSites', JSON.stringify(allSites));
    displaySites();
}

function updateWebsite(index) {
    document.getElementById('submitBtn').innerHTML = 'Update';
    site_name.value = allSites[index].name;
    site_url.value = allSites[index].url;
    updated_index = index;
}


function clearForm() {
    site_name.value ='';
    site_url.value = '';
}

function goToUrl(index) {
    open(`https://${allSites[index].url}`);
}

function displaySites() {
    var content = '';
    for (var i = 0; i < allSites.length; i++) {
        content += `<tr> 
        <td> ${i}</td>
        <td> ${allSites[i].name}</td>
        <td> 
            <button onclick='goToUrl(${i})' class="btn btn-success" data-index="0">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
        </td>
        <td> 
            <button onclick='updateWebsite(${i})' class="btn btn-success" data-index="0">
                    <i class="fa-solid fa-pen pe-2"></i>Update
            </button>
        </td>
        <td> 
        <button onclick='deleteWesite(${i})' class="btn btn-danger pe-2 delete-btn" data-index="0">
            <i class="fa-solid fa-trash-can"></i>
                Delete
        </button>
        </td>
        </tr>`;
    }

    table.innerHTML = content;
}

function search() {
    var search_value= search_input.value;
    var content = ''
    for (var i = 0; i < allSites.length; i++) {
        if (allSites[i].name.toLowerCase().includes(search_value.toLowerCase())) {
            content += `<tr> 
                <td> ${i}</td>
                <td> ${allSites[i].name}</td>
                <td> 
                    <button onclick='goToUrl(${i})' class="btn btn-success" data-index="0">
                            <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                </td>
                <td> 
                    <button onclick='updateWebsite(${i})' class="btn btn-success" data-index="0">
                            <i class="fa-solid fa-pen pe-2"></i>Update
                    </button>
                </td>
                <td> 
                <button onclick='deleteWesite(${i})' class="btn btn-danger pe-2 delete-btn" data-index="0">
                    <i class="fa-solid fa-trash-can"></i>
                        Delete
                </button>
                </td>
                </tr>`;
        }
    }
    table.innerHTML = content;
}

function vaildateInput(name, url) {
    console.log(name_regex.test(name), url_regex.test(url));
    console.log(name, url)
    if (!url_regex.test(url) || !name_regex.test(name)) {
        alert("Site Name or Url is not valid, Please follow the rules below : \n -Site name must contain at least 3 characters \n -Site URL must be a valid one");
        return false;
    }
    return true;
}


document.querySelector('#submitBtn').addEventListener('click', function() {
    addOrUpdateButton();
});

document.querySelector('#search').addEventListener('keyup', function() {
    search();
});
