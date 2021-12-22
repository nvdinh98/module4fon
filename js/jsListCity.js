function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/showAll",
        success: function (data) {
            let content = '    <tr>\n' +
                '        <td>Name</a></td>\n' +
                '        <td>Country</td>\n' +
                '        <td>Edit</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getCity(data[i])
            }
            document.getElementById("cityList").innerHTML = content;
        }
    })
}
function addNewCity() {
    let name = $('#name').val();
    let population = $('#population').val();
    let area = $('#area').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let country = $('#country').val();
    let newCity = {
        name: name,
        population: population,
        area: area,
        gdp: gdp,
        description: description,
        country: {id: country}
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCity),
        url: "http://localhost:8080/city/create",
        success: successHandler
    })
    event.preventDefault();
}


successHandler();


function getCity(city) {
    return `<tr><td>${city.name}</td>` +
        `<td>${city.country.name}</td>` +
        `<td><button type="submit" value="${city.id}" onclick="editForm(this)">Edit</button></td>` +
        `<td><button type="submit" value="${city.id}" onclick="deleteCity(this)">Delete</button></td></tr>`
}

function editForm(kax) {
    let id = kax.getAttribute("value");
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/" + id,
        success: function (city) {
            $('#idEdit').val(id);
            $('#nameEdit').val(city.name);
            $('#areaEdit').val(city.area);
            $('#countryEdit').val(city.country);
            $('#gdpEdit').val(city.gdp);
            $('#populationEdit').val(city.population);
            $('#descriptionEdit').val(city.description);
        }
    });
    event.preventDefault();

}

function updateListCity() {
    let id = $('#idEdit').val();
    let name = $('#nameEdit').val();
    let area = $('#areaEdit').val();
    let country = $('#countryEdit').val();
    let gbp = $('#gdpEdit').val();
    let description = $('#descriptionEdit').val();
    let city = {
        id: id,
        name: name,
        area: area,
        country: {
            id: country
        },
        gbp: gbp,
        description: description
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/city/edit/" + id,
        data: JSON.stringify(city),
        success: successHandler
    });
    event.preventDefault();
}

function deleteCity(a) {
    let id = a.getAttribute("value");
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/city/delete" + id,
        success: successHandler
    })
}

listCountry("countryEdit")
listCountry("country")
function listCountry(kax) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/countries",
        success: function (data) {
            let content;
            for (let i = 0; i < data.length; i++) {
                content += getCountry(data[i]);
            }
            document.getElementById(kax).innerHTML = content;
        }
    });
}



function getCountry(kax) {
    return `<option value="${kax.id}">${kax.name}</option>`
}

