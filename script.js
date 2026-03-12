 const toggle = document.getElementById('toggle');
    const status = document.querySelector('.status');
    const switchText = document.querySelector('.switch-text');

    // Click sound using Web Audio API
    function playClick(isOn) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(isOn ? 800 : 400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(isOn ? 1200 : 200, ctx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    }

    toggle.addEventListener('change', () => {
      const isOn = toggle.checked;

      // Status text update
      status.textContent = isOn ? 'ON' : 'OFF';
      switchText.textContent = isOn ? 'ON' : 'OFF';

      // Body background class
      document.body.style.background = isOn
        ? '#0f0d00'
        : '#0a0a0f';

      // Click sound
      playClick(isOn);

      // Bulb flicker effect on turn ON
      if (isOn) {
        const bulb = document.querySelector('.bulb');
        bulb.style.transition = 'none';
        bulb.style.opacity = '0.3';
        setTimeout(() => { bulb.style.opacity = '1'; bulb.style.transition = ''; }, 60);
        setTimeout(() => { bulb.style.opacity = '0.6'; }, 120);
        setTimeout(() => { bulb.style.opacity = '1'; }, 200);
      }
    });