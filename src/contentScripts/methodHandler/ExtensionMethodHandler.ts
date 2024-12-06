import { ExtensionResponse, WindowEthereumRequest } from '../types.ts';
import { ACTIONS, EXTENSION_PORT_NAME } from '../../background/constants.ts';
import { ExtensionMethods } from './methods.ts';

export class ExtensionMethodHandler {
  private port: chrome.runtime.Port;

  constructor() {
    console.log("Initializing ExtensionMethodHandler");

    // Establish a persistent connection to the background script
    this.port = chrome.runtime.connect({ name: "extension-handler" });

    // Listen for messages from the background script
    this.port.onMessage.addListener((message: ExtensionResponse) => {
      console.log("Content Script: Received message from background script:", message);
      // Forward the response to the main world
      window.postMessage(message, "*");
    });

    // Reconnect if the port disconnects
    this.port.onDisconnect.addListener(() => {
      console.warn("Content Script: Port disconnected. Reconnecting...");
      this.port = chrome.runtime.connect({ name: "extension-handler" });
    });
  }

  // Sends a request to the background script
  private request(request: WindowEthereumRequest): void {
    console.log("ExtensionMethodHandler:Request", request);

    this.port.postMessage({ action: ACTIONS.PROCESS_REQUEST, request });
  }

  // Handles incoming requests and forwards them to the background
  async handleRequest(request: WindowEthereumRequest): Promise<void> {
    console.log("ExtensionMethodHandler:handleRequest", request);

    switch (request.method) {
      case ExtensionMethods.eth_sendTransaction: {
        this.request(request);
        break;
      }
      default:
        console.error("Unsupported method:", request.method);
    }
  }
}
