axios.defaults.baseURL = "https://growdev-api-back-tanara.herokuapp.com";
//axios.defaults.baseURL = "http://localhost:8080";

async function login(event) {
  event.preventDefault();
  const nome = document.getElementById("userName").value;
  const senha = document.getElementById("password").value;
  const body = {
    nome,
    senha,
  };

  try {
    const { status, data } = await axios.post("/login", body);
    const sucesso = 200;
    if (status === sucesso) {
      localStorage.setItem("dadosUsuario", JSON.stringify(data));
      window.location.href = "../meusRecados.html";
    }
  } catch (error) {
    const senhaIncorreta = new bootstrap.Modal(
      document.getElementById("senhaIncorreta")
    );
    senhaIncorreta.show();
  }
}
