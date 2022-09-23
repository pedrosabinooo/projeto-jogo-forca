import { useState } from "react";
import alfabeto from "./assets/alfabeto";
import palavras from "./assets/palavras";
import styled from 'styled-components';
import GlobalStyle from "./GlobalStyle";

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

    function iniciarJogo() {
        setPalavraSorteada(palavras[Math.floor(Math.random() * palavras.length)])
        setNumErros(0)
    }

    return (
        <Container>
            <GlobalStyle />
            <Jogo>
                <img src={imagensForca[numErros].default} alt="Etapa do jogo" data-identifier='game-image' />
                <div>
                    <button onClick={() => iniciarJogo()} data-identifier="choose-word">Escolher Palavra</button>
                    <span data-identifier='word'>{palavraEmJogo.join(" ")}</span>
                </div>
            </Jogo>

            <Letras>{alfabeto.map((l, index) => <button key={index} data-identifier='letter'>{l.toUpperCase()}</button>)}</Letras>

            <Chute>
                <input data-identifier='type-guess' placeholder="Já sei a palavra!"></input>
                <button data-identifier='guess-button'>Chutar</button>
            </Chute>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 800px;
    max-height: 95vw;
    width: 100%;
    height: 100%;
`;

const Jogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80vh;

    img {
        width: 250%;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-end;
        height: 100%;
        width: 150%;
    }

    button {
        background-color: #27AE60;
        color: #FFFFFF;
        border-radius: 5px;
        border: none;
    }
`

const Letras = styled.div`
    display: grid;
    justify-content: space-around;
    grid-template-rows: repeat(2,40px);
    grid-template-columns: repeat(13,40px);
    align-content: space-around;
    width: 100%;
    height: 15vh;
    padding: 10px 50px;

    button {
        width: 100%;
        height: 100%;
        background-color: #E1ECF4;
        color: #49799E;
        border-radius: 10px;
        border: 3px solid #49799E;
    }
`

const Chute = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 50px;
    gap: 5px;

    input {
        width: 100%;
        height: 100%;
        font-weight: 100;
        font-size: smaller;
    }
    
    span {
        white-space: nowrap;
    }
    
    button {
        background-color: #E1ECF4;
        color: #49799E;
        border-radius: 5px;
        border: 3px solid #49799E;
    }
`