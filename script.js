
const lessons = {
  1: [
    { scrambled: ["my", "I", "homework", "did"], answer: ["I", "did", "my", "homework"] },
    { scrambled: ["breakfast", "ate", "She"], answer: ["She", "ate", "breakfast"] }
  ],
  2: [
    { scrambled: ["watch", "they", "TV", "Did"], answer: ["Did", "they", "watch", "TV"] },
    { scrambled: ["opened", "He", "window", "the"], answer: ["He", "opened", "the", "window"] }
  ]
};

let currentLesson = [];
let currentIndex = 0;
let stars = 0;

function startLesson(number) {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';
  document.getElementById('lesson-title').textContent = `Lesson ${number}`;
  currentLesson = lessons[number];
  currentIndex = 0;
  stars = 0;
  document.getElementById('star-count').textContent = stars;
  showNextQuestion();
}

function showNextQuestion() {
  const sentence = currentLesson[currentIndex];
  if (!sentence) {
    alert('Lesson Complete!');
    return;
  }

  const sentenceContainer = document.getElementById('sentence-container');
  const wordBank = document.getElementById('word-bank');
  sentenceContainer.innerHTML = '';
  wordBank.innerHTML = '';

  sentence.answer.forEach(() => {
    const dropSpot = document.createElement('div');
    dropSpot.className = 'word drop';
    dropSpot.textContent = '';
    dropSpot.ondragover = e => e.preventDefault();
    dropSpot.ondrop = drop;
    sentenceContainer.appendChild(dropSpot);
  });

  sentence.scrambled
    .sort(() => 0.5 - Math.random())
    .forEach(word => {
      const wordDiv = document.createElement('div');
      wordDiv.className = 'word';
      wordDiv.draggable = true;
      wordDiv.textContent = word;
      wordDiv.ondragstart = drag;
      wordBank.appendChild(wordDiv);
    });
}

function drag(e) {
  e.dataTransfer.setData('text', e.target.textContent);
}

function drop(e) {
  if (!e.target.textContent) {
    const text = e.dataTransfer.getData('text');
    e.target.textContent = text;
  }
  checkAnswer();
}

function checkAnswer() {
  const userAnswer = Array.from(document.querySelectorAll('#sentence-container .drop'))
    .map(div => div.textContent);

  const correct = currentLesson[currentIndex].answer;

  if (userAnswer.every((w, i) => w === correct[i])) {
    stars++;
    document.getElementById('star-count').textContent = stars;
    showStarAnimation();
    currentIndex++;
    setTimeout(showNextQuestion, 800);
  }
}

function showStarAnimation() {
  const star = document.createElement('div');
  star.className = 'star-float';
  star.textContent = '⭐';
  document.getElementById('star-animation').appendChild(star);
  setTimeout(() => star.remove(), 1000);

  document.getElementById('correct-sound').play();
}
