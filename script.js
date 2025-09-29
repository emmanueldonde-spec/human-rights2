let current = 0;
let likes = 0;
let followers = 0;

const qBox = document.getElementById("question");
const choicesDiv = document.getElementById("choices");
const progress = document.getElementById("progress");
const likesEl = document.getElementById("likes");
const followersEl = document.getElementById("followers");
const commentsEl = document.getElementById("comments");
const quizBox = document.getElementById("quiz-box");
const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");

// Random social comments
const positiveComments = [
  "🔥 That’s correct!",
  "👏 You’re on fire!",
  "🙌 Great work!",
  "🌟 Keep it up!",
  "💯 Respect!",
  "🎉 You nailed it!",
  "🚀 Level up!",
  "😎 Pro move!",
  "🫶 Human rights hero!",
  "🥳 Social star!"
];
const negativeComments = [
  "😬 Oops, not quite.",
  "👎 That’s wrong.",
  "🤔 Try harder!",
  "😢 Lost some followers.",
  "🙄 Come on!",
  "😓 Missed it!",
  "😔 Not your best.",
  "🫤 Try again!",
  "😵‍💫 That was tough.",
  "😶‍🌫️ Oof!"
];

const postsEl = document.querySelector('.phone-stats span'); // first span: posts
const followingEl = document.querySelector('.phone-stats span:last-child'); // last span: following

function updateStats() {
  likesEl.textContent = `❤️ Likes: ${likes}`;
  followersEl.textContent = `${followers} Followers`;
  // Update posts and following
  if (postsEl) postsEl.textContent = `${current} Posts`;
  if (followingEl) followingEl.textContent = `${Math.floor(followers * 0.02)} Following`;
}

function addComment(text, isNegative = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (isNegative) li.classList.add("negative");
  commentsEl.prepend(li); // new comment on top
}

function animateQuizBox(type) {
  quizBox.classList.remove("correct-anim", "wrong-anim");
  void quizBox.offsetWidth; // force reflow
  if (type === "correct") quizBox.classList.add("correct-anim");
  if (type === "wrong") quizBox.classList.add("wrong-anim");
}

function loadQuestion() {
  if (current >= QUESTIONS.length) {
    qBox.textContent = "🎉 Quiz Complete!";
    choicesDiv.innerHTML = "";
    return;
  }
  const q = QUESTIONS[current];
  qBox.textContent = q.q;
  progress.textContent = `Question ${current+1} / ${QUESTIONS.length}`;

  choicesDiv.innerHTML = "";
  q.choices.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.classList.add("choice-btn");
    btn.textContent = c;
    btn.onclick = () => checkAnswer(i, q.a, btn);
    choicesDiv.appendChild(btn);
  });
}

function checkAnswer(choice, correct, btn) {
  // Disable all buttons after answer
  Array.from(choicesDiv.children).forEach(b => b.disabled = true);

  if (choice === correct) {
    btn.classList.add("correct");
    likes += 20;
    followers += Math.floor(Math.random()*15)+5;
    addComment(positiveComments[Math.floor(Math.random()*positiveComments.length)], false);
    animateQuizBox("correct");
    soundCorrect.currentTime = 0; soundCorrect.play();
  } else {
    btn.classList.add("wrong");
    // Highlight correct answer
    Array.from(choicesDiv.children)[correct].classList.add("correct");
    likes = Math.max(0, likes - 10);
    followers = Math.max(0, followers - (Math.floor(Math.random()*10)+3));
    addComment(negativeComments[Math.floor(Math.random()*negativeComments.length)], true);
    animateQuizBox("wrong");
    soundWrong.currentTime = 0; soundWrong.play();
  }
  updateStats();
  setTimeout(() => {
    quizBox.classList.remove("correct-anim", "wrong-anim");
    current++;
    loadQuestion();
  }, 1200);
}

// Init
updateStats();
loadQuestion();
