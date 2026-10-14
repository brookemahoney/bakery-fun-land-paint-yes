document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Magical pony heart trail (always runs)
  const pony = document.getElementById('pony');
  if (pony) {
    setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'heart-trail';
      heart.textContent = ['❤️','🧡','💛','💚','💙','💜','🤎','🖤','🤍'][Math.floor(Math.random()*9)];
      const rect = pony.getBoundingClientRect();
      heart.style.left = rect.left + rect.width/2 + 'px';
      heart.style.top = rect.top + rect.height/2 + 'px';
      heart.style.color = `hsl(${Math.random()*360}, 100%, 60%)`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }, 150);
  }

  if (prefersReducedMotion.matches) {
    // Remove all sparkle animations for reduced motion users
    document.querySelectorAll('.sparkle').forEach(el => el.remove());
    // Disable further sparkle creation
    const originalCreate = createSparkle;
    window.createSparkle = () => {};
    return;
  }
  const sparkleColors = [
    '#ffc8dd', '#ffb8d0', '#ffa8ce', '#ff88cc', '#ff66bb',
    '#ff44aa', '#e8a0bc', '#d24d7b', '#a569bd', '#8e24aa',
    '#ff6b9d', '#ff8c42', '#7c3a5f', '#f0f', '#bada55',
    '#08c', '#70e000', '#e55200', '#f44336', '#9c27b0'
  ];

  const sparkleTypes = [
    'sparkleFall',
    'sparkleSmall',
    'sparkleMedium',
    'sparkleLarge',
    'sparkleRise',
    'pulseSparkle',
    'floatSparkle',
    'bounceSparkle',
    'sparkleSpin'
  ];

  function createSparkle(x, y, type, color, size) {
    const sparkle = document.createElement('div');
    sparkle.className = `sparkle ${size}`;
    sparkle.style.left = `${x}%`;
    sparkle.style.top = `${y}%`;
    sparkle.style.background = color;
    sparkle.style.animationDuration = `${2 + Math.random() * 3}s`;
    sparkle.style.animationTiming = `linear`;
    
    const typeName = sparkleTypes[type % sparkleTypes.length];
    sparkle.style.animationName = typeName;
    
    document.body.appendChild(sparkle);
    
    const duration = parseFloat(sparkle.style.animationDuration);
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, duration * 1000);
    
    return sparkle;
  }

  function createSparkleBurst(count, x, y, color, size) {
    for (let i = 0; i < count; i++) {
      const delay = (i * 50) / count;
      setTimeout(() => {
        createSparkle(x + (Math.random() - 0.5) * 20, 
                      y + (Math.random() - 0.5) * 20, 
                      Math.floor(Math.random() * 5), 
                      color || sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
                      size || (Math.random() > 0.5 ? 'sparkle-small' : 'sparkle-medium'));
      }, delay);
    }
  }

  const totalSparkles = 150;

  for (let i = 0; i < totalSparkles; i++) {
    const type = Math.floor(Math.random() * 5);
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    const size = Math.random() > 0.5 ? 'sparkle-small' : 'sparkle-medium';
    
    setTimeout(() => {
      createSparkle(x, y, type, color, size);
    }, i * 20);
  }

  // Rainbow generator
  const rainbowColors = [
    '#ff6b9d', '#ff8c42', '#e53935', '#a569bd', '#8e24aa',
    '#ffb8d0', '#ff69b4', '#ff1493', '#7c3a5f', '#f0f',
    '#bada55', '#08c', '#70e000', '#e55200', '#f44336'
  ];

  function createRainbow(xPercent, yPercent, sizeClass, delay) {
    const rainbow = document.createElement('div');
    rainbow.className = `rainbow ${sizeClass}`;
    rainbow.style.left = `${xPercent}%`;
    rainbow.style.top = `${yPercent}%`;
    rainbow.style.animationDelay = `${delay}s`;
    rainbow.style.animationDuration = `${6 + Math.random() * 4}s`;
    
    const color1 = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    let color2 = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    while (color2 === color1) {
      color2 = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    }
    
    rainbow.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
    
    document.body.appendChild(rainbow);
    
    setTimeout(() => {
      if (rainbow.parentNode) {
        rainbow.parentNode.removeChild(rainbow);
      }
    }, (6 + Math.random() * 4) * 1000);
    
    return rainbow;
  }

  // Create many bouncing rainbows all over the page
  const rainbowCount = 30;
  const sizeClasses = ['rainbow-small', 'rainbow-medium', 'rainbow-large'];
  
  for (let i = 0; i < rainbowCount; i++) {
    const x = Math.random() * 80 + 10; // 10-90%
    const y = Math.random() * 80 + 10; // 10-90%
    const sizeClass = sizeClasses[Math.floor(Math.random() * sizeClasses.length)];
    const delay = Math.random() * 5; // 0-5s delay
    createRainbow(x, y, sizeClass, delay);
  }

  // Sparkle burst from heart elements
  const hearts = document.querySelectorAll('.heart');
  hearts.forEach((heart, index) => {
    heart.addEventListener('click', () => {
      for (let i = 0; i < 20; i++) {
        const delay = (i * 30) / 20;
        setTimeout(() => {
          const sx = heart.offsetLeft + heart.offsetWidth / 2;
          const sy = heart.offsetTop + heart.offsetHeight / 2;
          createSparkle(sx, sy, Math.floor(Math.random() * 5), 
                       sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
                       Math.random() > 0.5 ? 'sparkle-small' : 'sparkle-medium');
        }, delay);
      }
    });
  });

  // Continuous background sparkle generation
  setInterval(() => {
    const x = Math.random() * 100;
    const y = Math.random() * 10;
    const type = Math.floor(Math.random() * 3);
    const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    const size = Math.random() > 0.7 ? 'sparkle-large' : 'sparkle-small';
    
    createSparkle(x, y, type, color, size);
  }, 150);

  // Mouse-following sparkles
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    const size = Math.random() > 0.5 ? 'sparkle-small' : 'sparkle-medium';
    createSparkle(x, y, Math.floor(Math.random() * 3), color, size);
  });

  // Sparkles around feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, cardIndex) => {
    card.addEventListener('mouseenter', () => {
      for (let i = 0; i < 15; i++) {
        const delay = (i * 40) / 15;
        setTimeout(() => {
          const rect = card.getBoundingClientRect();
          const x = (rect.left / window.innerWidth) * 100 + Math.random() * 20 - 10;
          const y = (rect.top / window.innerHeight) * 100 + Math.random() * 20 - 10;
          const type = Math.floor(Math.random() * 4) + 2;
          const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
          createSparkle(x, y, type, color, 'sparkle-small');
        }, delay);
      }
    });
  });

  // Year footer update
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const pages = ['index.html', 'funfair.html', 'magic.html', 'cuddle.html', 'rainbow.html', 'paint.html', 'treats.html'];
  document.addEventListener('click', () => {
    const others = pages.filter(p => p !== location.pathname.split('/').pop());
    window.location.href = others[Math.floor(Math.random() * others.length)];
  });
});