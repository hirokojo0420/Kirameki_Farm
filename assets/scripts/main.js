
// ハンバーガーメニュー

$(".c-hamburger-btn").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタンにactiveクラスを付与
    $("#gnav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#gnav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".c-hamburger-btn").removeClass('active');//ボタンの activeクラスを除去
    $("#gnav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});

$(document).on('click', function(e) { //画面上どこかがクリックされたら

    if (!$(e.target).closest('#gnav').length) { //gnavの領域外か判定

        //gnav領域外の場合、
        $(".c-hamburger-btn").removeClass('active'); //ボタンのactiveクラスを除去
        $("#gnav").removeClass('panelactive'); //ナビゲーションのpanelactiveクラスも除去
    }
});


// スムーススクロール----------------------//
// トップページでヘッダーロゴをクリック
$('.scroll__header__logo').on('click', function (e) {
    e.preventDefault();
    $('body,html').animate({ scrollTop: 0 }, 400);
});

// .page-topをクリックした際の設定
$('.to-page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ
    return false;
});


// accordion----------------------//
$(function () {
    //accordion topの領域がクリックされたら
    $(".l-accordion-title-area").on("click", function () {
        console.log("accordion clicked");

        //bottom領域をslide
        $(this).next(".accordion-contents-area").slideToggle();

        //同時にicon表示も変更 openクラスつけはずし
        $(this).children(".accordion-icon").toggleClass("open");
    });
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
    
    console.log("splide");
    console.log(splide);

    splide.mount();
}

