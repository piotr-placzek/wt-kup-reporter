export type CellStyle = keyof typeof CellStyles;

const commonBorderStyle = {
  left: { style: 'thin', color: { rgb: 'a5a5a5' } },
  top: { style: 'thin', color: { rgb: 'a5a5a5' } },
  right: { style: 'thin', color: { rgb: 'a5a5a5' } },
  bottom: { style: 'thin', color: { rgb: 'a5a5a5' } },
};

const Title = {
  font: {
    sz: 22,
    color: { rgb: '595959' },
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
      sz: 10,
    },
    alignment: {
      vertical: 'center',
      horizontal: 'left',
    },
    commonBorderStyle,
}
  
const TableHeader = {
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
  commonBorderStyle,
};

export const CellStyles = {
    Title,
    CustomValueDescription,
    CustomValue,
    TableHeader
};
