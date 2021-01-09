export interface IEvent<TData> {
  type: string;
  data: TData;
  timestamp: Date;
}

export default class BaseEvent<TData> implements IEvent<TData> {
  readonly type: string;
  readonly data: TData;
  readonly timestamp: Date;

  constructor(data: TData) {
    this.type = data.constructor.name;
    this.data = data;
    this.timestamp = new Date();
  }
}
