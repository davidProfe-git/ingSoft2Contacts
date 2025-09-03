const LS_KEY = "gestor_contactos";
let contacts = [];

// DOM
const contactForm = document.getElementById("contactForm");
const listEl = document.getElementById("list");
const totalEl = document.getElementById("total");
const searchInput = document.getElementById("q");

// Utilidad para IDs únicos
const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

// Guardar y cargar en localStorage
function save() {
  localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  render();
}
function load() {
  contacts = JSON.parse(localStorage.getItem(LS_KEY)) || [];
}

// Renderizar lista
function render(filter = "") {
  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  listEl.innerHTML = "";
  if (filtered.length === 0) {
    listEl.innerHTML = `<div class="empty">No hay contactos</div>`;
  }

  filtered.forEach((c) => {
    const div = document.createElement("div");
    div.className = "contact-item";
    div.innerHTML = `
      <div>
        <span><b>${c.name}</b></span>
        <span>${c.email || ""}</span>
        <span>${c.phone || ""}</span>
      </div>
      <div>
        <button onclick="editContact('${c.id}')">✏️</button>
        <button onclick="deleteContact('${c.id}')">🗑️</button>
      </div>
    `;
    listEl.appendChild(div);
  });

  totalEl.textContent = contacts.length;
}

// Agregar / Editar
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("contactId").value;
  const data = {
    id: id || uid(),
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    tags: document.getElementById("tags").value,
    notes: document.getElementById("notes").value,
  };

  if (id) {
    contacts = contacts.map((c) => (c.id === id ? data : c));
  } else {
    contacts.push(data);
  }

  contactForm.reset();
  document.getElementById("contactId").value = "";
  save();
});

// Limpiar formulario
document.getElementById("clearForm").addEventListener("click", () => {
  contactForm.reset();
  document.getElementById("contactId").value = "";
});

// Editar contacto
function editContact(id) {
  const c = contacts.find((x) => x.id === id);
  document.getElementById("contactId").value = c.id;
  document.getElementById("name").value = c.name;
  document.getElementById("email").value = c.email;
  document.getElementById("phone").value = c.phone;
  document.getElementById("tags").value = c.tags;
  document.getElementById("notes").value = c.notes;
}

// Eliminar
function deleteContact(id) {
  if (confirm("¿Eliminar contacto?")) {
    contacts = contacts.filter((c) => c.id !== id);
    save();
  }
}

// Buscar
searchInput.addEventListener("input", () => {
  render(searchInput.value);
});

// Exportar
document.getElementById("exportBtn").addEventListener("click", () => {
  const dataStr = JSON.stringify(contacts, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contactos.json";
  a.click();
  URL.revokeObjectURL(url);
});

// Importar
document.getElementById("importBtn").addEventListener("click", () => {
  const inp = document.createElement("input");
  inp.type = "file";
  inp.accept = "application/json";
  inp.addEventListener("change", () => {
    const file = inp.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const arr = JSON.parse(e.target.result);
      if (Array.isArray(arr)) {
        contacts = arr;
        save();
      }
    };
    reader.readAsText(file);
  });
  inp.click();
});

// Inicializar
load();
render();
