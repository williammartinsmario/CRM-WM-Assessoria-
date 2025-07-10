
document.addEventListener("DOMContentLoaded", () => {
  const callCountSpan = document.getElementById("callCount");
  let callCount = parseInt(localStorage.getItem("callCount") || 0);
  callCountSpan.textContent = callCount;

  document.getElementById("importButton").addEventListener("click", () => {
    const text = document.getElementById("pasteInput").value.trim();
    const lines = text.split(/\n|;/);
    lines.forEach(line => {
      const parts = line.split(/[,\t]/);
      if (parts.length >= 2) {
        addLead(parts[0].trim(), parts[1].trim());
      }
    });
  });

  function addLead(name, phone) {
    const template = document.getElementById("lead-template");
    const clone = template.content.cloneNode(true);
    clone.querySelector(".lead-name").textContent = name;
    clone.querySelector(".lead-phone").textContent = phone;

    clone.querySelector(".whatsapp-btn").onclick = () => {
      const msg = encodeURIComponent("Olá " + name + ", tudo bem?");
      window.open("https://wa.me/" + phone.replace(/\D/g, '') + "?text=" + msg, "_blank");
    };

    clone.querySelector(".schedule-btn").onclick = () => {
      const date = new Date().toLocaleDateString();
      alert("Agendado para " + name + " em " + date);
    };

    clone.querySelector(".delete-btn").onclick = (e) => {
      e.target.closest(".lead-card").remove();
    };

    clone.querySelector(".birthday-input").addEventListener("change", e => {
      const bday = e.target.value;
      const today = new Date().toISOString().slice(5, 10);
      if (bday.slice(5, 10) === today) {
        e.target.closest(".lead-card").style.background = "#ffffcc";
      }
    });

    document.querySelector(".column[data-name='Novo'] .lead-list").appendChild(clone);
  }
});
