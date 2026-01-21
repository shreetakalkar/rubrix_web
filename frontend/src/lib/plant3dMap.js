export const PLANT_3D_MODELS = {
  ashvagandha: "/models/ashvagandha.glb",
  tulasi: "/models/tulasi.glb",
  brahmi: "/models/brahmi.glb",
  haridra: "/models/haridra.glb",
  kumari: "/models/kumari.glb",
  amalaki: "/models/amalaki.glb",
};

export function normalizePlantKey(name = "") {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "") // remove brackets
    .replace(/\s+/g, "")     // remove spaces
    .trim();
}
