import {interfaces} from "omni-chat";
import {Subject, BehaviorSubject} from 'rxjs';
import {uuid} from "../utils";

export type LibMessage = interfaces.MessageInterface;

export class ObservableMessage {
  body: Subject<string> = new BehaviorSubject<string>(null);

  libMessage: any; // ocLib.interfaces.Message

  constructor (libMessage: LibMessage) {
    this.libMessage = libMessage;
    this.load();
  }

  // Force a reload
  load () {
    this.body.next(uuid("message-body"));
    // this.libMessage.getBody().then(body => this.body.next(body));
  }
}

let messages: {[id: string]: ObservableMessage} = {};
export function wrapMessages (libMessage: LibMessage): ObservableMessage {
  let id: string = libMessage.getGlobalIdSync();
  if (!(id in messages)) {
    messages[id] = new ObservableMessage(libMessage);
  }
  return messages[id];
}