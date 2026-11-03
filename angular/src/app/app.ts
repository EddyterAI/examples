import { Component } from '@angular/core';
import { Eddyter } from '@eddyter/angular';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [Eddyter],
  template: `
    <main style="max-width: 900px; margin: 2rem auto; padding: 0 1rem">
      <h1>Eddyter + Angular</h1>
      <p>Plug-and-play AI rich text editor. Start typing below.</p>

      <eddyter
        [apiKey]="apiKey"
        [(value)]="content"
        [user]="currentUser"
        mode="edit"
        [toolbar]="{ mode: 'static' }"
        [mentionUserList]="['Alice', 'Bob', 'Charlie']"
        (ready)="onReady()"
        (authSuccess)="onAuthSuccess()"
        (authError)="onAuthError($event)"
      />

      <details style="margin-top: 1.5rem">
        <summary>Current HTML</summary>
        <pre style="white-space: pre-wrap">{{ content }}</pre>
      </details>
    </main>
  `,
})
export class App {
  apiKey = environment.eddyterApiKey;
  content = '<p>Start writing... try selecting text and clicking <strong>Ask AI</strong>.</p>';
  currentUser = { id: 'user-123', name: 'Jane Doe', email: 'jane@example.com' };

  onReady() {
    console.log('Editor ready');
  }

  onAuthSuccess() {
    console.log('Authenticated');
  }

  onAuthError(message: string) {
    console.error('Editor auth failed:', message);
  }
}
