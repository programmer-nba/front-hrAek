<template>
  <div class="flex flex-col">
    <div class="flex md:flex-row flex-col w-full md:w-auto">
      <div class="px-4 rounded-2xl bg-white flex flex-col">
        <h2 class="text-center">
          กราฟจำนวนครั้งที่เข้าชม ({{
            selectedSumviewsChart === null ? totalViews : selectedSumviewsChart
          }})
        </h2>
        <canvas id="viewsChart" width="400" height="400"></canvas>
      </div>

      <div class="px-4 rounded-2xl bg-white flex flex-col">
        <h2 class="text-center">
          กราฟจำนวนผู้สมัคร ({{
            selectedSumapplicantsChart === null
              ? totalApplicants
              : selectedSumapplicantsChart
          }})
        </h2>
        <canvas id="applicantsChart" width="400" height="400"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import axios from "axios";

export default {
  data() {
    return {
      selectedDate: new Date().toISOString().slice(0, 10),
      selectedSumviewsChart: null,
      selectedSumapplicantsChart: null,
      viewsChartInstance: null,
      applicantsChartInstance: null,
      totalViews: 0,
      totalApplicants: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.renderCharts();
    });
  },
  methods: {
    async clearCharts() {
      if (this.viewsChartInstance) {
        this.viewsChartInstance.destroy();
        this.viewsChartInstance = null;
      }
      if (this.applicantsChartInstance) {
        this.applicantsChartInstance.destroy();
        this.applicantsChartInstance = null;
      }
    },
    async renderCharts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_POST}/post/getall`
        );
        const posts = response.data.data;

        this.totalViews = posts.reduce(
          (sum, post) => sum + post.views.length,
          0
        );
        this.totalApplicants = posts.reduce(
          (sum, post) => sum + post.applicants.length,
          0
        );

        const viewsCtx = document.getElementById("viewsChart").getContext("2d");
        this.viewsChartInstance = new Chart(viewsCtx, {
          type: "bar",
          data: {
            labels: [
              "Total Views",
              ...posts.map((post) => {
                const postDate = new Date(post.post_date);
                return `${post.company} - ${postDate.toLocaleString("en-US", {
                  month: "long",
                })}`;
              }),
            ],

            datasets: [
              {
                label: `จำนวน${
                  this.selectedSumviewsChart === null
                    ? "ผลรวมจำนวนครั้งที่เข้าชม"
                    : this.selectedSumviewsChart
                }`,
                data: [
                  this.totalViews,
                  ...posts.map((post) => post.views.length),
                ],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },

          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
              x: {
                title: {
                  display: true,
                  text: "Month",
                },
              },
            },
            plugins: {
              datalabels: {
                anchor: "end",
                align: "end",
                formatter: (value, context) => {
                  return value;
                },
              },
            },
          },
        });

        const applicantsCtx = document
          .getElementById("applicantsChart")
          .getContext("2d");
        this.applicantsChartInstance = new Chart(applicantsCtx, {
          type: "bar",
          data: {
            labels: [
              "Total Applicants",
              ...posts.map((post) => {
                const postDate = new Date(post.post_date);
                return `${post.company} - ${postDate.toLocaleString("en-US", {
                  month: "long",
                })}`;
              }),
            ],
            datasets: [
              {
                label: `จำนวน${
                  this.selectedSumapplicantsChart === null
                    ? "ผลรวมจำนวนผู้สมัคร"
                    : this.selectedSumapplicantsChart
                }`,
                data: [
                  this.totalApplicants,
                  ...posts.map((post) => post.applicants.length),
                ],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },

          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
              x: {
                title: {
                  display: true,
                  text: "Month",
                },
              },
            },
            plugins: {
              datalabels: {
                anchor: "end",
                align: "end",
                formatter: (value, context) => {
                  return value;
                },
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async updateChart() {
      try {
        await this.clearCharts();
        const startDate = this.selectedDate;
        let apiUrl = `${import.meta.env.VITE_API_POST}/post`;
        if (startDate) {
          apiUrl += `?startDate=${startDate}`;
        }
        const response = await axios.get(apiUrl);
        const posts = response.data.data;

        this.totalViews = posts.reduce(
          (sum, post) => sum + post.views.length,
          0
        );
        this.totalApplicants = posts.reduce(
          (sum, post) => sum + post.applicants.length,
          0
        );

        this.viewsChartInstance.data.labels = [
          "Total Views",
          ...posts.map((post) => {
            const postDate = new Date(post.post_date);
            return `${post.company} - ${postDate.toLocaleString("en-US", {
              month: "long",
            })}`;
          }),
        ];
        this.viewsChartInstance.data.datasets[0].data = [
          this.totalViews,
          ...posts.map((post) => post.views.length),
        ];

        this.viewsChartInstance.data.datasets[0].label = `จำนวน${
          this.selectedSumviewsChart === null
            ? "ผลรวมจำนวนครั้งที่เข้าชม"
            : this.selectedSumviewsChart
        }`;
        this.viewsChartInstance.update();

        this.applicantsChartInstance.data.labels = [
          "Total Applicants",
          ...posts.map((post) => {
            const postDate = new Date(post.post_date);
            return `${post.company} - ${postDate.toLocaleString("en-US", {
              month: "long",
            })}`;
          }),
        ];
        this.applicantsChartInstance.data.datasets[0].data = [
          this.totalApplicants,
          ...posts.map((post) => post.applicants.length),
        ];

        this.applicantsChartInstance.data.datasets[0].label = `จำนวน${
          this.selectedSumapplicantsChart === null
            ? "ผลรวมจำนวนผู้สมัคร"
            : this.selectedSumapplicantsChart
        }`;
        this.applicantsChartInstance.update();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>
