export function changeSalary(salary: number) {
  if (salary < 1000) {
    return `${salary}`;
  } else if (salary >= 1000 && salary < 1000000) {
    return `${salary / 1000}K`;
  } else if (salary >= 1000000 && salary < 1000000000) {
    return `${salary / 1000000}M`;
  } else return `${salary / 1000000000}B`;
}
