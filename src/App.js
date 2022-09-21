import alfabeto from "./assets/alfabeto"
import palavras from "./assets/palavras"

function importAll(r) {
    return r.keys().map(r);
}
const imagensForca = importAll(require.context('./assets/img/', false, /\.(png)$/));

export default function App() {
    const numErros = 2 // TODO Estados das imagens
    const palavraSorteada = palavras[0] // TODO Sorteio da palavra

    return (
        <>
            <div className="jogo">
                <img src={imagensForca[numErros - 1]} alt="Etapa do jogo" data-identifier='game-image' />
                <div>
                    <button data-identifier="choose-word">Escolher Palavra</button>
                    <p data-identifier='word'>{palavraSorteada}</p>
                </div>
            </div>

            <div className="letras">{alfabeto.map((l, index) => <button key={index} data-identifier='letter'>{l}</button>)}</div>

            <div className="chute">
                <span>Já sei a palavra!</span>
                <input data-identifier='type-guess'></input>
                <button data-identifier='guess-button'>Chutar</button>
            </div>
        </>
    )
}