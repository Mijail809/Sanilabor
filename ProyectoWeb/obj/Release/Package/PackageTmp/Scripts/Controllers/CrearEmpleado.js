var tabladata;

$(document).ready(function () {


    //validamos el formulario
    //$("#formdata").validate({
    //    rules: {
    //        arealaboral: "required",
    //        nombrecortoarea: "required",
    //        codigoarea: "required"

    //    },
    //    messages: {
    //        arealaboral: "Ingresar Area Laboral",
    //        nombrecortoarea: "Ingresar Nombre Corto de Area",
    //        codigoarea: "Ingresar el Codigo de Area"
    //    }
    //});
    tabladata = $('#tbdata').DataTable({
        "ajax": {
            "url": $.MisUrls.url.UrlGetListarEmpleado,
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "DNI" },
            { "data": "Nombres" },
            { "data": "Apellidos" },
            { "data": "FechaNacimiento" },
            { "data": "PuestoTrabajo" },
            {
                "data": "Activo", "render": function (data) {
                    if (data) {
                        return "Activo"
                    } else {
                        return "No Activo"
                    }
                }
            },
            {
                "data": "IdEmpleado", "render": function (data, type, row, meta) {
                    return "<button class='btn btn-danger btn-sm ml-2' type='button' onclick='eliminar(" + data + ")'><i class='fa fa-trash'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "width": "150px"
            }
        ],
        "language": {
            "url": $.MisUrls.url.Url_datatable_spanish
        }
    });

});

function abrirPopUpForm(json) {

    $("#txtid").val(0);

    if (json == null) {
        $("#txtdni").val("");
        $("#txttelefono").val("");
        $("#txtnombre").val("");
        $("#txtapellidos").val("");
        $("#dtpfechanacimiento").datetimepicker().val("");
        $("#txtdireccion").val("");
        $("#txtcp").val("");
        $("#txtprovincia").val("");
        $("#txtpoblacion").val("");
        $("#txtpuestotrabajo").val("");
        $("#txtriesgo1").val("");
        $("#txtriesgo2").val("");
        $("#txtriesgo3").val("");
        $("#txtobservaciones").val("");
        $("#cboEstadoEmpleado").val(1);
        $("#dtpfechabaja").datetimepicker().val("");
        $("#dtppropuestaalta").datetimepicker().val("");
        $("#dtpaltaefectiva").datetimepicker().val("");
        $("#dtppropuestaincapacidad").datetimepicker().val("");
        $("#cboEstado").val(1);
    }

    $('#FormModal').modal('show');

}



function Guardar() {


    if ($("#formdata").valid()) {

        var $data = {
            oEmpleado: {
                IdEmpleado: parseInt($("#txtid").val()),
                DNI: $("#txtdni").val(),
                Telefono : $("#txttelefono").val(),
                Nombres:  $("#txtnombre").val(),
                Apellidos: $("#txtapellidos").val(),
                FechaNacimiento:   $("#dtpfechanacimiento").val(),
                Direccion: $("#txtdireccion").val(),
                CP:$("#txtcp").val(),
                Provincia:$("#txtprovincia").val(),
                Poblacion: $("#txtpoblacion").val(),
                PuestoTrabajo: $("#txtpuestotrabajo").val(),
                Riesgos1Enfermedad: $("#txtriesgo1").val(),
                Riesgos2Enfermedad: $("#txtriesgo2").val(),
                Riesgos3Enfermedad: $("#txtriesgo3").val(),
                Observaciones:$("#txtobservaciones").val(),
                IdEstadoEmpleado: $("#cboEstadoEmpleado").val(),
                FechaBajaEmpleado: $("#dtpfechabaja").val(),
                FechaPropuestaAlta: $("#dtppropuestaalta").val(),
                FechaAltaEfectiva: $("#dtpaltaefectiva").val(),
                FechaPropuestaIncapacidad: $("#dtppropuestaincapacidad").val(),
                Activo: parseInt($("#cboEstado").val()) == 1 ? true : false
            }
        }


        jQuery.ajax({
            url: $.MisUrls.url.UrlPostGuardarEmpleado,
            type: "POST",
            data: JSON.stringify($data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data.resultado) {
                    tabladata.ajax.reload();
                    $('#FormModal').modal('hide');
                } else {

                    swal("Mensaje", "No se pudo guardar los cambios", "warning")
                }
            },
            error: function (error) {
                console.log(error)
            },
            beforeSend: function () {

            },
        });

    }

}

function eliminar($idempleado) {
    if (confirm("¿Desea inactivar al Empleado seleccionado?")) {
        jQuery.ajax({
            url: $.MisUrls.url.UrlGetEliminarEmpleado + "?idempleado=" + $idempleado,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data.resultado) {
                    tabladata.ajax.reload();
                } else {
                    swal("Mensaje", "No se pudo inactivar el empleado", "warning")
                }
            },
            error: function (error) {
                console.log(error)
            },
            beforeSend: function () {

            },
        });

    }
}
