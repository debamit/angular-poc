import { Component, ViewChild, ElementRef }from '@angular/core';

// @Component({
//   selector: 'app-root',
//   template: `<h1>Hello world!</h1>`,
//   // templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'home';
// }

@Component({
  selector: 'app-counter',
  template: `
    <h2>Counter: {{ count }}</h2>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <button (click)="toggleReactApp()">Open React App</button>
  `,
})
export class CounterComponent {
  count: number = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  toggleReactApp() {
    const iframe = document.getElementById('reactAppIframe') as HTMLIFrameElement;
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';

    // const reactAppUrl = "/react-app/bundle.js"; // Replace with the actual path to your React app's bundle file
    // iframe.src = reactAppUrl;
    this.sendMessageToReact(this.count);
  }

  onClose(updatedCount: number) {
    console.log('onClose', updatedCount);
    // Update the count received from the React app
    this.count = updatedCount;
    // Perform any other necessary actions

    // Hide the React app
    const iframe = document.getElementById('reactAppIframe') as HTMLIFrameElement;
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
  }

  sendMessageToReact(count: number) {
    const iframe = document.getElementById('reactAppIframe') as HTMLIFrameElement;
    const message = {
      count: count,
    };
    iframe.contentWindow?.postMessage(message, '*');
  }

  ngAfterViewInit() {
    window.addEventListener('message', (event) => {
      const message = event.data;
      if (message && message.count && message.onClose) {
        this.onClose(message.count);
      }
    });
  }
}

// @Component({
//   selector: 'app-react-iframe',
//   template: `
//     <iframe src="/react-app/index.html"></iframe>
//   `,
// })
// export class ReactIframeComponent {}