'use strict';

const voteBtns = document.getElementsByClassName('vote_btn');
const audio1 = document.getElementById('btn_audio1');
const audio2 = document.getElementById('btn_audio2');
const audio3 = document.getElementById('btn_audio3');
const audio4 = document.getElementById('btn_audio4');
const counter = document.getElementById('counter');
var count = 0;

// ボタンを押したら音声を再生する
document.addEventListener('DOMContentLoaded', function () {
  const voteBtns = document.getElementsByClassName('vote_btn');
  const counter = document.getElementById('counter');
  const gauge = setupGauge();
  const audios = [
    document.getElementById('btn_audio1'),
    document.getElementById('btn_audio2'),
    document.getElementById('btn_audio3'),
    document.getElementById('btn_audio4'),
  ];
  let count = parseInt(counter.textContent, 10);

  for (let i = 0; i < voteBtns.length; i++) {
    voteBtns[i].addEventListener('click', function () {
      if (count >= 100) {
        return; // countが100以上の場合は何もしない
      }

      // Promiseを使用して全てのオーディオを停止
      Promise.all(
        audios.map((audio) => {
          return new Promise((resolve) => {
            if (!audio.paused) {
              audio.onpause = resolve;
              audio.pause();
              audio.currentTime = 0;
            } else {
              resolve();
            }
          });
        })
      ).then(() => {
        const audioNum = this.dataset.audioNum;
        const audio = audios[audioNum - 1];

        if (audio) {
          audio.play(); // 新しい音声を再生
        }

        count++;
        counter.textContent = count;
        gauge.set(count); // ゲージの値を更新

        if (count === 99) {
          counter.style.color = 'red'; // カウンターを赤色に変更
        }
      });
    });
  }

  function setupGauge() {
    var opts = {
      lines: 12,
      angle: 0.15,
      lineWidth: 0.44,
      pointer: {
        length: 0.9,
        strokeWidth: 0.035,
      },
      colorStart: '#6FADCF',
      colorStop: '#8FC0DA',
      strokeColor: '#E0E0E0',
    };
    var target = document.getElementById('meter');
    var gauge = new Gauge(target).setOptions(opts);
    gauge.maxValue = 100;
    gauge.animationSpeed = 32;
    return gauge;
  }
});
