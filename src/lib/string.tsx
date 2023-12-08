export function toHumanReadableLabel(camelCaseLabel: string) {
  return camelCaseLabel
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });
}
