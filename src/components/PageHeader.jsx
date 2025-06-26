export default function PageHeader(props){
    const {turns, message, visible} = props
    if(visible){
        return(
            <>
                <div className="mainHeader">
                    <div className="left">{message}</div>
                    <div className="right">{turns}</div>
                </div>
                
            </>
            )
        }
}