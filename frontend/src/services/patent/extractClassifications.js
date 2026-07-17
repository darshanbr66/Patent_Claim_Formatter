import {
  get,
  toArray,
} from "../parser/parserHelpers";

/**
 * Extract patent classifications.
 *
 * @param {object} bibliographic
 */
export function extractClassifications(bibliographic) {
  const ipc = toArray(
    get(
      bibliographic,
      "classifications-ipcr.classification-ipcr"
    )
  ).map((item) => ({
    section: item.section ?? null,
    class: item.class ?? null,
    subclass: item.subclass ?? null,
    mainGroup: item["main-group"] ?? null,
    subgroup: item.subgroup ?? null,
    level: item["classification-level"] ?? null,
    value: item["classification-value"] ?? null,
  }));

  const mainCpc = toArray(
    get(
      bibliographic,
      "classifications-cpc.main-cpc.classification-cpc"
    )
  ).map((item) => ({
    section: item.section ?? null,
    class: item.class ?? null,
    subclass: item.subclass ?? null,
    mainGroup: item["main-group"] ?? null,
    subgroup: item.subgroup ?? null,
    value: item["classification-value"] ?? null,
    scheme: item["scheme-origination-code"] ?? null,
  }));

  const furtherCpc = toArray(
    get(
      bibliographic,
      "classifications-cpc.further-cpc.classification-cpc"
    )
  ).map((item) => ({
    section: item.section ?? null,
    class: item.class ?? null,
    subclass: item.subclass ?? null,
    mainGroup: item["main-group"] ?? null,
    subgroup: item.subgroup ?? null,
    value: item["classification-value"] ?? null,
    scheme: item["scheme-origination-code"] ?? null,
  }));

  const national = toArray(
    get(
      bibliographic,
      "classification-national"
    ) ??
      get(
        bibliographic,
        "classifications-national"
      )
  ).map((item) => ({
    country: item.country ?? null,
    mainClassification:
      item["main-classification"] ?? null,
    furtherClassification:
      item["further-classification"] ?? null,
  }));

  return {
    ipc,
    cpc: {
      main: mainCpc,
      further: furtherCpc,
    },
    national,
  };
}