import React, {useEffect, useState} from 'react';
import s from "./Paginator.module.css";

type PaginatorPropsType = {
  pageSize: number
  totalItemsCount: number
  currentPage: number
  portionSize?: number
  onPageChanged: (pageNumber: number) => void
}

export const Paginator = ({
                            pageSize,
                            totalItemsCount,
                            currentPage,
                            onPageChanged,
                            portionSize = 10
                          }: PaginatorPropsType) => {

  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage,portionSize]);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={s.paginator}>
      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => <span className={p === currentPage ? s.activePageNumber : s.pageNumber}
                          key={p}
                          onClick={() => {
                            onPageChanged(p)
                          }}>{p}</span>)}
    </div>
  );
}
