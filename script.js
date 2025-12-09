const CART_KEY = 'myshop_cart_v1';
const cart = { items: [] };

function saveCart(){
    try{ localStorage.setItem(CART_KEY, JSON.stringify(cart.items)); }
    catch(e){ console.warn('Could not save cart', e); }
}

function loadCart(){
    try{
        const raw = localStorage.getItem(CART_KEY);
        if(raw){ cart.items = JSON.parse(raw); }
    }catch(e){ console.warn('Could not load cart', e); }
}

function scrollToProducts() {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function showToast(message){
    const t = document.getElementById('toast');
    t.textContent = message;
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'),2000);
}

function updateCartCount(){
    const el = document.getElementById('cart-count');
    const total = cart.items.reduce((s,i)=>s+i.qty,0);
    el.textContent = total;
}

function openCart(){
    const drawer = document.getElementById('cart-drawer');
    drawer.setAttribute('aria-hidden','false');
}

function closeCart(){
    const drawer = document.getElementById('cart-drawer');
    drawer.setAttribute('aria-hidden','true');
}

function renderCart(){
    const el = document.getElementById('cart-items');
    el.innerHTML = '';
    if(!cart.items || cart.items.length===0){
        el.innerHTML = '<p class="muted" style="padding:20px;text-align:center">Your cart is empty.</p>';
        document.getElementById('cart-total').textContent = '$0';
        return;
    }
    let total = 0;
    cart.items.forEach(item=>{
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        const imgSrc = item.image || 'https://via.placeholder.com/120x90';
        div.innerHTML = `
            <img src="${imgSrc}" alt="${item.name}">
            <div class="item-info">
                <div class="title">${item.name}</div>
                <div class="item-price">$${item.price} x ${item.qty}</div>
                ${item.shipping? `<div class="muted small">${item.shipping}</div>` : ''}
            </div>
            <div class="qty-controls">
                <button data-action="inc">+</button>
                <button data-action="dec">−</button>
            </div>
        `;
        div.querySelector('[data-action="inc"]').addEventListener('click',()=>{
            item.qty++; renderCart(); updateCartCount(); saveCart();
        });
        div.querySelector('[data-action="dec"]').addEventListener('click',()=>{
            item.qty--; if(item.qty<=0) cart.items = cart.items.filter(i=>i!==item); renderCart(); updateCartCount(); saveCart();
        });
        el.appendChild(div);
    });
    document.getElementById('cart-total').textContent = `$${total}`;
}

function addToCart(name, price, image, shipping){
    const exists = cart.items.find(i=>i.name===name);
    if(exists){ exists.qty++; }
    else cart.items.push({name,price,qty:1,image,shipping});
    updateCartCount(); renderCart(); saveCart(); showToast(`${name} added to cart`);
}

/* Side categories (mobile) */
function openCats(){
    const side = document.getElementById('side-cats');
    const ov = document.getElementById('overlay');
    side.setAttribute('aria-hidden','false');
    ov.hidden = false; ov.classList.add('show');
}
function closeCats(){
    const side = document.getElementById('side-cats');
    const ov = document.getElementById('overlay');
    side.setAttribute('aria-hidden','true');
    ov.classList.remove('show'); setTimeout(()=>ov.hidden = true,200);
}

document.addEventListener('DOMContentLoaded',()=>{
    // load persisted cart
    loadCart();
    updateCartCount(); renderCart();

    // cart drawer
    document.getElementById('cart-toggle').addEventListener('click',openCart);
    document.getElementById('close-cart').addEventListener('click',closeCart);

    // add to cart handlers
    document.querySelectorAll('.product-card .add').forEach(btn=>{
        btn.addEventListener('click', (e)=>{
            const card = e.target.closest('.product-card');
            const name = card.dataset.name || card.querySelector('h3')?.innerText.trim();
            const price = Number(card.dataset.price) || 0;
            const img = card.querySelector('.media img')?.src;
            const shipping = card.dataset.shipping || null;
            addToCart(name, price, img, shipping);
        });
    });

    // hamburger and side categories
    const menuToggle = document.getElementById('menu-toggle');
    if(menuToggle) menuToggle.addEventListener('click', openCats);
    const closeCatsBtn = document.getElementById('close-cats');
    if(closeCatsBtn) closeCatsBtn.addEventListener('click', closeCats);
    const overlay = document.getElementById('overlay');
    if(overlay) overlay.addEventListener('click', closeCats);
});

// toast styles
const style = document.createElement('style');
style.innerHTML = `#toast{position:fixed;left:50%;transform:translateX(-50%);bottom:28px;background:linear-gradient(90deg,var(--accent),var(--accent-2));color:#ffffff;padding:10px 16px;border-radius:10px;opacity:0;pointer-events:none;transition:200ms}#toast.show{opacity:1}`;
document.head.appendChild(style);
