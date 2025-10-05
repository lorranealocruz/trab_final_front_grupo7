const base_url = "https://68e1e3048943bf6bb3c5202f.mockapi.io/api/v1/user";

async function register(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  if (!name || !email || !password || !confirmPassword) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (password !== confirmPassword) {
    alert("As senhas não coincidem.");
    return;
  }

  try {
    const response = await fetch(`${base_url}?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const users = await response.json();

    if (users.length > 0) {
      alert("Este e-mail já está cadastrado.");
      return;
    }

    const userData = { name, email, password };
    const postResponse = await fetch(base_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    if (postResponse.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "./login.html";
    } else {
      alert("Erro ao realizar o cadastro. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro no registro:", error);
    alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
  }
}

async function login(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert("Por favor, preencha e-mail e senha.");
    return;
  }

  try {
    const response = await fetch(`${base_url}?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const users = await response.json();

    if (users.length === 0) {
      alert("E-mail não encontrado.");
      return;
    }

    const user = users[0];
    if (user.password !== password) {
      alert("Senha incorreta.");
      return;
    }

    sessionStorage.setItem('loggedUser', JSON.stringify(user));
    alert("Login bem-sucedido!");
    window.location.href = "../../home/index.html";

  } catch (error) {
    console.error("Erro no login:", error);
    alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
  }
}

function logout() {
  sessionStorage.removeItem('loggedUser');
  alert("Você foi desconectado.");
  window.location.href = "./login.html";
}

function loadUserDataForEdit() {
  const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

  if (!loggedUser) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "./login.html";
    return;
  }

  document.getElementById('name').value = loggedUser.name;
  document.getElementById('email').value = loggedUser.email;
}

async function updateUser(event) {
  event.preventDefault();

  const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
  if (!loggedUser) {
    alert("Sessão expirada. Faça login novamente.");
    window.location.href = "./login.html";
    return;
  }

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const currentPassword = document.getElementById('currentPassword').value.trim();
  const newPassword = document.getElementById('newPassword').value.trim();

  const updatedData = { name, email };

  if (newPassword) {
    if (!currentPassword) {
      alert("Para definir uma nova senha, você deve fornecer sua senha atual.");
      return;
    }
    if (currentPassword !== loggedUser.password) {
      alert("A senha atual está incorreta.");
      return;
    }
    updatedData.password = newPassword;
  }

  try {
    const response = await fetch(`${base_url}/${loggedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });

    if (response.ok) {
      const updatedUser = await response.json();
      sessionStorage.setItem('loggedUser', JSON.stringify(updatedUser));
      alert("Perfil atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar o perfil. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('edit.html')) {
    loadUserDataForEdit();
  }
});
