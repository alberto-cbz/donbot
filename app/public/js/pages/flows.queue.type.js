$(document).ready(function () {
    let queue=$('#queue-input').val();
    let type=$('#type-input').val();

    // datatable
    createTable(queue, type);

    // ir a pagina detalle
    $(document).on('click', '.see-detail', function() {
        let job=$(this).attr('data-job');
        window.location=`${type}/${job}`
    });
});

// HELPERS
const createTable=(queue, type)=> {
    $('#jobs-table').DataTable({
        ...datatablesOptions,
        processing:true,
        serverSide:true,
        ajax:{
            url:config.URL_API + '/donbot/bull/getJobs/'+queue+'/'+type,
            data:d=> {
                var info=$('#jobs-table').DataTable().page.info();
                d.pagina=info.page+1;
            },
            headers:ajaxHeaders().headers,
            complete:resp=> {if(resp.status!==200) logout('../../')},
            failure:error=> logout('../../')
        },
        columns:[
            {data:'id'},
            {data:'attemptsMade'},
            {data:'progress'},
            {
                data:null,
                render:data=> `<button
                        class="btn btn-sm btn-outline-light btn-action text-white see-detail"
                        data-job=${data.id}>
                        <i class="icon-eye"></i>
                    </button>`
            }
        ]
    });
}