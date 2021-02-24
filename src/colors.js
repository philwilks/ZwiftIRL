const Colors = {
    white: '#FFF',
    black: '#000',
    blue: '#0095D1',
    
    forGradient: (gradient) => {
        if (gradient >= 10) return '#EE030F';
        else if (gradient >= 7) return '#FE6425';
        else if (gradient >= 3) return '#FFD300';
        else return '#FFF';
    }
}
export default Colors