class TimelineComponent extends HTMLElement {
  constructor() {
    super();

    this.tabs = this.querySelectorAll('[role="tab"]');
    this.panels = this.querySelectorAll('[role="tabpanel"]');
    this.navButtons = this.querySelectorAll('.timelines__item-button');

    this.initTabs();
    this.initNavButtons();
  }

  initTabs() {
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', () => this.selectTab(tab));
      tab.addEventListener('keydown', (event) => this.onKeydown(event, tab));
    });
  }

  initNavButtons() {
    this.navButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const panelId = button.getAttribute('aria-controls');
        const tab = this.querySelector(`[role="tab"][aria-controls="${panelId}"]`);
        if (tab) this.selectTab(tab);
      });
    });
  }

  selectTab(selectedTab) {
    const currentPanel = this.querySelector('[role="tabpanel"]:not([hidden])');
    const newPanel = this.querySelector(`#${selectedTab.getAttribute('aria-controls')}`);

    if (!newPanel || currentPanel === newPanel) return;

    this.tabs.forEach((tab) => tab.setAttribute('aria-selected', 'false'));
    selectedTab.setAttribute('aria-selected', 'true');
    selectedTab.focus();

    if (currentPanel) {
      currentPanel.classList.add('is-leaving');
      currentPanel.addEventListener('animationend', () => {
        currentPanel.classList.remove('is-leaving');
        currentPanel.setAttribute('hidden', 'true');
      }, { once: true });
    }

    newPanel.removeAttribute('hidden');
    newPanel.classList.add('is-entering');
    newPanel.addEventListener('animationend', () => {
      newPanel.classList.remove('is-entering');
    }, { once: true });
  }

  onKeydown(event, tab) {
    const key = event.key;
    let newTab;

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      newTab = tab.parentElement.previousElementSibling.querySelector('[role="tab"]') || this.tabs[this.tabs.length - 1];
    } else if (key === 'ArrowRight' || key === 'ArrowDown') {
      newTab = tab.parentElement.nextElementSibling.querySelector('[role="tab"]') || this.tabs[0];
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

customElements.define('timeline-component', TimelineComponent);
