const pergunta = document.querySelector('.perguntas')
const respostas = document.querySelector('.respostas')
const textFim = document.querySelector('.fim span')
const content = document.querySelector('.content')
const contentFinish = document.querySelector('.fim')
const btnReiniciar = document.querySelector('.fim button')
const progresso = document.getElementById('barra')

let score = 0

import perguntas from './perguntas.js'

let perguntaAtual = 0
let questaoCorretas = 0

function loadQuestion() {
  progresso.setAttribute('style', 'width:' + perguntaAtual * 20 + '%')

  const item = perguntas[perguntaAtual]
  respostas.innerHTML = ''
  pergunta.innerHTML = item.question

  item.answers.forEach(resposta => {
    const div = document.createElement('div')

    div.innerHTML = `
    <button onclick="pegaResposta(this)" class="resposta" data-correct="${resposta.correct}">
    ${resposta.option}
    </button>
    `
    respostas.appendChild(div)
  })

  document.querySelectorAll('.resposta').forEach(item => {
    item.addEventListener('click', nextQuestion)
  })
}

btnReiniciar.onclick = () => {
  content.style.display = 'flex'
  contentFinish.style.display = 'none'

  perguntaAtual = 0
  questaoCorretas = 0
  localStorage.setItem('score', score)
  return window.location.assign('inicial.html')
}

function nextQuestion(e) {
  if (e.target.getAttribute('data-correct') === 'true') {
    questaoCorretas++
    score++
  }

  if (perguntaAtual < perguntas.length - 1) {
    perguntaAtual++
    loadQuestion()
  } else {
    finish()
  }
}

function finish() {
  textFim.innerHTML =
    localStorage.getItem('nome') +
    `você acertou ${questaoCorretas} de ${perguntas.length}`

  content.style.display = 'none'
  contentFinish.style.display = 'flex'
}

loadQuestion()
