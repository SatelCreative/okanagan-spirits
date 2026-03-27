class AgeGate extends HTMLElement {
  constructor() {
    super();

    this.body = document.body;
    this.form = this.querySelector('form');
    this.content = this.querySelector('.age-gate__content');
    this.denied = this.querySelector('.age-gate__denied');

    this.allow = localStorage.getItem('age-gate-allow');

    if(this.allow === 'true') {
      this.remove();
      this.body.classList.remove('verification-required');
    }
    else {
      this.body.classList.add('verification-required');
    }

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this.form);
    const agePermitted = formData.get('age-permitted');

    if(agePermitted === 'yes') {
      localStorage.setItem('age-gate-allow', 'true');
      this.remove();
      this.body.classList.remove('verification-required');
    } else {
      localStorage.setItem('age-gate-allow', 'false');
     
      this.content.classList.add('hidden');
      this.denied.classList.remove('hidden');
    }
  }
}

customElements.define('age-gate', AgeGate);
