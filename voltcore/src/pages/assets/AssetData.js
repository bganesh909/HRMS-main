const itAssetList = [
  // Headphones (11 total)
  { assetId: "HP001", assetName: "Headphones", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "HP002", assetName: "Headphones", status: "Assigned", assignedTo: "Alice", assignedDate: "2025-02-14" },
  { assetId: "HP003", assetName: "Headphones", status: "In Repair", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "HP004", assetName: "Headphones", status: "Lost", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "HP005", assetName: "Headphones", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "HP006", assetName: "Headphones", status: "Assigned", assignedTo: "John", assignedDate: "2025-01-10" },
  { assetId: "HP007", assetName: "Headphones", status: "Retired", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "HP008", assetName: "Headphones", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "HP009", assetName: "Headphones", status: "Assigned", assignedTo: "Sara", assignedDate: "2025-03-22" },
  { assetId: "HP010", assetName: "Headphones", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "HP011", assetName: "Headphones", status: "In Repair", assignedTo: "N/A", assignedDate: "N/A" },

  // Charger (10 total)
  { assetId: "CH001", assetName: "Charger", status: "Assigned", assignedTo: "Bob", assignedDate: "2025-03-12" },
  { assetId: "CH002", assetName: "Charger", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "CH003", assetName: "Charger", status: "Retired", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "CH004", assetName: "Charger", status: "Lost", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "CH005", assetName: "Charger", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "CH006", assetName: "Charger", status: "Assigned", assignedTo: "Liam", assignedDate: "2025-04-05" },
  { assetId: "CH007", assetName: "Charger", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "CH008", assetName: "Charger", status: "In Repair", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "CH009", assetName: "Charger", status: "Assigned", assignedTo: "Noah", assignedDate: "2025-04-10" },
  { assetId: "CH010", assetName: "Charger", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },

  // Mouse (12 total)
  { assetId: "MO001", assetName: "Mouse", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "MO002", assetName: "Mouse", status: "Assigned", assignedTo: "Clara", assignedDate: "2025-04-01" },
  { assetId: "MO003", assetName: "Mouse", status: "In Repair", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "MO004", assetName: "Mouse", status: "Retired", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "MO005", assetName: "Mouse", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "MO006", assetName: "Mouse", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "MO007", assetName: "Mouse", status: "Assigned", assignedTo: "Elena", assignedDate: "2025-03-15" },
  { assetId: "MO008", assetName: "Mouse", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "MO009", assetName: "Mouse", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "MO010", assetName: "Mouse", status: "Assigned", assignedTo: "Zara", assignedDate: "2025-02-25" },
  { assetId: "MO011", assetName: "Mouse", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "MO012", assetName: "Mouse", status: "Lost", assignedTo: "N/A", assignedDate: "N/A" },

  // Laptop (20 total)
  { assetId: "LP001", assetName: "Laptop", status: "Assigned", assignedTo: "David", assignedDate: "2025-01-20" },
  { assetId: "LP002", assetName: "Laptop", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "LP003", assetName: "Laptop", status: "In Repair", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "LP004", assetName: "Laptop", status: "Retired", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "LP005", assetName: "Laptop", status: "Lost", assignedTo: "N/A", assignedDate: "N/A" },
  // Add 15 more laptops with various status combinations
  ...Array.from({ length: 15 }, (_, i) => ({
    assetId: `LP${String(i + 6).padStart(3, "0")}`,
    assetName: "Laptop",
    status: i % 5 === 0 ? "Assigned" : i % 5 === 1 ? "Available" : i % 5 === 2 ? "Retired" : i % 5 === 3 ? "Lost" : "In Repair",
    assignedTo: i % 5 === 0 ? `User${i + 1}` : "N/A",
    assignedDate: i % 5 === 0 ? `2025-03-${String((i % 28) + 1).padStart(2, "0")}` : "N/A",
  })),

  // Keyboard (11 total)
  { assetId: "KB001", assetName: "Keyboard", status: "Assigned", assignedTo: "Eva", assignedDate: "2025-05-01" },
  { assetId: "KB002", assetName: "Keyboard", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "KB003", assetName: "Keyboard", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "KB004", assetName: "Keyboard", status: "Retired", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "KB005", assetName: "Keyboard", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "KB006", assetName: "Keyboard", status: "Assigned", assignedTo: "Aria", assignedDate: "2025-04-20" },
  { assetId: "KB007", assetName: "Keyboard", status: "Lost", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "KB008", assetName: "Keyboard", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "KB009", assetName: "Keyboard", status: "In Repair", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "KB010", assetName: "Keyboard", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
  { assetId: "KB011", assetName: "Keyboard", status: "Available", assignedTo: "N/A", assignedDate: "N/A" },
];

export default itAssetList;