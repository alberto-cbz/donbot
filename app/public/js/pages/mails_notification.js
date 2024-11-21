$(document).ready(function () {

    // datatable
    createTable();
    let id;

    // mostrar modal
    $(document).on('click', '.show-user', function () {
        $('#userModal').modal('show');
        document.getElementById("mail_name").value = $(this).attr('data-user-nombre');
        document.getElementById("mail_lastname").value = $(this).attr('data-user-apellido');
        document.getElementById("mail_mail").value = $(this).attr('data-user-correo');
        $(this).attr('data-user-activo') ? document.getElementById("mail_active").checked : ""
        id = $(this).attr('data-user-id');
    })

    $(document).on('click', '#btn-new-user', function () {
        $('#userModal').modal('show');
        document.getElementById("mail_name").value = "";
        document.getElementById("mail_lastname").value = "";
        document.getElementById("mail_mail").value = "";
        document.getElementById("mail_active").checked = false;
        id = "";
    })
    $(document).on('click', '#save_user', function () {
        saveUser(document.getElementById("mail_name").value,
            document.getElementById("mail_lastname").value,
            document.getElementById("mail_mail").value,
            document.getElementById("mail_active").checked,
            id
        );
        destroyTable();
        createTable();
    })

});



// HELPERS
const createTable = () => {
    $('#users-table').DataTable({
        ...datatablesOptions,
        processing: true,
        serverSide: true,
        ajax: {
            url: config.URL_API + '/donbot/notify/getUsers',
            headers: ajaxHeaders().headers,
            complete: resp => { if (resp.status !== 200) logout('./') },
            failure: error => logout('./')
        },
        columns: [
            { data: 'firstName' },
            { data: 'lastName' },
            { data: 'mail' },
            { data: 'active' },
            {
                data: null,
                render: data => `<button
                        class="btn btn-sm btn-outline-light btn-action text-white see-detail show-user"
                        data-user-nombre=${data.firstName} 
                        data-user-apellido=${data.lastName}
                        data-user-correo=${data.mail}
                        data-user-activo=${data.active}
                        data-user-id=${data._id}>
                        <i class="icon-pencil"></i>
                    </button>`
            }
        ]
    });
}

const saveUser = async (name, last_name, mail, active, id) => {
    let token = localStorage.getItem('token');

    let json = {
        mail: mail,
        firstName: name,
        lastName: last_name,
        active: active,
        _id: id
    };

    const res = await axios.post(config.URL_API + "/donbot/notify/users/registry", json,
        {
            headers: {
                "x-donbot-access-token": token
            }
        })
        .then(function (response) {
            let re_response = {
                status: response.status,
                data: response.data
            }
            return re_response;
        })
        .catch(function (error) {
            let res_error = {
                status: error.response.status,
                data: error.response.data.errors === undefined ? error.response.data.message : error.response.data.errors[0].msg +" : " + error.response.data.errors[0].param
            }
            return res_error;
        });
    if (res.status != 200) {
        return alert("Error al actualizar: " + res.data + "\n Valida los datos e intenta nuevamente");
    }

    $('#userModal').modal('hide');

    return alert("Actualizacion completa");
}

const destroyTable = () => $('#users-table').DataTable().destroy();