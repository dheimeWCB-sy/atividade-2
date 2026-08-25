const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ajusta o canvas para ocupar a tela inteira
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Atualiza o tamanho do canvas se a janela for redimensionada
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];

// Classe que constrói cada partícula individual
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 2; // Tamanho entre 2px e 10px
    this.speedX = (Math.random() - 0.5) * 3; // Movimento horizontal leve
    this.speedY = (Math.random() - 0.5) * 3; // Movimento vertical leve
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`; // Cores vibrantes aleatórias
  }

  // Atualiza posição e reduz o tamanho
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.15;
  }

  // Desenha o círculo da partícula
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Ouve o movimento do cursor
window.addEventListener('mousemove', (e) => {
  // Cria 5 partículas para cada evento de movimento
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

// Loop principal da animação
function animate() {
  // Limpa o frame anterior
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    // Remove do array as partículas que já encolheram completamente
    if (particles[i].size <= 0.2) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate();