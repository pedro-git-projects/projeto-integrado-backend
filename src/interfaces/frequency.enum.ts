export enum Frequency {
		Recurring = "Recurring",
		OneTime = "OneTime"
};

export const camelCaseFrequency = (s: string) => {
  switch(s) {
    case("onetime"):
      s = "OneTime";
      return s;
    case("recurring"):
      s = "Recurring";
      return s;
    default:
      return s;
  }
}
