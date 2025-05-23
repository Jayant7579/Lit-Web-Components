import { html, css, LitElement } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@customElement('three-viewer')
export class ThreeViewer extends LitElement {
  @property({ type: String }) image = '';
  @property({ type: String }) product = 'tshirt';
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 300px;
    }
    canvas {
      width: 100%;
      height: 100%;
    }
  `;

  firstUpdated() {
    const canvas = this.renderRoot.querySelector('canvas')!;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.camera.position.z = 2;

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.startAnimation();
  }

  updated(changed: PropertyValues) {
    if (changed.has('image') && this.image && this.cube) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(this.image, texture => {
        this.cube.material = new THREE.MeshBasicMaterial({ map: texture });
      });
    }
  }

  private startAnimation() {
    requestAnimationFrame(() => this.startAnimation());
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return html`<canvas></canvas>`;
  }
}