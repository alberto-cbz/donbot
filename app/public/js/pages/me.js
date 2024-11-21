const main=async()=> {
    
    getMedata();

    document
    .getElementById("btnSaveume")
    .addEventListener('click',  e => {
        e.preventDefault();

        let name = document.getElementById("me_name").value;
        let last_name = document.getElementById("me_lastname").value;
        let mail = document.getElementById("me_mail").value;
        let pass = document.getElementById("me_pass").value;

        if(!mail || !last_name || !name){
            return alert("Hay campos vacios");
        }
        
        updateData(name, last_name, mail, pass);
        
    });

};


const apiMe = async () => {

    let token = localStorage.getItem('token');

    const res = await axios.get(config.URL_API + "/users/me",
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
                data: error.response.data
            }
            return res_error;
        });
    return res;


};


const apiUpdateMe = async (name, last_name, mail, pass) => {

    let token = localStorage.getItem('token');

    let json = {};

    if(!pass){
        json = {
            mail: mail,
            first_name: name,
            last_name: last_name
        };
    }else{
        json = {
            mail: mail,
            first_name: name,
            last_name: last_name,
            password: pass
        };
    }

    const res = await axios.put(config.URL_API + "/users/me",json,
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
                data: error.response.data
            }
            return res_error;
        });
    return res;


};


const getMedata = async () => {

    let res_me = await apiMe();
    if(res_me.status != 200){
        return logout('./');
    }

    let me_data = res_me.data;

    document.getElementById("me_name").value = me_data.first_name;
    document.getElementById("me_lastname").value = me_data.last_name;
    document.getElementById("me_mail").value = me_data.mail;

};

const updateData =  async (name, last_name, mail, pass) => {
    let res_updateme = await apiUpdateMe(name, last_name, mail, pass);
    if(res_updateme.status != 200){
        return alert("Error al actualizar");
    }

    document.getElementById("me_pass").value = "";

    return alert("Actualizacion completa");
}

window.addEventListener('load', main);