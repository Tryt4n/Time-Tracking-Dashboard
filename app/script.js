const btnsTime = document.querySelectorAll("[data-btn-time]");
const timesSpend = document.querySelectorAll("[data-time]");
const timesLastSpend = document.querySelectorAll("[data-last-time]");

const URL = "data.json";

fetch(URL)
  .then((response) => {
    return response.json();
  })
  .then((dataTimes) => {
    const activeBtn = document.querySelector("[disabled][data-btn-time]");
    const activeBtnText = activeBtn.textContent.toLowerCase();

    timesSpend.forEach((timeSpend) => {
      let title = timeSpend.dataset.time;
      dataTimes.forEach((item) => {
        if (item.title.toLowerCase() === title) {
          let currentTime = item.timeframes[activeBtnText].current;
          timeSpend.textContent = currentTime + (currentTime === 1 ? "hr" : "hrs");
        }
      });
    });

    timesLastSpend.forEach((timeLastSpend) => {
      let title = timeLastSpend.dataset.lastTime;
      dataTimes.forEach((item) => {
        if (item.title.toLowerCase() === title) {
          let previousTime = item.timeframes[activeBtnText].previous;
          timeLastSpend.textContent =
            "Last Week - " + previousTime + (previousTime === 1 ? "hr" : "hrs");
        }
      });
    });

    btnsTime.forEach((btn) => {
      let btnText = btn.textContent.toLowerCase();

      btn.addEventListener("click", () => {
        btnsTime.forEach((btn) => {
          if (btn.disabled) {
            btn.removeAttribute("disabled");
          }
        });
        btn.setAttribute("disabled", "");
        timesSpend.forEach((timeSpend) => {
          let title = timeSpend.dataset.time;
          dataTimes.forEach((item) => {
            if (item.title.toLowerCase() === title) {
              let currentTime = item.timeframes[btnText].current;
              timeSpend.textContent = currentTime + (currentTime === 1 ? "hr" : "hrs");
            }
          });
        });

        timesLastSpend.forEach((timeLastSpend) => {
          let title = timeLastSpend.dataset.lastTime;
          dataTimes.forEach((item) => {
            if (item.title.toLowerCase() === title) {
              let previousTime = item.timeframes[btnText].previous;
              timeLastSpend.textContent =
                "Last Week - " + previousTime + (previousTime === 1 ? "hr" : "hrs");
            }
          });
        });
      });
    });
  });
