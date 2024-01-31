<?php
require_once("../guardar/guardarproducto.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Crear una instancia de Producto con los valores del formulario
    $objProducto = new Producto(
        $_POST["Referencia"],
        $_POST["Diseno"],
        $_POST["Marca"],
        $_POST["QuienDaIngreso"],
        $_POST["FW"],
        $_POST["CantidadesAgregar"]
    );

    // Guardar el producto en la base de datos
    $objProducto->guardar();

    // Puedes imprimir mensajes o redirigir a otra página después de guardar
    echo "Producto guardado con éxito";
} else {
    // Si no es una solicitud POST, puedes redirigir a otra página o realizar otras acciones
    echo "Acceso no autorizado";
}
?>
