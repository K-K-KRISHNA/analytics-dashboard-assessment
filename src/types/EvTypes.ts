export interface EVColumns {
  vin: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  modalYear: string;
  make: string;
  model: string;
  eat: string;
  cafv: string;
  range: string;
  baseMsrp: string;
  district: string;
  vehicleID: string;
  vehicleLocation: string;
  electricUtility: string;
  censusTract: string;
}

export interface TableColumn {
  key: keyof EVColumns;
  text: string;
}

type EVColumnsKeys = keyof EVColumns;

export const evColumnsKeys: EVColumnsKeys[] = [
  "vin",
  "country",
  "city",
  "state",
  "zipCode",
  "modalYear",
  "make",
  "model",
  "eat",
  "cafv",
  "range",
  "baseMsrp",
  "district",
  "vehicleID",
  "vehicleLocation",
  "electricUtility",
  "censusTract",
];

export interface EVTableProps {
  columns: TableColumn[];
  data: EVColumns[];
}

export const columns: EVTableProps["columns"] = [
  {
    key: "vin",
    text: "VIN",
  },
  {
    key: "country",
    text: "County",
  },
  {
    key: "city",
    text: "City",
  },
  {
    key: "zipCode",
    text: "Postal Code",
  },
  {
    key: "modalYear",
    text: "Modal Year",
  },
  {
    key: "make",
    text: "Make",
  },
  {
    key: "model",
    text: "Model",
  },
  {
    key: "range",
    text: "Electric Range",
  },
  {
    key: "vehicleID",
    text: "DOL Vehicle ID",
  },
];

export type SortByTypes =
  | "SORT_BY_MODAL_YEAR_LOW_TO_HIGH"
  | "SORT_BY_MODAL_YEAR_HIGH_TO_LOW"
  | "SORT_BY_RANGE_LOW_TO_HIGH"
  | "SORT_BY_RANGE_HIGH_TO_LOW"
  | "NONE";
