import echarts from "echarts/lib/echarts";
import "echarts";
export default (domId, title, legend, data) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  myChartcount.setOption({
    title: {
      text: title,
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      left: "center",
      top: "bottom",
      data: legend,
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: {
          show: true,
          type: ["pie", "funnel"],
        },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        showval: true,
        name: "共计",
        type: "pie",
        radius: "50%",
        center: ["50%", "50%"],
        // roseType: 'area',
        label: {
          formatter: "{b}: {@2012}",
        },
        data: data,
      },
    ],
  });
};
