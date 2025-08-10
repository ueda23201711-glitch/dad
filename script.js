const STORAGE_KEY = "communication_board_words";

const defaultData = {
  "感覚": ["かゆい", "痛い", "寒い", "暑い"],
  "行動": ["座りたい", "起き上がりたい", "車いすに乗りたい", "横向きになりたい", "足を組みたい"],
  "程度": ["とても", "少し"]
};

let data = {};
let yesNoSelection = "";
let lastSelection = "";
let categorySelection = "";

// ページ読み込み時にlocalStorageからデータを復元、なければ初期値をセット
function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      data = JSON.parse(saved);
    } catch {
      data = {...defaultData};
    }
  } else {
    data = {...defaultData};
  }
}

// localStorageに保存
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 「はい」「いいえ」選択
function selectYesNo(answer) {
  yesNoSelection = answer;
  document.getElementById("btn-yes").classList.toggle("selected-yesno", answer === "はい");
  document.getElementById("btn-no").classList.toggle("selected-yesno", answer === "いいえ");
  updateSelectedDisplay();
  speak(answer);
}

// カテゴリの選択肢表示
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

// 単語選択
function selectWord(word) {
  lastSelection = word;
  updateSelectedDisplay();
  speak(word);
}

// 取り消し
function undo() {
  yesNoSelection = "";
  lastSelection = "";
  categorySelection = "";
  document.getElementById("btn-yes").classList.remove("selected-yesno");
  document.getElementById("btn-no").classList.remove("selected-yesno");
  document.getElementById("selected").textContent = "";
  document.getElementById("options").innerHTML = "";
  updateCategoryButtons(null);
}

// 選択結果表示更新
function updateSelectedDisplay() {
  const selectedDiv = document.getElementById("selected");
  let text = "";
  if (yesNoSelection) text += yesNoSelection + " - ";
  if (lastSelection) text += lastSelection;
  selectedDiv.textContent = text;
}

// カテゴリボタンの色更新
function updateCategoryButtons(selectedCategory) {
  const categoryButtons = document.querySelectorAll(".category button:not(.add-word-btn)");
  categoryButtons.forEach(btn => {
    if (btn.textContent === selectedCategory) {
      btn.classList.add("selected-category");
    } else {
      btn.classList.remove("selected-category");
    }
  });
}

// 「＋追加」ボタンの入力欄表示切替
function toggleAddWordInput(category) {
  const inputDiv = document.getElementById("add-input-" + category);
  if (inputDiv.style.display === "none") {
    inputDiv.style.display = "block";
  } else {
    inputDiv.style.display = "none";
  }
}

// 新しい単語を追加
function addWord(category) {
  const input = document.getElementById("input-" + category);
  const newWord = input.value.trim();
  if (!newWord) {
    alert("単語を入力してください");
    return;
  }
  if (data[category].includes(newWord)) {
    alert("すでに存在する単語です");
    return;
  }
  data[category].push(newWord);
  saveData();
  input.value = "";
  toggleAddWordInput(category);
  if (categorySelection === category) {
    showOptions(category);
  }
  alert(category + "に「" + newWord + "」を追加しました");
}

// 音声読み上げ
function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
}

// ページロード時に初期化
window.onload = () => {
  loadData();
  updateSelectedDisplay();
};
