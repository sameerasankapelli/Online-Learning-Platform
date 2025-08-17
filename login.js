document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".auth-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
      alert("No account found with this email. Please sign up first.");
      window.location.href = "signup.html";
      return;
    }

    const userData = JSON.parse(storedUser);

    if (userData.password === password) {
      // alert(`Welcome back, ${userData.name}!`);
      auth.login(userData);
      // alert("logined successfuly");
      window.location.href = "dashboard.html";
    } else {
      alert("Incorrect password. Please try again.");
    }
  });
});
