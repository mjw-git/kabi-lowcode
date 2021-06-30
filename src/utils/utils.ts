import { styleProperty } from "../types/interface";
export function formatStyle(styles:styleProperty){
    return {
        width:`${styles.width}px`,
        height:`${styles.height}px`,
        top:`${styles.top}px`,
        left:`${styles.left}px`,
    }
}
export function formatFontStyle(styles:styleProperty){
    return {
        fontSize:`${styles.fontSize}px`,
        color:`${styles.color}`,
        fontWeight:styles.fontWeight,
    }
}