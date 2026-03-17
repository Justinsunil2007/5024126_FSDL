// AUTHENTICATION JS (COMMON FILE)

// LOGIN LOGIC
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (email === "" || password === "") {
      alert("❌ All fields are required!");
      return;
    }

    // Demo logic (replace with backend later)
    alert("✨ Login Successful! Welcome back, Senpai ✨");
    loginForm.reset();
  });
}

// SIGNUP LOGIC
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      alert("❌ Please fill all fields!");
      return;
    }

    if (password.length < 6) {
      alert("⚠️ Password must be at least 6 characters!");
      return;
    }

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    // Demo logic
    alert("🎉 Account Created Successfully! Welcome to Anime World 🎉");
    signupForm.reset();
  });
}
