//Nos aseguramos primero que todo el contenido HTML se haya cargado
document.addEventListener('DOMContentLoaded', function(){

       let validarCC = true;

        const email = {
            email: '',
            asunto: '',
            cc: '',
            mensaje: ''
        }

        //Seleccionar los elementos de la interfaz
        const inputEmail = document.querySelector('#email');
        const inputAsunto = document.querySelector('#asunto');
        const inputCC = document.querySelector('#cc');
        const inputMensaje = document.querySelector('#mensaje');
        const formulario = document.querySelector('#formulario');
        const btnSubmit = document.querySelector('#formulario button[type="submit"]'); //Seleccionamos el boton de enviar
        const btnReset = document.querySelector('#formulario button[type="reset"]');
        const spinner = document.querySelector('#spinner');

        //Asignar eventos a los elementos de la interfaz
        inputEmail.addEventListener('input', validar);

        inputAsunto.addEventListener('input', validar);

        inputMensaje.addEventListener('input', validar);

        inputCC.addEventListener('input', validacionCC);

        formulario.addEventListener('submit', enviarEmail);

        btnReset.addEventListener('click', function (e){
                e.preventDefault();
                resetFormulario();
                
        });

        function enviarEmail(e){
            e.preventDefault();
            spinner.classList.add('flex');
            spinner.classList.remove('hidden');

            setTimeout(() =>{ //El setTimeout ejecuta cierto codigo despues de haber pasado cierto tiempo
                spinner.classList.remove('flex');
                spinner.classList.add('hidden');

                resetFormulario();

                //Crear una alerta
                const alertaExito = document.createElement('P');
                alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

                alertaExito.textContent = 'Mensaje enviado correctamente';

                formulario.appendChild(alertaExito);

                setTimeout(() =>{
                    alertaExito.remove();
                }, 3000);

            }, 3000); //En este caso, 3000 corresponde a 3 segundos
        }

        function validar(e){


            //Validar si un campo esta vacio
            if(e.target.value.trim() === '' && e.target.id !== 'cc'){ //El metodo trim() nos quita los espacios en blanco
                mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement); //Com e.target.id hacemos referencia al id del elemento al que esta haciendo referencia (haciendo los mensajes dinamicos)
                email[e.target.name] = ''; //En caso de que se encuentre el campo vacio se deja como vacio el campo en el objeto email.
                comprobarEmail();
                return; //Si se entra el IF, solamente se ejecutara hasta la parte del IF (no se ejecutara lo demas)
            }

            if(e.target.id === 'email' && !validarEmail(e.target.value) ){ //Evaluamos si el campo corresponde al de email (por medio de su id) y si el correo no cumple con la expresion regular
                mostrarAlerta('El email no es valido',  e.target.parentElement);
                email[e.target.name] = ''; //Si el email se detecta como invalido tambien se dejara como campo vacio a su valor en el objeto
                comprobarEmail();
                return;
            }
            

            limpiarAlerta(e.target.parentElement); //Le pasamos a la funcion de limpar alerta la referencia de donde debe ocultar la alerta

            //Una vez se haya validado que se haya colocado informacion consistente en cada uno de los campos, procedemos a almacenar la informacion de cada campo en su respectiva variable
            email[e.target.name] = e.target.value.trim().toLowerCase(); //Se quitan los espacios y convierte la cadena a minusculas
            console.log(email);
            

            //Comprobar que el objeto de email contenga toda la informacion necesaria para mandar el correo
            comprobarEmail();

        }

        function validacionCC(e){
            if(!validarEmail(e.target.value) && e.target.value !==''){
                mostrarAlerta('El cc no es valido',  e.target.parentElement);
                validarCC = false;
                comprobarEmail();
            }else{
            limpiarAlerta(e.target.parentElement);
            validarCC = true;
            email[e.target.name] = e.target.value.trim().toLowerCase();
            comprobarEmail();
            }
            
        }

        

        function mostrarAlerta(mensaje, referencia){ //La funcion recibe dos parametros: un mensaje de alerta segun el campo que se requiera validar y la referencia al div en el que se encuentra
            
            limpiarAlerta(referencia);
            
            
            
            //Generar alerta en el HTML
            const error = document.createElement('P'); //Se crea un elemento parrafo en el DOM
            error.textContent = mensaje;
            error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center'); //Vamos agregando clases para que se vaya colocando los estilos del framework Tailwind CSS 

            //Agregando elemento dentro del formulario en el HTML debajo del div de referencia (de forma visual)
            referencia.appendChild(error);
        }

        //Funcion que remueve alertas
        function limpiarAlerta(referencia){
            //Comprueba si ya existe una alerta
            const alerta = referencia.querySelector('.bg-red-600'); //La clase .bg-red-600 solo la contiene el elemento alerta
            if(alerta){ //Evalua si hay una alerta para removerla
                alerta.remove();
            }
            
        }

        //Funcion que valida si hay algun email existente
        function validarEmail(email){
            const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
            const resultado = regex.test(email);
            return resultado; //Este return nos devuelve el resultado de la validacion 

        }

        function comprobarEmail(){
            
            if(email.email === ''|| email.asunto === ''|| email.mensaje === '' || validarCC === false) {// Este codigo pasa todos los valores del objeto email y los coloca en un arreglo. A dicho arreglo se le aplica un arraymethod para verificar si hay algun campo o valor vacio
                btnSubmit.classList.add('opacity-50'); //En caso de que falte algun campo se le vuelve agregar la clase de opacity-50 
                btnSubmit.disabled = true; //Ademas se deja invalidado el boton de enviar
                return;
            }
            btnSubmit.classList.remove('opacity-50'); //Se quita la clase opacity-50 que le da el color opaco al boton
            btnSubmit.disabled = false; //Se habilita el boton
        }

        function resetFormulario(){
            email.email = '';
            email.asunto= '';
            email.mensaje = '';
            email.cc = '';

            //Reiniciamos el formulario
            formulario.reset();
            validarCC = true;
            comprobarEmail();
        }

       




























});
