   class ContactManager {
      constructor() {
        this.contacts = [];
        this.editingIndex = -1;
        this.initializeElements();
        this.bindEvents();
        this.loadFromStorage();
        this.renderContacts();
      }

      initializeElements() {
        this.form = document.getElementById('contact-form');
        this.nameInput = document.getElementById('name-input');
        this.emailInput = document.getElementById('email-input');
        this.phoneInput = document.getElementById('phone-input');
        this.formButton = document.getElementById('form-button');
        this.formTitle = document.getElementById('form-title');
        this.contactsContainer = document.getElementById('contacts-container');
        this.contactCount = document.getElementById('contact-count');
      }

      bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      }

      handleSubmit(e) {
        e.preventDefault();
        
        const name = this.nameInput.value.trim();
        const email = this.emailInput.value.trim();
        const phone = this.phoneInput.value.trim();

        if (!name || !email || !phone) {
          alert('Por favor, completa todos los campos');
          return;
        }

        if (this.editingIndex >= 0) {
          this.updateContact(this.editingIndex, { name, email, phone });
        } else {
          this.addContact({ name, email, phone });
        }

        this.resetForm();
        this.renderContacts();
        this.saveToStorage();
      }

      addContact(contact) {
        // Verificar si el email ya existe
        if (this.contacts.some(c => c.email === contact.email)) {
          alert('Ya existe un contacto con este correo electrónico');
          return;
        }

        this.contacts.push({
          ...contact,
          id: Date.now() + Math.random()
        });
      }

      updateContact(index, contact) {
        // Verificar si el email ya existe en otro contacto
        if (this.contacts.some((c, i) => c.email === contact.email && i !== index)) {
          alert('Ya existe otro contacto con este correo electrónico');
          return;
        }

        this.contacts[index] = {
          ...this.contacts[index],
          ...contact
        };
      }

      deleteContact(index) {
        if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
          this.contacts.splice(index, 1);
          this.renderContacts();
          this.saveToStorage();
        }
      }

      editContact(index) {
        const contact = this.contacts[index];
        this.nameInput.value = contact.name;
        this.emailInput.value = contact.email;
        this.phoneInput.value = contact.phone;
        
        this.editingIndex = index;
        this.formButton.textContent = 'Actualizar Contacto';
        this.formTitle.textContent = 'Editar Contacto';
        
        // Scroll al formulario
        this.form.scrollIntoView({ behavior: 'smooth' });
        this.nameInput.focus();
      }

      resetForm() {
        this.form.reset();
        this.editingIndex = -1;
        this.formButton.textContent = 'Agregar Contacto';
        this.formTitle.textContent = 'Agregar Nuevo Contacto';
      }

      renderContacts() {
        const count = this.contacts.length;
        this.contactCount.textContent = `${count} contacto${count !== 1 ? 's' : ''} registrado${count !== 1 ? 's' : ''}`;

        if (count === 0) {
          this.contactsContainer.innerHTML = `
            <div class="empty-state">
              No hay contactos registrados aún.<br>
              ¡Agrega tu primer contacto usando el formulario de arriba!
            </div>
          `;
          return;
        }

        this.contactsContainer.innerHTML = `
          <div class="contact-list">
            ${this.contacts.map((contact, index) => `
              <div class="contact-item">
                <div class="contact-info">
                  <div class="contact-name">${this.escapeHtml(contact.name)}</div>
                  <div class="contact-email">${this.escapeHtml(contact.email)}</div>
                </div>
                <div class="contact-phone">${this.escapeHtml(contact.phone)}</div>
                <div class="actions">
                  <button class="edit" onclick="contactManager.editContact(${index})">Editar</button>
                  <button class="delete" onclick="contactManager.deleteContact(${index})">Eliminar</button>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }

      escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      }

      saveToStorage() {
        // En un entorno real usarías localStorage, pero aquí solo mantenemos en memoria
        // localStorage.setItem('contacts', JSON.stringify(this.contacts));
      }

      loadFromStorage() {
        // En un entorno real cargarías de localStorage
        // const stored = localStorage.getItem('contacts');
        // if (stored) {
        //   this.contacts = JSON.parse(stored);
        // }
        
        // Para la demostración, agregamos algunos contactos de ejemplo
        this.contacts = [
          {
            id: 1,
            name: "Santiago García",
            email: "santiago@mail.com",
            phone: "+57 300 123 4567"
          },
          {
            id: 2,
            name: "Ana Martínez",
            email: "ana@mail.com",
            phone: "+57 301 987 6543"
          }
        ];
      }
    }

    // Inicializar la aplicación
    const contactManager = new ContactManager();
  