const app = document.getElementById("app");

const images = [
  { file: "img00.png", year: 2024, desc: "Open bus parade after Max Maeder won bronze for the men's kitefoiling event during the Paris Olympics in 2024." },
  { file: "img01.png", year: 2004, desc: "Taufik Batisah wins the inaugural edition of Singapore Idol." },
  { file: "img02.png", year: 2002, desc: "Fireworks light up Marina Bay to celebrate the opening of Singapore's first purpose-built performing arts centre, the Esplanade." },
  { file: "img03.png", year: 2024, desc: "Ding Liren vs. Gukesh Dommaraju during the World Chess Championship 2024 held in Singapore." },
  { file: "img04.png", year: 2008, desc: "Wanted notices for Mas Selamat, who escaped from detention. This incident was described by some as the largest manhunt ever launched in Singapore." },
  { file: "img05.png", year: 2020, desc: "Demolition of Merlion statue in Sentosa. The Merlion was closed off in 2019; demolition works resumed after COVID lockdown restrictions in 2020." },
  { file: "img06.png", year: 2013, desc: "Aftermath of the Little India riot, the second riot in Singapore since independence." },
  { file: "img07.png", year: 2018, desc: "Trump-Kim summit, the first meeting ever between a sitting US president and a North Korean leader." },
  { file: "img08.png", year: 2000, desc: "Wedding design Hello Kitty toy promotion launched by McDonalds, leading to a queueing frenzy islandwide." },
  { file: "img09.png", year: 2016, desc: "State funeral for S. R. Nathan, the longest serving president in Singapore's history." }
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

function showTitleScreen() {
  app.innerHTML = `
    <h1>SG Time Machine Quiz</h1>
    <button onclick="startGame()">Play</button>
  `;
}

function startGame() {
  currentIndex = 0;
  totalScore = 0;
  showGuessScreen();
}

function showGuessScreen() {
  const img = images[currentIndex];
  app.innerHTML = `
    <h2>Image ${currentIndex + 1} of ${images.length}</h2>
    <img src="images/${img.file}" alt="Guess Image">
    <div id="year-display">Year: 2015</div>
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

  app.innerHTML = `
    <h2>Result</h2>
    <img src="images/${img.file}" alt="Result Image">
    <p>${img.desc}</p>
    <p>You guessed: <strong>${guess}</strong></p>
    <p>Correct year: <strong>${img.year}</strong></p>
    <p>Points earned: <strong>${points}</strong></p>
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
  app.innerHTML = `
    <h2>Game Over</h2>
    <p class="score">Total Score: <strong>${totalScore}</strong></p>
    <button onclick="showTitleScreen()">Play Again</button>
  `;
}

showTitleScreen();
