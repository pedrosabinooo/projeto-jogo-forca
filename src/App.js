import { useState } from "react";
import alfabeto from "./assets/alfabeto";
import palavras from "./assets/palavras";
import removeDiacritics from "./assets/removeDiacritics";
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
// [x]  Aparece a palavra a ser adivinhada na tela, com um underline ( `_` ) para cada letra que a palavra possui

// TODO Ao pressionar uma letra
// [x]  O botão de uma letra já clicada deve ficar desabilitado
// [ ]  Se a palavra escolhida no jogo tiver a letra que o usuário apertou:
//     [x]  O underline da posição correspondente à letra deve ser substituído pela letra em si
//     [ ]  Uma letra com ou sem acento deve ser aceita (quando a pessoa aperta a, se a palavra tem á, à, â ou ã, ela também irá aparecer. O mesmo vale para c e ç)
// [x]  Se a palavra escolhida no jogo NÃO tiver a letra que o usuário apertou:
//     [x]  Sua contagem de erros deve aumentar
//     [x]  A imagem na forca deve mudar (forca0 > forca1 > forca2… e assim sucessivamente)

// TODO Input de chute
// [x]  Caso o usuário deseje, ele pode chutar a palavra inteira no input
// [x]  Ao fazer isso, se acertar a palavra, ele ganha imediatamente
// [x]  Mas, se errar, ele perde imediatamente, independente da contagem anterior de erros. A imagem que deve aparecer nesse momento é a do bonequinho enforcado (forca6)

// TODO Fim de jogo
// [x]  Botões de letras e input de chute devem ser desabilitados
// [x]  Caso o usuário ganhe:
//     [x]  Quando o usuário ganha, a palavra completa fica em **verde** e os botões e input voltam a ficar desabilitados
//     [x]  Para continuar a jogar, o usuário deve apertar o botão “Escolher Palavra”, e o jogo será reiniciado do zero
// [x]  Caso o usuário perca:
//     [x]  A imagem final que deve aparecer é a do boneco enforcado (forca6)
//     [x]  A palavra deve ser revelada, mas em **vermelho**

// BONUS Reiniciar o jogo
// [x]  A qualquer momento, o usuário pode reiniciar o jogo pressionando o botão “escolher palavra”
// [x]  Uma nova palavra é sorteada
// [x]  O jogo deve voltar ao estado inicial (0 erros, imagem inicial da forca, palavra apenas com risquinhos, input limpo, todos os botões de letras habilitados)
//

export default function App() {
    const [numErros, setNumErros] = useState(0)
    const [palavraEscolhida, setPalavraEscolhida] = useState("")
    const [palavraEmJogo, setPalavraEmJogo] = useState([...palavraEscolhida.split("").map((l) => "_")])
    const [corPalavraEmJogo, setCorPalavraEmJogo] = useState("black")
    const [letrasTestadas, setLetrasTestadas] = useState(alfabeto)
    const [chuteDesabilitado, setChuteDesabilitado] = useState(true)
    const [chute, setChute] = useState("")

    function iniciarJogo() {
        let novaPalavra = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase()
        setPalavraEscolhida(novaPalavra)
        console.log(novaPalavra)
        setPalavraEmJogo(novaPalavra.split("").map((l) => "_"))
        setNumErros(0)
        setLetrasTestadas([])
        setChuteDesabilitado(false)
        setCorPalavraEmJogo("black")
    }

    function checkLetra(letra) {
        const letraMaiuscula = letra.toUpperCase()
        let novaPalavraEmJogo = [...palavraEmJogo]
        if (palavraEscolhida.split("").includes(letraMaiuscula)) {
            novaPalavraEmJogo = [...palavraEscolhida.split("").map((l, index) => removeDiacritics(l) === letraMaiuscula ? palavraEscolhida.split("")[index] : palavraEmJogo[index])]
            setPalavraEmJogo(novaPalavraEmJogo)
            console.log(novaPalavraEmJogo)
        } else {
            setNumErros(numErros + 1)
        }
        setLetrasTestadas([...letrasTestadas, letra])
        novaPalavraEmJogo.join(" ") === palavraEscolhida.split("").join(" ") ? ganhou() : (numErros + 1 === 6 ? perdeu() : console.log("Próxima letra"))
    }

    function ganhou() {
        console.log("Venceu!")
        setCorPalavraEmJogo("green")
        setPalavraEmJogo([...palavraEscolhida.split("")])
        setLetrasTestadas(alfabeto)
        setChuteDesabilitado(true)
        setChute("")
    }

    function perdeu() {
        console.log("Perdeu!")
        setCorPalavraEmJogo("red")
        setPalavraEmJogo([...palavraEscolhida.split("")])
        setNumErros(6)
        setLetrasTestadas(alfabeto)
        setChuteDesabilitado(true)
        setChute("")
    }

    return (
        <Container>
            <GlobalStyle />

            <span>Jogo da Forca</span>

            <BotaoEscolherPalavra onClick={() => iniciarJogo()} data-identifier="choose-word">Escolher Palavra</BotaoEscolherPalavra>

            <Jogo>
                <img src={imagensForca[numErros].default} alt="Imagem da forca" data-identifier='game-image' />
                <PalavraEmJogo data-identifier='word' color={corPalavraEmJogo}>{palavraEscolhida === "" ? "Clique em 'Escolher Palavra' para jogar" : palavraEmJogo.join(" ")}</PalavraEmJogo>
            </Jogo>

            <Letras>{alfabeto.map(
                (l, index) =>
                    <BotaoLetra
                        key={index}
                        onClick={() => checkLetra(l)}
                        disabled={letrasTestadas.includes(l)}
                        data-identifier='letter'>
                        {l.toUpperCase()}
                    </BotaoLetra>
            )}</Letras>

            <Chute>
                <input
                    data-identifier='type-guess'
                    onChange={e => setChute(e.target.value)}
                    value={chute}
                    disabled={chuteDesabilitado}
                    placeholder="Já sei a palavra!"
                />
                <BotaoChutar
                    onClick={() => removeDiacritics(chute).toUpperCase() === removeDiacritics(palavraEscolhida).toUpperCase() ? ganhou() : perdeu()}
                    disabled={chuteDesabilitado}
                    data-identifier='guess-button'>
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
    color: ${(props) => props.color};
    margin: 10px;
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