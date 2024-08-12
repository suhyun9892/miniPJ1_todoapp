const clock = document.querySelector("h2#clock");
const clockGeneve = document.querySelector("h2#clock_geneve");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}`;
}
getClock();
setInterval(getClock, 1000);

function getGeneveTime() {
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  // 제네바의 시간대 오프셋 (CET: UTC+1, CEST: UTC+2)
  const genevaOffset = 2; // 서머타임인 경우 UTC+2, 그렇지 않다면 1을 사용합니다

  // 제네바 시간 계산
  const genevaTime = new Date(utcTime + genevaOffset * 60 * 60 * 1000);

  const hours = String(genevaTime.getHours()).padStart(2, "0");
  const minutes = String(genevaTime.getMinutes()).padStart(2, "0");
  // const seconds = String(genevaTime.getSeconds()).padStart(2, "0");
  clockGeneve.innerText = `${hours}:${minutes}`;
}
getGeneveTime();
setInterval(getGeneveTime, 1000);
