document.getElementById('registrar').addEventListener('click', () => ejecutar('registro'));
document.getElementById('login').addEventListener('click', () => ejecutar('login'));

function ejecutar(tipo) {
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const password = document.getElementById('password').value;

  if (!nombre || !email || !telefono || !password) {
    alert('Completá todos los campos');
    return;
  }

  const datos = { nombre, email, telefono, password };
  window.electronAPI.guardarDatos(datos)
    .then(() => window.electronAPI.ejecutarScript(tipo))
    .then(() => alert(`✅ Script ${tipo} ejecutado correctamente.`))
    .catch(err => alert(`❌ Error: ${err}`));
}