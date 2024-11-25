import ModalButton from './ModalButton'

const Modal = ({childern})=>{
    return(
        <aside onClick={(e)=>{}}>
            <div>
                {childern}
                <ModalButton/>
            </div>
        </aside>
    )
}

export default Modal;