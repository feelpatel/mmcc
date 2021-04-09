
const MetaTag = ({SEO_Tags}) => {
    return (
        <>
            {
                SEO_Tags.map((value,index)=>{
                    switch(value.slice_type){
                        case ('meta_tags'):
                            return <MetaTags slice={value} key={`slice-${index}`} ></MetaTags>    
                            break;             
                        default :
                        return null
                    }
                })
            }
        </> 
    )
}

 

const MetaTags = ({slice}) =>{
    return (
        slice.items.map((value,index)=>{
            return (
                <>
                {
                    (value.meta_type == "property_Card") ?<meta property={`${value.meta_title}`} content={`${value.meta_content}`} /> :<meta name={`${value.meta_title}`} content={`${value.meta_content}`} />
                }
                </>
            )     
        })              
    )
}

export {
    MetaTag,
    MetaTags
}