document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        alert("Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        window.location.href = "login.html"; //Redirige a login
    } else {
        alert(data.message); //Muestra mensaje de error
    }
});