interface CropData {
  Country: string;
  Year: number;
  CropName: string;
  CropProduction: number | null;
  Yield: number | null;
  Area: number | null;
}

interface AggregatedData {
  year: number;
  maxProductionCrop: string;
  minProductionCrop: string;
}

interface CropAverageData {
  cropName: string;
  averageYield: number;
  averageArea: number;
}

const parseData = (rawData: any[]): CropData[] => {
  return rawData.map(item => ({
    Country: item.Country,
    Year: parseInt(item.Year.split(',')[1]),
    CropName: item["Crop Name"],
    CropProduction: item["Crop Production (UOM:t(Tonnes))"] ? parseFloat(item["Crop Production (UOM:t(Tonnes))"]) : null,
    Yield: item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] ? parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) : null,
    Area: item["Area Under Cultivation (UOM:Ha(Hectares))"] ? parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) : null
  }));
};

const aggregateData = (data: CropData[]): { yearWiseData: AggregatedData[], cropAverageData: CropAverageData[] } => {
  const yearWiseData: AggregatedData[] = [];
  const cropDataMap: { [key: string]: { totalYield: number, totalArea: number, count: number } } = {};

  const years = Array.from(new Set(data.map(item => item.Year)));
  years.forEach(year => {
    const cropsInYear = data.filter(item => item.Year === year);
    let maxProduction = -Infinity;
    let minProduction = Infinity;
    let maxProductionCrop = '';
    let minProductionCrop = '';

    cropsInYear.forEach(crop => {
      if (crop.CropProduction !== null) {
        if (crop.CropProduction > maxProduction) {
          maxProduction = crop.CropProduction;
          maxProductionCrop = crop.CropName;
        }
        if (crop.CropProduction < minProduction) {
          minProduction = crop.CropProduction;
          minProductionCrop = crop.CropName;
        }
      }

      if (!cropDataMap[crop.CropName]) {
        cropDataMap[crop.CropName] = { totalYield: 0, totalArea: 0, count: 0 };
      }
      if (crop.Yield !== null) {
        cropDataMap[crop.CropName].totalYield += crop.Yield;
      }
      if (crop.Area !== null) {
        cropDataMap[crop.CropName].totalArea += crop.Area;
      }
      cropDataMap[crop.CropName].count += 1;
    });

    yearWiseData.push({
      year,
      maxProductionCrop,
      minProductionCrop
    });
  });

  const cropAverageData: CropAverageData[] = Object.keys(cropDataMap).map(cropName => ({
    cropName,
    averageYield: cropDataMap[cropName].totalYield / cropDataMap[cropName].count,
    averageArea: cropDataMap[cropName].totalArea / cropDataMap[cropName].count
  }));

  return { yearWiseData, cropAverageData };
};

export type { CropData, AggregatedData, CropAverageData };
export { parseData, aggregateData };
