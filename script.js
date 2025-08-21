// Efeito de typing para a mensagem principal, inicia após logo e imagem carregarem
document.addEventListener('DOMContentLoaded', function() {
  const msg = document.getElementById('mensagem-typing');
  const gifContainer = document.querySelector('.gif-container');
  const logo = document.querySelector('.logo');
  const imagemCha = document.querySelector('.imagem-cha');
  if (msg && gifContainer && logo && imagemCha) {
    // Salva o texto original e prepara para o efeito typing
    const texto = msg.textContent;
    msg.textContent = '';
    msg.style.opacity = 0;
    gifContainer.style.opacity = 0;
    let typingStarted = false;
    let ready = 0;

    // Função principal do efeito typing
    function type() {
      msg.style.opacity = 1;
      let i = 0;
      function typingStep() {
        if (i <= texto.length) {
          msg.textContent = texto.slice(0, i);
          i++;
          setTimeout(typingStep, 38);
        } else {
          // Após typing, exibe o botão do gif com delay de 4s
          setTimeout(() => {
            gifContainer.style.transition = 'opacity 0.7s';
            gifContainer.style.opacity = 1;
          }, 4000);
        }
      }
      typingStep();
    }

    // Verifica se o elemento está visível na tela
    function isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // Dispara o efeito typing quando todos elementos estiverem prontos
    function checkTyping() {
      if (!typingStarted && isInViewport(msg) && ready === 2) {
        typingStarted = true;
        setTimeout(type, 2000); // atraso de 2 segundos
        window.removeEventListener('scroll', checkTyping);
      }
    }

    window.addEventListener('scroll', checkTyping);
    logo.addEventListener('load', loaded);
    imagemCha.addEventListener('load', loaded);
    function loaded() {
      ready++;
      checkTyping();
    }
    if (logo.complete) { ready++; }
    if (imagemCha.complete) { ready++; }
    checkTyping();
  }
});
// Elementos do modal de presente
const openModal = document.getElementById("openModal");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const guestPhotoDiv = document.getElementById("guestPhoto");
const photoElement = document.getElementById("photo");

/**
 * Cria confeitos festivos animados no modal
 */
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

// Abre o modal do presente e executa animações
openModal.addEventListener("click", () => {
  modal.style.display = "flex";
  launchConfetti();
  const presentSurprise = document.getElementById("presentSurprise");
  const giftImg = document.getElementById("modalGiftImg");
  presentSurprise.style.display = "flex";
  guestPhotoDiv.classList.add("hidden");
  giftImg.style.opacity = 0;
  // Reinicia animação do presente
  void giftImg.offsetWidth;
  giftImg.style.animation = '';
  setTimeout(() => {
    giftImg.style.opacity = 1;
    giftImg.style.animation = 'giftAppear 1.2s cubic-bezier(.68,-0.55,.27,1.55) forwards, giftZoom 1.1s 1.2s cubic-bezier(.68,-0.55,.27,1.55) forwards';
  }, 10);
  // Após animação, exibe foto do convidado
  setTimeout(() => {
    presentSurprise.style.display = "none";
    guestPhotoDiv.classList.remove("hidden");
  }, 2300);
});

// Fecha o modal do presente
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  guestPhotoDiv.classList.add("hidden");
  const presentSurprise = document.getElementById("presentSurprise");
  presentSurprise.style.display = "flex";
  presentSurprise.classList.remove("open");
});

// Detecta presente via parâmetro da URL
const params = new URLSearchParams(window.location.search);
const gift = params.get("gift");

// Fotos dos convidados (apenas uma foto por presente)
const fotos = {
  agdaamauri: "fotos/AgdaAmauri.jpeg",
  anaicaroldaiane: "fotos/AnaIcarolDaiane.jpeg",
  anaiedgar: "fotos/AnaIedgar.jpeg",
  biavini: "fotos/BiaVini.jpeg",
  bisa: "fotos/Bisa.jpeg",
  bruno: "fotos/Bruno.jpeg",
  camilahenrique: "fotos/CamilaHenrique.jpeg",
  carol: "fotos/Carol.jpeg",
  caroleloa: "fotos/CaroleLoa.jpeg",
  carolnando: "fotos/CarolNando.jpeg",
  cidajuniorkerolayne: "fotos/CidaJuniorKeroLayne.jpeg",
  crislaine: "fotos/Crislaine.jpeg",
  daiane: "fotos/Daiane.jpeg",
  dilsonemily: "fotos/DilsonEmily.jpeg",
  edgar: "fotos/Edgar.jpeg",
  gustavofernanda: "fotos/GustavoFernanda.jpeg",
  janiacarlos: "fotos/JaniaCarlos.jpeg",
  jo: "fotos/Jo.jpeg",
  kauepolyana: "fotos/KauePolyana.jpeg",
  lalaca: "fotos/Lalaca.jpeg",
  marciamatheus: "fotos/MarciaMatheus.jpeg",
  olivervitoria: "fotos/OliverVitoria.jpeg",
  paisdoano: "fotos/paisdoano.jpeg",
  rafaelluana: "fotos/RafaelLuana.jpeg",
  raphasuellen: "fotos/RaphaSuellen.jpeg",
  rayssajoao: "fotos/RayssaJoao.jpeg",
  ronyerika: "fotos/RonyErika.jpeg",
  ruanisabela: "fotos/Ruanisabela.jpeg",
  vinijots: "fotos/ViniJots.jpeg"

};

// Carrega foto do convidado ou fallback
photoElement.src = (gift && fotos[gift]) ? fotos[gift] : "fotos/matteo.jpeg";

// Botão para download da foto do presente
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