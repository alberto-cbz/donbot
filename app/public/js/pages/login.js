
const main=async()=> {
    
    document
    .getElementById("btnLogin")
    .addEventListener('click',  e => {
        e.preventDefault();
        let mail = document.getElementById("email").value;
        let pass = document.getElementById("password").value;

        if(!mail || !pass){
            return alert("Hay campos vacios");
        }
        
        authLogin(mail,pass);
        
        
    });

};

const apiLogin = async (mail, pass) => {

    let json = {
        mail: mail,
        password: pass
    };

    const res = await axios.post(config.URL_API + "/auth/login",json)
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

const authLogin = async (mail, pass) => {

    let res_login = await apiLogin(mail,pass);
    if(res_login.status != 200){
        return alert("Login incorrecto");
    }

    let token = res_login.data.access_token;
    localStorage.setItem("token", token);
    window.location.href = "/donbot/admin/home";

};

window.addEventListener('load', main);