import { EMPLOYEE_NAME } from '../config';

const border = {
  left: { style: 'thin', color: { rgb: 'a5a5a5' } },
  top: { style: 'thin', color: { rgb: 'a5a5a5' } },
  right: { style: 'thin', color: { rgb: 'a5a5a5' } },
  bottom: { style: 'thin', color: { rgb: 'a5a5a5' } },
};

export const reportTitleCell = (v: string) => ({
  v,
  t: 's',
  s: {
    font: {
      sz: 22,
      color: { rgb: '595959' },
    },
    alignment: {
      vertical: 'center',
      horizontal: 'left',
    },
  },
});

export const employeeDescriptionCell = (v: string) => ({
  v,
  t: 's',
  s: {
    font: {
      sz: 10,
      bold: true,
      color: { rgb: 'ffffff' },
    },
    fill: {
      fgColor: { rgb: '222a35' },
    },
    alignment: {
      vertical: 'center',
      horizontal: 'right',
    },
    border,
  },
});

export const employeeValueCell = (v: string) => ({
  v,
  t: 's',
  s: {
    font: {
      sz: 10,
    },
    alignment: {
      vertical: 'center',
      horizontal: 'left',
    },
    border,
  },
});

export const monthDescriptionCell = (v: string) => ({
  v,
  t: 's',
  s: {
    font: {
      sz: 10,
      bold: true,
      color: { rgb: 'ffffff' },
    },
    fill: {
      fgColor: { rgb: '222a35' },
    },
    alignment: {
      vertical: 'center',
      horizontal: 'right',
    },
    border,
  },
});

export const monthValueCell = (v: string) => ({
  v,
  t: 's',
  s: {
    font: {
      sz: 10,
    },
    alignment: {
      vertical: 'center',
      horizontal: 'left',
    },
    border,
  },
});

export const tableHeaderCell = (v: string) => ({
  v: v.toUpperCase(),
  t: 's',
  s: {
    font: {
      bold: true,
      color: { rgb: 'ffffff' },
      sz: 10,
    },
    fill: {
      fgColor: { rgb: '333f4f' },
    },
    alignment: {
      vertical: 'center',
      horizontal: 'center',
    },
    border,
  },
});

export const tableContentCellWithAlternatingColours = (v: any, index: number) => ({
  v,
  t: 's',
  s: {
    font: {
      sz: 9,
    },
    fill: {
      fgColor: { rgb: index % 2 ? 'd9e2f3' : 'ffffff' },
    },
    alignment: {
      vertical: 'center',
      horizontal: 'center',
    },
    border,
  },
});
