import { FC, useEffect, useMemo, useState } from "react";

import { OptionComponent } from "./OptionComption";
import { ElementComponent } from "./ElementComponent";

type Props = {
    selectedElements : string[];
    elements: string[];
    onElementClick: React.Dispatch<React.SetStateAction<string[]>>;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}




export const DialogComponent: FC<Props> = ({selectedElements, elements, onElementClick, setDialogOpen}) => {   
    const [tempElements, setTempElements] = useState<string[]>(selectedElements);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterValue, setFilterValue] = useState(0);

    useEffect(()=>{
        setTempElements(selectedElements);
    }, [selectedElements]);

    const disableCheckBox = (el: string) => {
        if(tempElements.length < 3) {
            return false;
        } else {
           return !tempElements.includes(el);
        }
    }
    
    const checkHandler = ( el: string): void => {
        if(tempElements.includes(el)) {
            removeTempElement(el);
        } else {
            setTempElements(state => [...state, el]);
        }        
    }

    const onButtonClicked = () => {
        onElementClick(tempElements);
        setDialogOpen(false);
    }

    function removeTempElement(el: string) {
        setTempElements(state => state.filter(val => val !== el));
    }

    const filterElements = useMemo(()=>{
        return elements.filter(el => 
            el.toLowerCase().includes(searchQuery.toLowerCase()) && 
            parseInt(el.split(' ')[1]) > filterValue);
    }, [elements, searchQuery, filterValue]);

    return (
        <div className="dialogComponent">
            <div className="flex justify-between dialogComponent-header">
                <h4 className="m-0">Selected items</h4>
                 <span className="pointer" onClick={()=>setDialogOpen(false)}>X</span>   
            </div>
            <div className="flex justify-between">
                <div>
                    <label className="mr-05">Search</label>
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {
                    <OptionComponent filterValue={filterValue} setFilterValue={setFilterValue} />
                }
            </div>
            <div className="dialogComponent-list">
                {filterElements.map(el => (
                    <div key={el} className="dialogComponent-element">
                        <input 
                            type="checkbox" 
                            checked={tempElements.includes(el)} 
                            onChange={(e)=>{checkHandler(el)}} 
                            disabled={disableCheckBox(el)}
                        /> <label>{el}</label>
                    
                    </div>
                ))}
            </div>
            <div className="dialogComponent-selected">
                <p>Current selected items:</p>
                <div className="flex fwrap dialogComponent-selected--container">
                    {
                        tempElements.map(el => (
                            <ElementComponent text={el} key={el} closeFunction={removeTempElement} />
                        ))
                    }
                </div>
            </div>
            <div className="flex fwrap gap-1 mt-1">
                <button className="btn btnGreen" onClick={onButtonClicked}>Save</button>
                <button className="btn btnRed" onClick={()=>setDialogOpen(false)}>Cancel</button>
            </div>
        </div>
    );    
};