axios.defaults.baseURL = "https://growdev-api-back-tanara.herokuapp.com";
//axios.defaults.baseURL = "http://localhost:8080";

async function criarUsuario(nome, senha) {
  const usuario = {
    nome: nome,
    senha: senha,
  };

  await axios
    .post("/usuario", usuario)
    .then((response) => {
      window.location.href = "../index.html";
    })
    .catch((error) => {
      const jaCadastrado = new bootstrap.Modal(
        document.getElementById("jaCadas")
      );
      const botaoModal = document.getElementById("irParaLogin");

      jaCadastrado.show();

      botaoModal.addEventListener("click", function (event) {
        window.location.href = "../index.html";
      });
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
  event.preventDefault();
  const usuario = document.getElementById("newUserName");
  const senha = document.getElementById("newPassword");
  const repSenha = document.getElementById("repeatPassword");
  const botaoCriar = document.querySelector("#criarUsuario");

  botaoCriar.addEventListener("click", function (event) {
    event.preventDefault();
    if (senha.value === repSenha.value) {
      criarUsuario(usuario.value, senha.value);
    } else {
      const senhasDiferentes = new bootstrap.Modal(
        document.getElementById("senhasDiferentes")
      );
      senhasDiferentes.show();
    }
  });
});
