// ======================================================
// FLOOD MONITORING DASHBOARD
// Live Data: Flask REST API → Blynk → ESP32
// ======================================================


// ================= GET HTML ELEMENTS =================

const waterLevelElement = document.getElementById("waterLevel");
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");

const floodStatusElement = document.getElementById("floodStatus");
const lastUpdatedElement = document.getElementById("lastUpdated");

const waterProgressElement = document.getElementById("waterProgress");


// ================= FLASK API =================

// Flask server
const API_URL = "http://192.168.1.16:5000/api/sensor-data";


// ================= CHART DATA =================

const chartLabels = [];
const waterLevelData = [];


// ================= CREATE CHART =================

const chartCanvas =
    document.getElementById("waterLevelChart");

const waterLevelChart = new Chart(chartCanvas, {

    type: "line",

    data: {

        labels: chartLabels,

        datasets: [

            {
                label: "Water Level (%)",

                data: waterLevelData,

                borderColor: "#ff1493",

                backgroundColor: "rgba(255, 20, 147, 0.10)",

                borderWidth: 3,

                tension: 0.35,

                fill: true,

                pointRadius: 4,

                pointHoverRadius: 7
            }
        ]
    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                labels: {

                    color: "#ffffff"

                }

            }

        },

        scales: {

            x: {

                ticks: {

                    color: "#9696a0"

                },

                grid: {

                    color: "#24242a"

                }

            },

            y: {

                min: 0,

                max: 100,

                ticks: {

                    color: "#9696a0",

                    callback: function(value) {

                        return value + "%";

                    }

                },

                grid: {

                    color: "#24242a"

                }

            }

        }

    }

});


// ================= UPDATE DASHBOARD =================

function updateDashboard(data) {

    // Water Level
    waterLevelElement.textContent =
        Math.round(data.water_level);

    // Temperature
    temperatureElement.textContent =
        Math.round(data.temperature);

    // Humidity
    humidityElement.textContent =
        Math.round(data.humidity);

    // Flood Status
    floodStatusElement.textContent =
        data.status;

    // Water Progress Bar
    waterProgressElement.style.width =
        data.water_level + "%";

    // Last Updated
    lastUpdatedElement.textContent =
        new Date().toLocaleTimeString();

    // Update Status Appearance
    updateFloodStatus(data.status);

    // Update Chart
    updateChart(data.water_level);
}


// ================= FLOOD STATUS =================

function updateFloodStatus(status) {

    const banner =
        document.querySelector(".danger-banner");

    if (!banner) return;


    if (status === "NORMAL") {

        floodStatusElement.style.color =
            "#22c55e";

        banner.style.borderColor =
            "rgba(34, 197, 94, 0.4)";
    }

    else if (status === "WARNING") {

        floodStatusElement.style.color =
            "#facc15";

        banner.style.borderColor =
            "rgba(250, 204, 21, 0.4)";
    }

    else if (status === "DANGER") {

        floodStatusElement.style.color =
            "#ef4444";

        banner.style.borderColor =
            "rgba(239, 68, 68, 0.5)";
    }
}


// ================= UPDATE CHART =================

function updateChart(waterLevel) {

    const currentTime =
        new Date().toLocaleTimeString();

    chartLabels.push(currentTime);
    waterLevelData.push(waterLevel);


    // Keep only last 10 readings

    if (chartLabels.length > 10) {

        chartLabels.shift();
        waterLevelData.shift();

    }


    waterLevelChart.update();

}


// ================= FETCH LIVE DATA =================

async function fetchSensorData() {

    try {

        const response =
            await fetch(API_URL);

        if (!response.ok) {

            throw new Error(
                "API Error: " + response.status
            );

        }


        const data =
            await response.json();


        console.log("Live Sensor Data:", data);


        // Update dashboard

        updateDashboard(data);


    }

    catch (error) {

        console.error(
            "Unable to fetch sensor data:",
            error
        );

    }

}


// ================= INITIAL DATA =================

fetchSensorData();


// ================= LIVE UPDATE =================

// Fetch new Blynk data every 2 seconds

setInterval(
    fetchSensorData,
    2000
);