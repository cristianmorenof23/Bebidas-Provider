import { Button, Form, Row, Col, FormControl } from 'react-bootstrap'
import useCategoria from '../hooks/UseCategoria'
import { useState } from 'react'
import Swal from 'sweetalert2'
import useBebidas from '../hooks/useBebidas'



const Formulario = () => {

    const [busqueda, setBusqueda] = useState({
        nombre: '',
        categoria: ''
    })

    const { categorias } = useCategoria()
    const {consultarBebida} = useBebidas()


    const handleSubmit = (e) => {
        e.preventDefault()

        if (Object.values(busqueda).includes('')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ambos campos son obligatorios!'
            })
            return
        }
        consultarBebida(busqueda)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={6}>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='nombre'>Nombre Bebida</Form.Label>

                        <FormControl
                            id='nombre'
                            type='text'
                            placeholder='Ej: Tequila, Vodka, etc'
                            name='nombre'
                            value={busqueda.nombre}
                            onChange={e => setBusqueda({
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='categoria'>Categoria Bebida</Form.Label>

                        <Form.Select
                            id='categoria'
                            name='categoria'
                            value={busqueda.categoria}
                            onChange={e => setBusqueda({
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                        >
                            <option>- Selecciona Categoria -</option>
                            {categorias.map(categoria => (
                                <option
                                    key={categoria.strCategory}
                                    value={categoria.strCategory}
                                >
                                    {categoria.strCategory}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className='justify-content-end'>
                <Col md={3}>
                    <Button
                        variant='danger'
                        className='text-uppercase w-100'
                        type='submit'
                    >
                        Buscar Bebidas
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Formulario