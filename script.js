const app = document.getElementById("app");

const images = [
  { file: "img00.png", year: 2024, desc: "Max Maeder", 	descx: "Open bus parade after Max Maeder won bronze for the men's kitefoiling event during the Paris Olympics in 2024." },
  { file: "img01.png", year: 2004, desc: "Taufik Batisah", descx: "Taufik Batisah wins the inaugural edition of Singapore Idol." },
  { file: "img02.png", year: 2002, desc: "Esplanade", 	descx: "Fireworks light up Marina Bay to celebrate the opening of Singapore's first purpose-built performing arts centre, the Esplanade." },
  { file: "img03.png", year: 2024, desc: "Chess", 		descx: "Ding Liren vs. Gukesh Dommaraju during the World Chess Championship 2024 held in Singapore." },
  { file: "img04.png", year: 2008, desc: "Mas Selamat", descx: "Wanted notices for Mas Selamat, who escaped from detention. This incident was described by some as the largest manhunt ever launched in Singapore." },
  { file: "img05.png", year: 2020, desc: "Merlion", 	descx: "Demolition of Merlion statue in Sentosa. The Merlion was closed off in 2019; demolition works resumed after COVID lockdown restrictions in 2020." },
  { file: "img06.png", year: 2013, desc: "Little India",descx: "Aftermath of the Little India riot, the second riot in Singapore since independence." },
  { file: "img07.png", year: 2018, desc: "Trump-Kim", 	descx: "Trump-Kim summit, the first meeting ever between a sitting US president and a North Korean leader." },
  { file: "img08.png", year: 2000, desc: "Hello Kitty", descx: "Wedding design Hello Kitty toy promotion launched by McDonalds, leading to a queueing frenzy islandwide." },
  { file: "img09.png", year: 2016, desc: "S. R. Nathan",descx: "State funeral for S. R. Nathan, the longest serving president in Singapore's history." }
];

// https://www.firstpost.com/sports/gukesh-vs-ding-liren-game-11-live-updates-score-world-chess-championship-2024-8-december-singapore-13842723.html
// https://www.todayonline.com/entertainment/arts/sunday-spotlight-rise-esplanade
// https://www.channelnewsasia.com/sport/max-maeder-kitefoiling-team-singapore-olympics-5174276
// https://www.gettyimages.com/search/2/image?phrase=mas+selamat
// https://www.facebook.com/TheStraitsTimes/photos/a.10150580907907115/10157397251517115/?type=3
// https://www.straitstimes.com/multimedia/graphics/2023/12/little-india-riot-10-years/index.html?shell
// https://edition.cnn.com/interactive/2018/06/politics/trump-kim-summit-cnnphotos/
// https://www.facebook.com/photo/?fbid=10233913506286474&set=pcb.3774424429480114
// https://www.straitstimes.com/singapore/state-funeral-procession-for-former-president-s-r-nathan-leaves-parliament-house

let currentIndex = 0;
let totalScore = 0;
let results = []; // store each round result

function showTitleScreen() {
  app.innerHTML = `
    <h1>SG Time Machine Quiz</h1>
    <button onclick="startGame()">Play</button>
  `;
}

function startGame() {
  currentIndex = 0;
  totalScore = 0;
  results = [];
  showGuessScreen();
}

function showGuessScreen() {
  const img = images[currentIndex];
  app.innerHTML = `
    <h2>Image ${currentIndex + 1} of ${images.length}</h2>
    <img src="images/${img.file}" alt="Guess Image">
    <div id="year-display">Year: 2012</div>
    <input type="range" min="2000" max="2025" value="2012" id="year-slider">
    <br><br><br>
    <button onclick="submitGuess()">Submit</button>
  `;

  const slider = document.getElementById("year-slider");
  const yearDisplay = document.getElementById("year-display");
  slider.addEventListener("input", () => {
    yearDisplay.textContent = `Year: ${slider.value}`;
  });
}

function submitGuess() {
  const slider = document.getElementById("year-slider");
  const guess = parseInt(slider.value);
  const img = images[currentIndex];
  const diff = Math.abs(guess - img.year);

  let points = 0;
  if (diff === 0) points = 5000;
  else if (diff === 1) points = 4000;
  else if (diff === 2) points = 3000;
  else if (diff === 3) points = 2000;
  else if (diff === 4) points = 1000;

  totalScore += points;
  results.push({
    desc: img.desc,
    guess: guess,
    answer: img.year,
    points: points
  });

  // color interpolation (0 → red, 5000 → green)
  const hue = (points / 5000) * 120; 
  const color = `hsl(${hue}, 80%, 40%)`;

  app.innerHTML = `
    <h2>Result</h2>
    <img src="images/${img.file}" alt="Result Image">
    <p>${img.descx}</p>
    <div class="result-row">
      <div><strong>Your guess:</strong> ${guess}</div>
      <div><strong>Correct:</strong> ${img.year}</div>
      <div><strong>Points:</strong> <span style="color:${color}">${points}</span></div>
    </div>
    <button onclick="nextImage()">Next</button>
  `;
}

function nextImage() {
  currentIndex++;
  if (currentIndex < images.length) {
    showGuessScreen();
  } else {
    showFinalResults();
  }
}

function showFinalResults() {
  let tableRows = results.map(r => {
    const hue = (r.points / 5000) * 120; // 0=red, 5000=green
    const color = `hsl(${hue}, 80%, 40%)`;
    return `
      <tr>
        <td>${r.desc}</td>
        <td>${r.guess}</td>
        <td>${r.answer}</td>
        <td><span style="color:${color}">${r.points}</span></td>
      </tr>
    `;
  }).join("");
  app.innerHTML = `
    <h2>Summary</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="margin: 0 auto; border-collapse: collapse;">
      <thead>
        <tr>
          <th>Desc</th>
          <th>Guess</th>
          <th>Answer</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    <p class="score">Total Score: <strong>${totalScore}</strong></p>
    <button onclick="showTitleScreen()">Play Again</button>
  `;
}

showTitleScreen();
