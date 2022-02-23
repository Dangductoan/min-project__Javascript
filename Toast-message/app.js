const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const toasts = $('#toast')
const clickSuccessBtn = $('.btn-success')
const clickErrorBtn = $('.btn-error')
const toastMessage = {
    toasts: [{

            icon: "fas fa-check-circle",
            title: 'Success',
            message: 'Ban da dang ky thanh cong tai F8',
            type: 'success',
            duration: 5000
        },
        {

            icon: "fas fa-exclamation-circle",
            title: 'Error',
            message: 'Ban da dang ky that bai,vui long thu lai',
            type: 'error',
            duration: 5000
        }

    ],
    handelEvent: function() {
        //click btn
        clickSuccessBtn.onclick = function() {
                toastMessage.render(0);


            }
            //click btn
        clickErrorBtn.onclick = function() {
            toastMessage.render(1);



        }
    },
    //render the toast message
    render: function(i) {
        const toastDiv = document.createElement("div");
        toastDiv.classList.add('toast')
        const durations = this.toasts[i].duration
        const messages = this.toasts.map(function(toast) {
                return `
        <div class="toast__icon">
            <i class="${toast.icon}"></i>
        </div>
        <div class="toast__body">
            <h3 class="toast__title">${toast.title}</h3>
            <p class="toast__msg">${toast.message}</p>
        </div>
        <div class="toast__close">
            <i class="fas fa-times"></i>
        </div>

    `;
            })
            //add class to change color
        if (i === 0) {
            toastDiv.classList.add('toast--success');

        }
        if (i === 1) {
            toastDiv.classList.add('toast--error');

        }
        //assign result to divTag
        toastDiv.innerHTML = messages[i];
        toasts.appendChild(toastDiv);
        //auto remove toast
        const autoRemoveId = setTimeout(function() {
            toasts.removeChild(toastDiv);
        }, durations + 1000);
        //remove toast by click
        toastDiv.onclick = function(e) {
            if (e.target.closest(".toast__close")) {
                toasts.removeChild(toastDiv);
                clearTimeout(autoRemoveId);
            }
        };
        //animation
        const delay = (durations / 1000).toFixed(2);
        toastDiv.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`

    },


    start: function() {
        this.handelEvent();

    }
}
toastMessage.start();

// //Cach 2 :
// // Toast function
// function toast({ title = "", message = "", type = "info", duration = 3000 }) {
//     const main = document.getElementById("toast");
//     if (main) {
//         const toast = document.createElement("div");

//         // Auto remove toast
//         const autoRemoveId = setTimeout(function() {
//             main.removeChild(toast);
//         }, duration + 1000);

//         // Remove toast when clicked
//         toast.onclick = function(e) {
//             if (e.target.closest(".toast__close")) {
//                 main.removeChild(toast);
//                 clearTimeout(autoRemoveId);
//             }
//         };

//         const icons = {
//             success: "fas fa-check-circle",
//             info: "fas fa-info-circle",
//             warning: "fas fa-exclamation-circle",
//             error: "fas fa-exclamation-circle"
//         };
//         const icon = icons[type];
//         const delay = (duration / 1000).toFixed(2);

//         toast.classList.add("toast", `toast--${type}`);
//         toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

//         toast.innerHTML = `
//                       <div class="toast__icon">
//                           <i class="${icon}"></i>
//                       </div>
//                       <div class="toast__body">
//                           <h3 class="toast__title">${title}</h3>
//                           <p class="toast__msg">${message}</p>
//                       </div>
//                       <div class="toast__close">
//                           <i class="fas fa-times"></i>
//                       </div>
//                   `;
//         main.appendChild(toast);
//     }
// }


// function showSuccessInfo() {
//     toast({
//         title: 'Success',
//         message: 'Ban da dang ky thanh cong',
//         type: 'success',
//         duration: 3000
//     })

// }

// function showErrorInfo() {
//     toast({
//         title: 'Error',
//         message: 'Ban da dang ky that bai',
//         type: 'error',
//         duration: 3000
//     })
// }