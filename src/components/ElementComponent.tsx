import { FC } from "react";

type Props = {
    text: string;
    closeFunction: (el: string)=> void;
}

export const ElementComponent: FC<Props> = ({ text, closeFunction }) => {
    return (
        <div className="flex justify-between element">
            <div>{ text }</div><div className="element-divider">
                <span className="pointer" onClick={() => { closeFunction(text) }}>X</span>
            </div>
        </div>
    );    
};