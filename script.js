    const toggle = document.getElementById('toggle');
    const status = document.querySelector('.status');

    toggle.addEventListener('change', function() {
      if (toggle.checked) {
        status.textContent = 'ON';
      } else {
        status.textContent = 'OFF';
      }
    });