
export class WebSocketRelay {
    
    ws: WebSocket
    
    constructor() {
        this.ws = new WebSocket("ws://localhost:8765/");
        // can send messages with this.ws.send("yourmessage")
        // TODO accept an arbitrary callback function as a parameter.
    }

    start() {
        this.ws.addEventListener("open", this.onOpen);
        this.ws.addEventListener("message", this.onMessageReceived);
        this.ws.addEventListener("close", this.onClose);
        this.ws.addEventListener("error", this.onError);
    }

    onOpen(event: Event) {

    }

    onMessageReceived(event: MessageEvent<any>) {
        //event.data is how you can access the message
        // a callback should be triggered (an arbitrary function passed in to the constructor.)
    }

    onClose(event: CloseEvent) {
        // should try to reconnect
    }

    onError(event: Event) {
        // Log the error
    }

    // TODO should add an is_connected function to query if the server is connecetd

    sendMessage(message: Uint8Array) {
        this.ws.send(message)
    }


}