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
 * @param {Integer} delay       Delay between each character in milliseconds
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
 * Set up observers to trigger animations when certain parts of the page are viewed for the first time
 */
function initiateObserver(){

    // When the 'about' section is viewed, trigger element animations
    function handleIntersectionAbout(entries, observer) {
        const textAbout = document.getElementById('about-text');
        const imageAbout = document.getElementById('img-headshot');
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                textAbout.style.animation = 'swoopInLeft 1s forwards'; // Apply animation when in view
                imageAbout.style.animation = 'swoopInRight 1s 0.5s forwards, slowMove 2s ease-in-out infinite alternate'; // Apply animation when in view
                observer.unobserve(entry.target); // Stop observing once animation is applied
            }
        });
    }

    // When the 'history' section is viewed, trigger element animations
    function handleIntersectionHistory(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cardElements = entry.target.querySelectorAll('.card');
                cardElements.forEach((card, index) => {
                    card.style.animation = `swoopInBottom 1s forwards ${index * 500}ms`;
                });
                observer.unobserve(entry.target);
            }
        });
    }

    // Default options for all observers
    const observerOpts = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    // Observe the 'about' section
    const oberverAbout = new IntersectionObserver(handleIntersectionAbout, observerOpts);
    const sectionAbout = document.getElementById('about');
    oberverAbout.observe(sectionAbout);

    // Observe the 'history' section
    const oberverHisory = new IntersectionObserver(handleIntersectionHistory, observerOpts);
    const sectionHistory = document.getElementById('history');
    oberverHisory.observe(sectionHistory);

    // Observe the 'projects' section
    // Use the history handler for now because they are treated the same. This may change in the future
    const oberverProjects = new IntersectionObserver(handleIntersectionHistory, observerOpts);
    const sectionProjects = document.getElementById('projects');
    oberverProjects.observe(sectionProjects);
    
}

/**
 * When a trigger phrase is moused over, show off a picture of Millie and Bramble 
 */
function initiateKittens(){
    const trigger = document.getElementById('trigger-kittens');
    const popup = document.getElementById('popup');

    trigger.addEventListener('mouseover', function(){
        const rect = trigger.getBoundingClientRect();
        const scrollY = window.scrollY;
        popup.style.display = 'block';
        popup.style.top = rect.top + scrollY - 200 + "px";
        popup.style.left = rect.left + "px";
    });

    trigger.addEventListener("mouseout", function() {
        popup.style.display = "none";
    });

}

/**
 * When a trigger phrase is moused over, the text will burn away
 */
function initiateBurnableText(){

    const container = document.getElementById('burnable-container');

    // When mousing over the element, it should burn away in a random direction
    container.addEventListener('mouseover', function(){
        container.querySelectorAll('.burnable').forEach(trigger => {
            trigger.style.setProperty('--translateX-ratio', Math.random());
            trigger.style.setProperty('--translateY-ratio', Math.random());
            trigger.style.setProperty('--rotate-ratio', Math.random());
            trigger.style.setProperty('--scale-ratio', Math.random());

            trigger.classList.add('burn-away');
        });
    });

    // When mousing out of the element, it should reappear
    container.addEventListener('mouseout', function(){
        container.querySelectorAll('.burnable').forEach(trigger => {
            trigger.classList.remove('burn-away');
        });
    });

}

/**
 * Call functions after the page has loaded
 */
document.addEventListener("DOMContentLoaded", function(){
    switchKeywords();
    initiateTypewriter();
    initiateObserver();
    initiateKittens();
    initiateBurnableText();
});

/**
 * Make the navbar appear after a scroll event
 * Only needs to be triggered once
 */
document.addEventListener("scroll", function(){
    const navbar = document.getElementById('navbar');
    navbar.style.opacity = 1;
}, {once: true})