document.addEventListener('DOMContentLoaded', function () {
    const countdownText = document.getElementById('countdownText');
    const balloonContainer = document.getElementById('balloonContainer');
    const nextButton = document.getElementById('nextButton');
    const slideshow = document.getElementById('slideshow');
    const slideVideo = document.getElementById('slideVideo');
    const slideText = document.getElementById('slideText');

    const memories = [
        { src: 'memory.mp4', text: 'Memory 1: iloveeeeeeeeeeee you ' },
        // Add more videos and texts as needed
    ];

    let currentMemoryIndex = 0;

    // Countdown Function
    let count = 5;
    const countdownInterval = setInterval(() => {
        countdownText.textContent = count;
        createBalloons(); // Create balloons for each countdown number
        count--;

        if (count < 0) {
            clearInterval(countdownInterval);
            countdownText.classList.add('hidden');
            showHappyBirthdayPopup(); // Show popup after countdown
        }
    }, 1000);

    // Balloon Creation Function
    function createBalloons() {
        const colors = ['#ff6f61', '#6b5b95', '#88b04b', '#f7cac9', '#92a8d1'];
        for (let i = 0; i < 10; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = `${Math.random() * 100}%`;
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.animationDuration = `${Math.random() * 3 + 3}s`;
            balloonContainer.appendChild(balloon);

            // Remove balloon after animation ends
            balloon.addEventListener('animationend', () => {
                balloon.remove();
            });
        }
    }

    // Happy Birthday Popup Function
    function showHappyBirthdayPopup() {
        const popup = document.createElement('div');
        popup.id = 'happyBirthdayPopup';
        popup.innerHTML = '<h1>🎉 Happy Birthday! Mahal</h1>';
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove(); // Remove popup after 3 seconds
            nextButton.classList.remove('hidden'); // Show the next button
        }, 3000);
    }

    // Next Button Click
    nextButton.addEventListener('click', function () {
        // Play animation before showing the video
        slideshow.classList.remove('hidden');
        slideshow.style.animation = 'zoomIn 1s ease-in-out forwards';

        setTimeout(() => {
            showMemory(); // Show the video after the animation
        }, 1000); // Wait for the animation to finish
    });

    // Show Memory Function
    function showMemory() {
        if (currentMemoryIndex < memories.length) {
            const memory = memories[currentMemoryIndex];

            // Set video source and text
            slideVideo.src = memory.src;
            slideText.textContent = memory.text;

            // Show video and text
            slideVideo.classList.remove('hidden');
            slideText.classList.remove('hidden');

            // Play the video in full screen
            slideVideo.requestFullscreen().then(() => {
                slideVideo.play();
            });

            currentMemoryIndex++;

            // Automatically show next memory after the video ends
            slideVideo.addEventListener('ended', () => {
                showMemory();
            });
        } else {
            // Reset or end the slideshow
            slideshow.classList.add('hidden');
            slideVideo.classList.add('hidden');
            slideText.classList.add('hidden');
        }
    }
});