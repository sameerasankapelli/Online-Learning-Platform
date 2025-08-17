document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector(".auth-form");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      alert("An account with this email already exists. Please login instead.");
      window.location.href = "login.html";
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password
    };

    localStorage.setItem(email, JSON.stringify(userData));
    alert("Account created successfully! Redirecting to login...");
    window.location.href = "login.html";
  });
});
