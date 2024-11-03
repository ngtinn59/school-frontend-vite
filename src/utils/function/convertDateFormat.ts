export default function convertDateFormat(
  name: string,
  value: string,
  date: string
) {
  const [year, month, day] = date.split("-");
  switch (name) {
    case "start-month":
      return `${year}-${value}-${day}`;
    case "start-year":
      return `${value}-${month}-${day}`;
    case "end-month":
      return `${year}-${value}-${day}`;
    case "end-year":
      return `${value}-${month}-${day}`;
    default:
      return date;
  }
}
