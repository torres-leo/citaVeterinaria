// VARIABLES
const inputMascota = document.querySelector('#mascota');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintoma = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

// EVENTOS
eventListener();
function eventListener() {
	inputMascota.addEventListener('input', datosCita);
	inputPropietario.addEventListener('input', datosCita);
	inputTelefono.addEventListener('input', datosCita);
	inputFecha.addEventListener('input', datosCita);
	inputHora.addEventListener('input', datosCita);
	inputSintoma.addEventListener('input', datosCita);

	formulario.addEventListener('submit', nuevaCita);
}

// CLASES
class Citas {
	constructor() {
		this.citas = [];
	}

	agregarCita(cita) {
		this.citas = [...this.citas, cita];
		console.log(this.citas);
	}

	eliminarCita(id) {
		// filter va a omitir la posicion del objeto con el id seleccionado y no lo mostrará
		this.citas = this.citas.filter((cita) => cita.id !== id);
	}

	editarCita(citaActualizada) {
		this.citas = this.citas.map((cita) =>
			cita.id === citaActualizada.id ? citaActualizada : cita
		);
	}
}

class UI {
	imprimirAlerta(mensaje, tipo) {
		// crear el div
		const divMensaje = document.createElement('div');
		divMensaje.classList.add('alert', 'text-center', 'd-block', 'col-12');

		// agregar clase en base al tipo
		if (tipo === 'error') {
			divMensaje.classList.add('alert-danger');
		} else {
			divMensaje.classList.add('alert-success');
		}

		// Mensaje de error
		const pMensaje = document.createElement('p');
		pMensaje.setAttribute('id', 'pError');
		pMensaje.classList.add('align-item-center');
		pMensaje.textContent = mensaje;

		divMensaje.appendChild(pMensaje);

		document
			.querySelector('#contenido')
			.insertBefore(divMensaje, document.querySelector('.agregar-cita'));

		// quitar la alerta despues de 4 segundos
		setTimeout(() => {
			divMensaje.remove();
		}, 5000);
	}

	imprimirCitas(cita) {
		// limpiando el contenido en caso que ya exista un registro previo, para que no se duplique el contenido previo
		this.limpiarHTML();

		// Se está realizando el destructuring desde el argumento de la función, por lo tanto no es necesario realizar el destructuring asignandole una variable, como en la siguiente línea
		const { citas } = cita;

		citas.forEach((cita) => {
			const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

			const divCita = document.createElement('div');
			divCita.classList.add('cita', 'p-3');
			divCita.dataset.id = id;

			// scripting de los elementos de la cita
			const pMascota = document.createElement('h2');
			pMascota.classList.add('card-title', 'font-weight-bolder');
			pMascota.textContent = mascota;

			const pPropietario = document.createElement('p');
			pPropietario.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

			const pTelefono = document.createElement('p');
			pTelefono.innerHTML = `<span class="font-weight-bolder">Telefono: </span> ${telefono}`;

			const pFecha = document.createElement('p');
			pFecha.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

			const pHora = document.createElement('p');
			pHora.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

			const pSintomas = document.createElement('p');
			pSintomas.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`;

			// Creando boton para eliminar citas
			const btnEliminar = document.createElement('button');
			btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
			// copiando un icono de la pagina heroicon
			btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>`;

			// boton para editar la cita
			const btnEditar = document.createElement('button');
			btnEditar.classList.add('btn', 'btn-info', 'mr-2');
			// copiando un icono de la pagina heroicon
			btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>`;

			btnEliminar.onclick = () => eliminarCita(cita);
			btnEditar.onclick = () => cargarEdicion(cita);

			// agregar los parrafos al divCita
			divCita.appendChild(pMascota);
			divCita.appendChild(pPropietario);
			divCita.appendChild(pTelefono);
			divCita.appendChild(pFecha);
			divCita.appendChild(pHora);
			divCita.appendChild(pSintomas);
			divCita.appendChild(btnEliminar);
			divCita.appendChild(btnEditar);

			// agregar el divCita al html
			contenedorCitas.appendChild(divCita);
		});
	}

	limpiarHTML() {
		while (contenedorCitas.firstChild) {
			contenedorCitas.removeChild(contenedorCitas.firstChild);
		}
	}
}

// INSTANCIANDO CLASES
const ui = new UI();
const administrarCitas = new Citas();

// OBJETO CON INFORMACIÓN DE LA CITA
const citaObj = {
	mascota: '',
	propietario: '',
	telefono: '',
	fecha: '',
	hora: '',
	sintomas: '',
};

// FUNCIONES

// agregar los datos de la cita al objeto
function datosCita(e) {
	citaObj[e.target.name] = e.target.value;
	// console.log(citaObj);
}

// valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
	e.preventDefault();

	// extraer la informacion del objeto de citas
	const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

	// validando datos
	if (
		mascota === '' ||
		propietario === '' ||
		telefono === '' ||
		fecha === '' ||
		hora === '' ||
		sintomas === ''
	) {
		ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
		return;
	}

	if (editando) {
		// En caso de que esté en modo edicion

		// pasar el objeto de la cita a edicion
		administrarCitas.editarCita({ ...citaObj });

		// Mostrar mensaje de exito
		ui.imprimirAlerta('Datos actualizados correctamente');

		// regresar el texto del botón al original
		formulario.querySelector("button[type='submit']").textContent = 'Crear cita';
		editando = false;
	} else {
		// En caso que este generando una cita

		// generar un id unico
		citaObj.id = Date.now();

		// creando una nueva cita
		// console.log(citaObj);
		administrarCitas.agregarCita({ ...citaObj });

		// Mostrar mensaje de exito
		ui.imprimirAlerta('Cita agregada');
	}

	// reiniciar el objeto para la validacion
	reiniciarObjeto();

	// reiniciar el formulario
	formulario.reset();

	// mostrar el html de las citas
	ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
	citaObj.mascota = '';
	citaObj.propietario = '';
	citaObj.telefono = '';
	citaObj.fecha = '';
	citaObj.hora = '';
	citaObj.sintomas = '';
}

function eliminarCita(objetoCita) {
	// console.log(id);

	// eliminar la cita
	administrarCitas.eliminarCita(objetoCita.id);

	// mostrando un mensaje
	ui.imprimirAlerta(
		`La cita de la mascota  "${objetoCita.mascota}" , se ha eliminado correctamente`
	);

	// Refrescar citas
	ui.imprimirCitas(administrarCitas);
}

// carga los datos y el modo edicion
function cargarEdicion(cita) {
	const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

	// Llenar los inputs
	inputMascota.value = mascota;
	inputPropietario.value = propietario;
	inputTelefono.value = telefono;
	inputFecha.value = fecha;
	inputHora.value = hora;
	inputSintoma.value = sintomas;

	// llenar el objeto
	citaObj.mascota = mascota;
	citaObj.propietario = propietario;
	citaObj.telefono = telefono;
	citaObj.fecha = fecha;
	citaObj.hora = hora;
	citaObj.sintomas = sintomas;
	citaObj.id = id;

	// Cambiar el texto del boton
	formulario.querySelector("button[type='submit']").textContent = 'Actualizar datos';

	editando = true;
}
