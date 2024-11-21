$(document).ready(function () {
    // tipo de filtro
    let filtro = 'todas'

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

});

// HELPERS
const createTable = filtro => {
    $('#orders-table').DataTable({
        ...datatablesOptions,
        processing: true,
        serverSide: true,
        ajax: {
            url:config.URL_API +  '/donbot/bull/getOrders',
            data: d => {
                var info = $('#orders-table').DataTable().page.info();
                d.filtro = filtro;
                d.pagina = info.page + 1;
            },
            headers: ajaxHeaders().headers,
            complete: resp => { if (resp.status !== 200) logout('./') },
            failure: error => logout('./')
        },
        columns: [
            { data: 'orderNumCli' },
            { data: 'paisVenta' },
            { data: 'partnNumb' },
            { data: 'partnNumb2' },
            { data: 'material' },
            { data: 'targetQty' },
            { data: 'salesUnit' },
            { data: 'moneda' },
            { data: 'precio' },
            { data: 'plant' },
            { data: 'gc3' },
            { data: 'obsped' },
            {
                data: null,
                render: data => !data.send ? '' : `<button
                        class="btn btn-sm btn-outline-light btn-action text-white show-xml"
                        data-xml="${encodeURIComponent(JSON.stringify(data))}">
                        <i class="icon-file-code"></i>
                    </button>`
            }
        ]
    });
}
const destroyTable = () => $('#orders-table').DataTable().destroy();