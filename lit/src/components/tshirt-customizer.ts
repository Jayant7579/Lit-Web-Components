import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('tshirt-customizer')
export class TshirtCustomizer extends LitElement {
  @state() private height = 180;
  @state() private weight = 80;
  @state() private build = 'athletic';
  @state() private product = 'tshirt';
  @state() private text = '';
  @state() private imageSrc = '';
  @state() private dragging = false;

  static styles = css`
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      padding: 2rem;
    }
    .controls {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .preview {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    textarea {
      resize: none;
      height: 4.5em;
    }
    .dropzone {
      border: 2px dashed var(--accent-color);
      padding: 1rem;
      text-align: center;
      border-radius: 8px;
      transition: background 0.3s ease;
    }
    .dropzone.dragover {
      background: rgba(0, 0, 0, 0.05);
    }
  `;

  private onImageUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) this.readFile(file);
  }

  private onDragOver(e: DragEvent) {
    e.preventDefault();
    this.dragging = true;
  }

  private onDragLeave() {
    this.dragging = false;
  }

  private onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragging = false;
    const file = e.dataTransfer?.files?.[0];
    if (file) this.readFile(file);
  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => (this.imageSrc = reader.result as string);
    reader.readAsDataURL(file);
  }

  render() {
    return html`
      <div class="container">
        <div class="controls">
          <label>
            Height (cm):
            <input type="number" .value=${this.height} @input=${(e: any) => (this.height = +e.target.value)} />
          </label>
          <label>
            Weight (kg):
            <input type="number" .value=${this.weight} @input=${(e: any) => (this.weight = +e.target.value)} />
          </label>
          <label>
            Build:
            <select .value=${this.build} @change=${(e: any) => (this.build = e.target.value)}>
              <option>lean</option>
              <option>reg</option>
              <option>athletic</option>
              <option>big</option>
            </select>
          </label>
          <label>
            Product:
            <select .value=${this.product} @change=${(e: any) => (this.product = e.target.value)}>
              <option>tshirt</option>
              <option>hoodie</option>
              <option>sleevie</option>
              <option>cap</option>
            </select>
          </label>
          <label>
            Upload Image:
            <input type="file" @change=${this.onImageUpload} />
          </label>
          <div
            class="dropzone ${this.dragging ? 'dragover' : ''}"
            @dragover=${this.onDragOver}
            @dragleave=${this.onDragLeave}
            @drop=${this.onDrop}>
            Drag & Drop Image Here
          </div>
          <label>
            Text (max 3 lines):
            <textarea
              maxlength="120"
              .value=${this.text}
              @input=${(e: any) => (this.text = e.target.value)}
            ></textarea>
          </label>
        </div>

        <div class="preview">
          <div><strong>Preview Image</strong></div>
          ${this.imageSrc
            ? html`<img src="${this.imageSrc}" alt="Uploaded Image" width="200" />`
            : html`<p>No image uploaded</p>`}

          <three-viewer .image=${this.imageSrc} .product=${this.product}></three-viewer>
        </div>
      </div>
    `;
  }
}