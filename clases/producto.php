<?php

require_once("./conexion.php");

class Producto
{
    private $ID_Producto;
    private $Referencia;
    private $Tipo;
    private $ID_Usuario;
    private $FW;
    private $Cantidad;

    const TABLA = 'productos';

    // Constructor
    public function __construct($Referencia, $Tipo, $ID_Usuario, $FW, $Cantidad, $ID_Producto = null)
    {
        $this->ID_Producto = $ID_Producto;
        $this->Referencia = $Referencia;
        $this->Tipo = $Tipo;
        $this->ID_Usuario = $ID_Usuario;
        $this->FW = $FW;
        $this->Cantidad = $Cantidad;
    }

    // Getters y Setters
    public function getID_Producto()
    {
        return $this->ID_Producto;
    }

    public function setID_Producto($ID_Producto)
    {
        $this->ID_Producto = $ID_Producto;
    }

    public function getReferencia()
    {
        return $this->Referencia;
    }

    public function setReferencia($Referencia)
    {
        $this->Referencia = $Referencia;
    }

    public function getTipo()
    {
        return $this->Tipo;
    }

    public function setTipo($Tipo)
    {
        $this->Tipo = $Tipo;
    }

    public function getID_Usuario()
    {
        return $this->ID_Usuario;
    }

    public function setID_Usuario($ID_Usuario)
    {
        $this->ID_Usuario = $ID_Usuario;
    }

    public function getFW()
    {
        return $this->FW;
    }

    public function setFW($FW)
    {
        $this->FW = $FW;
    }

    public function getCantidad()
    {
        return $this->Cantidad;
    }

    public function setCantidad($Cantidad)
    {
        $this->Cantidad = $Cantidad;
    }

    public function guardar()
    {
        $conexion = new Conexion();
        $consulta = $conexion->prepare('INSERT INTO productos (Referencia, Tipo, ID_Usuario, FW, Cantidad)
            VALUES (:Referencia, :Tipo, :ID_Usuario, :FW, :Cantidad)');

        try {
            $consulta->bindParam(':Referencia', $this->Referencia);
            $consulta->bindParam(':Tipo', $this->Tipo);
            $consulta->bindParam(':ID_Usuario', $this->ID_Usuario);
            $consulta->bindParam(':FW', $this->FW);
            $consulta->bindParam(':Cantidad', $this->Cantidad);
            $consulta->execute();
            $this->ID_Producto = $conexion->lastInsertId();

            echo "Producto guardado con éxito";
        } catch (PDOException $e) {
            echo "Ha surgido un error y no se pudo guardar el producto. Detalle: " . $e->getMessage();
        }
    }

    // Resto de métodos actualizados...

    public static function obtenerProductoPorID($ID_Producto)
    {
        $conexion = new Conexion();
        $consulta = $conexion->prepare('SELECT * FROM ' . self::TABLA . ' WHERE ID_Producto = :ID_Producto');
        $consulta->bindParam(':ID_Producto', $ID_Producto);
        $consulta->execute();
        $producto = $consulta->fetch(PDO::FETCH_ASSOC);
        $conexion = null;

        return $producto;
    }

    public static function obtenerCantidadDisponiblePorTipo()
    {
        $conexion = new Conexion();
        $consulta = $conexion->prepare('SELECT Tipo, SUM(Cantidad) as Total FROM ' . self::TABLA . ' GROUP BY Tipo');
        $consulta->execute();
        $cantidadPorTipo = $consulta->fetchAll(PDO::FETCH_ASSOC);
        $conexion = null;

        return $cantidadPorTipo;
    }
}
