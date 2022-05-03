import boardToString from "./boardToString"
class TicTacToe {

    constructor({dificulty='hard',board = Array(9).fill(0)}) {
        this.dificulty = dificulty
        this.board = board.map(item => {
            return item !== 0 || item !== 1 || item !== 2 ? 0 : Number(item)
        })
        this.moves = []
        this.isWin = this.isDraw = false;
        
    }
    get turn() { 
        return 1 + this.moves.length % 2;
    }

    get validMoves() {
        return [...this.board.keys()].filter(i => !this.board[i])
    }

    play(move) { 
        if (this.board[move] !== 0 || this.isWin) return false;
        this.board[move] = this.turn;
        this.moves.push(move);
        this.isWin = /^(?:...)*([12])\1\1|^.?.?([12])..\2..\2|^([12])...\3...\3|^..([12]).\4.\4/.test(this.board.join(""));
        this.isDraw = !this.isWin && this.moves.length === this.board.length;
        return true;
    }

    takeBack() {
        if (this.moves.length === 0) return false;

        this.board[this.moves.pop()] = 0;
        this.isWin = this.isDraw = false;
        return true;
    }

    minimax() {
        if (this.isWin) return { value: -10 };
        if (this.isDraw) return { value: 0 };
        let best = { value: -Infinity };
        for (let move of this.validMoves) {
            this.play(move);
            let {value} = this.minimax();
            this.takeBack();

            value = value ? (Math.abs(value) - 1) * Math.sign(-value) : 0;
            if (value >= best.value) {
                if (value > best.value) best = { value, moves: [] };
                best.moves.push(move);
            }
        }
        return best;
    }

    goodMove() {
        let {moves} = this.minimax();
        return moves[Math.floor(Math.random() * moves.length)];
    }

    randomMove(){

        return this.validMoves[Math.floor(Math.random() * this.validMoves.length)];
    }

    normalMove(){
        return Math.random() < 0.5 ? this.goodMove() : this.randomMove()
    }


    computerMove(dificulty=this.dificulty){

        return new Promise((resolve,reject) => {

            if (this.isWin || this.isDraw) reject(0); 

            const move = dificulty == 'hard' ? this.goodMove() : dificulty == 'normal' ? this.normalMove() : this.randomMove()
            this.play(move)

            resolve({
                move,
                board: this.board
            })

        }).catch(err => {

            return err
        })
    }

    boardToString(){

        return boardToString(this.board)
    }
}

export default TicTacToe

