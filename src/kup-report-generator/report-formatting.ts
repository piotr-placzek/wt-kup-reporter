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

export const specialDescriptionCell = (v: string) => ({
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

export const specialValueCell = (
  v: string | number,
  type: 's' | 'n' = 's',
  numFmt: '0' | '0.00' | '0.00%' = '0',
  formula?: string
) => ({
  v,
  t: type,
  f: formula,
  s: {
    font: {
      sz: 10,
    },
    alignment: {
      vertical: 'center',
      horizontal: 'left',
    },
    border,
    numFmt,
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

export const tableContentCellWithAlternatingColours = (
  v: string | number,
  index: number,
  hAlign: 'left' | 'center' | 'right' = 'center',
  type: 's' | 'n' = 's',
  numFmt: '0' | '0.00' | '0.00%' = '0',
  formula?: string
) => ({
  v,
  t: type,
  f: formula,
  s: {
    font: {
      sz: 9,
    },
    fill: {
      fgColor: { rgb: index % 2 ? 'd9e2f3' : 'ffffff' },
    },
    alignment: {
      vertical: 'center',
      horizontal: hAlign,
    },
    border,
    numFmt,
  },
});

export const signatureSection = (v: string, colspan: number) => {
  const signaturePlaceholder = [];
  for (let i = 0; i < colspan; i++) {
    signaturePlaceholder.push({
      v: '',
      t: 's',
      s: {
        border: {
          bottom: { style: 'thin', color: { rgb: 'a5a5a5' } },
        },
      },
    });
  }
  return [specialDescriptionCell(v), ...signaturePlaceholder];
};
