import reactDom from "react-dom"

const ModalPortal=({childern})=>{
    if(typeof window==="undefined"){
        return null
    }

    const node = document.createElementById("potal")

    return reactDom.createPortal(childern,node)
}

export default ModalPortal