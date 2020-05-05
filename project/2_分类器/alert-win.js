window.onload = () => {
    var
        head = document.querySelector('head'),
        style = document.createElement('style');
    style.innerHTML = `
    .alert-box{
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    @keyframes alertWindowShow {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .alert-window{
        width: 300px;
        height: 40px;
        opacity: 0;
        animation: alertWindowShow 1s;
        animation-fill-mode: forwards;
        transition: 
            height 1s ease,
            margin-bottom 1s ease;
        overflow: hidden;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
    }
    .alert-info{
        background-color: #A5D6A7;
    }
    .alert-warning{
        background-color: #EC407A;
    }
    `;
    head.appendChild(style);

    class AlertWindow {
        constructor() {
            var
                box = document.createElement('div');
            box.classList.add('alert-box');
            document.body.appendChild(box);
            this.box = box;
        }

        removeElement(el) {
            this.box.removeChild(el);
        }

        removeHeight(el) {
            el.style.height = el.style.marginBottom = '0';
        }

        remove(el) {
            this.removeHeight(el);
            setTimeout(() => {
                this.removeElement(el);
            }, 1000);
        }

        alert(msg, style, delay = 1000) {
            var
                win = document.createElement('div');
            win.classList.add('alert-window', style);
            win.innerText = msg;
            this.box.appendChild(win);
            setTimeout(() => {
                this.remove(win);
            }, delay)
        }

        info(msg, delay = 1000) {
            this.alert(msg, 'alert-info', delay)
        }

        warning(msg, delay = 1000) {
            this.alert(msg, 'alert-warning', delay)
        }
    }

    window.aw = new AlertWindow();
};

