const data = {
  "感覚": ["かゆい", "痛い", "寒い", "暑い"],
  "行動": ["座りたい", "起き上がりたい", "車いすに乗りたい", "横向きになりたい", "足を組みたい"],
  "程度": ["とても", "少し"]
};

let lastSelection = "";

function showOptions(category) {
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  data[category].forEach(word => {
    const btn = document.createElement("button");
    btn.textContent = word;
    btn.onclick = () => selectWord(word);
    optionsDiv.appendChild(btn);
  });
}

function selectWord(word) {
  lastSelection = word;
  document.getElementById("selected").textContent = word;
}

function undo() {
  lastSelection = "";
  document.getElementById("selected").textContent = "";
}
