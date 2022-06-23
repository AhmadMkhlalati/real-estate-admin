import config from "@/config";

export default {
  items: [
    { text: "أنواع العقارات", value: 0 },
    { text: "نوع العرض", value: 1 },
    { text: "نوع العقد", value: 2 },
  ],
  api: {
    one: "statistic/getAll",
    tow: "statistic/visitsMoreThanX/1",
    three: "statistic/estateOrders",
    fourth: "applicationRating/getAll",
  },
  apexPieEstates: {
    options: {
      dataLabels: {
        enabled: true,
      },
      chart: {
        width: 20,
      },
      colors: [
        config.light.primary,
        config.light.secondary,
        config.light.success,
        config.light.warning,
        config.light.info,
      ],
      labels: ["المنازل", "المحلات", "الاراضي", "المزارع", "أصطياف"],
      legend: {},
    },
  },
  apexPieSaleOrRent: {
    options: {
      dataLabels: {
        enabled: true,
      },
      chart: {
        width: 20,
      },
      colors: [config.light.primary, config.light.secondary],
      labels: ["بيع", "أجار"],
      legend: {},
    },
  },
  apexPieContract: {
    options: {
      dataLabels: {
        enabled: true,
      },
      chart: {
        width: 20,
      },
      colors: [
        config.light.primary,
        config.light.secondary,
        config.light.success,
        config.light.warning,
      ],
      labels: ["مجاني", " برونزي", "فضي", "ذهبي"],
      legend: {},
    },
  },
  apexPieRating: {
    options: {
      dataLabels: {
        enabled: true,
      },
      chart: {
        width: 20,
      },
      colors: [config.light.primary,config.light.success,config.light.warning,],
      labels: ["جيد", "متوسط", "سيئ"],
      legend: {},
    },
  },
};
