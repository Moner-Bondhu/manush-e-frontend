# Manush-E Frontend

This is the frontend of the **Manush-E** application, built using **Ionic + Vue 3 + Vite** with TypeScript. It serves as the user interface layer, enabling users to interact with the Manush-E platform.

---

## 🚀 Tech Stack

- [Vue 3](https://vuejs.org/)
- [Ionic Framework](https://ionicframework.com/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Capacitor](https://capacitorjs.com/) (for mobile builds)
- [Cypress](https://www.cypress.io/) (for testing)
- PWA enabled

---

## ✅ Test Coverage Report
File / Directory	% Stmts	% Branch	% Funcs	% Lines	Uncovered Lines
All files	84.95	89.62	66.66	84.95	
capacitor.config.ts	0.00	100.00	100.00	0.00	3–9
src/App.vue	0.00	0.00	0.00	0.00	1–8
src/main.ts	0.00	0.00	0.00	0.00	1–46
src/components/Calendar.vue	0.00	0.00	0.00	0.00	1–37
src/components/ExploreContainer.vue	0.00	0.00	0.00	0.00	1–5
src/components/ProgressBar.vue	100.00	100.00	100.00	100.00	
src/router/index.ts	64.00	100.00	37.50	64.00	56–87
src/views/ChoicePage.vue	96.82	88.88	100.00	96.82	112–113
src/views/DashboardPage.vue	96.07	85.00	100.00	96.07	189–190, 199–200
src/views/HomePage.vue	98.96	100.00	0.00	98.96	315–316
src/views/LoginPage.vue	80.89	85.71	66.66	80.89	74–75, 77–79, 84–95
src/views/OnboardingPage.vue	100.00	97.70	73.33	100.00	231, 255
src/views/OtpPage.vue	94.23	87.50	50.00	94.23	58–60
src/views/ParentPage.vue	0.00	0.00	0.00	0.00	1–29
src/views/QuestionPage.vue	87.05	82.25	83.33	87.05	160, 179–180, 190–191, 213–214, 227–229, 235–236...


## 📦 Project Setup

### 1. Clone the Repository

```bash
git clone git@github.com:Moner-Bondhu/manush-e-frontend.git
cd manush-e-frontend
```
### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```
Then open: `http://localhost:5173`

---

## 📱 Progressive Web App (PWA)
This project includes support for installation as a PWA on desktop and mobile. You can test it by building:

```bash
npm run build
npm run preview
```

## ✅ Testing

### Unit/Component Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Formatting (Prettier)
```bash
npm run format
```

### E2E Testing (Cypress)
```bash
npx cypress open
```

---

## 🧪 Build for Production
```bash
npm run build
```

---

## 🤝 Contributing
We welcome contributions!
Please see our CONTRIBUTING.md before getting started.

## 📄 License
This project is licensed under the terms of the GPLv3 License.