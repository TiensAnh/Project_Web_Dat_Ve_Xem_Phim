import { useState } from "react";

function useCardSlider(movieSlides,itemsPerPage ){
    const [currentPage, setCurrentPage] = useState(0);
    const totalPage = Math.ceil(movieSlides.length/itemsPerPage)
    const Remainder = movieSlides.length%itemsPerPage;
    const lastStep = Remainder === 0 ? 1 : Remainder/itemsPerPage
    const isFirstPage = ()=> currentPage === 0;
    const maxValuePage = totalPage>1 ? (totalPage-1) -(1-lastStep) : 0
    const isLastPage = ()=> currentPage >= maxValuePage;

    const goToNextPage = ()=>{     
        if(isLastPage()) return
        setCurrentPage((newPage)=>{
            if(newPage+1>maxValuePage){
                return maxValuePage;
            }
            return newPage+1;
        })

    }
    const goToPreviousPage = ()=>{
        if(isFirstPage()) return
        setCurrentPage((newPage)=>{ 
            const target = Math.floor(newPage) === newPage ? newPage -1 : Math.floor(newPage);
            return Math.max(0,target); 
        })
    }
    return{
        goToNextPage,
        currentPage,
        setCurrentPage,
        goToPreviousPage,
        isFirstPage,
        isLastPage
    }
}
export default useCardSlider