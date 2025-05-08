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

function ejecutarTests() {
  console.log('✔️ Email válido:', validarEmail('test@gmail.com') === true);
  console.log('❌ Email inválido:', validarEmail('test@') === false);
  console.log('✔️ Password válida:', validarPassword('miClave123') === true);
  console.log('❌ Password corta:', validarPassword('1234') === false);
  console.log('✔️ Campo no vacío:', validarCampoNoVacio('Hola') === true);
  console.log('❌ Campo vacío:', validarCampoNoVacio('') === false);
}

ejecutarTests();
module.exports = { validarEmail, validarPassword, validarCampoNoVacio };