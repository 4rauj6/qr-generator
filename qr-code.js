let qrState = null;

function generateQr() {
    const urlInput = document.getElementById('url-input').value.trim();
    const qrContainer = document.getElementById('qr-code-here');

    if(!urlInput) {
        alert('Please, first fill the input field to continue');
        return;
    }

    qrContainer.innerHTML = '';

    qrState = new QRCode(qrContainer, {
        text: urlInput,
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        const canvas = qrContainer.querySelector('canvas')

        if(canvas) {
            canvas.toBlob(function(blob) {
                const blobQRCode = URL.createObjectURL(blob);

                const downloadBtn = document.createElement('button');
                downloadBtn.innerText = 'Download the QR image';
                downloadBtn.className = 'download-button';
            
                downloadBtn.addEventListener('click', () => {
                    const linkToDownload = document.createElement('a');
                    
                    linkToDownload.href = blobQRCode;
                    linkToDownload.download = 'my-qr-code.png';

                    document.body.appendChild(linkToDownload);
                    
                    linkToDownload.click();

                    document.body.removeChild(linkToDownload);
                });

                qrContainer.appendChild(downloadBtn);
            
            }, 'image/png')
        }
    }, 50);
}


const navbarOpenerTrigger = document.querySelector('.navbar-opener');
const navbarState = document.querySelector('.navbar-content');
const icon = document.querySelector('i');

navbarOpenerTrigger.addEventListener('click', function () {
    const isNavbarOpen = navbarState.classList.contains('active');

    if(isNavbarOpen) {
        navbarState.classList.add('close-trigger');

        setTimeout(() => {
            navbarState.classList.remove('active');
            navbarState.classList.remove('close-trigger');
        }, 200);
    }else {
        navbarState.classList.add('active');
    }

    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

function showQRPage() {
    const mainPage = document.querySelector('.main-page');
    const generatorPage = document.querySelector('.qr-generator-page');

    mainPage.style.display = 'none';
    generatorPage.style.display = 'flex';
}

function changeTheme() {
    document.body.classList.toggle('dark-mode');
}
