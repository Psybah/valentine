import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
  // Load components
  const flowers = document.querySelectorAll('.flower');
  flowers.forEach((flower, index) => {
    flower.classList.add(`flower--${index + 1}`);
  });

  // Create proposal elements
  const proposalContainer = document.createElement('div');
  proposalContainer.className = 'proposal-container';
  
  const proposalText = document.createElement('h1');
  proposalText.className = 'proposal-text';
  proposalText.textContent = 'Will you be my Valentine, Mami?';
  
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';
  
  const yesButton = document.createElement('button');
  yesButton.className = 'proposal-button yes-button';
  yesButton.textContent = 'Yes';
  
  const noButton = document.createElement('button');
  noButton.className = 'proposal-button no-button';
  noButton.textContent = 'No';
  noButton.style.transform = 'translate(0, 0)';
  
  buttonContainer.appendChild(yesButton);
  buttonContainer.appendChild(noButton);
  proposalContainer.appendChild(proposalText);
  proposalContainer.appendChild(buttonContainer);
  document.body.appendChild(proposalContainer);

  // Create popup
  const popup = document.createElement('div');
  popup.className = 'popup hidden';
  popup.innerHTML = `
    <div class="popup-content">
      <button class="close-button">&times;</button>
      <p>Ojebi 🌚!</p>
    </div>
  `;
  document.body.appendChild(popup);

  // Handle Yes button click
  yesButton.addEventListener('click', () => {
    popup.classList.remove('hidden');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  });

  // Handle popup close
  const closeButton = popup.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    popup.classList.add('hidden');
  });

  // Enhanced No button escape behavior
  const moveNoButton = (e) => {
    const buttonRect = noButton.getBoundingClientRect();
    const mouseX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    const mouseY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : null);
    
    if (mouseX === null || mouseY === null) return;
    
    const distance = Math.sqrt(
      Math.pow(mouseX - (buttonRect.left + buttonRect.width/2), 2) +
      Math.pow(mouseY - (buttonRect.top + buttonRect.height/2), 2)
    );
    
    if (distance < 100) {
      const maxX = window.innerWidth - buttonRect.width;
      const maxY = window.innerHeight - buttonRect.height;
      
      let newX = Math.random() * maxX;
      let newY = Math.random() * maxY;
      
      // Ensure button stays within viewport
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      
      noButton.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  };

  document.addEventListener('mousemove', moveNoButton);
  document.addEventListener('touchmove', moveNoButton);

  // Create floating hearts
  const createFloatingHeart = () => {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => heart.remove(), 10000);
  };

  // Create sparkles
  const createSparkle = () => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
  };

  // Generate hearts and sparkles
  setInterval(createFloatingHeart, 2000);
  setInterval(createSparkle, 500);

  // Remove loading class
  document.body.classList.remove('not-loaded');
});