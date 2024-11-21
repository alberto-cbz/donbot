$(document).ready(function () {
    // tipo de filtro
    let busqueda=''

    // datatable
    createTable(busqueda);

    // recrear tabla al actualizar la busqueda
    $('#search').keyup(_.debounce(()=> {
        let busqueda=$('#search').val();
        destroyTable();
        createTable(busqueda);
    }, 500));

    // mostrar modal
    $(document).on('click', '.show-xml', function() {
        var data=JSON.parse(decodeURIComponent($(this).attr('data-xml')));
        $('#modal').modal('show');
        $('#modal-title').html(data.reqid)
        $("#modal-body").html(template(data));
    })
});

// HELPERS
const createTable=busqueda=> {
    $('#logs-table').DataTable({
        ...datatablesOptions,
        processing:true,
        serverSide:true,
        ajax:{
            url:config.URL_API + '/donbot/bull/getLogs',
            data:d=> {
                var info=$('#logs-table').DataTable().page.info();
                d.busqueda=busqueda;
                d.pagina=info.page+1;
            },
            headers:ajaxHeaders().headers,
            complete:resp=> {if(resp.status!==200) logout('./')},
            failure:error=> logout('./')
        },
        columns:[
            {data:'reqid'},
            {data:'ipclient'},
            {data:'path'},
            {data:'Start'},
            {data:'status'},
            {
                data:null,
                render:data=> `<button
                        class="btn btn-sm btn-outline-light btn-action text-white show-xml"
                        data-xml="${encodeURIComponent(JSON.stringify(data))}">
                        <i class="icon-file-code"></i>
                    </button>`
            }
        ]
    });
}
const destroyTable=()=> $('#logs-table').DataTable().destroy();
const template=_.template(`
    <div class="row">
        <div class="col">
            <label for="header-text-area" class="form-label">Header</label>
            <textarea class="form-control" id="header-text-area" rows="5" disabled>
                <%= header.trim() %>
            </textarea>
        </div>
    </div>
    
    <div class="row">
        <div class="col">
            <label for="input-text-area" class="form-label">Input</label>
            <textarea class="form-control" id="input-text-area" rows="5" disabled>
                <%= input.trim() %>
            </textarea>
        </div>
    </div>
`);