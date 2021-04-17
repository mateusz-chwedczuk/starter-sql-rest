export class ResultValue<TR, TP = undefined> {
  public type: TR;
  public payload?: TP;

  constructor(type: TR, payload?: TP) {
    this.type = type;
    this.payload = payload;
  }
}
