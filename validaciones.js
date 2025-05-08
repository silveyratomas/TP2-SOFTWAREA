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
  
  module.exports = { validarEmail, validarPassword, validarCampoNoVacio };
  