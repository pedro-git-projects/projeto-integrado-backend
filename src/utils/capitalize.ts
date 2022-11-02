export const capitalizeFirst = (s: string) =>  s.charAt(0).toUpperCase() + s.slice(1);

export const decapitalizeFirst = (s: string) =>  s.charAt(0).toLowerCase() + s.slice(1);

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
