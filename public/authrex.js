function AuthRexLogin() {
    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    window.open(
        'https://authrex.vercel.app/components/QuickAuth',
        'AuthREX Login',
        `width=${width},height=${height},top=${top},left=${left}`
    );

    window.addEventListener('msg', function(event) {
        if (event.data.type === 'authrex-login-success') {
            console.log('Login successful:', event.data.user);
        }
    });
}