import { 
  EventStoreDBClient,
  jsonEvent,
  FORWARDS, 
  START 
} from "@eventstore/db-client";

const client = EventStoreDBClient.connectionString`esdb://localhost:2113?tls=false`;

export class BaseStream {
  name: string = null;
  //acceptedEvents: IEvent[] = []; eventos aceitos neste stream

  constructor(name: string) {
    this.name = name;
  }

  get events(): Promise<any[]> {
    const events = client.readStream(name, 10, {
      fromRevision: START,
      direction: FORWARDS,
    });
    return events;
  }

  async pushNewEvents(events: any) {
    const event = jsonEvent({
      type: events.constructor.name,
      data: events
    })
    await client.appendToStream(this.name, event);
  }
}
