axios.defaults.baseURL = "https://growdev-api-back-tanara.herokuapp.com";
// axios.defaults.baseURL = "http://localhost:8080";

async function salvaMensagem(descricao, detalhamento) {
  const usuario = JSON.parse(localStorage.getItem("dadosUsuario"));
  const idUsuario = usuario.id;

  if (!usuario) {
    location.href = "/index.html";
  }

  const recado = {
    descricao,
    detalhamento,
  };

  await axios.post(`/usuario/${idUsuario}/recado`, recado);

  const descricaoVazia = document.getElementById("descricao");
  const detalhamentoVazio = document.getElementById("detalhamento");

  descricaoVazia.value = "";
  detalhamentoVazio.value = "";

  await carregarMensagens();
}

async function carregarMensagens() {
  const usuario = JSON.parse(localStorage.getItem("dadosUsuario"));
  const idUsuario = usuario.id;

  if (!usuario) {
    location.href = "/index.html";
  }

  await axios.get(`/usuario/${idUsuario}`).then((response) => {
    const table = document.querySelector("table");

    //deleta todos os itens que estao em tela
    for (let i = table.rows.length - 1; i > 0; i--) {
      table.deleteRow(i);
    }
    // cria todos os itens novos
    let numeroLinha = 1;
    for (const mensagem of response.data) {
      let novaLinha = table.insertRow(-1);
      novaLinha.innerHTML = `
      <th scope="row">${numeroLinha}</th> 
      <td id="${numeroLinha}.1">${mensagem.descricao}</td>
      <td id="${numeroLinha}.2">${mensagem.detalhamento}</td>
      <td>
        <button type="button" onclick="deletaMensagem('${idUsuario}',${mensagem.id})" class="btn btn-danger">Apagar</button>
        <button type="button" onclick="mostraModalEditar('${numeroLinha}',${mensagem.id})" class="btn btn-success">
          Editar
        </button>
      </td>
    `;
      numeroLinha = numeroLinha + 1;
    }
  });
}

async function deletaMensagem(idUsuario, idMensagem) {
  const usuario = JSON.parse(localStorage.getItem("dadosUsuario"));

  if (!usuario) {
    location.href = "/index.html";
  }

  try {
    await axios.delete(`/usuario/${idUsuario}/recados/${idMensagem}`);

    await carregarMensagens();
  } catch (error) {
    const naoEncontrado = new bootstrap.Modal(
      document.getElementById("naoEncontrado")
    );
    naoEncontrado.show();
  }
}

function mostraModalEditar(numeroLinha, idMensagem) {
  document.getElementById("novaDescricao").value = document.getElementById(
    `${numeroLinha}.1`
  ).innerText;

  document.getElementById("novoDetalhamento").value = document.getElementById(
    `${numeroLinha}.2`
  ).innerText;

  document
    .getElementById("btnSalvaEdicao")
    .setAttribute("onclick", `editaMensagem(${idMensagem})`);
  const edicao = new bootstrap.Modal(document.getElementById("editar"));
  edicao.show();
}

async function editaMensagem(idMensagem) {
  const usuario = JSON.parse(localStorage.getItem("dadosUsuario"));
  const idUsuario = usuario.id;

  if (!usuario) {
    location.href = "/index.html";
  }

  const mensagemAtualizada = {
    descricao: document.getElementById("novaDescricao").value,
    detalhamento: document.getElementById("novoDetalhamento").value,
  };

  try {
    await axios.put(
      `/usuario/${idUsuario}/recados/${idMensagem}`,
      mensagemAtualizada
    );

    await carregarMensagens();
  } catch (error) {
    const preenchaTodosCampos = new bootstrap.Modal(
      document.getElementById("naoPreenchido")
    );

    preenchaTodosCampos.show();
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  event.preventDefault();
  const btnSalvar = document.querySelector("#btnSalvar");

  btnSalvar.addEventListener("click", function (event) {
    event.preventDefault();
    salvaMensagem(
      document.querySelector("#descricao").value,
      document.querySelector("#detalhamento").value
    );
  });
});
