'use strict';

const voteBtns = document.getElementsByClassName('vote_btn');
const audio1 = document.getElementById('btn_audio1');
const audio2 = document.getElementById('btn_audio2');
const audio3 = document.getElementById('btn_audio3');
const audio4 = document.getElementById('btn_audio4');
const audioGod = document.getElementById('btn_audio_god');
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
    voteBtns[i].addEventListener('click', function (e) {
      e.preventDefault();
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

        if (count >= 10) {
          audioGod.play();
          showGodHand();
          return;
        }
        count++;
        counter.textContent = count;
        gauge.set(count); // ゲージの値を更新
        if (count === 10) {
          showGodHand();
          counter.style.color = 'red'; // カウンターを赤色に変更
          audioGod.play();
          return;
        }
        if (audio) {
          audio.play(); // 新しい音声を再生
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
      colorStart: '#004AAD',
      colorStop: '#004AAD',
      strokeColor: '#E0E0E0',
    };
    var target = document.getElementById('meter');
    var gauge = new Gauge(target).setOptions(opts);
    gauge.maxValue = 10;
    gauge.animationSpeed = 32;
    return gauge;
  }

  // 10回または10回以上ボタンを押したらgodhand_imgのhiddenを解除してgifを表示（8秒）
  // 8秒後にgodhand_imgのhiddenを追加してgifを非表示にする
  const godgif = document.getElementById('godgif');
  const godgifImg = document.getElementById('godgif_img');

  function showGodHand() {
    // gitのsrcを正しいものに変更生のjs
    godgifImg.setAttribute('src', './images/god-hand-inazuma-eleven.gif');
    godgif.classList.remove('hidden');
    setTimeout(() => {
      godgifImg.setAttribute('src', './images/empty.gif');
      godgif.classList.add('hidden');
    }, 9000);
  }
});
