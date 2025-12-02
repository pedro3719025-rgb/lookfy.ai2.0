const products = [
    { id: 1, name: 'Camiseta Geométrica', description: 'Estampa exclusiva com padrão geométrico', price: 89.90, image: 'https://imgur.com/kfNmqhc.png', category: 'shirt' },
    { id: 2, name: 'Moletom Social', description: 'Design minimalista com elementos tech', price: 159.90, image: 'https://imgur.com/AgBBpg8.png', category: 'hoodie' },
    { id: 3, name: 'Calça Moleton', description: 'Arte abstrata em tons de azul', price: 89.90, image: 'https://i.imgur.com/33uqAe4.png', category: 'shirt' },
    { id: 4, name: 'Moletom Digital Art', description: 'Estampa digital exclusiva', price: 159.90, image: 'https://i.imgur.com/5r1PyPm.png', category: 'hoodie' },
    { id: 5, name: 'Boné Masculino', description: 'Linhas minimalistas modernas', price: 89.90, image: 'https://i.imgur.com/5nqo122.png', category: 'shirt' },
     { id: 5, name: 'Camiseta Polo LOOKFY', description: 'Linhas minimalistas modernas', price: 89.90, image: 'https://imgur.com/PoqwXcG.png', category: 'shirt' },
];

const aiGeneratedPrints = [
    { src: 'https://imgur.com/0rOqSx5.png', keywords: ['panda', 'fofo' ] },
    { src: 'https://imgur.com/v51auAW.png', keywords: ['lobo', 'wolf', 'galaxia'] },
    { src: 'https://imgur.com/BAqTxn4.png', keywords: ['tucano', 'moderno', 'coloridos', 'vibrante'] },
    { src: 'https://imgur.com/mQHyq58.png', keywords: ['flores', 'cultura', 'abstrato',] },
    { src: 'https://imgur.com/fK4spTW.png', keywords: ['bicicleta', 'jogador', 'esporte'] },
    { src: 'https://imgur.com/DiiFfpm.png', keywords: ['futebol', 'jogador', 'esporte'] },
    { src: 'https://imgur.com/rhzZ8VS.png', keywords: ['flamengo',] },
    { src: 'https://imgur.com/undefined.png', keywords: ['mago', 'celestial'] },
]

let cart = [];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    closeProductModal();
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && cartSidebar.classList.contains('open')) {
        toggleCart();
    }
    
    window.scrollTo(0, 0); 
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function validateQuantity(input) {
    if (input.value < 1) input.value = 1;
}

function sendMessage(event) {
    event.preventDefault();
    alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
    document.getElementById('contactForm').reset();
}


function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        closeProductModal(); 
        
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
        document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : 'auto';
    } else {
        console.error("IDs da sidebar do carrinho não encontrados!");
    }
}

function removeCartItemByUniqueId(uniqueId) {
    cart = cart.filter(item => item.uniqueId !== uniqueId);
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalPriceElement = document.getElementById('cart-total-price');

    if (!cartItemsContainer || !cartCountElement || !cartTotalPriceElement) return;

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Seu carrinho está vazio.</p>';
    } else {
        cart.forEach(item => {
            const totalPriceItem = (item.price * item.quantity).toFixed(2).replace('.', ',');
            const itemHTML = `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="item-options">
                            ${item.size ? `Tamanho: ${item.size}` : ''} 
                            ${item.size && item.color ? ' | ' : ''} 
                            ${item.color ? `Cor: ${item.color}` : ''}
                        </p>
                        <p>Qtd: ${item.quantity}</p>
                    </div>
                    <div class="cart-item-price">R$ ${totalPriceItem}</div>
                    <button class="remove-btn" onclick="removeCartItemByUniqueId('${item.uniqueId}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
        });
    }
    
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalPriceElement.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
}


function closeProductModal() {
    document.getElementById('product-modal-overlay').classList.remove('open');
    document.body.style.overflow = 'auto'; 
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && cartSidebar.classList.contains('open')) {
        toggleCart();
    }

    const modalContent = document.getElementById('modal-content-container');
    const modalOverlay = document.getElementById('product-modal-overlay');

    const sizes = ['P', 'M', 'G', 'GG'];
    const colors = [{name: 'Preto', hex: '#000000'}, {name: 'Branco', hex: '#FFFFFF'}, {name: 'Azul', hex: '#3b82f6'}, {name: 'Vermelho', hex: '#E53E3E'}];
    
    modalContent.innerHTML = `
        <div class="modal-grid">
            <div class="modal-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-details">
                <h2>${product.name}</h2>
                <p class="modal-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <p class="modal-description">${product.description}</p>

                <div class="option-group">
                    <h4>Tamanho:</h4>
                    <div class="options-list size-options">
                        ${sizes.map(size => `<button class="option-btn" data-option="size" data-value="${size}">${size}</button>`).join('')}
                    </div>
                    <input type="hidden" id="selected-size" required>
                </div>

                <div class="option-group">
                    <h4>Cor:</h4>
                    <div class="options-list color-options">
                        ${colors.map(color => `
                            <button 
                                class="color-option-btn" 
                                style="background-color: ${color.hex};"
                                data-option="color" 
                                data-value="${color.name}" 
                                title="${color.name}">
                            </button>
                        `).join('')}
                    </div>
                    <input type="hidden" id="selected-color" required>
                </div>

                <div class="quantity-control">
                    <h4>Quantidade:</h4>
                    <input type="number" id="item-quantity" value="1" min="1" max="99" onchange="validateQuantity(this)">
                </div>
                
                <button class="btn btn-primary add-to-cart-modal-btn" onclick="addToCartFromModal(${product.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; 
    setupOptionSelection();
}

function addToCartFromModal(productId) {
    const sizeInput = document.getElementById('selected-size');
    const colorInput = document.getElementById('selected-color');
    const quantityInput = document.getElementById('item-quantity');

    const size = sizeInput.value;
    const color = colorInput.value;
    const quantity = parseInt(quantityInput.value);

    if (!size || !color || quantity < 1 || isNaN(quantity)) {
        alert("Por favor, selecione as opções e a quantidade corretamente.");
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const uniqueCartId = `${productId}-${size.replace(/\s/g, '-')}-${color.replace(/\s/g, '-')}`;
    const cartItem = cart.find(item => item.uniqueId === uniqueCartId);

    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ 
            ...product, 
            uniqueId: uniqueCartId,
            size: size,
            color: color,
            quantity: quantity 
        });
    }

    updateCart();
    closeProductModal();
    toggleCart(); 
}

function setupOptionSelection() {
    document.querySelectorAll('.options-list button').forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.currentTarget;
            const optionType = btn.getAttribute('data-option');
            const value = btn.getAttribute('data-value');

            document.querySelectorAll(`.options-list [data-option="${optionType}"]`).forEach(b => {
                b.classList.remove('selected');
            });

            btn.classList.add('selected');

            document.getElementById(`selected-${optionType}`).value = value;
        });
    });
}



/**
 * @param {Array} productList
 */
function renderProducts(productList) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = ''; 

    if (productList.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #aaa;">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    productList.forEach(product => {
        const productHTML = `
            <div class="product-card" onclick="openProductModal(${product.id})">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                    <button class="btn btn-secondary add-to-cart-quick">Ver Detalhes</button>
                </div>
            </div>
        `;
        grid.innerHTML += productHTML;
    });
}


function loadProducts() {
    renderProducts(products);
}

/**
 * @param {Event} event 
 * @param {string} category 
 */
function filterProducts(event, category) {
   
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    
    let filteredProducts;
    if (category === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }

  
    renderProducts(filteredProducts);
}



function generatePrint(event) {
    event.preventDefault();
    const promptInput = document.getElementById('promptInput');
    const userPrompt = promptInput.value.trim().toLowerCase();

    if (!userPrompt) return;

    const generateBtn = document.getElementById('generateBtn');
    const generateBtnText = document.getElementById('generateBtnText');
    const previewBox = document.getElementById('previewBox');
    const form = document.getElementById('createForm');
    const previewImage = document.getElementById('previewImage');
    
    sessionStorage.setItem('lastGeneratedPrompt', userPrompt);

    generateBtnText.innerHTML = '<span class="loading"></span> Gerando estampa...';
    generateBtn.disabled = true;


    let foundPrint = null;
    let maxMatches = 0;

    
    const stopWords = ['um', 'uma', 'o', 'a', 'os', 'as', 'de', 'do', 'da', 'dos', 'das', 'com', 'e', 'para', 'em', 'no', 'na', 'nos', 'nas', 'que', 'se', 'por', 'pra'];
    const promptWords = userPrompt.split(' ').filter(word => !stopWords.includes(word));

    if (promptWords.length > 0) {
        aiGeneratedPrints.forEach(print => {
            let currentMatches = 0;
            promptWords.forEach(pWord => {
            
                if (print.keywords.some(kWord => kWord.includes(pWord))) {
                    currentMatches++;
                }
            });

            if (currentMatches > maxMatches) {
                maxMatches = currentMatches;
                foundPrint = print;
            }
        });
    }

   
    if (!foundPrint) {
        
        foundPrint = aiGeneratedPrints[Math.floor(Math.random() * aiGeneratedPrints.length)]; 
        if (!foundPrint) { 
             foundPrint = { src: 'https://via.placeholder.com/400x400?text=Estampa+Nao+Encontrada', keywords: ['placeholder'] };
        }
    }
    


    setTimeout(() => {
        const generatedProductId = 999; 
        const generatedProductName = `Estampa IA: ${userPrompt.substring(0, 30)}...`;
        
        previewImage.src = foundPrint.src; 
        
        const addToCartButton = previewBox.querySelector('.btn-group .btn-primary');
        
        addToCartButton.textContent = 'Adicionar ao Carrinho';
        
        
        addToCartButton.onclick = () => openCreationModal(generatedProductId, generatedProductName, previewImage.src);

        form.style.display = 'none';
        previewBox.style.display = 'block';
        generateBtnText.innerHTML = '✨ Gerar Estampa';
        generateBtn.disabled = false;
    }, 2500); 
}

function resetForm() {
    const form = document.getElementById('createForm');
    const previewBox = document.getElementById('previewBox');
    const promptInput = document.getElementById('promptInput');

    if (!form || !previewBox || !promptInput) return;

    form.style.display = 'block';
    previewBox.style.display = 'none';
    promptInput.value = '';
    sessionStorage.removeItem('lastGeneratedPrompt');
}



function openCreationModal(id, name, image) {
    const product = {
        id: id,
        name: name,
        description: 'Estampa única gerada por IA a partir do seu prompt.',
        price: 119.90, 
        image: image
    };

    const sizes = ['P', 'M', 'G', 'GG'];
    const colors = [{name: 'Preto', hex: '#000000'}, {name: 'Branco', hex: '#FFFFFF'}, {name: 'Azul', hex: '#3b82f6'}, {name: 'Vermelho', hex: '#E53E3E'}];
    
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && cartSidebar.classList.contains('open')) {
        toggleCart();
    }

    const modalContent = document.getElementById('modal-content-container');
    const modalOverlay = document.getElementById('product-modal-overlay');

    modalContent.innerHTML = `
        <div class="modal-grid">
            <div class="modal-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-details">
                <h2>${product.name}</h2>
                <p class="modal-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <p class="modal-description">${product.description}</p>
                
                <div class="option-group">
                    <h4>Tamanho:</h4>
                    <div class="options-list size-options">
                        ${sizes.map(size => `<button class="option-btn" data-option="size" data-value="${size}">${size}</button>`).join('')}
                    </div>
                    <input type="hidden" id="selected-size" required>
                </div>

                <div class="option-group">
                    <h4>Cor do Produto:</h4>
                    <div class="options-list color-options">
                        ${colors.map(color => `
                            <button 
                                class="color-option-btn" 
                                style="background-color: ${color.hex};"
                                data-option="color" 
                                data-value="${color.name}" 
                                title="${color.name}">
                            </button>
                        `).join('')}
                    </div>
                    <input type="hidden" id="selected-color" required>
                </div>

                <div class="quantity-control">
                    <h4>Quantidade:</h4>
                    <input type="number" id="item-quantity" value="1" min="1" max="99" onchange="validateQuantity(this)">
                </div>
                
                <button class="btn btn-primary add-to-cart-modal-btn" onclick="addToCartFromCreationModal(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; 
    setupOptionSelection();
}

function addToCartFromCreationModal(id, name, price, image) {
    const sizeInput = document.getElementById('selected-size');
    const colorInput = document.getElementById('selected-color');
    const quantityInput = document.getElementById('item-quantity');

    const size = sizeInput.value;
    const color = colorInput.value;
    const quantity = parseInt(quantityInput.value);

    if (!size || !color || quantity < 1 || isNaN(quantity)) {
        alert("Por favor, selecione as opções e a quantidade corretamente.");
        return;
    }

    const uniqueCartId = `${id}-${size.replace(/\s/g, '-')}-${color.replace(/\s/g, '-')}-${Date.now()}`; 
    
    cart.push({ 
        id: id,
        name: name, 
        price: price,
        image: image,
        uniqueId: uniqueCartId,
        size: size,
        color: color,
        quantity: quantity 
    });

    updateCart();
    closeProductModal();
    toggleCart(); 
}



window.onload = () => {
    loadProducts(); 
    showPage('home'); 
    
    const openCartBtn = document.getElementById('open-cart-btn');
    if (openCartBtn) {
        openCartBtn.addEventListener('click', toggleCart);
    }

    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', toggleCart);
    }

    const productModalOverlay = document.getElementById('product-modal-overlay');
    if (productModalOverlay) {
        productModalOverlay.addEventListener('click', (e) => {
            if (e.target.id === 'product-modal-overlay') {
                closeProductModal();
            }
        });
    }
};