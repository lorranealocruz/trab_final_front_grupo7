
// Função de login
function login(event) {
  event.preventDefault(); // evita recarregar a página

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Verifica se o usuário existe
  if (email === userFake.email && password === userFake.password) {
    // Salva no localStorage
    localStorage.setItem("user", JSON.stringify({ email }));

    alert("Login realizado com sucesso! 🐾");
    window.location.href = "../home/index.html";
  } else {
    alert("❌ E-mail ou senha inválidos. Tente novamente.");
  }
}

// Função para redirecionar ao cadastro
function redirectRegister() {
  window.location.href = "../register/index.html";
}
