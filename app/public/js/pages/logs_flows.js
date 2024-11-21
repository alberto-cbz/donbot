$(document).ready(function () {
    // tipo de filtro
    let filtro = 'todos'

    // datatable
    createTable(filtro);

    // recrear tabla al cambiar el filtro
    document.querySelectorAll("input[name='btnradio']").forEach(input => {
        input.addEventListener('change', e => {
            filtro = e.target.value;
            destroyTable();
            createTable(filtro);
        });
    });

    // mostrar modal
    // $(document).on('click', '.show-xml', function () {
    //     var data = JSON.parse(decodeURIComponent($(this).attr('data-xml')));
    //     var xml = data.xml;
    //     $('#modal').modal('show');
    //     $('#modal-title').html('Orden ' + data.orderid);
    //     $("#textArea").text(xml);
    // })
});

// HELPERS
const createTable = filtro => {
    $('#logsFlows-table').DataTable({
        ...datatablesOptions,
        processing: true,
        serverSide: true,
        ajax: {
            url: config.URL_API + '/donbot/bull/getLogsFlows',
            data: d => {
                var info = $('#logsFlows-table').DataTable().page.info();
                d.filtro = filtro;
                d.pagina = info.page + 1;
            },
            headers: ajaxHeaders().headers,
            complete: resp => { if (resp.status !== 200) logout('./') },
            failure: error => logout('./')
        },
        columns: [
            {
                data: null,
                render: data => ` <div class="accordion accordion-flush" id="accordionFlushExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="${data._id}">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${data.queueName+data._id}" aria-expanded="false" aria-controls="${data.queueName+data._id}">
                                                ${data.queueName}${data.idQueue}
                                            </button>
                                        </h2>
                                        <div id="${data.queueName+data._id}" class="accordion-collapse collapse" aria-labelledby="${data._id}" data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">
                                                <p>Id: ${data.idQueue} </p>
                                                <p>Nombre: ${data.queueName} </p>
                                                <p>Reintento: ${data.attempts} </p>
                                                <p>Fecha de creación: ${data.createDate} </p>
                                                <p>Fecha de actualización: ${data.updateDate} </p>
                                                <p>Progreso: ${data.progress} </p>
                                                <p>Objeto: ${data.object} </p>
                                                <p>Error: ${data.error} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
            }
        ]
    });
}
const destroyTable = () => $('#logsFlows-table').DataTable().destroy();