window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // Change 50 to the scroll threshold you want
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  window.addEventListener('scroll', function() {
    var navbar = document.getElementById('social');
    if (window.scrollY > 50) { // Change 50 to the scroll threshold you want
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  