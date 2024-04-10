const data = {
  phone: ["phones", "phone", "mobiles", "iphones"],
  accessories: ["accessories", "accessory", "keychains"],
  home: ["all"],
  watch: ["watch", "watches", "iwatches", "digital watches", "analog watches"],
  laptop: ["laptops", "laptop", "imac", "asus", "hp", "dell"],
  tv: ["tv", "television", "televisions", "smart tv", "oled"],
  chair: ["chairs", "chair", "stool", "stools"],
  sofa: ["sofas", "sofa"],
  garden: ["garden", "gardens", "garden products"],
  oven: ["oven", "ovens", "microwave oven", "microwave", "microwaves"],
  fridge: [
    "fridge",
    "fridgerator",
    "refridgerator",
    "refridgerators",
    "fridges",
  ],
  men: [
    "men",
    "mens",
    "men products",
    "men clothes",
    "shirts",
    "shirt",
    "pant",
    "pants",
  ],
  women: [
    "women",
    "womens",
    "women products",
    "women clothes",
    "frocks",
    "tops",
    "legins",
  ],
};

export function findCategory(word) {
  for (const category in data) {
    if (data[category].includes(word)) {
      return category;
    }
  }
  return "Category not found";
}
