const data = {
  "感覚": ["かゆい", "痛い", "寒い", "暑い"],
  "行動": ["座りたい", "起き上がりたい", "車いすに乗りたい", "横向きになりたい", "足を組みたい"],
  "程度": ["とても", "少し"]
};

let yesNoSelection = "";
let lastSelection = "";

function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
}

function selectYesNo(answer) {
  yesNoSelection = answer;
  document.getElementById("btn-yes").classList.toggle("selected-yesno", answer === "はい");
  document.getElementById("btn-no").classList.toggle("selected-yesno", answer === "いいえ");
  updateSelectedDisplay();
  speak(answer);
}

function showOptions(category) {
  categorySelection = category;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  data[category].forEach(word => {
    const btn = document.createElement("button");
    btn.textContent = word;
    btn.onclick = () => selectWord(word);
    btn.classList.add("category-btn");
    optionsDiv.appendChild(btn);
  });
  updateCategoryButtons(category);
}

function selectWord(word) {
  lastSelection = word;
  updateSelectedDisplay();
  speak(word);
}

function undo() {
  yesNoSelection = "";
  lastSelection = "";
  document.getElementById("btn-yes").classList.remove("selected-yesno");
  document.getElementById("btn-no").classList.remove("selected-yesno");
  document.getElementById("selected").textContent = "";
  document.getElementById("options").innerHTML = "";
  updateCategoryButtons(null);
}

function updateSelectedDisplay() {
  const selectedDiv = document.getElementById("selected");
  let text = "";
  if (yesNoSelection) text += yesNoSelection + " - ";
  if (lastSelection) text += lastSelection;
  selectedDiv.textContent = text;
}

function updateCategoryButtons(selectedCategory) {
  const categoryButtons = document.querySelectorAll(".category button");
  categoryButtons.forEach(btn => {
    if (btn.textContent === selectedCategory) {
      btn.classList.add("selected-category");
    } else {
      btn.classList.remove("selected-category");
    }
  });
}
