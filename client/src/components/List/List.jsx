import React from "react"
import "./List.scss";
import Card from "../../components/Card/Card.jsx"
import useFetch from "../hooks/useFetch";

const List=({catId,maxPrice,sort,subCats}) =>{
    const { data, loading, error } = useFetch(
        `/products?populate=*&[filters][categories][id][$eq]=${catId}
        ${subCats.map(item => `&[filters][sub_categories][id][$eq]=${item}`)}
        &[filters][price][$lte]=${maxPrice}
        &sort=price:${sort}`)

    return (
        <div className="list">
        {loading?"Loading":
        data?.map((item) => (
            <Card item={item} key={item.id}/>
        ))}
        </div>
    )
}
export default List;

