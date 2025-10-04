// Adiciona produtos ao carrinho via localStorage
document.querySelectorAll('.produto-card button').forEach((botao) => {
  botao.addEventListener('click', (e) => {
    const card = e.target.closest('.produto-card');
    const nome = card.querySelector('.card-title').textContent;
    const precoTexto = card.querySelector('.card-text').textContent;
    const imagem = card.querySelector('img').src;
    const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));
    const item = { nome, preco, imagem, quantidade: 1 };
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itemExistente = carrinho.find((p) => p.nome === nome);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push(item);
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${nome} foi adicionado ao carrinho! 🛒`);
  });
});