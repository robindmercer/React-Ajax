// Manejo de Botones 
var boto = document.getElementById("boton")
boto.addEventListener('click', function () {
    return
})
$('#boton').click(function () {
    get_amigos()
});

$('#newinput').click(function () {
    alta_amigo_id()
});

$('#searchName').click(function () {
    var busco = document.getElementById('inputNombre').value
    buscar_amigo(busco);
    document.getElementById('inputNombre').value = ""
});

$('#search').click(function () {
    var busco = document.getElementById('input').value
    buscar_amigo_id(busco);
    document.getElementById('input').value = ""
});

$('#delete').click(function () {
    var busco = document.getElementById('inputDelete').value
    eliminar(busco);
    document.getElementById('inputDelete').value = ""
});

//***********************************************/
// Comienza las Funciones         


function get_amigos() {
    fetch(`http://localhost:5000/amigos`)
        .then(res => res.json())
        .then(data => {
            var lista = document.getElementById("lista")
            lista.innerHTML = "";
            data.forEach(element => {
                var li = document.createElement('li');
                li.innerHTML = element.name + ` &nbsp;<button style='border-radius:0.5rem;' onclick=(eliminar(${element.id}))>X</button>`
                $('#lista').append(li);
                /*
                lo mismo con map 
                data.map((e,index)=> {
                    var li = document.createElement('li');
                    li.innerHTML = e.name + ` &nbsp;<button style='border-radius:0.5rem;' onclick=(eliminar(${element.id}))>X</button>`
                    lista.append(li);
                })
                */
            })
        })
        .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message)
        })
}

// function buscar_amigo(nombre) {
//     var busco = nombre.toLowerCase()
//     fetch(`http://localhost:5000/amigos/?name=${nombre}`)
//         .then(res => res.json())
//         .then(data => {
//             var nombre = document.getElementById("amigoName")
//             nombre.innerHTML = data.name
//         })
// }

function alta_amigo_id() {
    const element = document.getElementById('newName').value;
    const edad = document.getElementById('newAge').value;
    const mail = document.getElementById('newMail').value;
    var datas = { name: element, age: edad, email: mail };
    fetch('http://localhost:5000/amigos/', {
        method: 'POST',
        body: JSON.stringify(datas),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => { get_amigos() })
}

function buscar_amigo_id(xid) {
    const element = document.getElementById('amigo');
    fetch('http://localhost:5000/amigos/' + xid, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            element.innerHTML = `Nombre <b>${data.name}</b> Edad: <b>${data.age}</b> Mail:<b> ${data.email}</b>`
        })
};

function eliminar(xid) {
    const element = document.getElementById('sucess');
    fetch('http://localhost:5000/amigos/' + xid, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            element.innerHTML = xid + ' Delete successful'
            get_amigos();
        })
};
/* No funciona 
    function buscar_id(nombre) {
        fetch(`http://localhost:5000/amigos`)
            .then(res => res.json())
            .then(data => {
                data.forEach(element => {
                    var tengo = element.name;
                    if (tengo.toLowerCase() == nombre) {
                        devuelvo = element.id;
                    }
                });
            });
        return devuelvo;
    }
*/