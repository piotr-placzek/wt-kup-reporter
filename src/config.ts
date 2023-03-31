export const TIMEZONE: string = process.env.TIMEZONE;
export const PROJECT_NAME: string = process.env.PROJECT_NAME;
export const WAKATIME_API_KEY: string = process.env.WAKATIME_API_KEY;
export const EMPLOYEE_NAME: string = process.env.EMPLOYEE_NAME;
export const BUSINESS_DAYS: number[] = process.env.BUSINESS_DAYS?.split(',').map((d) => +d);
export const HOURS_PER_DAY: number = +process.env.HOURS_PER_DAY;
