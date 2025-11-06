
import "/Users/dell/my-app/src/App.css"

const Card = ({card, isFlipped, isMatched, handleChoice}) => {
    return (
        <div className="card">
            <button
                className={isFlipped || isMatched ? "card flipped" : "card"}
                onClick={()=>handleChoice(card)} // parenthèse jaune importante sinon la fonction est appelé immédiatement
            >   
                <div className="card front">
                        <img src={card.icon} className="frontSide" alt={card.name}></img>
                </div>
                <div className="card back">
                        <img src="./image/dbz_shenron_back_card.jpg" className="backSide" alt={card.name}></img>
                </div>
            </button>
        </div>
    )

}

export default Card;