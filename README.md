# E-Commerce Davivienda · Frontend

¡Bienvenido a la tienda online simplificada de Davivienda! Esta aplicación Angular está diseñada para demostrar un flujo de compra funcional y seguro usando autenticación AWS Cognito, carrito de compras persistente, gestión de productos y un checkout intuitivo.

---

## 🚀 Tecnologías utilizadas

- **Angular 17+** (standalone, signals, Angular Material)
- **AWS Cognito** (autenticación segura)
- **API REST**
- **TypeScript**
- **Material Design**
- **Jest** (pruebas unitarias)
- **Sólidos principios SOLID y DRY**, estructurado para crecimiento real y mantenibilidad

---

## 🎯 Funcionalidades principales

- **Registro, login y confirmación de usuario seguro** con AWS Cognito
- **Catálogo de productos** con visualización responsiva, ofertas y stock dinámico
- **Carrito persistente**: gestiona y visualiza tus productos seleccionados antes de comprar
- **Checkout sencillo** y validaciones exhaustivas de stock antes de cada compra
- **CRUD para productos** (acceso de admin)
- **Experiencia UX/UI profesional**: navegación fluida y atractiva
- **Gestión de órdenes** para que los clientes sigan sus compras y los admins gestionen pedidos
- **Notificaciones y feedback** claros en cada paso
- **Código organizado por componentes, servicios y guardas** para alta reutilización y pruebas

---

## ⚡ Cómo iniciar el proyecto

1. **Clona el repositorio**
   git clone <https://github.com/Yeizermarrugo/E-commerce_davivienda_frontend.git>
   cd tu-repo-ecommerce-frontend

2. **Instala las dependencias**

npm install

3. **Configura las variables de entorno**

- Crea un archivo `.env` si necesitas endpoints custom o variables para tu entorno

4. **Corre la aplicación en modo desarrollo**

ng serve

5. **Accede a la app en** `http://localhost:4200`

---

## 📦 Scripts útiles

- `ng serve` — Modo desarrollo
- `ng build` — Compilar para producción
- `npm test` — Ejecutar pruebas unitarias con Jest

---

## 🔒 Autenticación robusta con AWS Cognito

- Registro, login, confirm y recuperación de contraseña
- Tokens JWT firmados y almacenamiento seguro en localStorage
- Validación de cuenta por correo y flujos protegidos para usuarios y admins
- Desconexión inmediata con feedback

---

## 🛒 Funcionalidad de carrito y checkout

- Añade, elimina y actualiza cantidades fácilmente
- Sincronización automática con localStorage entre sesiones
- Validaciones de stock y feedback instantáneo

---

## 📃 Principios y buenas prácticas

- **Principios SOLID:** Componentes y servicios desacoplados, responsabilidades claras
- **DRY:** Reutilización máxima de lógica, helpers y UI
- **Arquitectura modular**: futuro-proof y lista para escalar con nuevas features
- **Pruebas unitarias:** ejemplos de pruebas Jest en la carpeta `/__tests__/`

---

## 🧑‍💻 Sustentación técnica

- El código sigue convenciones modernas Angular y estructura de carpetas clara
- Feedback instantáneo al usuario en eventos clave: login, registro, errores
- Componentes standalone y signals maximizan performance y mantenibilidad
- Código preparado para internacionalización y futuras integraciones cloud

---

## ⛑️ Contacto, soporte y sugerencias

¿Dudas, sugerencias o quieres colaborar?  
Contáctanos en [tu-email@dominio.com] o abre un issue en el repositorio.

---

¡Gracias por revisar y usar este proyecto!  
¿Listo para probarlo o presentarlo? ¡Es tuyo!

---
