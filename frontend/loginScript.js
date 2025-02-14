document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        //Guarda el token en el almacenamiento local
        localStorage.setItem("token", data.token);
        alert("Inicio de sesión exitoso!");

        //Verifica si se llega a esta parte
        console.log("Redirigiendo a index.html...");

        //Redirige al usuario a la página principal
        window.location.href = "/index.html";
    } else {
        alert(data.message); //Muestra mensaje de error
    }
});