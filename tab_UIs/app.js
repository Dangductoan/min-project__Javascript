'use strict'
//click tab-item
//C1:dung addevent
// const clickTabItems = document.querySelectorAll('.tab-item');
// const arrContents = document.querySelectorAll('.tab-pane');
// const lines = document.querySelector('.tabs .line');
// const tabItemActive = document.querySelector('.tab-item.active');

// lines.style.width = tabItemActive.offsetWidth + 'px';
// lines.style.left = tabItemActive.offsetLeft + 'px';


// clickTabItems.forEach((clickTabItem, index) => {
//     const arrContent = arrContents[index];
//     clickTabItem.addEventListener('click', function () {
//         const arrShowContent = document.querySelector('.tab-pane.active');
//         const tabItemActive = document.querySelector('.tab-item.active');


//         tabItemActive.classList.remove('active')
//         arrShowContent.classList.remove('active')

//         lines.style.width = this.offsetWidth + 'px';
//         lines.style.left = this.offsetLeft + 'px';

//         clickTabItem.classList.add('active')
//         arrContent.classList.add('active')
//     })
// })
//C2:dung onclick
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$('.tab-item')
const panes = $$('.tab-pane')

const tabActive = $('.tab-item.active')
const line = $('.tabs .line')

line.style.left = tabActive.offsetLeft + 'px'
line.style.width = tabActive.offsetWidth + 'px'


tabs.forEach((tab, index) => {
  const pane = panes[index]

  tab.onclick = function () {
    console.log(pane)
    $('.tab-item.active').classList.remove('active')
    $('.tab-pane.active').classList.remove('active')


    this.classList.add('active')
    pane.classList.add('active')

    line.style.left = this.offsetLeft + 'px'
    line.style.width = this.offsetWidth + 'px'


  }
})


