var inventarioData = [];  // Array para almacenar los datos del inventario

function agregarFilaTabla() {
    var codigoProducto = document.getElementById("CodigoProducto").value;
    var referencia = document.getElementById("Referencia").value;
    var diseno = document.getElementById("Diseno").value;
    var marca = document.getElementById("Marca").value;
    var quienDaIngreso = document.getElementById("QuienDaIngreso").value;
    var Fw = document.getElementById("FW").value;
    var cantidadesAgregar = document.getElementById("CantidadesAgregar").value;

    if (!codigoProducto || !referencia || !diseno || !marca || !quienDaIngreso || !Fw || !cantidadesAgregar) {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return;
    }

    // Validar que Quién da el ingreso sea un valor de texto
    if (!/^[A-Za-z\s]+$/.test(quienDaIngreso)) {
        alert("Por favor, ingrese un valor de texto en el campo 'Quién da el ingreso'.");
        return;
    }
    
    if (!/^\d+$/.test(cantidadesAgregar)) {
        alert("Por favor, ingrese un número entero en el campo 'Cantidades a Agregar'.");
        return;
    }

    var table = document.getElementById("tablaInventario");
    var newRow = table.insertRow(table.rows.length);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);
    var cell8 = newRow.insertCell(7);

    cell1.innerHTML = codigoProducto;
    cell2.innerHTML = referencia;
    cell3.innerHTML = diseno;
    cell4.innerHTML = marca;
    cell5.innerHTML = quienDaIngreso;
    cell6.innerHTML = Fw;
    cell7.innerHTML = cantidadesAgregar;

    // Crear botones de acciones
    var editButton = document.createElement("button");
    editButton.setAttribute("class", "btn btn-warning btn-sm");
    editButton.setAttribute("onclick", "editarFila(this)");
    editButton.innerHTML = "Editar";

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn btn-danger btn-sm");
    deleteButton.setAttribute("onclick", "eliminarFila(this)");
    deleteButton.innerHTML = "Eliminar";

    // Agregar botones a la celda de acciones
    cell8.appendChild(editButton);
    cell8.appendChild(deleteButton);

    // Almacenar datos en el array
    var filaDatos = {
        CodigoProducto: codigoProducto,
        Referencia: referencia,
        Diseno: diseno,
        Marca: marca,
        QuienDaIngreso: quienDaIngreso,
        FW: Fw,
        CantidadesAgregar: cantidadesAgregar
    };

    inventarioData.push(filaDatos);

    limpiarFormulario();
}

function editarFila(button) {
    var row = button.parentNode.parentNode;

    var codigoProducto = row.cells[0].innerHTML;
    var referencia = row.cells[1].innerHTML;
    var diseno = row.cells[2].innerHTML;
    var marca = row.cells[3].innerHTML;
    var quienDaIngreso = row.cells[4].innerHTML;
    var FW = row.cells[5].innerHTML;
    var cantidadesAgregar = row.cells[6].innerHTML;

    document.getElementById("CodigoProducto").value = codigoProducto;
    document.getElementById("Referencia").value = referencia;
    document.getElementById("Diseno").value = diseno;
    document.getElementById("Marca").value = marca;
    document.getElementById("QuienDaIngreso").value = quienDaIngreso;
    document.getElementById("FW").value = FW;
    document.getElementById("CantidadesAgregar").value = cantidadesAgregar;

    // Eliminar la fila al editar
    row.parentNode.removeChild(row);
}

function eliminarFila(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function limpiarFormulario() {
    document.getElementById("CodigoProducto").value = "";
    document.getElementById("Referencia").value = "";
    document.getElementById("Diseno").value = "";
    document.getElementById("Marca").value = "";
    document.getElementById("QuienDaIngreso").value = "";
    document.getElementById("FW").value = "";
    document.getElementById("CantidadesAgregar").value = "";
}

function confirmarEnvio() {
    var table = document.getElementById("tablaInventario");

    if (table.rows.length === 1) {
        alert("No hay datos en la tabla. Agregue elementos antes de enviar.");
        return;
    }

    var confirmacion = window.confirm("¿Estás seguro de agregar al inventario?");

    if (confirmacion) {
        // Aquí puedes agregar lógica adicional si el usuario hace clic en "Sí"
        alert("Inventario agregado exitosamente."); // Esto es solo un ejemplo, puedes ajustarlo según tus necesidades

        // Aquí podrías enviar los datos almacenados a una base de datos o realizar otra acción
        console.log("Datos del inventario a enviar:", inventarioData);

        // Limpiar el array de datos
        inventarioData = [];

        // Limpiar la tabla
        table.innerHTML = '<thead><tr><th>Código Producto</th><th>Referencia</th><th>Diseño</th><th>Marca</th><th>Quién da el ingreso</th><th>FW</th><th>Cantidades Agregadas</th><th>Acciones</th></tr></thead><tbody id="tablaBody"></tbody>';
    }
}

// Asociar la función confirmarEnvio con el botón "Enviar"
document.getElementById("enviarButton").addEventListener("click", confirmarEnvio);

