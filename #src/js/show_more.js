// if( window.innerWidth < 960) {
//     $(function(){
//         $('.slider__item_desc-text').readmore({
//             lessLink: '<p class="more"><a href="#" class="btn btn-default">Свернуть</a></p>',
//             moreLink: '<p class="more"><a href="#" class="btn btn-default">Показать ещё</a></p>',
//             collapsedHeight: 200,
//         });
//     });
// }


$(document).ready(function(){
    let mobile = $(window).width();
    if (mobile <= 960) {
        $(function(){
            $('.slider__item_desc-text').readmore({
                lessLink: '<p class="more"><a href="#" class="btn btn-default">Свернуть</a></p>',
                moreLink: '<p class="more"><a href="#" class="btn btn-default">Показать ещё</a></p>',
                collapsedHeight: 200,
            });
        });
    }
    console.log(mobile)
})