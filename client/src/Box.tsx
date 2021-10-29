import React, { useEffect, useRef, useState } from 'react';
import facingDown from './images/facingDown.png'
import box0 from './images/box0.png'
import box1 from './images/box1.png'
import box2 from './images/box2.png'
import box3 from './images/box3.png'
import box4 from './images/box4.png'
import box5 from './images/box5.png'
import box6 from './images/box6.png'
import box7 from './images/box7.png'
import box8 from './images/box8.png'
import flagged from './images/flagged.png'
import bomb from './images/bomb.png'
import './Box.css'

type BoxProps = {
    Id: string,
    IsMine: boolean,
    MineNeighbors: number,
    HandleBoardClick: Function,
    Width: number,
    Height: number,
    ClickOnBox: Function,
    IsClicked: number,
    UpdateMinesRemaining: Function
}

const MineNeighborImages = [
    box0,
    box1,
    box2,
    box3,
    box4,
    box5,
    box6,
    box7,
    box8
]

function Box({Id, IsMine, MineNeighbors, HandleBoardClick, Width, ClickOnBox, IsClicked, UpdateMinesRemaining}: BoxProps) {

    const UNCLICKED = 0;
    const CLICKED = 1;
    const FLAGGED = 2;

    const boxRef = useRef(null);

    const [isMine, setIsMine] = useState(IsMine);
    const [status, setStatus] = useState(IsClicked);
    const [mineNeighbors, setMineNeighbors] = useState(MineNeighbors);

    useEffect(() => {
        setIsMine(IsMine);
        setMineNeighbors(MineNeighbors);
        setStatus(IsClicked)
    }, [IsMine, MineNeighbors, IsClicked])

    const handleClick = (id: string) => {
        setStatus(CLICKED);
        if (isMine)
        {
            alert("Game over")
            return
        }
        HandleBoardClick(id);
        
    }

    const handleRightClick = (event: React.MouseEvent) => {
        event.preventDefault();
        if (status === UNCLICKED)
        {
            setStatus(FLAGGED);
            UpdateMinesRemaining(-1);
        }
        else
        {
            setStatus(UNCLICKED);
            UpdateMinesRemaining(1);
        }
        
    }

    switch (status) {
        case UNCLICKED:
            return (
                <img ref={boxRef} className="box" id={Id} onClick={() => handleClick(Id)} onContextMenu={handleRightClick} src={facingDown}></img>
                );
        case CLICKED:
            if (isMine)
            {
                return (
                    <img className="box" src={bomb}>
                    </img>
                    );
            }
            return (
                <img className="box" src={MineNeighborImages[mineNeighbors]}>
                </img>
                );
            
        default:
            return (
                <img className="box" id={Id} onClick={() => setStatus(UNCLICKED)} onContextMenu={handleRightClick} src={flagged}>
                </img>
                );
    }
}

export default Box;
