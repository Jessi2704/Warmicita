import { useState } from 'react';

// Eficacia aproximada: uso perfecto / uso típico (valores de referencia generales)
const METODOS = [
    { id: 'condon', nombre: 'Preservativo', tipo: 'barrera', eficacia: '98% / 87%', its: true, desc: 'Barrera externa o interna. Es el único de esta lista que además protege frente a infecciones de transmisión sexual (ITS).' },
    { id: 'pildora', nombre: 'Píldora', tipo: 'hormonal', eficacia: '99% / 93%', its: false, desc: 'Pastilla diaria con hormonas. Requiere constancia y receta o indicación profesional.' },
    { id: 'inyectable', nombre: 'Inyectable', tipo: 'hormonal', eficacia: '99% / 96%', its: false, desc: 'Inyección cada 1 o 3 meses según el tipo.' },
    { id: 'implante', nombre: 'Implante', tipo: 'larga', eficacia: '99% / 99%', its: false, desc: 'Varilla bajo la piel del brazo; dura hasta 3 años. Lo coloca un profesional.' },
    { id: 'diu', nombre: 'DIU (hormonal o de cobre)', tipo: 'larga', eficacia: '99% / 99%', its: false, desc: 'Dispositivo en el útero que dura de 3 a 10 años según el modelo. Lo coloca un profesional.' },
    { id: 'anillo', nombre: 'Anillo / Parche', tipo: 'hormonal', eficacia: '99% / 93%', its: false, desc: 'Liberan hormonas de forma continua; se cambian cada semana o cada mes.' },
    { id: 'emergencia', nombre: 'Píldora de emergencia', tipo: 'emergencia', eficacia: 'Varía', its: false, desc: 'Solo para emergencias, no como método habitual. Cuanto antes se tome, mejor funciona.' },
];

const FILTROS = [
    { valor: 'todos', texto: 'Todos' },
    { valor: 'barrera', texto: 'Barrera' },
    { valor: 'hormonal', texto: 'Hormonales' },
    { valor: 'larga', texto: 'Larga duración' },
    { valor: 'emergencia', texto: 'Emergencia' },
];

export default function MetodosAnticonceptivos() {
    const [filtro, setFiltro] = useState('todos');

    // Filtrado usando un bucle for tradicional y condicionales if
    const listaFiltrada = [];
    for (let i = 0; i < METODOS.length; i++) {
        const metodo = METODOS[i];
        if (filtro === 'todos' || metodo.tipo === filtro) {
            listaFiltrada.push(metodo);
        }
    }

    return (
        <section id="metodos" className="seccion-bloque">
            <h2 className="seccion-titulo">Conoce tus métodos anticonceptivos</h2>
            <p className="seccion-intro">
                Elegir un método es una decisión personal. Compara opciones y habla con un profesional de salud para
                encontrar la que mejor se adapte a ti.
            </p>

            <div className="filtros">
                {FILTROS.map(function (item) {
                    let claseBoton = 'btn-filtro';
                    if (filtro === item.valor) {
                        claseBoton = 'btn-filtro activo';
                    }

                    return (
                        <button
                            key={item.valor}
                            id={'metodo-' + item.valor}
                            className={claseBoton}
                            onClick={function () {
                                setFiltro(item.valor);
                            }}
                        >
                            {item.texto}
                        </button>
                    );
                })}
            </div>

            <div className="grid-metodos">
                {listaFiltrada.map(function (m) {
                    let claseIts = 'chip';
                    let textoIts = 'No protege de ITS';
                    if (m.its) {
                        claseIts = 'chip chip-ok';
                        textoIts = '✓ Protege de ITS';
                    }

                    return (
                        <article key={m.id} className="metodo">
                            <h3>{m.nombre}</h3>
                            <p>{m.desc}</p>
                            <div className="metodo-datos">
                                <span className="chip">Eficacia: {m.eficacia}</span>
                                <span className={claseIts}>{textoIts}</span>
                            </div>
                        </article>
                    );
                })}
            </div>

            <p className="aviso">
                Eficacia aproximada (uso perfecto / uso típico). Información educativa, no sustituye la consulta médica.
            </p>
        </section>
    );
}