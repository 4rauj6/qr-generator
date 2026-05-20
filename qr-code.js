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
const navbarState = document.querySelector('.navbar');

navbarOpenerTrigger.addEventListener('click', function () { 
    navbarState.classList.toggle('active');
})