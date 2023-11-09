import { useState, useEffect } from 'react';
import Error from './Error';

export const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('');
  const [acompanante, setAcompanante] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [notas, setNotas] = useState('');

  const [error, setError] = useState('false')


  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setAcompanante(paciente.acompanante)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setNotas(paciente.notas)
    }

  }, [paciente])



  const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)


    return random + fecha
  }




  const handleSubmit = (e) => {

    //validacion del formulario 
    e.preventDefault()

    if ([nombre, acompanante, email, fecha, notas].includes('')) {
      console.log('Hay al menos un campo vacio')

      setError(true)
      return;
    }
    setError(false)

    //Objeto de paciente 
    const objetoPaciente = {
      nombre,
      acompanante,
      email,
      fecha,
      notas,
      
    }

    if (paciente.id) {
      //Editando registro
      objetoPaciente.id = paciente.id
      

      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id ===
         paciente.id ? objetoPaciente : pacienteState )

         setPacientes(pacientesActualizados)
         setPaciente({})
     

    } else {
      //nuevo registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente]);

    }

    //reiniciar el form
    setNombre('')
    setAcompanante('')
    setEmail('')
    setFecha('')
    setNotas('')



    //console.log('enviando formulario')
  }



  return (
    <>
      <div className="w-1/2 lg:w-3/5">
        <h1 className="font-black text-3xl text-center">Seguimiento
          Pacientes</h1>

        <p className="text-xl mt-5 mb-10 text-center">
          Agrega Pacientes y {''}
          <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        >
          {error && <Error><p>Todos los campos son obligatorios</p></Error>}
          <div className="mb-5">
            <label
              htmlFor="nombre"
              className="block text-gray-700 uppercase font-bold">
              Nombre</label>
            <input
              id="nombre"
              type="text"
              placeholder="Nombre paciente"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="acompanante"
              className="block text-gray-700 uppercase font-bold"> Nombre Acompanante</label>
            <input
              id="acompanante"
              type="text"
              placeholder="Nombre acompanante"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={acompanante}
              onChange={(e) => setAcompanante(e.target.value)}
            />
          </div>


          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 uppercase font-bold"> Email</label>

            <input
              id="email"
              type="email"
              placeholder="Email"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold"> Fecha registro</label>
            <input
              id="alta"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Notas</label>
            <textarea
              id="sintomas"
              type="text"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Describe sintomas"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold
             hover:bg-indigo-700 cursor-pointer transition-all"
            value={paciente.id ? 'Editar paciente' : 'Agregar paciente'}
          />
        </form>
      </div>
    </>
  )
}

