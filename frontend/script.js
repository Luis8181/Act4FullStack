const productForm = document.getElementById("productForm");
const productList = document.querySelector(".product-list");

//Obtiene todos los productos
async function getProducts() {
    try {
        const res = await fetch("/api/products");
        const products = await res.json();
        renderProductList(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

//Renderiza la lista de productos
function renderProductList(products) {
    productList.innerHTML = "";  //Limpia la lista antes de renderizarla
    products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");

        productItem.innerHTML = `
            <span>${product.name} - $${product.price}</span>
            <button class="update-button" onclick="updateProduct('${product._id}')">Actualizar</button>
            <button onclick="deleteProduct('${product._id}')">Eliminar</button>
            <div class="update-form" id="update-form-${product._id}" style="display:none;">
                <input type="number" id="new-price-${product._id}" placeholder="Nuevo precio">
                <button onclick="submitUpdate('${product._id}')">Confirmar</button>
            </div>
        `;
        productList.appendChild(productItem);
    });
}

//Actualizar precio del producto
function updateProduct(productId) {
    const updateForm = document.getElementById(`update-form-${productId}`);
    updateForm.style.display = 'block'; //Muestra formulario de actualización
}

//Enviar actualización del precio
async function submitUpdate(productId) {
    const newPrice = document.getElementById(`new-price-${productId}`).value;

    if (!newPrice) return alert("Por favor, ingresa un nuevo precio");

    try {
        const res = await fetch(`/api/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ price: newPrice }),
        });
        const updatedProduct = await res.json();
        alert("Producto actualizado");
        getProducts();
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
    }
}

//Eliminar producto
async function deleteProduct(productId) {
    const confirmDelete = confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (!confirmDelete) return;

    try {
        await fetch(`/api/products/${productId}`, {
            method: "DELETE",
        });
        alert("Producto eliminado");
        getProducts(); 
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
}

//Crear nuevo producto
async function createProduct(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    if (!name || !price) return alert("Por favor, ingresa todos los campos");

    try {
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price }),
        });
        const newProduct = await res.json();
        alert("Producto creado");
        getProducts();  
    } catch (error) {
        console.error("Error al crear el producto:", error);
    }
}

//Manejar el evento del formulario
productForm.addEventListener("submit", createProduct);

//Inicializa la lista de productos al cargar la página
getProducts();