function boardToString(layout){

    let text

    layout = layout.map((layoutItem,index) => {

        if(layoutItem == 0) layoutItem = '⬜️'
        else if(layoutItem == 1) layoutItem = '❌'
        else if(layoutItem == 2) layoutItem = '🔴'

        if(index == 2 || index == 5 || index == 8){

            layoutItem += '\n'
        }

        return layoutItem
    })

    return layout.join('')
}


module.exports = boardToString