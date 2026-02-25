class TabPanel extends HTMLElement {
  constructor() {
    super();
    this.tabButtonsContainer = this.querySelector('.tab-buttons-container');
    this.tabs = this.querySelectorAll('[role="tab"]');
    this.panels = this.querySelectorAll('[role="tabpanel"]');
    this.initTabs();
  }

  initTabs() {
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', () => this.selectTab(tab));
      tab.addEventListener('keydown', (event) => this.onKeydown(event, tab));
    });
  }

  selectTab(selectedTab) {
    this.panels.forEach((panel) => (panel.style.display = 'none'));
    this.tabs.forEach((tab) => tab.setAttribute('aria-selected', 'false'));

    const panel = this.querySelector(
      `#${selectedTab.getAttribute('aria-controls')}`
    );
    panel.style.display = 'block';
    selectedTab.setAttribute('aria-selected', 'true');
    selectedTab.focus();
  }

  onKeydown(event, tab) {
    const key = event.key;
    let newTab;

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      newTab = tab.previousElementSibling || this.tabs[this.tabs.length - 1];
    } else if (key === 'ArrowRight' || key === 'ArrowDown') {
      newTab = tab.nextElementSibling || this.tabs[0];
    } else if (key === 'Home') {
      newTab = this.tabs[0];
    } else if (key === 'End') {
      newTab = this.tabs[this.tabs.length - 1];
    }

    if (newTab) {
      event.preventDefault();
      this.selectTab(newTab);
    }
  }
}

customElements.define('tab-panel', TabPanel);

class CardComponent extends HTMLElement {
  constructor() {
    super();

    if (window.innerWidth > 750) {
      this.addEventListener('mouseover', this.handleMouseOver.bind(this));
      this.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }
  }

  handleMouseOver() {
    const slider = this.querySelector('.slider');

    if (slider) {
      const slides = slider.querySelectorAll('.slider__slide');
      const slideWidth = slides[0].clientWidth;

      slider.scrollTo({
        left: slideWidth,
        behavior: 'smooth',
      });
    }
  }

  handleMouseLeave() {
    const slider = this.querySelector('.slider');

    if (slider) {
      slider.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  }
}

customElements.define('card-component', CardComponent);
