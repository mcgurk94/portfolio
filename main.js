/**
 * Update the 'experience-list' element on a looping timer
 */
function switchKeywords() {

    // Update the element
    function updateExperienceList() {
        experienceListElement.textContent = experienceKeywords[currentIndex];
        currentIndex = (currentIndex + 1) % experienceKeywords.length;
    }

    const experienceListElement = document.getElementById('experience-list');
    const experienceKeywords = ['Cell Culture', 'Buffer Development', 'Microfluidics', 'Molecular Diagnostics', 'Data Science', 'Statistics', 'Bioinformatics', 'Testing Theories', 'Writing Queries'];
    let currentIndex = 0;

    setInterval(updateExperienceList, 1000);
}

/**
 * Update an element with text, simulating a typewriter
 * @param {Array} textArray     Array of strings, each element of the array will be on a different line 
 * @param {HTMLElement} element HTMLElement on the page to be updated 
 * @param {Integer} delay             Delay between each character in milliseconds
 */
function typeWriter(textArray, element, delay) {

    function type() {
        if (lineIndex < textArray.length) {
            const line = textArray[lineIndex];
            if (charIndex < line.length) {
                element.innerHTML += line.charAt(charIndex);
                charIndex++;
                setTimeout(type, delay);
            } 
            else {
                if (lineIndex < textArray.length  -1) {
                    element.innerHTML += "<br>"; // Add line break when a line is fully typed
                };
                lineIndex++;
                charIndex = 0;
                setTimeout(type, delay);
            }
        }
    }

    let lineIndex = 0;
    let charIndex = 0;
    type();
}

// Function to initiate typewriter effect
function initiateTypewriter() {
    const textLines = ["Hello World;", "I'm David. "];
    const typewriterElement = document.getElementById('typewriter');
    typeWriter(textLines, typewriterElement, 200);
}

/**
 * Call functions after the page has loaded
 */
document.addEventListener("DOMContentLoaded", function(){
    switchKeywords();
    initiateTypewriter();

});

/**
 * Make the navbar appear after a scroll event
 * Only needs to be triggered once
 */
document.addEventListener("scroll", function(){
    const navbar = document.getElementById('navbar');
    navbar.style.opacity = 1;
}, {once: true})