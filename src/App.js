import { useState } from "react";
import alfabeto from "./assets/alfabeto"
import palavras from "./assets/palavras"

function importAll(r) {
    return r.keys().map(r);
}
const imagensForca = importAll(require.context('./assets/img/', false, /\.(png)$/));


export default function App() {
    const [palavraSorteada, setPalavraSorteada] = useState("")
    
    // TODO Estados das imagens sendo alteradas conforme vamos jogando
    
    const [numErros, setNumErros] = useState(0)
    const [palavraEmJogo, setPalavraEmJogo] = useState(Array(palavraSorteada.length).fill("_"))
    console.log(palavraEmJogo.join(" "))

    function iniciarJogo(){
        setPalavraSorteada(palavras[Math.floor(Math.random() * palavras.length)])
        setNumErros(0)
    }

    return (
        <>
            <div className="jogo">
                <img src={imagensForca[numErros].default} alt="Etapa do jogo" data-identifier='game-image' />
                <div>
                    <button onClick={() => iniciarJogo()} data-identifier="choose-word">Escolher Palavra</button>
                    <span data-identifier='word'>{palavraEmJogo.join(" ")}</span>
                </div>
            </div>

            <div className="letras">{alfabeto.map((l, index) => <button key={index} data-identifier='letter'>{l.toUpperCase()}</button>)}</div>

            <div className="chute">
                <input data-identifier='type-guess' placeholder="Já sei a palavra!"></input>
                <button data-identifier='guess-button'>Chutar</button>
            </div>
        </>
    )
}