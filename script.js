
document.addEventListener("DOMContentLoaded", () => {
  let callCount = parseInt(localStorage.getItem("callCount") || "0");
  document.getElementById("callCount").textContent = callCount;

  function addCard(nome, numero) {
    const tmpl = document.getElementById("card-template");
    const clone = tmpl.content.cloneNode(true);
    clone.querySelector(".nome").textContent = nome;
    clone.querySelector(".numero").textContent = numero;

    clone.querySelector(".zap").onclick = () => {
      const msg = encodeURIComponent("Olá " + nome + ", tudo bem?");
      window.open("https://wa.me/" + numero.replace(/\D/g, "") + "?text=" + msg, "_blank");
    };

    clone.querySelector(".agendar").onclick = () => {
      const proj = clone.querySelector(".project").value;
      alert("Agendado para " + nome + " no projeto " + proj);
    };

    clone.querySelector(".excluir").onclick = () => {
      clone.querySelector(".excluir").closest(".card").remove();
    };

    clone.querySelector(".birth").addEventListener("change", e => {
      const selected = e.target.value.slice(5);
      const today = new Date().toISOString().slice(5, 10);
      if (selected === today) {
        e.target.closest(".card").style.background = "#fffdc4";
      }
    });

    document.querySelector(".column[data-name='Novo'] .lead-list").appendChild(clone);
  }

  document.getElementById("importBtn").onclick = () => {
    const raw = document.getElementById("pasteArea").value.trim();
    const lines = raw.split("\n");
    lines.forEach(line => {
      const [nome, numero] = line.split(/[,;\t]/).map(v => v.trim());
      if (nome && numero) addCard(nome, numero);
    });
  };
});
