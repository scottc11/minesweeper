import { Button } from "@mui/material";
import { FC } from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import './VerticalButton.scss';

interface VerticalButtonProps {
    label: string;
    orientation: 'left' | 'right';
    active: boolean;
    onClick: Function;
}

const VerticalButton: FC<VerticalButtonProps> = (props) => {
    let arrow;
    if (props.orientation === 'left') {
        arrow = props.active ? <ArrowLeft /> : <ArrowRight />;
    } else {
        arrow = !props.active ? <ArrowLeft /> : <ArrowRight />;
    }
    return (
        <div className="vertical-button">
            <Button onClick={() => props.onClick()}>
                <span>{props.label} {arrow}</span>
            </Button>
        </div>
    )
}

export default VerticalButton;