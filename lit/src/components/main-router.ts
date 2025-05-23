
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';

@customElement('main-router')
export class MainRouter extends LitElement {
  private router = new Router(this, [
    { path: '/', render: () => html`<tshirt-customizer></tshirt-customizer>` }
  ]);

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`${this.router.outlet()}`;
  }
}
