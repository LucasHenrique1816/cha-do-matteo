// Efeito de typing para a primeira mensagem apenas quando estiver visível na tela
document.addEventListener('DOMContentLoaded', function() {
  const msg = document.getElementById('mensagem-typing');
  const gifContainer = document.querySelector('.gif-container');
  if (msg && gifContainer) {
    const texto = msg.textContent;
    msg.textContent = '';
    msg.style.opacity = 1;
    gifContainer.style.opacity = 0;
    let typingStarted = false;
    let typingFinished = false;
    function type() {
      let i = 0;
      function typingStep() {
        if (i <= texto.length) {
          msg.textContent = texto.slice(0, i);
          i++;
          setTimeout(typingStep, 38);
        } else {
          typingFinished = true;
          setTimeout(() => {
            gifContainer.style.transition = 'opacity 0.7s';
            gifContainer.style.opacity = 1;
          }, 300);
        }
      }
      typingStep();
    }
    // Função para verificar se o elemento está visível na tela
    function isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
      );
    }
    // Listener de scroll para disparar o typing
    function checkTyping() {
      if (!typingStarted && isInViewport(msg)) {
        typingStarted = true;
        type();
        window.removeEventListener('scroll', checkTyping);
      }
    }
    window.addEventListener('scroll', checkTyping);
    // Caso já esteja visível ao carregar
    checkTyping();
  }
});
// Pega o botão e o modal
const openModal = document.getElementById("openModal");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const giftBox = document.getElementById("giftBox");
const guestPhotoDiv = document.getElementById("guestPhoto");
const photoElement = document.getElementById("photo");


// Função para criar confeitos festivos
function launchConfetti() {
  const confettiContainer = document.getElementById("confetti");
  confettiContainer.innerHTML = "";
  const colors = ["#5d7152", "#7ed957", "#0e421f", "#a3d9c9", "#fff"];
  const numConfetti = 40;
  for (let i = 0; i < numConfetti; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti-piece";
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 90 + "%";
    confetti.style.top = Math.random() * 10 + "%";
    confetti.style.animationDelay = (Math.random() * 0.7) + "s";
    confettiContainer.appendChild(confetti);
  }
  // Remove confeitos após animação
  setTimeout(() => { confettiContainer.innerHTML = ""; }, 3000);
}

// Abrir modal
openModal.addEventListener("click", () => {
  modal.style.display = "flex";
  launchConfetti();
  const presentSurprise = document.getElementById("presentSurprise");
  const guestPhotoDiv = document.getElementById("guestPhoto");
  const giftImg = document.getElementById("modalGiftImg");
  presentSurprise.style.display = "flex";
  guestPhotoDiv.classList.add("hidden");
  giftImg.style.opacity = 0;
  // Força reflow para reiniciar animação
  void giftImg.offsetWidth;
  giftImg.style.animation = '';
  setTimeout(() => {
    giftImg.style.opacity = 1;
    giftImg.style.animation = 'giftAppear 1.2s cubic-bezier(.68,-0.55,.27,1.55) forwards, giftZoom 1.1s 1.2s cubic-bezier(.68,-0.55,.27,1.55) forwards';
  }, 10);
  // Espera animação terminar para mostrar o conteúdo do modal
  setTimeout(() => {
    presentSurprise.style.display = "none";
    guestPhotoDiv.classList.remove("hidden");
  }, 2300);
});

// Fechar modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  guestPhotoDiv.classList.add("hidden");
  const presentSurprise = document.getElementById("presentSurprise");
  presentSurprise.style.display = "flex";
  presentSurprise.classList.remove("open");
});

// Detecta gift via URL
const params = new URLSearchParams(window.location.search);
const gift = params.get("gift");

// Lista de fotos dos convidados (apenas uma foto por presente)
const fotos = {
  rafaelluana: "fotos/RafaelLuana.jpeg",
  paisdoano: "fotos/paisdoano.jpeg"
};

// Se tiver convidado válido, carrega a foto
if (gift && fotos[gift]) {
  photoElement.src = fotos[gift];
} else {
  // fallback
  photoElement.src = "fotos/matteo.jpeg";
}

// Botão de download da foto
const downloadBtn = document.getElementById("downloadPhoto");
if (downloadBtn) {
  downloadBtn.addEventListener("click", function() {
    const url = photoElement.src;
    const a = document.createElement("a");
    a.href = url;
    a.download = "presente.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}