import ReactPaginate from "react-paginate";


function PaginatedItems({ count, limitPerPage, setSkipItems }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    
    // No need since we use the limit 100 from the marvel API
    // const [itemOffset, setItemOffset] = useState(0);
    // const endOffset = itemOffset + limitPerPage;
   
    const pageCount = Math.ceil( count / limitPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      setSkipItems(event.selected * limitPerPage);
      
    // No need since we use the limit 100 from the marvel API
    // const newOffset = (event.selected * limitPerPage) % count;
    // setItemOffset(newOffset);
    };
  
    return (
      <>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination flex flex-wrap items-center gap-y-3 text-lg text-[#F0C27B] whitespace-nowrap"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          activeLinkClassName="bg-[#F0C27B] text-zinc-700"
          breakClassName="break-link hover:bg-[#0d9488]"
        />
      </>
    );
  }

  export default PaginatedItems;