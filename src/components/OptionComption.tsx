import { FC } from "react";

type Props = {
    filterValue: number;
    setFilterValue: (val: number) => void;
}

export const OptionComponent: FC<Props> = ({ filterValue, setFilterValue }) => {
    return (
        <div className="flex">
            <label className="mr-05">Filter</label>
            <select value={filterValue} onChange={(e)=>setFilterValue(parseInt(e.target.value))}>
                <option value={0}>No filter</option>
                <option value={10}>&gt; 10</option>
                <option value={100}>&gt; 100</option>
                <option value={200}>&gt; 200</option>
            </select>
        </div>
    );    
};