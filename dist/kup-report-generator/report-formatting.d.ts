export declare const reportTitleCell: (v: string) => {
    v: string;
    t: string;
    s: {
        font: {
            sz: number;
            color: {
                rgb: string;
            };
        };
        alignment: {
            vertical: string;
            horizontal: string;
        };
    };
};
export declare const specialDescriptionCell: (v: string) => {
    v: string;
    t: string;
    s: {
        font: {
            sz: number;
            bold: boolean;
            color: {
                rgb: string;
            };
        };
        fill: {
            fgColor: {
                rgb: string;
            };
        };
        alignment: {
            vertical: string;
            horizontal: string;
        };
        border: {
            left: {
                style: string;
                color: {
                    rgb: string;
                };
            };
            top: {
                style: string;
                color: {
                    rgb: string;
                };
            };
            right: {
                style: string;
                color: {
                    rgb: string;
                };
            };
            bottom: {
                style: string;
                color: {
                    rgb: string;
                };
            };
        };
    };
};
export declare const specialValueCell: (v: string, numFmt?: '0' | '0.00' | '0.00%') => {
    v: string;
    t: string;
    s: {
        font: {
            sz: number;
        };
        alignment: {
            vertical: string;
            horizontal: string;
        };
        border: {
            left: {
                style: string;
                color: {
                    rgb: string;
                };
            };
            top: {
                style: string;
                color: {
                    rgb: string;
                };
            };
            right: {
                style: string;
                color: {
                    rgb: string;
                };
            };
            bottom: {
                style: string;
                color: {
                    rgb: string;
                };
            };
        };
        numFmt: "0" | "0.00" | "0.00%";
    };
};
export declare const tableHeaderCell: (v: string) => {
    v: string;
    t: string;
    s: {
        font: {
            bold: boolean;
            color: {
                rgb: string;
            };
            sz: number;
        };
        fill: {
            fgColor: {
                rgb: string;
            };
        };
        alignment: {
            vertical: string;
            horizontal: string;
        };
        border: {
            left: {
                style: string;
                color: {
                    rgb: string;
                };
            };
            top: {
                style: string;
                color: {
                    rgb: string;
                };
            };
            right: {
                style: string;
                color: {
                    rgb: string;
                };
            };
            bottom: {
                style: string;
                color: {
                    rgb: string;
                };
            };
        };
    };
};
export declare const tableContentCellWithAlternatingColours: (v: any, index: number, vAlign?: 'left' | 'center' | 'right', numFmt?: '0' | '0.00' | '0.00%') => {
    v: any;
    t: string;
    s: {
        font: {
            sz: number;
        };
        fill: {
            fgColor: {
                rgb: string;
            };
        };
        alignment: {
            vertical: "left" | "center" | "right";
            horizontal: string;
        };
        border: {
            left: {
                style: string;
                color: {
                    rgb: string;
                };
            };
            top: {
                style: string;
                color: {
                    rgb: string;
                };
            };
            right: {
                style: string;
                color: {
                    rgb: string;
                };
            };
            bottom: {
                style: string;
                color: {
                    rgb: string;
                };
            };
        };
        numFmt: "0" | "0.00" | "0.00%";
    };
};
export declare const signatureSection: (v: string, colspan: number) => any[];
