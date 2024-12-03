class ColorChanger {
    constructor() {
        this.button = document.getElementById('changeColor');
        this.button.addEventListener('click', () => {
            document.body.style.backgroundColor = this.getRandomColor();
        });
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#'
        for (let i = 0; i < 6; i++){
            color += letters[Math.floor(Math.random() * 16)];
        } 
        return color;
    }
}

const colorChanger = new ColorChanger();