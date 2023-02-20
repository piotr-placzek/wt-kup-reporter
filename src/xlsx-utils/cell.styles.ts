export type CellStyle = keyof typeof CellStyles;

const commonFontName = 'Century Gothic';

const commonBorderStyle = {
  left: { style: 'thin', color: { rgb: 'a5a5a5' } },
  top: { style: 'thin', color: { rgb: 'a5a5a5' } },
  right: { style: 'thin', color: { rgb: 'a5a5a5' } },
  bottom: { style: 'thin', color: { rgb: 'a5a5a5' } },
};

const Clean = {};

const Title = {
  font: {
    sz: 22,
    bold: true,
    color: { rgb: '595959' },
    name: commonFontName,
  },
  alignment: {
    vertical: 'center',
    horizontal: 'left',
  },
};

const CustomValueDescription = {
  font: {
    sz: 10,
    bold: true,
    color: { rgb: 'ffffff' },
    name: commonFontName,
  },
  fill: {
    fgColor: { rgb: '222a35' },
  },
  alignment: {
    vertical: 'center',
    horizontal: 'right',
  },
  border: commonBorderStyle,
};

const CustomValue = {
  font: {
    sz: 9,
    name: commonFontName,
  },
  alignment: {
    vertical: 'center',
    horizontal: 'left',
  },
  commonBorderStyle,
};

const TableHeader = {
  font: {
    bold: true,
    color: { rgb: 'ffffff' },
    sz: 9,
    name: commonFontName,
  },
  fill: {
    fgColor: { rgb: '333f4f' },
  },
  alignment: {
    vertical: 'center',
    horizontal: 'center',
  },
  commonBorderStyle,
};

const TableCell = {
  font: {
    sz: 9,
    name: commonFontName,
  },
  fill: {
    fgColor: { rgb: 'ffffff' },
  },
  alignment: {
    vertical: 'center',
    horizontal: 'center',
  },
  commonBorderStyle,
};

const TableCellAlternative = {
  font: {
    sz: 9,
    name: commonFontName,
  },
  fill: {
    fgColor: { rgb: 'd9e2f3' },
  },
  alignment: {
    vertical: 'center',
    horizontal: 'center',
  },
  commonBorderStyle,
};

export const CellStyles = {
  Clean,
  Title,
  CustomValueDescription,
  CustomValue,
  TableHeader,
  TableCell,
  TableCellAlternative,
};
