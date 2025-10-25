# 🔐 CRYPTEX - Laboratorio criptográfico multi-método

**Versión:** 1.0  
**Autor:** [@Gonzalo-CR](https://github.com/Gonzalo-CR)  
**Licencia:** MIT  
**Estado:** Funcional

---

## 📌 ¿Qué es CRYPTEX?

CRYPTEX es una herramienta web completa que combina múltiples métodos de cifrado clásicos y modernos en una interfaz unificada. Permite cifrar y descifrar texto utilizando algoritmos históricos y contemporáneos, ideal para estudiantes, entusiastas de la criptografía y desarrolladores que necesitan probar diferentes métodos de seguridad.

---

## 🎯 Funcionalidades

### 🔑 Dos Modos Principales
- **Modo Frase Clave**: Cifrado basado en una frase secreta con algoritmo personalizado
- **Modo Múltiples Métodos**: Selección entre diversos algoritmos criptográficos

### 🧩 Métodos de Cifrado Disponibles
- **Cifrado César**: Desplazamiento clásico del alfabeto
- **Cifrado Vigenère**: Polialfabético con palabra clave
- **Cifrado por Sustitución**: Alfabeto personalizado de 26 letras
- **Cifrado por Transposición**: Reorganización matricial (clave: 2-19)
- **ROT13**: Desplazamiento fijo de 13 posiciones
- **Cifrado XOR**: Operación bit a bit (clave en minúsculas)
- **Base64**: Codificación/decodificación estándar
- **Atbash**: Sustitución por inversión alfabética
- **Inversión de Texto**: Volteo completo del texto
- **Código Morse**: Conversión a código telegráfico
- **Cifrado Rail Fence**: Patrón zigzag

---

## 🧩 Tecnologías utilizadas

- HTML5 + CSS3
- JavaScript (vanilla)
- Algoritmos de cifrado implementados nativamente

---

## 🖥️ Cómo usar

1. **Cloná o descargá** este repositorio
2. **Abrí** `index.html` en tu navegador
3. **Seleccioná** el modo de operación:
   - **Frase Clave**: Ingresá texto y una frase clave
   - **Múltiples Métodos**: Elegí el algoritmo y clave correspondiente
4. **Hacé clic** en "Encriptar" o "Desencriptar"
5. **Copiá** el resultado usando el botón correspondiente

### 📝 Consideraciones específicas por método:
- **Transposición**: La clave debe ser un número entre 2 y 19
- **XOR**: La clave debe estar en minúsculas
- **Sustitución**: Requiere un alfabeto completo de 26 letras únicas
- **Vigenère**: Funciona con cualquier combinación de mayúsculas/minúsculas

---

## 📂 Estructura del proyecto
CRYPTEX/

- index.html          # Interfaz principal con paneles modales
- styles.css          # Estilos visuales y diseño responsive
- script.js           # Lógica de cifrado y manejo de eventos


---

## 🧪 Estado actual

- [x] ✅ 11 métodos de cifrado implementados
- [x] ✅ Interfaz de usuario intuitiva
- [x] ✅ Validación de entradas básica
- [x] ✅ Instrucciones contextuales
- [x] ✅ Diseño responsive
- [ ] 🔄 Más métodos de cifrado
- [ ] 🔄 Validación avanzada de entradas
- [ ] 🔄 Historial de operaciones
- [ ] 🔄 Exportación de resultados

> **Nota**: Algunos métodos tienen restricciones específicas en el formato de clave. Las instrucciones en la interfaz proporcionan guías claras para cada caso.

---

## 🔐 Detalles Técnicos de los Algoritmos

### Frase Clave Personalizado
- Utiliza un charset extendido de 65 caracteres
- Aplicación modular de la clave sobre el texto
- Compatible con caracteres especiales

### Métodos Clásicos
- **César**: Desplazamiento circular del alfabeto
- **Vigenère**: Aplicación polialfabética que preserva mayúsculas/minúsculas
- **Transposición**: Matriz de N columnas con lectura por columnas/filas

### Métodos Modernos
- **XOR**: Operación bit a bit con manejo de caracteres extendidos
- **Base64**: Codificación estándar con manejo de Unicode

---

## 🤝 Contribuciones

¡Se aceptan mejoras! Algunas ideas interesantes:

- Agregar más métodos de cifrado (AES, Blowfish, etc.)
- Implementar cifrado de archivos
- Añadir análisis de frecuencia para criptoanálisis básico
- Crear modo de comparación entre métodos
- Agregar tests unitarios para los algoritmos
- Mejorar la interfaz con visualización del proceso

---

## 📚 Recursos Educativos

Este proyecto es ideal para:
- Aprender fundamentos de criptografía
- Comparar fortalezas de diferentes algoritmos
- Entender implementaciones prácticas de cifrado
- Experimentar con técnicas históricas y modernas

---

## 🇦🇷 Nota

Desarrollado con orgullo desde Argentina 🇦🇷 por GonzaloCR, combinando rigor técnico con accesibilidad educativa. Cada algoritmo fue implementado cuidadosamente para balancear autenticidad histórica y funcionalidad práctica.

---

## 📎 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

---

**✨ "La criptografía es el arte de transformar secretos en puzzles y puzzles en secretos"**
