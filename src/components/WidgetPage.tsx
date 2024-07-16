import { FC, useState } from "react";
import { DialogComponent } from "./DialogComponent";
import { elementsArray } from "../utils/utility";
import { ElementComponent } from "./ElementComponent";

export const WidgetPage: FC = () => {
    
    // const [selectedElements, dispatch] = useReducer(reducer, []);
    const [selectedElements, setSelectedElements] = useState<string[]>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);


    function removeElement(el: string) {
        setSelectedElements(state => state.filter(val => val !== el));
    };

    return (
        <div className="widgetComponent">
            <h1>Select items</h1>
            <p>You currently have {selectedElements.length} selected items.</p>
            <div className="flex fwrap dialogComponent-selected--container">
                {
                    selectedElements.map(el => (
                        <ElementComponent text={el} key={el} closeFunction={removeElement} />
                    ))
                }
            </div>
            <button className="btnGreen btn mt-1" onClick={()=>setDialogOpen(true)}>Change my choice</button>

            <div className={`grid dialogComponent-accordian ${dialogOpen ? "grid-row-1" : "grid-row-0"}`} >
                <div>
                    {
                        <DialogComponent 
                            elements={elementsArray} 
                            selectedElements={selectedElements} 
                            onElementClick={setSelectedElements}
                            setDialogOpen={setDialogOpen} 
                        />
                    }
                </div>
            </div>
        </div>
    );    
};