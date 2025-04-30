/* eslint-disable @typescript-eslint/no-explicit-any */
export function calculateExp(dob: any) {
  // Calculate the difference in milliseconds between the current date and the provided date of birth
  const diff_ms = Date.now() - dob.getTime();
  // Create a new Date object representing the difference in milliseconds and store it in the variable age_dt (age Date object)
  const age_dt = new Date(diff_ms);

  // Calculate the absolute value of the difference in years between the age Date object and the year 1970 (UNIX epoch)
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export function capitalizeFirstLetter(str: string) {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
