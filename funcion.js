$(document).ready(() => {
    $(document).on('click', '.btn-text', (e) => {
        let valor = $(e.target).text();
        let operacion = $('#operacion').val() + valor;
        $('#operacion').val(operacion)
    })
    $('#delete').click(() => {
        $('#operacion').val('')
    })
    $('#result').click(() => {
        let operacion = $('#operacion').val();
        let json;
        if ($('.resultados').children().length > 0) {
            $('.resultados').children().remove();
        }
        $('#operacion').val('')
        if (operacion !== "") {

            json = jsonCreator(operacion);
            $('.resultados').append('<p class="m-2 d-flex justify-content-center">' + json + '</p><button class="btn btn-dark" id="copy">$Copiar</button>')
        }
    })
    $(document).on('click', '#copy', (e) => {
        var copyText = $('.resultados p').text();
        navigator.clipboard.writeText(copyText);
        alert('Texto copiado en el portapapeles')
    })
})
function jsonCreator(operacion) {
    let json = '{ "operacion":';
    json += '[';
    for (let i = 0; i < operacion.length; i++) {
        json += '{'
        json += '"dato":"' + operacion[i] + '",';
        if (isNaN(operacion[i])) {
            json += '"tipo":"operando"';
        } else {
            json += '"tipo":"numerico"';
        }
        if (i < operacion.length - 1) {
            json += '},'
        } else {
            json += '}'
        }
    }
    json += ']'
    json += '}'
    return json
}