document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('petition-form');
    const successMessage = document.getElementById('success-message');
    const currentSignaturesEl = document.getElementById('current-signatures');
    const progressBar = document.getElementById('progress-bar');
    const recentSignersEl = document.getElementById('recent-signers');

    let signatures = 0;
    const target = 10000000;

    // Formatting numbers with commas
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Update progress bar width
    const updateProgress = () => {
        // Add a visual boost (1% per click) so the bar visibly grows even with a huge target!
        const truePercentage = (signatures / target) * 100;
        const visualPercentage = truePercentage + (signatures * 1);
        progressBar.style.width = `${Math.min(visualPercentage, 100)}%`;
        currentSignaturesEl.textContent = formatNumber(signatures);
    };

    // Removed auto-increment interval as requested

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Increment user's signature
        signatures += 1;
        updateProgress();
        
        recentSignersEl.textContent = `You just signed! Total: ${signatures}`;

        // Create confetti effect
        createConfetti();
    });

    function createConfetti() {
        const colors = ['#00ff66', '#ffffff', '#00b347'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.top = '-10px';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);

            const duration = Math.random() * 3 + 2;
            confetti.animate([
                { transform: 'translate3d(0,0,0) rotate(0)', opacity: 1 },
                { transform: `translate3d(${Math.random()*200 - 100}px, 100vh, 0) rotate(${Math.random()*720}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(.37,0,.63,1)',
                fill: 'forwards'
            });

            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }
});
