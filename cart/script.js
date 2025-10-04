// CRUD do carrinho

// GET: Listar itens do carrinho
function listarItens() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

// POST: Adicionar item ao carrinho
function adicionarItem(item) {
  carrinho.push(item);
  salvarCarrinho();
}

// PUT: Atualizar quantidade de um item
function atualizarItem(index, novaQtd) {
  carrinho[index].quantidade = novaQtd;
  salvarCarrinho();
}

// DELETE: Remover item do carrinho
function removerItem(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
}

// Salvar carrinho no localStorage
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Atualiza a interface do carrinho
function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let subtotal = 0;

  carrinho.forEach((item, index) => {
    const itemSubtotal = item.preco * item.quantidade;
    subtotal += itemSubtotal;

    // Card do produto
    const card = document.createElement("div");
    card.className = "item-carrinho";
    card.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" style="width:80px; height:80px; object-fit:cover; border-radius:8px; margin-right:10px;">
      <div style="display:inline-block; vertical-align:top;">
        <strong>${item.nome}</strong><br>
        Preço: R$ ${item.preco.toFixed(2)}<br>
        Quantidade: <input type="number" min="1" value="${item.quantidade}" class="quantidade-input" data-index="${index}" style="width:50px;">
        <br>Subtotal: R$ ${itemSubtotal.toFixed(2)}
        <br><button class="remover-btn" data-index="${index}">Remover</button>
      </div>
    `;
    card.style.display = "flex";
    card.style.alignItems = "center";
    card.style.marginBottom = "16px";
    listaCarrinho.appendChild(card);
  });

  // Calcula valores
  const imposto = subtotal * 0.08;
  const frete = subtotal > 0 ? 15 : 0;
  const total = subtotal + imposto + frete;

  // Atualiza os valores na tela
  subtotalEl.textContent = subtotal.toFixed(2);
  impostoEl.textContent = imposto.toFixed(2);
  freteEl.textContent = frete.toFixed(2);
  totalEl.textContent = total.toFixed(2);

  salvarCarrinho();
}

// Inicializa carrinho
let carrinho = listarItens();
const listaCarrinho = document.getElementById("lista-carrinho");
const subtotalEl = document.getElementById("subtotal");
const impostoEl = document.getElementById("imposto");
const freteEl = document.getElementById("frete");
const totalEl = document.getElementById("total");

// Eventos de interatividade

// DELETE: Remover item do carrinho
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remover-btn")) {
    const index = e.target.getAttribute("data-index");
    removerItem(index);
    atualizarCarrinho();
  }
});

// PUT: Atualizar quantidade de item
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("quantidade-input")) {
    const index = e.target.getAttribute("data-index");
    const novaQtd = parseInt(e.target.value);
    atualizarItem(index, novaQtd);
    atualizarCarrinho();
  }
});

// GET: Atualiza carrinho ao carregar página
atualizarCarrinho();

// Finalizar compra
const formCheckout = document.getElementById("form-checkout");
formCheckout.addEventListener("submit", function(e) {
  e.preventDefault();
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const endereco = document.getElementById("endereco").value;
  const pagamento = document.getElementById("pagamento").value;

  let meioPagamento = "";
  if (pagamento === "pix") meioPagamento = "Pix";
  else if (pagamento === "cartao") meioPagamento = "Cartão de Crédito";
  else if (pagamento === "boleto") meioPagamento = "Boleto Bancário";

  alert(`🎉 Compra finalizada com sucesso!\nObrigado por comprar na SerraCat!\n\nNome: ${nome}\nE-mail: ${email}\nEndereço: ${endereco}\nPagamento: ${meioPagamento}`);
  localStorage.removeItem("carrinho");
  carrinho = [];
  atualizarCarrinho();
  formCheckout.reset();
});

// Atualiza quando abrir a página
atualizarCarrinho();
