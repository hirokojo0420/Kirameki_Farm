
// ハンバーガーメニュー

$(".c-hamburger-btn").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタンにactiveクラスを付与
    $("#gnav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#gnav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".c-hamburger-btn").removeClass('active');//ボタンの activeクラスを除去
    $("#gnav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});

$(document).on('click', function (e) { //画面上どこかがクリックされたら

    if (!$(e.target).closest('#gnav').length) { //gnavの領域外か判定

        //gnav領域外の場合、
        $(".c-hamburger-btn").removeClass('active'); //ボタンのactiveクラスを除去
        $("#gnav").removeClass('panelactive'); //ナビゲーションのpanelactiveクラスも除去
    }
});


// スムーススクロール----------------------//
// ヘッダーロゴをクリック
$('.scroll__header__logo').on('click', function (e) {
    e.preventDefault();
    $('body,html').animate({ scrollTop: 0 }, 400);
});

// .page-topをクリック
$('.to-page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ
    return false;
});

document.addEventListener("DOMContentLoaded", () => {
    setUpAccordion();
});


// carousel
// splide.js----------------------//

const options = {

    type: 'loop',
    perPage: 1,
    perMove: 1,
    start: 0, //最初に中央に表示するスライド
};

if (0 < $('.splide').length) { //splide要素がある場合

    const splide = new Splide(".splide", options);

    splide.mount();
}

/**
 * アコーディオン
 * Web Animations APIを使ってアコーディオンのアニメーションを制御
 */

document.addEventListener("DOMContentLoaded", () => {
    setUpAccordion();
});
const setUpAccordion = () => {
    const details = document.querySelectorAll(".js-details");
    const RUNNING_VALUE = "running"; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
    const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名

    details.forEach((element) => {
        const summary = element.querySelector(".js-summary");
        const content = element.querySelector(".js-content");

        summary.addEventListener("click", (event) => {
            // デフォルトの挙動を無効化
            event.preventDefault();

            // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
            if (element.dataset.animStatus === RUNNING_VALUE) {
                return;
            }

            // detailsのopen属性を判定
            if (element.open) {
                // アコーディオンを閉じるときの処理
                // アイコン操作用クラスを切り替える(クラスを取り除く)
                element.classList.toggle(IS_OPENED_CLASS);

                // アニメーションを実行
                const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
                // アニメーション実行中用の値を付与
                element.dataset.animStatus = RUNNING_VALUE;

                // アニメーションの完了後に
                closingAnim.onfinish = () => {
                    // open属性を取り除く
                    element.removeAttribute("open");
                    // アニメーション実行中用の値を取り除く
                    element.dataset.animStatus = "";
                };
            } else {
                // アコーディオンを開くときの処理
                // open属性を付与
                element.setAttribute("open", "true");

                // アイコン操作用クラスを切り替える(クラスを付与)
                element.classList.toggle(IS_OPENED_CLASS);

                // アニメーションを実行
                const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
                // アニメーション実行中用の値を入れる
                element.dataset.animStatus = RUNNING_VALUE;

                // アニメーション完了後にアニメーション実行中用の値を取り除く
                openingAnim.onfinish = () => {
                    element.dataset.animStatus = "";
                };
            }
        });
    });
}

/**
 * アニメーションの時間とイージング
 */
const animTiming = {
    duration: 300,
    easing: "ease-out"
};

/**
 * アコーディオンを閉じるときのキーフレーム
 */
const closingAnimKeyframes = (content) => [
    {
        height: content.offsetHeight + 'px', // "auto"だとうまく計算されないため要素の高さを指定
        opacity: 1,
    }, {
        height: 0,
        opacity: 0,
    }
];

/**
 * アコーディオンを開くときのキーフレーム
 */
const openingAnimKeyframes = (content) => [
    {
        height: 0,
        opacity: 0,
    }, {
        height: content.offsetHeight + 'px',
        opacity: 1,
    }
];

