import { useState } from "react";

function Player({ initialName, symbol, isActive, onChangeName}) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = () => {
        setIsEditing((editing) => !editing);
        
        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    }

    let playerNameEdit = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        playerNameEdit = <input type="text" required value={playerName} onChange={handleChange}/>
    }


    return (
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
                {playerNameEdit}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ?  'Guardar' : 'Editar'}</button>
        </li>
    );
}

export { Player }