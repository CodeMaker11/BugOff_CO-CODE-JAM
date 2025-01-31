let pastPapersUploaded = false;
let syllabusUploaded = false;

document.getElementById('pastPapers').addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        pastPapersUploaded = true;
        checkUploads();
    }
});

document.getElementById('syllabus').addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        syllabusUploaded = true;
        checkUploads();
    }
});

function checkUploads() {
    if (pastPapersUploaded && syllabusUploaded) {
        document.getElementById('menuCard').classList.add('active');
        document.getElementById('analysis').classList.add('active');
        
        // Add some sample analysis content
        document.getElementById('analysisContent').innerHTML = `
            <p>Past Papers Analysis:</p>
            <ul>
                <li>Total papers: 5</li>
                <li>Topics covered: 8</li>
                <li>Difficulty level: Moderate</li>
            </ul>
            <p>Syllabus Coverage:</p>
            <ul>
                <li>Chapters: 12</li>
                <li>Practical sections: 4</li>
                <li>Reference materials: 3</li>
            </ul>
        `;
    }
}