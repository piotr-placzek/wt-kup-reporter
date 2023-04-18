export const TIMEZONE: string = process.env.TIMEZONE || 'Europe/Warsaw';
export const REPORTS_STORAGE_PATH = process.env.REPORTS_STORAGE_PATH || './reports';
export const PROJECTS: string[] = process.env.PROJECTS?.split(',') || ['General'];
export const WAKATIME_API_KEY: string = process.env.WAKATIME_API_KEY || '';
export const EMPLOYEE_NAME: string = process.env.EMPLOYEE_NAME || '';
export const BUSINESS_DAYS: number[] = process.env.BUSINESS_DAYS?.split(',').map((d) => +d);
export const HOURS_PER_DAY: number = process.env.HOURS_PER_DAY ? +process.env.HOURS_PER_DAY : 8;
