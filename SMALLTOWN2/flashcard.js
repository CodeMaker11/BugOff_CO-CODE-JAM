// Sample flashcard data structure (will be replaced with your backend data)
let flashcards = [];

// Function to create a flashcard element
function createFlashcard(question, answer) {
    const flashcard = document.createElement('div');
    flashcard.className = 'flashcard';
    
    flashcard.innerHTML = `
        <div class="flashcard-inner">
            <div class="flashcard-front">
                <p>${question}</p>
            </div>
            <div class="flashcard-back">
                <p>${answer}</p>
            </div>
        </div>
    `;
    
    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });
    
    return flashcard;
}

// Function to handle file upload (placeholder for your backend integration)
document.getElementById('pdfUpload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        // Placeholder for your backend PDF processing
        // For now, we'll add some sample flashcards
        flashcards = [
            { question: "What is the capital of France?", answer: "Paris" },
            { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
            { question: "Who wrote Romeo and Juliet?", answer: "William Shakespeare" }
        ];
        
        displayFlashcards();
    }
});

// Function to display flashcards
function displayFlashcards() {
    const container = document.getElementById('flashcardsContainer');
    container.innerHTML = '';
    
    flashcards.forEach(card => {
        const flashcardElement = createFlashcard(card.question, card.answer);
        container.appendChild(flashcardElement);
    });
}

// Add some decorative houses to the background
function addHouses() {
    const houses = 5;
    for (let i = 0; i < houses; i++) {
        const house = document.createElement('div');
        house.className = 'house';
        house.style.left = `${(i * 20) + 5}%`;
        document.querySelector('.town-background').appendChild(house);
    }
}

// Add animated clouds
function addClouds() {
    const clouds = 3;
    for (let i = 0; i < clouds; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = `${(i * 15) + 10}%`;
        cloud.style.animationDelay = `${i * 7}s`;
        document.querySelector('.town-background').appendChild(cloud);
    }
}

// Initialize the page
addHouses();
addClouds();
