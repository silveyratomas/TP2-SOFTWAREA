const { validarEmail, validarPassword, validarCampoNoVacio } = require('./validaciones');

describe('Validaciones de campos', () => {
  test('Email válido', () => {
    expect(validarEmail('test@gmail.com')).toBe(true);
  });

  test('Email inválido', () => {
    expect(validarEmail('test@')).toBe(false);
  });

  test('Password válida', () => {
    expect(validarPassword('miClave123')).toBe(true);
  });

  test('Password corta', () => {
    expect(validarPassword('1234')).toBe(false);
  });

  test('Campo no vacío', () => {
    expect(validarCampoNoVacio('Hola')).toBe(true);
  });

  test('Campo vacío', () => {
    expect(validarCampoNoVacio('')).toBe(false);
  });
});
