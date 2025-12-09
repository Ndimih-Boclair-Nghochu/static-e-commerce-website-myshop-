# MyShop

MyShop — Responsive demo e‑commerce site (Vanilla HTML/CSS/JS)

A lightweight, mobile-first e‑commerce front-end showcasing an Amazon-style header, hero banner, product grid, product cards with badges and images, a slide-out categories menu, and a cart drawer that persists to `localStorage`. Ideal as a UI/UX starter template or for learning front-end patterns.

## Demo
Add a link to your live demo (GitHub Pages, Netlify, Vercel) here.

## Features
- Responsive header with category select and search
- Mobile hamburger + slide-out categories
- Hero banner and featured products
- Product cards with ratings, badges, shipping info
- Cart drawer with quantity controls and `localStorage` persistence (key: `myshop_cart_v1`)
- Accessible semantic markup and keyboard-friendly controls
- Smooth animations and responsive breakpoints

## Quick start (local)
Open PowerShell in the project folder and run:

```powershell
# initialize git and create the first commit
git init
git add .
git commit -m "Initial commit — MyShop demo"
```

To push to a new GitHub repo (replace `<username>` and `myshop`):

```powershell
# Create repo using GitHub CLI (recommended if you have it)
# gh repo create <username>/myshop --public --source=. --remote=origin --push

# OR manually add remote and push
# git remote add origin https://github.com/<username>/myshop.git
# git branch -M main
# git push -u origin main
```

## File structure
- `index.html` — main markup
- `style.css` — styling and responsive rules
- `script.js` — cart logic, menu toggles, and localStorage persistence

## Contributing
Contributions welcome. Open an issue or submit a pull request for bug fixes, accessibility improvements, or new features (e.g., product pages, search filtering, or a backend).

## License
This project is licensed under the MIT License — see the `LICENSE` file for details.

## Contact
Replace with your name and contact details.
