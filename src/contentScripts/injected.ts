import { addWindowMessageListener } from '../background/messagePassing/messageUtils.ts';
import { isValidWindowEthereumRequest, WindowEthereumRequest } from './types.ts';
import { isExtensionMethod } from './methodHandler/methods.ts';
import { ExtensionMethodHandler } from './methodHandler/ExtensionMethodHandler.ts';


const extensionMethodHandler = new ExtensionMethodHandler()
addWindowMessageListener<WindowEthereumRequest>(isValidWindowEthereumRequest, async (request, source) => {
  if (isExtensionMethod(request.method)){
    await extensionMethodHandler.handleRequest(request)
  }
  return
})

