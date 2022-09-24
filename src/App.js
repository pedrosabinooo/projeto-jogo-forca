import { useState } from "react";
import alfabeto from "./assets/alfabeto";
import palavras from "./assets/palavras";
import styled from 'styled-components';
import GlobalStyle from "./GlobalStyle";

function importAll(r) {
    return r.keys().map(r);
}
const imagensForca = importAll(require.context('./assets/img/', false, /\.(png)$/));

// TODO-LIST
// TODO Antes de o jogo iniciar
// [x]  Input e botões de letras devem estar desabilitados

// TODO Ao apertar “escolher palavra”
// [x]  Input e letras passam a ficar habilitadas
// [x]  A contagem de erros nesse momento é 0, a imagem da forca vazia é mostrada
// [x]  Você deve sortear uma das palavras do array que está no arquivo `palavras.js` para o usuário tentar adivinhar
// [ ]  Aparece a palavra a ser adivinhada na tela, com um underline ( `_` ) para cada letra que a palavra possui

// TODO Ao pressionar uma letra
// [ ]  O botão de uma letra já clicada deve ficar desabilitado
// [ ]  Se a palavra escolhida no jogo tiver a letra que o usuário apertou:
//     [ ]  O underline da posição correspondente à letra deve ser substituído pela letra em si
//     [ ]  Uma letra com ou sem acento deve ser aceita (quando a pessoa aperta a, se a palavra tem á, à, â ou ã, ela também irá aparecer. O mesmo vale para c e ç)
// [ ]  Se a palavra escolhida no jogo NÃO tiver a letra que o usuário apertou:
//     [ ]  Sua contagem de erros deve aumentar
//     [x]  A imagem na forca deve mudar (forca0 > forca1 > forca2… e assim sucessivamente)

// TODO Input de chute
// [x]  Caso o usuário deseje, ele pode chutar a palavra inteira no input
// [ ]  Ao fazer isso, se acertar a palavra, ele ganha imediatamente
// [ ]  Mas, se errar, ele perde imediatamente, independente da contagem anterior de erros. A imagem que deve aparecer nesse momento é a do bonequinho enforcado (forca6)

// TODO Fim de jogo
// [ ]  Botões de letras e input de chute devem ser desabilitados
// [ ]  Caso o usuário ganhe:
//     [ ]  Quando o usuário ganha, a palavra completa fica em **verde** e os botões e input voltam a ficar desabilitados // BUG
//     [x]  Para continuar a jogar, o usuário deve apertar o botão “Escolher Palavra”, e o jogo será reiniciado do zero
// [ ]  Caso o usuário perca:
//     [x]  A imagem final que deve aparecer é a do boneco enforcado (forca6)
//     [ ]  A palavra deve ser revelada, mas em **vermelho** // BUG

// BONUS Reiniciar o jogo
// [x]  A qualquer momento, o usuário pode reiniciar o jogo pressionando o botão “escolher palavra”
// [x]  Uma nova palavra é sorteada
// [ ]  O jogo deve voltar ao estado inicial (0 erros, imagem inicial da forca, palavra apenas com risquinhos, input limpo, todos os botões de letras habilitados)
//


export default function App() {
    const [numErros, setNumErros] = useState(0)
    const [palavraEmJogo, setPalavraEmJogo] = useState("Clique em 'Escolher Palavra' para jogar")
    const [corPalavraEmJogo, setCorPalavraEmJogo] = useState("black")
    const [letraDesabilitada, setLetraDesabilitada] = useState(true)
    const [chuteDesabilitado, setChuteDesabilitado] = useState(true)
    const [chute, setChute] = useState("")
    let palavraEmJogoArray = palavraEmJogo.split("")

    function iniciarJogo() {
        let novaPalavra = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase()
        setPalavraEmJogo(novaPalavra)
        palavraEmJogoArray = novaPalavra.split("")
        console.log(novaPalavra)
        console.log(palavraEmJogoArray)
        setNumErros(0)
        setLetraDesabilitada(false)
        setChuteDesabilitado(false)
        setCorPalavraEmJogo("black")
    }

    function checkChute() {
        if (chute.toUpperCase() === palavraEmJogo) {
            console.log("Venceu!")
            setCorPalavraEmJogo("green")
        } else {
            console.log("Perdeu!")
            setCorPalavraEmJogo("red")
            setNumErros(6)
        }
        setChute("")
    }

    return (
        <Container>
            <GlobalStyle />

            <span>Jogo da Forca</span>

            <BotaoEscolherPalavra onClick={() => iniciarJogo()} data-identifier="choose-word">Escolher Palavra</BotaoEscolherPalavra>

            <Jogo>
                <img src={imagensForca[numErros].default} alt="Imagem da forca" data-identifier='game-image' />
                <PalavraEmJogo data-identifier='word' color={corPalavraEmJogo}>{palavraEmJogo === "Clique em 'Escolher Palavra' para jogar" ? palavraEmJogo : palavraEmJogoArray.join(" ")}</PalavraEmJogo>
            </Jogo>

            <Letras>{alfabeto.map((l, index) => <BotaoLetra key={index} disabled={letraDesabilitada} data-identifier='letter'>{l.toUpperCase()}</BotaoLetra>)}</Letras>

            <Chute>
                <input 
                    data-identifier='type-guess' 
                    onChange={e => setChute(e.target.value)} 
                    value={chute} 
                    disabled={chuteDesabilitado}
                    placeholder="Já sei a palavra!" 
                />
                <BotaoChutar
                    onClick={() => checkChute()}
                    disabled={chuteDesabilitado}
                    data-identifier='guess-button'
                >
                    Chutar
                </BotaoChutar>
            </Chute>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 700px;
    max-height: 95vw;
    width: 100%;
    height: 100%;
    font-size: 50px;
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
`
const BotaoEscolherPalavra = styled.button`
    background-color: #27AE60;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
    height: 40px;
    min-height: 40px;
    width: 170px;
    margin-top: 35px;
    margin-bottom: 20px;
    &:hover {
        filter: brightness(0.9);
        cursor: pointer;
      }
`
const Jogo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    img {
        width: 350px;
        padding: 25px;
    }
`
const PalavraEmJogo = styled.span`
    font-size: 30px;
    font-weight: 500;
    font-family: 'Quicksand', sans-serif;
    color: ${(props) => props.color}
    margin: 20px;
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
`
const BotaoLetra = styled.button`
    width: 100%;
    height: 100%;
    background-color: #E1ECF4;
    color: #49799E;
    border-radius: 10px;
    border: 3px solid #49799E;
    &:hover {
        filter: brightness(0.9);
        cursor: pointer;
    }
    &:disabled {
        filter: brightness(0.9);
        cursor: default;
    }
`
const Chute = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 50px;
    gap: 15px;
    font-size: smaller;

    input {
        width: 100%;
        height: 30px;
        font-weight: 100;
    }
`
const BotaoChutar = styled.button`
    background-color: #FF6C0C;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
    width: 110px;
    height: 30px;
    &:hover {
        filter: brightness(0.9);
        cursor: pointer;
    }
    &:disabled {
        filter: brightness(0.9);
        cursor: default;
    }
`