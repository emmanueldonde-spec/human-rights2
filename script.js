let current = 0;
let likes = 0;
let followers = 0;

const qBox = document.getElementById("question");
const choicesDiv = document.getElementById("choices");
const progress = document.getElementById("progress");
const likesEl = document.getElementById("likes");
const followersEl = document.getElementById("followers");
const commentsEl = document.getElementById("comments");

// Random social comments
const positiveComments = [
  "🔥 That’s correct!",
  "👏 You’re on fire!",
  "🙌 Great work!",
  "🌟 Keep it up!",
  "💯 Respect!"
];
const negativeComments = [
  "😬 Oops, not quite.",
  "👎 That’s wrong.",
  "🤔 Try harder!",
  "😢 Lost some followers.",
  "🙄 Come on!"
];

function updateStats() {
  likesEl.textContent = `❤️ Likes: ${likes}`;
  followersEl.textContent = `👥 Followers: ${followers}`;
}

function addComment(text) {
  const li = document.createElement("li");
  li.textContent = text;
  commentsEl.prepend(li); // new comment on top
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
  if (choice === correct) {
    btn.classList.add("correct");
    likes += 20;
    followers += Math.floor(Math.random()*15)+5;
    addComment(positiveComments[Math.floor(Math.random()*positiveComments.length)]);
  } else {
    btn.classList.add("wrong");
    likes = Math.max(0, likes - 10);
    followers = Math.max(0, followers - (Math.floor(Math.random()*10)+3));
    addComment(negativeComments[Math.floor(Math.random()*negativeComments.length)]);
  }
  updateStats();
  setTimeout(() => {
    current++;
    loadQuestion();
  }, 1000);
}

// Init
updateStats();
loadQuestion();
