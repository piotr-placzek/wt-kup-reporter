import { CellObject, ExcelDataType } from 'xlsx-js-style/types';
import { CellStyle, CellStyles } from './cell.styles';

export class Cell {
  private readonly cell: CellObject;

  constructor(t: ExcelDataType) {
    this.cell = { t };
  }

  get value(): CellObject {
    return this.cell;
  }

  public setData(v: string | number | boolean | Date): Cell {
    this.cell.v = v;
    return this;
  }

  public setFormula(f: string): Cell {
    this.cell.f = f;
    return this;
  }

  public setPredefinedStyle(s: CellStyle): Cell {
    this.cell.s = CellStyles[s];
    return this;
  }

  public setNumberFormat(numFmt: '0' | '0.00' | '0.00%'): Cell {
    this.cell.s = {
      ...this.cell.s,
      numFmt,
    };
    return this;
  }

  public setHorizontalAlignment(ha: 'left' | 'center' | 'right'): Cell {
    this.cell.s = {
      ...this.cell.s,
      alignment: {
        ...this.cell.s.alignment,
        horizontal: ha,
      },
    };
    return this;
  }

  public setVerticalAlignment(va: 'left' | 'center' | 'right'): Cell {
    this.cell.s = {
      ...this.cell.s,
      alignment: {
        ...this.cell.s?.alignment,
        vertical: va,
      },
    };
    return this;
  }
}
