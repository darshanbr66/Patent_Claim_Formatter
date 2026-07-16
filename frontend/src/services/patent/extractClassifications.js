export  function extractClassifications(biblio) {
  const result = {
    ipc: [],
    cpc: {
      main: [],
      further: [],
    },
    national: [],
  };

  // =========================
  // IPC
  // =========================
  const ipcList = biblio["classifications-ipcr"]?.["classification-ipcr"];

  if (ipcList) {
    const arr = Array.isArray(ipcList) ? ipcList : [ipcList];

    result.ipc = arr.map((ipc) => ({
      section: ipc.section,
      class: ipc.class,
      subclass: ipc.subclass,
      mainGroup: ipc["main-group"],
      subgroup: ipc.subgroup,
      level: ipc["classification-level"],
      value: ipc["classification-value"],
    }));
  }

  // =========================
  // CPC Main
  // =========================
  const mainCpc =
    biblio["classifications-cpc"]?.["main-cpc"]?.["classification-cpc"];

  if (mainCpc) {
    const arr = Array.isArray(mainCpc) ? mainCpc : [mainCpc];

    result.cpc.main = arr.map((cpc) => ({
      section: cpc.section,
      class: cpc.class,
      subclass: cpc.subclass,
      mainGroup: cpc["main-group"],
      subgroup: cpc.subgroup,
      value: cpc["classification-value"],
      scheme: cpc["scheme-origination-code"],
    }));
  }

  // =========================
  // CPC Further
  // =========================
  const furtherCpc =
    biblio["classifications-cpc"]?.["further-cpc"]?.["classification-cpc"];

  if (furtherCpc) {
    const arr = Array.isArray(furtherCpc) ? furtherCpc : [furtherCpc];

    result.cpc.further = arr.map((cpc) => ({
      section: cpc.section,
      class: cpc.class,
      subclass: cpc.subclass,
      mainGroup: cpc["main-group"],
      subgroup: cpc.subgroup,
      value: cpc["classification-value"],
      scheme: cpc["scheme-origination-code"],
    }));
  }

  // =========================
  // National Classification
  // (older patents only)
  // =========================
  const national =
    biblio["classification-national"] ||
    biblio["classifications-national"];

  if (national) {
    const arr = Array.isArray(national) ? national : [national];

    result.national = arr.map((item) => ({
      country: item.country,
      mainClassification: item["main-classification"],
      furtherClassification: item["further-classification"],
    }));
  }

  return result;
}