const fs = require('fs');

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarPassword(pass) {
  return typeof pass === 'string' && pass.length >= 8;
}

function validarCampoNoVacio(valor) {
  return valor && valor.trim().length > 0;
}

function validarDatosUsuario(datos) {
  console.log("\n🔎 Validando datos del usuario cargados en datos_usuario.json:\n");

  console.log("Nombre:", validarCampoNoVacio(datos.nombre) ? '✅ Válido' : '❌ Vacío');
  console.log("Email:", validarEmail(datos.email) ? '✅ Válido' : '❌ Inválido');
  console.log("Teléfono:", validarCampoNoVacio(datos.telefono) ? '✅ Válido' : '❌ Vacío');
  console.log("Contraseña:", validarPassword(datos.password) ? '✅ Válida' : '❌ Corta o inválida');
}

try {
  const datos = JSON.parse(fs.readFileSync('datos_usuario.json', 'utf-8'));
  validarDatosUsuario(datos);
} catch (err) {
  console.error("❌ No se pudo leer datos_usuario.json:", err.message);
}
