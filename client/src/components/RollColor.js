export default function RollColor() {
    let color = ''
        let rand = Math.floor(1 + Math.random() * (4))
        switch(rand){
            case 1:
                color = 'grad1'
                break
            case 2:
                color = 'grad2'
                break
            case 3:
                color = 'grad3'
                break
            case 4:
                color = 'grad4'
                break
            default:
                color = 'grad2'
                break
        }
        return color
}
