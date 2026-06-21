import './style.css'
import { rounds } from './rounds.js'

// ============== GAME STATE ==============
const TEAM_NAMES = ["Team 1", "Team 2", "Team 3", "Team 4"]

let ROUND_SECONDS = 45 // default, changeable on setup screen

let scores = [0, 0, 0, 0]
let currentTeamIndex = 0
let currentRound = null
let currentOrder = []
let timeLeft = ROUND_SECONDS
let timerInterval = null
let roundLocked = false
let roundStarted = false
let firstSelectedIndex = null
let hasMadeMove = false

const app = document.querySelector('#app')

// ============== SOUND EFFECTS (Web Audio API, no files needed) ==============
let audioCtx = null

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

function playTone(frequency, duration, type = 'sine', delay = 0, volume = 0.2) {
  const ctx = getAudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = frequency
  gain.gain.value = volume
  osc.connect(gain)
  gain.connect(ctx.destination)
  const startTime = ctx.currentTime + delay
  osc.start(startTime)
  gain.gain.setValueAtTime(volume, startTime)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
  osc.stop(startTime + duration)
}

function playPerfectSound() {
  playTone(523.25, 0.15, 'sine', 0)
  playTone(659.25, 0.15, 'sine', 0.1)
  playTone(783.99, 0.3, 'sine', 0.2)
}

function playPartialSound() {
  playTone(440, 0.15, 'sine', 0)
  playTone(523.25, 0.2, 'sine', 0.12)
}

function playWrongSound() {
  playTone(140, 0.35, 'sawtooth', 0, 0.15)
  playTone(110, 0.4, 'sawtooth', 0.08, 0.15)
}

function playTickSound() {
  playTone(880, 0.06, 'square', 0, 0.08)
}

function playStartSound() {
  playTone(660, 0.1, 'sine', 0)
  playTone(880, 0.15, 'sine', 0.08)
}

// ============== HELPERS ==============
function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Shuffles items, only re-rolling if ALL items happen to land in the fully
// correct order by chance. Partial coincidental matches (1-3 items) are fine.
function shuffleNoFullMatch(original) {
  let result
  do {
    result = shuffle(original)
  } while (result.every((item, i) => item === original[i]) && original.length > 1)
  return result
}

function pickRandomRound() {
  const idx = Math.floor(Math.random() * rounds.length)
  return rounds[idx]
}

function prepareNextRound() {
  clearInterval(timerInterval)
  roundLocked = false
  roundStarted = false
  timeLeft = ROUND_SECONDS
  firstSelectedIndex = null
  hasMadeMove = false
  currentRound = pickRandomRound()

  const scrambled = shuffleNoFullMatch(currentRound.items)
  currentOrder = scrambled

  renderQuestionScreen()
}

function startTimer() {
  const timerEl = document.querySelector('#timer')
  timerInterval = setInterval(() => {
    timeLeft--
    if (timerEl) {
      timerEl.textContent = timeLeft
      timerEl.classList.toggle('urgent', timeLeft <= 10)
    }
    if (timeLeft <= 10 && timeLeft > 0) {
      playTickSound()
    }
    if (timeLeft <= 0) {
      clearInterval(timerInterval)
      lockInRound()
    }
  }, 1000)
}

function calculateScore() {
  // No moves at all = no points, even if the shuffle happened to be partially correct by luck.
  if (!hasMadeMove) return 0

  const correct = currentRound.items
  const total = correct.length

  let correctCount = 0
  currentOrder.forEach((item, i) => {
    if (item === correct[i]) correctCount++
  })

  if (correctCount === total) return 100
  if (correctCount === 0) return 0
  return Math.round((correctCount / total) * 100 * 0.6)
}

function lockInRound() {
  if (roundLocked) return
  roundLocked = true
  clearInterval(timerInterval)

  const points = calculateScore()
  scores[currentTeamIndex] += points

  if (points === 100) playPerfectSound()
  else if (points === 0) playWrongSound()
  else playPartialSound()

  renderReveal(points)
}

function resetCurrentRound() {
  clearInterval(timerInterval)
  timeLeft = ROUND_SECONDS
  roundLocked = false
  firstSelectedIndex = null
  hasMadeMove = false

  // Re-scramble the same question fresh
  const scrambled = shuffleNoFullMatch(currentRound.items)
  currentOrder = scrambled

  renderActiveRound()
  startTimer()
}

// ============== REORDER LOGIC (tap-to-swap: works on mouse AND touch) ==============
function handleItemTap(index) {
  if (firstSelectedIndex === null) {
    firstSelectedIndex = index
    renderItems()
    return
  }
  if (firstSelectedIndex === index) {
    // tapped the same item again — deselect
    firstSelectedIndex = null
    renderItems()
    return
  }
  // swap the two selected items
  const newOrder = [...currentOrder]
  ;[newOrder[firstSelectedIndex], newOrder[index]] = [newOrder[index], newOrder[firstSelectedIndex]]
  currentOrder = newOrder
  firstSelectedIndex = null
  hasMadeMove = true
  renderItems()
}

// ============== SETUP SCREEN ==============
function renderSetupScreen() {
  app.innerHTML = `
    <div class="setup-screen">
      <h1 class="setup-title">Speed Sort</h1>
      <p class="setup-subtitle">Choose how long each team gets per round</p>
      <div class="timer-options">
        ${[15, 30, 45, 60].map(sec => `
          <button class="timer-option-btn ${sec === ROUND_SECONDS ? 'selected' : ''}" data-sec="${sec}">${sec}s</button>
        `).join('')}
      </div>
      <button id="start-game-btn" class="btn-primary">Start Game</button>
    </div>
  `

  document.querySelectorAll('.timer-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      ROUND_SECONDS = Number(btn.dataset.sec)
      document.querySelectorAll('.timer-option-btn').forEach(b => b.classList.remove('selected'))
      btn.classList.add('selected')
    })
  })

  document.querySelector('#start-game-btn').addEventListener('click', () => {
    prepareNextRound()
  })
}

// ============== QUESTION SCREEN (prompt only, no items, no timer yet) ==============
function renderQuestionScreen() {
  app.innerHTML = `
    <div class="game-screen">
      ${scoreboardHTML()}

      <div class="round-header">
        <div class="current-team-banner">${TEAM_NAMES[currentTeamIndex]}'s turn</div>
      </div>

      <h1 class="prompt">${currentRound.prompt}</h1>

      <p class="waiting-text">Items will appear when you start the round</p>

      <div class="controls">
        <button id="start-round-btn" class="btn-primary">Start Round</button>
      </div>
    </div>
  `

  document.querySelector('#start-round-btn').addEventListener('click', () => {
    roundStarted = true
    renderActiveRound()
    startTimer()
  })
}

// ============== ACTIVE ROUND (items visible, timer running) ==============
function renderActiveRound() {
  app.innerHTML = `
    <div class="game-screen">
      ${scoreboardHTML()}

      <div class="round-header">
        <div class="current-team-banner">${TEAM_NAMES[currentTeamIndex]}'s turn</div>
      </div>

      <h1 class="prompt">${currentRound.prompt}</h1>

      <div id="timer-wrap" class="timer-wrap">
        <span id="timer">${timeLeft}</span>
      </div>

      <div id="items-list" class="items-list"></div>
      <p class="tap-hint">Tap two items to swap their positions</p>

      <div class="controls">
        <button id="reset-round-btn" class="btn-secondary">↺ Reset Round</button>
        <button id="lock-in-btn" class="btn-primary">Lock In Answer</button>
      </div>
    </div>
  `
  renderItems()
  document.querySelector('#lock-in-btn').addEventListener('click', lockInRound)
  document.querySelector('#reset-round-btn').addEventListener('click', resetCurrentRound)
}

function renderItems() {
  const list = document.querySelector('#items-list')
  if (!list) return
  list.innerHTML = currentOrder.map((item, i) => `
    <div class="sort-item ${i === firstSelectedIndex ? 'selected' : ''}" data-index="${i}">
      <span class="item-number">${i + 1}</span>
      <span class="item-text">${item}</span>
      <span class="drag-handle">⇅</span>
    </div>
  `).join('')

  list.querySelectorAll('.sort-item').forEach(el => {
    const idx = Number(el.dataset.index)
    el.addEventListener('click', () => handleItemTap(idx))
  })
}

// ============== REVEAL SCREEN ==============
function renderReveal(points) {
  const correct = currentRound.items
  app.innerHTML = `
    <div class="game-screen">
      ${scoreboardHTML()}

      <div class="reveal-banner ${points === 100 ? 'perfect' : points === 0 ? 'zero' : 'partial'}">
        ${points === 100 ? '🎉 Perfect!' : points === 0 ? '❌ Not quite' : '👍 Partial credit'}
        <span class="points-earned">+${points} points</span>
      </div>

      <h1 class="prompt">${currentRound.prompt}</h1>

      <div class="reveal-list">
        ${correct.map((item, i) => {
          const wasCorrect = currentOrder[i] === item
          return `
            <div class="reveal-item ${wasCorrect ? 'correct' : 'incorrect'}">
              <span class="item-number">${i + 1}</span>
              <span class="item-text">${item}</span>
              <span class="reveal-icon">${wasCorrect ? '✓' : '✗'}</span>
            </div>
          `
        }).join('')}
      </div>

      <div class="controls">
        <button id="next-team-btn" class="btn-primary">Next Question →</button>
      </div>
    </div>
  `

  document.querySelector('#next-team-btn').addEventListener('click', () => {
    currentTeamIndex = (currentTeamIndex + 1) % TEAM_NAMES.length
    prepareNextRound()
  })
}

// ============== SHARED SCOREBOARD ==============
function scoreboardHTML() {
  return `
    <div class="scoreboard">
      ${TEAM_NAMES.map((name, i) => `
        <div class="score-card ${i === currentTeamIndex ? 'active' : ''}">
          <div class="score-team">${name}</div>
          <div class="score-value">${scores[i]}</div>
        </div>
      `).join('')}
    </div>
  `
}

// ============== START ==============
renderSetupScreen()