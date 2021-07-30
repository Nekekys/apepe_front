


export function textPostValidation(text) {
    let check = true,flagStart = true,flagEnd = true
    let k = 0,j = 0
    let textWithoutSpace = [],textWithoutSpaceReverse = []

    if (text.length === 0) check = false
    for(let i = 0; i < text.length;i++){
        if((text[i] == ' ')||(text[i] == '\n')||(text[i] == '\0')){
            k++
        }
    }
    if(k === text.length) check = false

    if(check){
        for(let i = 0; i < text.length;i++){
            if((flagStart) && ((text[i] == ' ')||(text[i] == '\n')||(text[i] == '\0'))){

            }else{
                flagStart = false
                textWithoutSpace[j] = text[i]
                j++
            }
        }
        textWithoutSpace.reverse()
        j = 0;
        for(let i = 0; i < textWithoutSpace.length;i++){
            if((flagEnd) && ((textWithoutSpace[i] == ' ')||(textWithoutSpace[i] == '\n')||(textWithoutSpace[i] == '\0'))){

            }else{
                flagEnd = false
                textWithoutSpaceReverse[j] = textWithoutSpace[i]
                j++
            }
        }
        textWithoutSpaceReverse.reverse()
        let endText = ''
        for(let i = 0; i < textWithoutSpaceReverse.length;i++) {
            endText+= textWithoutSpaceReverse[i]
        }

        //true
        return {boo: true,textWithoutSpaceReverse}

    }else{
        //false
        return {boo: false,text}
    }
}
