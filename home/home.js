document.addEventListener('DOMContentLoaded', () => {
  const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

  /*if (!loggedUser) {
    window.location.href = '../auth/pages/login.html';
    return; 
  }*/

  const userLinks = document.getElementById('user-links');
  if (userLinks) {
    userLinks.innerHTML = `
      <li class="nav-item">
        <a class="nav-link" href="../auth/pages/edit.html">Olá, ${loggedUser.name}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" onclick="logout()">Sair</a>
      </li>
    `;
  }
});

function logout() {
  sessionStorage.removeItem('loggedUser');
  window.location.href = '../auth/pages/login.html';
}

const botoesCarrinho = document.querySelectorAll(".card button");

botoesCarrinho.forEach((botao) => {
  botao.addEventListener("click", (e) => {
    
    const card = e.target.closest(".card");

    const nome = card.querySelector(".card-title").textContent;
    const precoTexto = card.querySelector(".card-text").textContent;
    const imagem = card.querySelector("img").src;

    
    const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));

    // Cria um objeto com as informações
    const item = { nome, preco, imagem, quantidade: 1 };

    // Busca o carrinho atual (se houver)
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Verifica se o produto já está no carrinho
    const itemExistente = carrinho.find((p) => p.nome === nome);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push(item);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert(`${nome} foi adicionado ao carrinho! 🛒`);
  });
});