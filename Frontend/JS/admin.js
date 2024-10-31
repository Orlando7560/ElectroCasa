document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("productForm");
    const productIdInput = document.getElementById("productId");
    const productsBody = document.getElementById("productsBody");
  
    // Cargar productos al inicio
    fetch('/productos')
      .then(response => response.json())
      .then(data => displayProducts(data));
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const id = productIdInput.value;
      const url = id ? `/productos/${id}` : '/productos';
      const method = id ? 'PUT' : 'POST';
      
      const productData = {
        name: form.name.value,
        category: form.category.value,
        price: parseFloat(form.price.value),
        description: form.description.value
      };
  
      fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      }).then(() => location.reload());
    });
  
    function displayProducts(products) {
      productsBody.innerHTML = '';
      products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${product.Id_Producto}</td>
          <td>${product.Nombre}</td>
          <td>${product.Id_Categoria}</td>
          <td>${product.Precio}</td>
          <td>${product.Descripcion}</td>
          <td>
            <button onclick="editProduct(${product.Id_Producto})">Editar</button>
            <button onclick="deleteProduct(${product.Id_Producto})">Eliminar</button>
          </td>
        `;
        productsBody.appendChild(row);
      });
    }
    
    window.editProduct = function(id) {
      fetch(`/productos/${id}`)
        .then(response => response.json())
        .then(product => {
          form.name.value = product.Nombre;
          form.category.value = product.Id_Categoria;
          form.price.value = product.Precio;
          form.description.value = product.Descripcion;
          productIdInput.value = product.Id_Producto;
        });
    };
  
    window.deleteProduct = function(id) {
      fetch(`/productos/${id}`, { method: 'DELETE' })
        .then(() => location.reload());
    };
  });
  